# ENVAX — Product Vision v1

Status: canonical product definition. Branch: `docs/product-definition-v1`.

## Product definition

ENVAX is a B2B digital catalog for a general distributor, not an ecommerce store. Its purpose is to make the breadth of ENVAX's portfolio immediately visible, help businesses discover relevant products, save recurring interests in named lists, and convert that interest into a human-assisted commercial flow.

Core promise:

`discover → explore → save → send request → seller → order`

## Experience principles

- Extremely simple for the customer even if the backend is sophisticated.
- Catalog exploration is public and does not require login.
- ENVAX must communicate variety, clarity, confidence and quality.
- No public cart, checkout, online payment, marketplace, tax engine or automatic purchase.
- Prices and stock are not part of V1.
- ENVAX branding has priority; partner brands are secondary.
- Dense product grids are acceptable when they improve perceived breadth without hurting recognition.
- Do not collect business/customer data before it is needed.

## Public journey

A visitor may arrive from QR, web, social, WhatsApp, search or a direct link and immediately browse the catalog.

Public capabilities include:
- catalog cover/index;
- category and brand exploration;
- products and variants/presentations;
- search and filters;
- approved public attributes;
- public product photography/media;
- direct WhatsApp/email contact with the seller.

Anonymous visitors do not have business data persisted in ENVAX.

Optional favorites may exist only in local browser/device storage before login. This local state is convenience data and may be lost.

## Customer identity

Persistent business capabilities require an identified customer.

V1 uses Supabase Auth with:
- email as login identifier;
- password;
- standard Supabase session handling.

MFA/2FA may be added later but is not required for V1.

After login, the customer can use private capabilities inside the same ENVAX experience rather than entering a separate ecommerce product.

## Commercial profile

V1 keeps profile data minimal:
- business name;
- contact/person name;
- email;
- business type/segment.

Do not collect extra business information without a demonstrated need.

## Favorites lists

Persistent favorites are multiple named lists owned by an authenticated customer.

Examples:
- `Halloween`
- `Cumpleaños`
- `Uso diario`

A customer can create multiple lists, name/rename them, add/remove concrete variants/presentations, reopen them later and use them as the basis for a formal request.

Favorites are not a cart and do not imply totals, prices, taxes, checkout or payment.

V1 does not include collaborative/shared editing or importing lists received through WhatsApp.

## Request and order flow

A formal `solicitud` requires an authenticated customer.

Direct WhatsApp/email contact is also valid but does not automatically create a formal ENVAX request.

Structured path:

`Catalog → List/selection → Solicitud → Seller → Pedido`

Customer-facing commercial lifecycle:

`Solicitud enviada → En atención → Pedido confirmado → Facturado`

`FACTURADO` means only that the seller confirms the external invoicing/sale-formalization process succeeded outside ENVAX.

ENVAX does not create, edit, store, display, validate or transmit electronic invoices.

A request and its items preserve historical snapshots so later catalog/list changes do not rewrite commercial history.

## Customer private capabilities

Authenticated customers can access approved private functionality inside ENVAX, including:
- persistent lists;
- eligible promotions;
- their own formal requests;
- `Mis pedidos`;
- order detail/status.

Historical orders that predate ENVAX account relationships are outside the initial V1.

Do not add invoices, accounting, private prices, payments or checkout without explicit approval.

## Seller operations

V1 has exactly one seller. `Asesor` is a customer-facing synonym; the technical role is `seller` / `vendedor`.

Every formal request/order goes to that seller. V1 has no assignment, territory, queue or load-balancing engine.

Seller can:
- view required customer/commercial context;
- move a request to `EN_ATENCION`;
- confirm a request as an order;
- cancel requests/orders;
- use the supported browser-extension workflow;
- confirm `FACTURADO` after the external process actually succeeds;
- view commercial history needed for the job.

Seller cannot administer catalog, users/roles, promotions, system configuration or administrative analytics, and cannot erase commercial/audit history.

## Administrator

The administrator has full administrative and operational authority over ENVAX V1.

Sensitive actions remain auditable, and commercial/audit history is not silently hard-deleted as a normal operation.

## Public catalog information

V1 public catalog baseline includes:
- product name;
- brand;
- reference;
- variant/presentation;
- short description;
- useful approved public attributes;
- public product photography/media.

Explicitly outside V1 public output:
- price;
- stock/guaranteed availability.

## Promotions

Promotions are private to authenticated/identified customers.

Admin can target:
- a specific customer;
- a business type/segment;
- related products/variants as needed.

Promotions support commercial intent and handoff to WhatsApp/email; they do not become checkout or an automatic discount engine.

## Analytics

ENVAX measures the whole journey, including acquisition, QR/campaign source, navigation, search/filter use, product interactions, lists, WhatsApp/email clicks, formal requests, orders, device context, performance and errors.

Analytics does not replace business entities and must not capture passwords, credentials, private messages or unnecessary sensitive information.

Detailed event retention baseline is 12 months, subject to the final legal/privacy configuration before production.

## ERP integration status

All Wappsi/ERP API capabilities remain **PENDING REAL VALIDATION**.

Core ENVAX must work without Wappsi. Future integration, if validated, must sit behind an adapter and must not expose ERP secrets to browser code or the extension.

## Primary conversion

The main success event is a visitor/customer progressing from catalog discovery to a meaningful commercial request and, when processed by the seller, to a confirmed order.

## Future scope

Potential later capabilities include:
- price visibility/rules after explicit product approval;
- stock/availability after a trustworthy source exists;
- stronger authentication/MFA;
- direct ERP order integration;
- PWA/browser notifications;
- sharing/copying lists;
- richer customer capabilities after evidence from V1.

None of these should turn ENVAX into public ecommerce or delay the core catalog/commercial flow.
