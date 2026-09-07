const EVENT_TYPES = new Set([
  "scan",
  "page_view",
  "form_start",
  "form_submit",
  "whatsapp_click",
  "phone_click",
  "email_click",
  "catalog_click"
]);

const EVENT_NOTIFICATION_FLAGS = {
  scan: "NOTIFY_ON_SCAN",
  form_submit: "NOTIFY_ON_FORM_SUBMIT",
  whatsapp_click: "NOTIFY_ON_WHATSAPP",
  phone_click: "NOTIFY_ON_PHONE",
  email_click: "NOTIFY_ON_EMAIL"
};

const NOTIFICATION_TYPES = {
  scan: "SCAN",
  form_submit: "LEAD",
  whatsapp_click: "CONTACT_INTENT",
  phone_click: "CONTACT_INTENT",
  email_click: "CONTACT_INTENT"
};

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...extraHeaders
    }
  });
}

function isTarjetaPath(pathname) {
  return pathname === "/tarjeta" || pathname.startsWith("/tarjeta/");
}

function getSource(url, env) {
  const pathSource = url.pathname.replace(/^\/tarjeta\/?/, "").replace(/^\/+|\/+$/g, "");
  return (url.searchParams.get("src") || pathSource || env.DEFAULT_SOURCE || "tarjeta")
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "-")
    .slice(0, 80);
}

function getDevice(userAgent = "") {
  const ua = userAgent.toLowerCase();
  if (/ipad|tablet|kindle|silk/.test(ua)) return "tablet";
  if (/mobi|iphone|android/.test(ua)) return "mobile";
  return "desktop";
}

function getBrowser(userAgent = "") {
  const ua = userAgent.toLowerCase();
  if (ua.includes("edg/")) return "edge";
  if (ua.includes("opr/") || ua.includes("opera")) return "opera";
  if (ua.includes("firefox/")) return "firefox";
  if (ua.includes("chrome/") || ua.includes("crios/")) return "chrome";
  if (ua.includes("safari/")) return "safari";
  return "other";
}

function getOS(userAgent = "") {
  const ua = userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (ua.includes("android")) return "android";
  if (ua.includes("windows")) return "windows";
  if (ua.includes("mac os") || ua.includes("macintosh")) return "macos";
  if (ua.includes("linux")) return "linux";
  return "other";
}

async function sha256Hex(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function dailyVisitorKey(request, env) {
  if (!env.VISITOR_SALT) return null;
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";
  const date = new Date().toISOString().slice(0, 10);
  const hash = await sha256Hex(`${env.VISITOR_SALT}|${date}|${ip}|${userAgent}`);
  return hash.slice(0, 24);
}

function bogotaTimestamp(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Bogota",
    dateStyle: "short",
    timeStyle: "medium",
    hour12: false
  }).format(date);
}

function trimValue(value, maxLength = 180) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : null;
}

function campaignData(url) {
  return {
    campaignSource: trimValue(url.searchParams.get("utm_source"), 80),
    campaignMedium: trimValue(url.searchParams.get("utm_medium"), 80),
    campaignName: trimValue(url.searchParams.get("utm_campaign"), 120),
    campaignTerm: trimValue(url.searchParams.get("utm_term"), 120),
    campaignContent: trimValue(url.searchParams.get("utm_content"), 120)
  };
}

function eventMetadata(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const allowed = ["channel", "page_path", "qr_source", "destination", "trigger"];
  return Object.fromEntries(
    allowed
      .map((key) => [key, trimValue(raw[key], 160)])
      .filter(([, value]) => value)
  );
}

function isEnabled(env, variable) {
  return String(env[variable] || "").toLowerCase() === "true";
}

