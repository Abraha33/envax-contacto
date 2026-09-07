import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const index = await readFile(new URL("../index.html", import.meta.url), "utf8");
const worker = await readFile(new URL("../qr-worker/src/index.js", import.meta.url), "utf8");

assert.ok(!index.includes("html,body{overflow:hidden}"), "desktop must not hide document overflow globally");
assert.ok(index.includes("firstVisitAutoOpen: false"), "mobile demo must be explicit by default");
assert.ok(index.includes("analyticsEndpoint: '/api/qr/event'"), "first-party analytics endpoint missing");
assert.ok(index.includes("sessionStorage.setItem(CONFIG.scanStorageKey"), "scan_id session continuity missing");
assert.ok(index.includes("trackEvent('page_view')"), "page_view instrumentation missing");
assert.ok(worker.includes('url.pathname === "/api/qr/event"'), "Worker API route missing");
assert.ok(worker.includes("isTarjetaPath(url.pathname)"), "permanent QR path guard missing");
assert.ok(!worker.includes("user_agent"), "raw user-agent storage must not be reintroduced");

console.log("Static contact/QR assertions passed.");
