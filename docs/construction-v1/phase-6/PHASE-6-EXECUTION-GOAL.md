# Phase 6 — Execution Goal

## Mission
Implement the seller browser extension on `build/seller-extension-v1` using real sanitized ERP text fixtures.

## Required work
1. Collect/version the approved sanitized copied-text fixture set; never invent production formats.
2. Build a browser-neutral deterministic parser package with fixture tests.
3. Build a minimal Manifest V3 extension that reads only seller-selected/copied content after explicit user action.
4. Parse candidate customer/document/product/quantity/reference fields required by the approved workflow.
5. Match captured data to the correct ENVAX solicitud using explicit identifiers/controlled rules.
6. Route ambiguous/incomplete captures to review; do not write silently.
7. Send validated normalized data only through authenticated ENVAX API.
8. Convert solicitud → pedido idempotently and append audit/status history.
9. Use least-privilege extension permissions and no embedded ERP/API secrets.
10. Test retry, duplicate capture, wrong request, missing fields and unrelated selected text.

## Rules
- manual selection only;
- deterministic parsing first;
- no direct database access;
- no full-screen/background scraping;
- no sensitive fixture data committed without sanitization.

## Stop condition
Evaluate `SELLER BRIDGE PASS` and stop before Portal work.