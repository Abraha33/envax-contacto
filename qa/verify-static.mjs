import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const index = await readFile(new URL("../index.html", import.meta.url), "utf8");
const worker = await readFile(new URL("../qr-worker/src/index.js", import.meta.url), "utf8");

assert.ok(!index.includes("html,body{overflow:hidden}"), "desktop must not hide document overflow globally");
assert.ok(index.includes("firstVisitAutoOpen: false"), "mobile demo must be explicit by default");
assert.ok(index.includes("analyticsEndpoint: '/api/qr/event'"), "first-party analytics endpoint missing");
assert.ok(index.includes("sessionStorage.setItem(CONFIG.scanStorageKey"), "scan_id session continuity missing");
assert.ok(index.includes("trackEvent('page_view')"), "page_view instrumentation missing");
assert.ok(index.includes("trackEvent('form_start')"), "form_start instrumentation missing");
assert.ok(index.includes("trackEvent('form_submit'"), "form_submit instrumentation missing");
assert.ok(index.includes("trackEvent('whatsapp_click'"), "whatsapp_click instrumentation missing");
assert.ok(index.includes("trackEvent('email_click'"), "email_click instrumentation missing");
assert.ok(index.includes("trackEvent('catalog_click'"), "catalog_click instrumentation missing");
assert.ok(index.includes('a[href^="tel:"]'), "phone click instrumentation missing");
assert.ok(index.includes("navigator.sendBeacon"), "beacon delivery fallback missing");
assert.ok(index.includes("keepalive:true"), "keepalive fallback missing");
assert.ok(index.includes("@media (prefers-reduced-motion:reduce)"), "reduced-motion CSS missing");
assert.ok(index.includes('id="demoFrame"') && index.includes('tabindex="-1"'), "modal demo must stay outside the tab sequence");
assert.ok(index.includes("e.key === 'Tab' && overlay.classList.contains('open')"), "modal focus trap missing");
assert.ok(worker.includes('url.pathname === "/api/qr/event"'), "Worker API route missing");
assert.ok(worker.includes("isTarjetaPath(url.pathname)"), "permanent QR path guard missing");
assert.ok(!worker.includes("user_agent"), "raw user-agent storage must not be reintroduced");
assert.ok(!worker.includes("ip_address") && !worker.includes("raw_ip"), "raw IP persistence must not be introduced");

console.log("Static contact/QR assertions passed.");
