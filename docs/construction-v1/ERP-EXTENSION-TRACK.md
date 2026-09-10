# ENVAX — ERP / Seller Extension Track V1

## 1. Status

All direct Wappsi/ERP integration remains **PENDING REAL VALIDATION**.

ENVAX construction must proceed without assuming that we can reliably:
- read products/prices;
- identify customers;
- read full invoices;
- create orders;
- read order status;
- use production credentials/URLs.

Existing API documentation is useful reference, not production proof.

## 2. Temporary operating bridge

Until ERP integration is validated, the seller browser extension is the preferred bridge for reducing duplicate manual entry.

Core rule: **manual text selection only**.

The extension must not scrape the entire ERP screen automatically.

## 3. Seller flow

```text
Seller opens relevant ERP document
→ manually selects relevant text
→ opens ENVAX extension
→ Capturar selección
→ deterministic parser extracts candidate fields
→ exact ENVAX solicitud match
→ if complete/unambiguous: automatic validated conversion
→ if ambiguous: show review/correction, no silent write
→ API creates/links pedido
→ solicitud becomes converted
→ customer sees Pedido confirmado
```

The phrase “automatic” means the seller does not have to update ENVAX separately after a valid capture. It does **not** mean the extension may write ambiguous data without validation.

## 4. Required real data before parser implementation

Collect at least 5–10 sanitized real copied-text samples from Wappsi covering as many as possible:
- customer/business block;
- quotation or pedido view;
- product lines;
- quantity;
- reference/SKU;
- price if visible/needed;
- document identifier;
- status/date if relevant.

Do not invent the ERP text format in code.

Store fixtures with fake/sanitized business/customer values if the repository is public.

## 5. Parser architecture

Keep parsing in a pure package independent from Chrome APIs:

```text
extensions/seller/
├── src/browser/
├── src/ui/
└── parser/
    ├── parseSelection.ts
    ├── schemas.ts
    └── fixtures/
```

Parser returns:
- extracted fields;
- confidence/validation result;
- missing required fields;
- ambiguity list.

Use deterministic patterns first. Do not introduce an LLM parser until real samples prove deterministic parsing insufficient and a privacy/security review approves external processing.

## 6. Minimum normalized payload

Candidate payload:
- ENVAX solicitud reference;
- ERP document type;
- ERP document ID;
- customer/business reference if available;
- line references/SKUs;
- quantities;
- authoritative price fields only if actually present and needed;
- raw selected text hash;
- extension version.

Do not store raw clipboard text by default.

## 7. Server conversion rules

The API accepts conversion only when:
- seller is authenticated;
- solicitud exists;
- seller is allowed to act on it;
- request has convertible state;
- required ERP fields validate;
- idempotency key is new or maps to the same conversion;
- no conflicting order already exists.

On success:
1. create `extension_ingestion`;
2. create/link exactly one `order`;
3. snapshot required order information;
4. mark solicitud `converted`;
5. emit status/audit event;
6. return confirmed order reference.

## 8. Authentication

Do not embed a permanent API key.

Preferred V1:
- seller signs in to ENVAX internal environment;
- extension uses a short-lived pairing/session token;
- token scopes only seller ingestion endpoints;
- server can revoke seller session.

## 9. Google Sheet

Google Sheet is optional interim operations support, not source of truth.

If retained:
- ENVAX D1 remains authority;
- Sheet is projection/export or operational convenience;
- failures writing Sheet do not roll back a valid ENVAX request/order;
- never use Sheet as the only copy of order status.

## 10. Direct ERP adapter later

Define `ErpGateway` interface so extension can eventually be bypassed.

Example conceptual methods:
- `findCustomer(...)`
- `getProducts(...)`
- `getCustomerInvoices(...)`
- `createOrder(...)`
- `getOrderStatus(...)`

Keep the active implementation as `DisabledErpGateway`/mock until real validation passes.

When Wappsi is proven:
- build adapter in server only;
- test in isolated environment;
- compare adapter result with seller workflow;
- roll out gradually;
- keep extension fallback during transition.

## 11. ERP validation gates

### `ERP READ VALIDATED`
Real environment and credentials can retrieve required data reliably.

### `ERP CUSTOMER/INVOICE VALIDATED`
Can identify a customer and retrieve invoice details required by product.

### `ERP ORDER WRITE VALIDATED`
Can create a test order safely and retrieve resulting identifier/status.

### `ERP RELIABILITY VALIDATED`
Error handling, rate limits, authentication, retries, duplicate protection and production permissions are known.

### `ERP ADAPTER READY`
Only after all required gates pass is direct integration allowed into production request/order flow.

## 12. Non-negotiable safety

- no ERP secret in frontend/extension;
- no full-screen silent scraping;
- no invented parser format;
- ambiguous input does not write;
- conversion is idempotent;
- every conversion auditable;
- Wappsi failure can never make core catalog/favorites unavailable.
