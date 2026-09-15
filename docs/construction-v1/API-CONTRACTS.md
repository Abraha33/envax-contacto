# ENVAX — API Contracts V1

## Authority

Canonical endpoint design lives in:

`docs/API-DESIGN-V1.md`

This file is the construction summary used by coding agents. If details differ, `API-DESIGN-V1.md` wins.

## Style

- REST + JSON;
- version prefix `/api/v1`;
- Supabase Auth JWT/session for protected routes;
- role/ownership checked server-side;
- stable error codes;
- idempotent commercial writes;
- no Wappsi-specific payloads in customer contracts.

## Authentication contexts

### Public visitor
Can read approved catalog/search data only.

No persisted anonymous business account is created.

### Customer
Supabase Auth email + password.

Customer routes derive customer identity from the authenticated session; never trust a client-supplied owner ID.

### Seller
Supabase authenticated internal user with `SELLER` role.

V1 has one seller. No seller assignment API exists.

### Admin
Supabase authenticated internal user with `ADMIN` role and full V1 administrative/operational authority.

## Public catalog

Baseline routes:
- `GET /api/v1/categories`
- `GET /api/v1/categories/{id}`
- `GET /api/v1/brands`
- `GET /api/v1/products`
- `GET /api/v1/products/{id}`
- `GET /api/v1/search`

Public product output may include approved name, brand, reference, variant/presentation, short description, useful attributes and public media.

Never return V1 price or stock.

## Customer/profile

- `GET /api/v1/me`
- `GET /api/v1/me/profile`
- `PATCH /api/v1/me/profile`

Minimal commercial profile:
- business name;
- contact name;
- email;
- business type/segment.

## Persistent lists

Authenticated customer only:
- `GET /api/v1/lists`
- `POST /api/v1/lists`
- `GET /api/v1/lists/{id}`
- `PATCH /api/v1/lists/{id}`
- `DELETE /api/v1/lists/{id}` with safe soft-delete/deactivation semantics
- `POST /api/v1/lists/{id}/items`
- `DELETE /api/v1/lists/{id}/items/{itemId}`

Items reference concrete variants/presentations.

## Formal requests

Authenticated customer:
- `GET /api/v1/requests`
- `GET /api/v1/requests/{id}`
- `POST /api/v1/requests`

`POST /requests` requires an `Idempotency-Key` and receives confirmed variants + quantities.

Server:
- verifies ownership/auth;
- validates active catalog items;
- creates historical snapshots;
- creates request in `SENT`/`ENVIADA` state;
- returns the same logical result for safe retry of the same idempotent request.

Customer does not receive generic commercial-state mutation endpoints.

## Customer orders

Read-only customer routes:
- `GET /api/v1/orders`
- `GET /api/v1/orders/{id}`

Only resources owned by the authenticated customer are returned.

## Promotions

Authenticated customer:
- `GET /api/v1/promotions`
- `GET /api/v1/promotions/{id}`

Server returns only eligible promotions.

No checkout/automatic discount calculation.

## Seller API

Read:
- `GET /api/v1/seller/requests`
- `GET /api/v1/seller/requests/{id}`
- `GET /api/v1/seller/orders`
- `GET /api/v1/seller/orders/{id}`

Explicit commands:
- `POST /api/v1/seller/requests/{id}/start-attention`
- `POST /api/v1/seller/requests/{id}/confirm-order`
- `POST /api/v1/seller/requests/{id}/cancel`
- `POST /api/v1/seller/orders/{id}/cancel`
- `POST /api/v1/seller/orders/{id}/mark-invoiced`

Do not expose `PATCH status=<arbitrary>`.

Every command validates role/current state, is audited and is idempotent where retry could duplicate effects.

## Extension API

The extension uses seller/admin authentication.

Baseline context endpoint:
- `GET /api/v1/seller/orders/{id}/extension-context`

Any later ingestion/write endpoint must validate deterministic matching and never accept ambiguous parser output silently.

No service-role/ERP secret is returned to the extension.

## Admin API

Prefix:

`/api/v1/admin/...`

Covers:
- catalog/variants/categories/brands/attributes/media;
- promotions/targeting;
- customers;
- internal member/seller management;
- request/order supervision;
- configuration;
- audit/analytics administration.

Admin state-changing actions remain auditable.

## Analytics ingestion

Conceptual endpoint:
- `POST /api/v1/analytics/events`

May accept small batches.

Never accept/store passwords, credentials, private-message contents or unrestricted arbitrary sensitive payloads.

## Errors

Baseline HTTP semantics:
- `400` invalid request;
- `401` unauthenticated;
- `403` forbidden;
- `404` missing/not accessible;
- `409` state/idempotency conflict;
- `422` business rule violation when useful;
- `429` rate limited;
- `500` internal error.

Stable error envelope:

```json
{
  "error": {
    "code": "REQUEST_INVALID_STATE",
    "message": "La operación no es válida para el estado actual.",
    "requestId": "req_..."
  }
}
```

Never expose stack traces, SQL, provider secrets or raw ERP payloads.

## Required contract tests

Every endpoint requires as applicable:
- schema validation;
- auth/role test;
- ownership/RLS test;
- invalid input test;
- stable error-code test;
- state-transition test;
- idempotency test for commercial writes;
- database integration test;
- browser E2E for customer-visible flows.

## Explicitly removed legacy contracts

Do not implement V1 endpoints for:
- persisted anonymous account creation/recovery;
- anonymous cross-device recovery credentials;
- seller assignment;
- prices/stock;
- invoice files/electronic invoicing;
- arbitrary status mutation;
- pre-ENVAX historical-order import.
