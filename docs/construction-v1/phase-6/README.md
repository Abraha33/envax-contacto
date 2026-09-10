# Phase 6 — Seller Browser Extension

## Objective
Reduce seller re-entry work while ERP/Wappsi integration remains unresolved, without turning the extension into an ERP scraper.

Planned branch: `build/seller-extension-v1`

Entry conditions:
- `COMMERCIAL MVP PASS`;
- 5–10 sanitized real copied-text examples from the ERP are available.

## In scope
- Chromium Manifest V3 shell;
- manual seller-selected text capture only;
- deterministic parser core with fixtures;
- request/customer matching;
- ambiguity/missing-field review fallback;
- validated solicitud → pedido conversion through ENVAX API;
- idempotency, authorization and audit;
- least-privilege extension permissions.

## Out of scope
- automatic full-page scraping;
- direct D1 writes;
- storing ERP secrets in extension;
- assuming undocumented ERP formats.

## Required outputs
A seller can intentionally select relevant ERP text, have ENVAX parse it, review ambiguous cases, and safely convert the matching solicitud to a pedido.

## Exit
Phase 6 ends at `SELLER BRIDGE PASS`.