const EVENT_TYPES = new Set([
  "page_view",
  "whatsapp_click",
  "email_click",
  "catalog_click",
  "form_submit"
]);

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...extraHeaders
    }
  });
}

function getSource(url, env) {
  const pathSource = url.pathname.replace(/^\/+|\/+$/g, "");
  return (pathSource || url.searchParams.get("src") || env.DEFAULT_SOURCE || "tarjeta")
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
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function dailyVisitorKey(request, env) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const ua = request.headers.get("user-agent") || "unknown";
  const date = new Date().toISOString().slice(0, 10);
  const salt = env.VISITOR_SALT || "envax-qr";
  const hash = await sha256Hex(`${salt}|${date}|${ip}|${ua}`);
  return hash.slice(0, 24);
}

function bogotaTimestamp(date = new Date()) {
  return new Intl.DateTimeFormat("es-CO", {
    timeZone: "America/Bogota",
    dateStyle: "medium",
    timeStyle: "medium"
  }).format(date);
}

async function insertScan(env, scan) {
  if (!env.DB) return;
  await env.DB.prepare(`
    INSERT INTO scans (
      scan_id, visitor_key, source, scanned_at, country, city, region,
      timezone, device, browser, os, user_agent, destination
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    scan.scanId,
    scan.visitorKey,
    scan.source,
    scan.scannedAt,
    scan.country,
    scan.city,
    scan.region,
    scan.timezone,
    scan.device,
    scan.browser,
    scan.os,
    scan.userAgent,
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
    JSON.stringify(event.metadata || {})
  ).run();
}

async function sendScanAlert(env, scan) {
  if (!env.EMAIL || !env.ALERT_TO || !env.ALERT_FROM) return;
  const location = [scan.city, scan.region, scan.country].filter(Boolean).join(", ") || "Ubicación no disponible";
  await env.EMAIL.send({
    from: env.ALERT_FROM,
    to: env.ALERT_TO,
    subject: `ENVAX QR · Nuevo escaneo · ${scan.source}`,
    text: [
      "Nuevo escaneo del QR de ENVAX",
      "",
      `Hora Colombia: ${bogotaTimestamp(new Date(scan.scannedAt))}`,
      `Origen: ${scan.source}`,
      `Ubicación aproximada: ${location}`,
      `Dispositivo: ${scan.device}`,
      `Navegador: ${scan.browser}`,
      `Sistema: ${scan.os}`,
      `Scan ID: ${scan.scanId}`,
      "",
      "Nota: el QR no identifica por nombre a la persona. El Scan ID permite asociar acciones posteriores del sitio con este escaneo."
    ].join("\n")
  });
}

function corsHeaders(request, env) {
  const origin = request.headers.get("origin") || "";
  const allowed = (env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
  if (allowed.includes(origin)) {
    return {
      "access-control-allow-origin": origin,
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type",
      "vary": "Origin"
    };
  }
  return {};
}

async function handleScan(request, env, ctx) {
  const url = new URL(request.url);
  const source = getSource(url, env);
  const scanId = crypto.randomUUID();
  const scannedAt = new Date().toISOString();
  const userAgent = request.headers.get("user-agent") || "";
  const cf = request.cf || {};
  const visitorKey = await dailyVisitorKey(request, env);

  const destinationUrl = new URL(env.DESTINATION_URL || "https://contacto.desechablesenvax.com/");
  destinationUrl.searchParams.set("scan_id", scanId);
  destinationUrl.searchParams.set("qr_source", source);

  const scan = {
    scanId,
    visitorKey,
    source,
    scannedAt,
    country: cf.country || null,
    city: cf.city || null,
    region: cf.region || null,
    timezone: cf.timezone || null,
    device: getDevice(userAgent),
    browser: getBrowser(userAgent),
    os: getOS(userAgent),
    userAgent: userAgent.slice(0, 500),
    destination: destinationUrl.toString()
  };

  ctx.waitUntil(insertScan(env, scan).catch(console.error));
  ctx.waitUntil(sendScanAlert(env, scan).catch(console.error));

  return Response.redirect(destinationUrl.toString(), 302);
}

async function handleEvent(request, env, ctx) {
  const cors = corsHeaders(request, env);
  const origin = request.headers.get("origin") || "";
  if (!cors["access-control-allow-origin"] && origin) {
    return json({ ok: false, error: "origin_not_allowed" }, 403);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400, cors);
  }

  const scanId = String(body.scan_id || "").slice(0, 80);
  const eventType = String(body.event_type || "").slice(0, 50);
  if (!scanId || !EVENT_TYPES.has(eventType)) {
    return json({ ok: false, error: "invalid_event" }, 400, cors);
  }

  const event = {
    scanId,
    eventType,
    eventAt: new Date().toISOString(),
    metadata: typeof body.metadata === "object" && body.metadata ? body.metadata : {}
  };

  ctx.waitUntil(insertEvent(env, event).catch(console.error));
  return json({ ok: true }, 202, cors);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS" && url.pathname === "/event") {
      return new Response(null, { status: 204, headers: corsHeaders(request, env) });
    }

    if (request.method === "POST" && url.pathname === "/event") {
      return handleEvent(request, env, ctx);
    }

    if (request.method === "GET" && url.pathname === "/health") {
      return json({ ok: true, service: "envax-qr-tracker" });
    }

    if (request.method === "GET") {
      return handleScan(request, env, ctx);
    }

    return json({ ok: false, error: "method_not_allowed" }, 405);
  }
};
