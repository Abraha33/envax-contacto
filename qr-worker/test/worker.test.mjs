import assert from "node:assert/strict";
import test from "node:test";
import worker from "../src/index.js";

function createDb({ knownScan = true } = {}) {
  const statements = [];
  return {
    statements,
    prepare(sql) {
      return {
        bind(...values) {
          return {
            async run() {
              statements.push({ sql, values });
              return { success: true };
            },
            async first() {
              if (sql.includes("SELECT 1")) return knownScan ? { 1: 1 } : null;
              return { source: "tarjeta", country: "CO", city: "Bucaramanga", region: "Santander", device: "mobile" };
            }
          };
        }
      };
    }
  };
}

function context() {
  const pending = [];
  return { pending, waitUntil(promise) { pending.push(promise); } };
}

const env = (DB) => ({
  DB,
  VISITOR_SALT: "test-only-secret",
  DESTINATION_URL: "https://contacto.desechablesenvax.com/",
  DEFAULT_SOURCE: "tarjeta",
  ALLOWED_ORIGINS: "https://contacto.desechablesenvax.com"
});

test("/tarjeta keeps the permanent QR contract and records a scan", async () => {
  const db = createDb();
  const ctx = context();
  const request = new Request("https://contacto.desechablesenvax.com/tarjeta?utm_source=tarjeta-fisica", {
    headers: { "user-agent": "Mozilla/5.0 (Android) Chrome/120", "accept-language": "es-CO" }
  });
  Object.defineProperty(request, "cf", { value: { country: "CO", city: "Bucaramanga", region: "Santander", timezone: "America/Bogota", colo: "BOG" } });

  const response = await worker.fetch(request, env(db), ctx);
  await Promise.all(ctx.pending);

  assert.equal(response.status, 302);
  const location = new URL(response.headers.get("location"));
  assert.equal(location.origin, "https://contacto.desechablesenvax.com");
  assert.equal(location.pathname, "/");
  assert.equal(location.searchParams.get("qr_source"), "tarjeta");
  assert.ok(location.searchParams.get("scan_id"));
  assert.equal(db.statements.length, 2);
  assert.match(db.statements[0].sql, /INSERT INTO scans/);
  assert.match(db.statements[1].sql, /INSERT INTO events/);
});

test("the Worker does not capture unrelated site paths", async () => {
  const response = await worker.fetch(new Request("https://contacto.desechablesenvax.com/"), env(createDb()), context());
  assert.equal(response.status, 404);
});

test("the first-party event endpoint accepts an attributed contact event", async () => {
  const db = createDb();
  const ctx = context();
  const request = new Request("https://contacto.desechablesenvax.com/api/qr/event", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://contacto.desechablesenvax.com" },
    body: JSON.stringify({ scan_id: "scan-123", event_type: "whatsapp_click", metadata: { channel: "whatsapp", businessName: "must-not-be-stored" } })
  });
  const response = await worker.fetch(request, env(db), ctx);
  await Promise.all(ctx.pending);

  assert.equal(response.status, 202);
  const eventInsert = db.statements.at(-1);
  assert.match(eventInsert.sql, /INSERT INTO events/);
  const metadata = JSON.parse(eventInsert.values.at(-1));
  assert.deepEqual(metadata, { channel: "whatsapp" });
});

test("unknown event types and unknown scans are rejected", async () => {
  const invalid = await worker.fetch(new Request("https://contacto.desechablesenvax.com/api/qr/event", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ scan_id: "scan-123", event_type: "raw_ip" })
  }), env(createDb()), context());
  assert.equal(invalid.status, 400);

  const unknown = await worker.fetch(new Request("https://contacto.desechablesenvax.com/api/qr/event", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ scan_id: "missing", event_type: "page_view" })
  }), env(createDb({ knownScan: false })), context());
  assert.equal(unknown.status, 404);
});
