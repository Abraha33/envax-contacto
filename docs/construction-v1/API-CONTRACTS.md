# ENVAX — API Contracts V1

## 1. Style

Use a versioned REST API under `/api/v1`.

Goals:
- stable contracts independent of UI implementation;
- shared runtime validation;
- explicit authorization;
- idempotent commercial writes;
- no Wappsi-specific payloads in customer-facing contracts.

## 2. Common response conventions

Success returns JSON with domain data.

Errors use a stable envelope:

```json
{
  "error": {
    "code": "FAVORITE_LIST_NOT_FOUND",
    "message": "No se encontró la lista.",
    "requestId": "req_..."
  }
}
```

Do not expose stack traces, SQL, secrets, provider payloads, or raw ERP text.

## 3. Authentication contexts

### Anonymous/customer browser
Use server-created session cookie:
- Secure;
- HttpOnly;
- SameSite=Lax baseline;
- rotated/revocable;
- no token in localStorage for primary auth.

### Admin
Prefer Cloudflare Access at edge for the first internal admin environment, then map verified identity to application roles where needed.

### Seller extension
Use a short-lived seller token/pairing flow issued by ENVAX. Do not embed permanent API keys in the extension package.

## 4. Entry / identity

`POST /api/v1/anonymous-accounts`

Request:
```json
{
  "businessName": "Panadería Ejemplo",
  "businessTypeId": "bt_panaderia"
}
```

Creates anonymous account + session. Response may include a prompt/state indicating that an anonymous recovery credential can be generated.

`POST /api/v1/anonymous-accounts/recovery-credential`
- authenticated anonymous session required;
- generate/rotate recovery credential;
- return secret once;
- store only hash server-side.

`POST /api/v1/anonymous-accounts/recover`
- accepts recovery credential;
- rate-limited/abuse-protected;
- creates a new session for the same anonymous account.

`POST /api/v1/portal/upgrade`
- later phase;
- begins contact verification/linking to verified customer.

## 5. Business types

`GET /api/v1/business-types`

Public/entry-safe list of active business types.

## 6. Catalog read API

`GET /api/v1/catalog/home`

`GET /api/v1/categories`

`GET /api/v1/categories/:slug`

`GET /api/v1/brands`

`GET /api/v1/brands/:slug`

`GET /api/v1/families/:slug`

`GET /api/v1/products`

Supported query parameters baseline:
- `category`
- `family`
- `brand`
- `q`
- `cursor`
- `limit`

`GET /api/v1/products/:idOrSlug`

Response fields must pass through a product-visibility policy so fields/assets not approved for public/anonymous visibility are omitted.

Do not expose raw D1 rows directly.

## 7. Favorites

`GET /api/v1/favorite-lists`

`POST /api/v1/favorite-lists`
```json
{ "name": "Halloween" }
```

`PATCH /api/v1/favorite-lists/:id`
```json
{ "name": "Halloween 2026" }
```

`DELETE /api/v1/favorite-lists/:id`

`POST /api/v1/favorite-lists/:id/items`
```json
{
  "productId": "prod_...",
  "variantId": null
}
```

`DELETE /api/v1/favorite-lists/:id/items/:itemId`

`POST /api/v1/favorite-lists/:id/items/:itemId/move`
```json
{ "targetListId": "fav_..." }
```

Ownership is always derived from session, never accepted from client as trusted owner ID.

## 8. Pedido request

`POST /api/v1/order-requests`

Header:
`Idempotency-Key: <random client-generated UUID>`

Request:
```json
{
  "favoriteListId": "fav_...",
  "items": [
    {
      "productId": "prod_...",
      "variantId": null,
      "quantityRequested": null
    }
  ],
  "note": "Opcional"
}
```

Rules:
- server validates ownership/visibility;
- server snapshots line data;
- server chooses seller assignment;
- same idempotency key + same owner returns same request;
- same key with conflicting payload returns deterministic conflict error.

Response:
```json
{
  "id": "or_...",
  "reference": "ENV-...",
  "status": "submitted",
  "customerStatus": "Solicitud enviada"
}
```

`GET /api/v1/order-requests/:id`

`GET /api/v1/my-orders`
- portal phase; returns customer-facing view derived from request/order relationship.

## 9. Commercial handoff

`POST /api/v1/order-requests/:id/handoffs`

Request:
```json
{ "channel": "whatsapp" }
```

Possible behavior:
- WhatsApp without official API: server returns a generated click-to-chat URL/message payload; browser opens it and customer explicitly sends.
- Email: provider adapter or mailto fallback, depending configured environment.

Do not claim server-sent WhatsApp automation until a real official provider is configured.

## 10. Seller extension

`POST /api/v1/seller/ingestions`

Requires seller auth and idempotency key.

Request normalized by extension:
```json
{
  "orderRequestReference": "ENV-...",
  "sourceDocumentType": "erp_order",
  "sourceDocumentId": "...",
  "lines": [
    {
      "reference": "...",
      "quantity": 10,
      "unitPrice": null
    }
  ],
  "rawSelectionHash": "sha256:..."
}
```

Server responsibilities:
- exact request match;
- seller authorization;
- validate required fields;
- check current request state;
- idempotent conversion;
- create/link `order`;
- audit transition;
- never accept a client-supplied status transition without server rules.

Ambiguous parser output must not call this endpoint in automatic mode until the seller resolves ambiguity.

## 11. Portal

Later phase endpoints:
- `POST /api/v1/portal/verification/start`
- `POST /api/v1/portal/verification/confirm`
- `GET /api/v1/portal/orders`
- `GET /api/v1/portal/orders/:id`
- `POST /api/v1/portal/logout`

Exact WhatsApp/email verification provider remains adapter-dependent.

## 12. Admin

`GET /api/v1/admin/order-requests`

`GET /api/v1/admin/orders`

`GET /api/v1/admin/customers`

`POST /api/v1/admin/promotions`

`PATCH /api/v1/admin/promotions/:id`

`POST /api/v1/admin/promotions/:id/targets`

`POST /api/v1/admin/promotions/:id/activate`

Admin actions require role checks and audit events.

## 13. Customer promotions

`GET /api/v1/promotions`
- only eligible active promotions for current owner/customer.

`POST /api/v1/promotion-interests`

Request:
```json
{
  "promotionIds": ["promo_1", "promo_2"]
}
```

Then customer may create a commercial handoff through WhatsApp/email.

## 14. Pagination

Use cursor pagination for product/admin lists expected to grow. Do not expose raw database offsets as a long-term public contract unless a simple list is guaranteed small.

## 15. Concurrency and optimistic checks

State-changing endpoints validate expected current state. Extension conversion and admin state changes must fail safely when another actor already changed the record.

Where useful, include `updatedAt`/version fields and reject stale writes.

## 16. Rate limits / abuse

Apply server-side limits to:
- anonymous account creation;
- recovery attempts;
- order-request submission;
- verification attempts;
- public search if abused.

Turnstile may be required dynamically for suspicious/high-volume flows rather than shown on every normal visit.

## 17. Contract testing

Every endpoint added to V1 requires:
- schema test;
- auth/ownership test;
- invalid-input test;
- stable error-code test;
- idempotency test for commercial writes;
- database integration test;
- browser E2E where user-facing.