function corsHeaders(request, env) {
  const origin = request.headers.get("origin") || "";
  const allowed = (env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (allowed.includes(origin)) {
    return {
      "access-control-allow-origin": origin,
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type",
      vary: "Origin"
    };
  }
  return {};
}

async function insertScan(env, scan) {
  if (!env.DB) return;
  await env.DB.prepare(`
    INSERT INTO scans (
      scan_id, visitor_key, source, scanned_at, scanned_at_bogota, country, city, region,
      timezone, colo, device, browser, os, language, landing_path, campaign_source,
      campaign_medium, campaign_name, campaign_term, campaign_content, referrer, destination
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    scan.scanId,
    scan.visitorKey,
    scan.source,
    scan.scannedAt,
    scan.scannedAtBogota,
    scan.country,
    scan.city,
    scan.region,
    scan.timezone,
    scan.colo,
    scan.device,
    scan.browser,
    scan.os,
    scan.language,
    scan.landingPath,
    scan.campaignSource,
    scan.campaignMedium,
    scan.campaignName,
    scan.campaignTerm,
    scan.campaignContent,
    scan.referrer,
    scan.destination
  ).run();
}

async function insertEvent(env, event) {
  if (!env.DB) return;
  await env.DB.prepare(`
    INSERT INTO events (event_id, scan_id, event_type, event_at, metadata_json)
    VALUES (?, ?, ?, ?, ?)
  `).bind(
    crypto.randomUUID(),
    event.scanId,
    event.eventType,
    event.eventAt,
    JSON.stringify(event.metadata)
  ).run();
}

async function scanExists(env, scanId) {
  if (!env.DB) return true;
  const result = await env.DB.prepare("SELECT 1 FROM scans WHERE scan_id = ? LIMIT 1").bind(scanId).first();
  return Boolean(result);
}

async function sendNotification(env, event, scan = {}) {
  const flag = EVENT_NOTIFICATION_FLAGS[event.eventType];
  if (!flag || !isEnabled(env, flag) || !env.EMAIL || !env.ALERT_TO || !env.ALERT_FROM) return;

  const labels = {
    scan: "Nuevo escaneo",
    form_submit: "Nueva intención de contacto",
    whatsapp_click: "Intención por WhatsApp",
    phone_click: "Intención por teléfono",
    email_click: "Intención por correo"
  };
  const location = [scan.city, scan.region, scan.country].filter(Boolean).join(", ") || "Ubicación aproximada no disponible";
  const shortScanId = event.scanId.slice(0, 6).toUpperCase();
  const channel = event.metadata.channel || event.eventType.replace("_click", "");
  const notificationType = NOTIFICATION_TYPES[event.eventType] || "SYSTEM_ERROR";

  await env.EMAIL.send({
    from: env.ALERT_FROM,
    to: env.ALERT_TO,
    subject: `ENVAX · ${labels[event.eventType]} · ${shortScanId}`,
    text: [
      `ENVAX — ${labels[event.eventType]}`,
      "",
      `Canal: ${channel}`,
      `Tipo: ${notificationType}`,
      `Origen: ${scan.source || event.metadata.qr_source || "No disponible"}`,
      `Ubicación aproximada: ${location}`,
      `Dispositivo: ${scan.device || "No disponible"}`,
      `Hora Colombia: ${scan.scannedAtBogota || bogotaTimestamp(new Date(event.eventAt))}`,
      `Scan ID corto: ${shortScanId}`,
      "",
      "No se incluye IP, GPS ni datos de formulario en esta alerta."
    ].join("\n")
  });
}

async function handleScan(request, env, ctx) {
  const url = new URL(request.url);
  const scannedAt = new Date().toISOString();
  const destinationUrl = new URL(env.DESTINATION_URL || "https://contacto.desechablesenvax.com/");
  const scanId = crypto.randomUUID();
  const userAgent = request.headers.get("user-agent") || "";
  const cf = request.cf || {};
  const source = getSource(url, env);
  const campaign = campaignData(url);

  destinationUrl.searchParams.set("scan_id", scanId);
  destinationUrl.searchParams.set("qr_source", source);

  const scan = {
    scanId,
    visitorKey: await dailyVisitorKey(request, env),
    source,
    scannedAt,
    scannedAtBogota: bogotaTimestamp(new Date(scannedAt)),
    country: cf.country || null,
    city: cf.city || null,
    region: cf.region || null,
    timezone: cf.timezone || null,
    colo: cf.colo || null,
    device: getDevice(userAgent),
    browser: getBrowser(userAgent),
    os: getOS(userAgent),
    language: trimValue(request.headers.get("accept-language"), 80),
    landingPath: destinationUrl.pathname,
    referrer: trimValue(request.headers.get("referer"), 300),
    destination: destinationUrl.toString(),
    ...campaign
  };
  const event = {
    scanId,
    eventType: "scan",
    eventAt: scannedAt,
    metadata: { qr_source: source, destination: destinationUrl.pathname }
  };

  ctx.waitUntil(insertScan(env, scan).catch(console.error));
  ctx.waitUntil(insertEvent(env, event).catch(console.error));
  ctx.waitUntil(sendNotification(env, event, scan).catch(console.error));

  return Response.redirect(destinationUrl.toString(), 302);
}

async function handleEvent(request, env, ctx) {
  const cors = corsHeaders(request, env);
  const origin = request.headers.get("origin") || "";
  if (origin && !cors["access-control-allow-origin"]) {
    return json({ ok: false, error: "origin_not_allowed" }, 403);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400, cors);
  }

  const scanId = trimValue(body.scan_id, 80);
  const eventType = trimValue(body.event_type, 50);
  if (!scanId || !eventType || !EVENT_TYPES.has(eventType)) {
    return json({ ok: false, error: "invalid_event" }, 400, cors);
  }

  try {
    if (!(await scanExists(env, scanId))) return json({ ok: false, error: "unknown_scan" }, 404, cors);
  } catch (error) {
    console.error("scan_lookup_failed", error);
    return json({ ok: true, accepted: false }, 202, cors);
  }

  const event = {
    scanId,
    eventType,
    eventAt: new Date().toISOString(),
    metadata: eventMetadata(body.metadata)
  };

  ctx.waitUntil(insertEvent(env, event).catch(console.error));
  ctx.waitUntil((async () => {
    if (!EVENT_NOTIFICATION_FLAGS[eventType] || !isEnabled(env, EVENT_NOTIFICATION_FLAGS[eventType])) return;
    const scan = env.DB
      ? await env.DB.prepare(`SELECT source, country, city, region, device, scanned_at_bogota FROM scans WHERE scan_id = ? LIMIT 1`).bind(scanId).first()
      : {};
    await sendNotification(env, event, scan || {});
  })().catch(console.error));

  return json({ ok: true }, 202, cors);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const eventPath = url.pathname === "/api/qr/event" || url.pathname === "/event";

    if (request.method === "OPTIONS" && eventPath) {
      return new Response(null, { status: 204, headers: corsHeaders(request, env) });
    }
    if (request.method === "POST" && eventPath) return handleEvent(request, env, ctx);
    if (request.method === "GET" && url.pathname === "/health") {
      return json({ ok: true, service: "envax-qr-tracker" });
    }
    if (request.method === "GET" && isTarjetaPath(url.pathname)) return handleScan(request, env, ctx);

    return json({ ok: false, error: "not_found" }, 404);
  }
};
