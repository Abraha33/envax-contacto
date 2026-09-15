# ENVAX — ERP / Seller Extension Track V1

## 1. Status

All direct Wappsi/ERP integration remains **PENDING REAL VALIDATION**.

Core ENVAX construction proceeds without assuming we can read/write products, customers, orders, invoices, prices or stock through Wappsi.

Existing ERP documentation is reference material, not production proof.

## 2. Boundary

ERP validation is a parallel track, not a dependency of the core catalog/commercial MVP.

Core ENVAX must work as:

`Customer → formal solicitud → single seller → confirmed pedido → external process → seller confirms FACTURADO`

## 3. Extension role

Until direct ERP integration is validated, the browser extension may reduce repeated manual work.

Rules:
- one V1 seller; no assignment engine;
- explicit seller action;
- no silent whole-page scraping;
- deterministic parsing/normalization first;
- ambiguous/incomplete extraction stops for human review;
- writes only through authenticated ENVAX API;
- no service-role or permanent ERP secrets in bundle.

## 4. Required real data before parser logic

Collect at least 5–10 sanitized real copied-text/context examples from the actual seller workflow.

Cover, where relevant:
- external customer/business identifier;
- external order/document view;
- product references/SKUs;
- quantities;
- external document identifier;
- external success/status evidence.

Do not invent ERP text formats.

Prices may appear in external examples but are not part of the ENVAX V1 catalog/price domain and should not be persisted without a future explicit decision.

## 5. Parser architecture

Keep parser logic pure and testable separately from browser APIs:

```text
extensions/seller/
├── src/browser/
├── src/ui/
└── parser/
    ├── parseSelection.ts
    ├── schemas.ts
    └── fixtures/
```

Parser output:
- extracted candidate fields;
- validation/confidence result;
- missing fields;
- ambiguity list.

Do not introduce LLM parsing until real evidence shows deterministic parsing is insufficient and privacy/security review approves any external processing.

## 6. Server authority

The extension does not directly decide business state.

Server validates:
- seller/admin authenticated role;
- target ENVAX request/order exists;
- current state is valid;
- matching/context is unambiguous;
- idempotency key is safe;
- no conflicting order/state already exists.

## 7. Request → order

When the seller confirms a request as an order, ENVAX server atomically:
1. validates request/current state;
2. creates exactly one order;
3. copies historical order-item snapshots;
4. updates request state;
5. records audit evidence.

Retry cannot create a second order.

## 8. External invoicing / FACTURADO

ENVAX does not create electronic invoices.

After the seller completes external invoicing/formalization, the seller explicitly confirms success in ENVAX.

Only then may server transition the order to `INVOICED/FACTURADO` and write audit evidence.

An external screen, copied identifier or parser success alone is insufficient.

## 9. Authentication

Preferred V1:
- seller signs in through Supabase Auth;
- extension uses seller-authenticated ENVAX API context;
- no permanent API keys;
- server enforces seller role;
- service-role credentials remain server-only.

## 10. ERP validation stages

Track separately:

`ERP UNKNOWN → AUTH VALIDATED → READ VALIDATED → WRITE VALIDATED → SECURITY/RELIABILITY VALIDATED → ADAPTER READY`

Only capabilities proven against the real environment advance.

## 11. Future direct ERP adapter

If validated:

`ENVAX domain → ErpGateway adapter → Wappsi/ERP`

No Wappsi-specific DTOs should leak across the whole core domain.

## 12. Safety rules

- no real ERP credentials/data in public Git;
- no raw clipboard text stored by default;
- no price/stock assumptions added to V1;
- no invoice files/entities added to ENVAX;
- external failure cannot mark commercial success;
- extension can be disabled without breaking catalog, lists, requests or order history.
