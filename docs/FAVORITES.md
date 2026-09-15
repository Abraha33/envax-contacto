# ENVAX — Favorites Lists v1

## Purpose

Favorites let customers save products they commonly buy or may want to request later, grouped into reusable named lists.

Examples:
- `Halloween`
- `Cumpleaños`
- `Uso diario`

Favorites are not a cart and do not imply checkout, payment, totals, taxes, shipping calculation or automatic purchase.

## Anonymous behavior

A visitor may use temporary/local favorites before login if the frontend provides that convenience.

Rules:
- anonymous favorites live only in browser/device storage;
- ENVAX does not persist them as customer business data in PostgreSQL;
- they may be lost if browser/device storage is cleared or unavailable;
- anonymous local favorites do not create a customer identity or private access rights.

## Persistent favorites

Persistent named lists require an authenticated customer.

V1 uses Supabase Auth with email + password.

An authenticated customer can:
- create multiple lists;
- name and rename each list;
- add/remove concrete variants/presentations;
- reopen lists later;
- keep adding products;
- deactivate/delete a list without deleting commercial history;
- use a list as the starting point for a formal request.

## Ownership

Each persistent list belongs to exactly one customer account in V1.

Backend and PostgreSQL RLS must enforce ownership. A customer cannot read or modify another customer's lists even if they manipulate request IDs.

V1 does not include:
- collaborative editing;
- shared ownership;
- importing/copying lists received through WhatsApp;
- public share links.

Those capabilities may be evaluated later.

## List items

The preferred V1 item reference is a concrete `Variant/Presentation`.

A list item does not require:
- price;
- stock;
- quantity.

Quantity belongs to the formal request-preparation step rather than the favorites concept itself.

## Formal request

Authenticated flow:

`Favorites list → Prepare request → confirm quantities → Enviar pedido → Solicitud enviada → Seller`

Submitting a request does not destroy or freeze the list.

Important rule:
- the request receives its own historical snapshot;
- later edits to the list do not change an already-submitted request;
- deleting/deactivating a list does not delete previous requests or orders.

## Relation to My Orders

Persistent lists and `Mis pedidos` are authenticated capabilities inside the same ENVAX customer experience.

The customer does not need a separate ERP/accounting portal product.

## Commercial states

Favorites themselves do not carry commercial order status.

Commercial lifecycle belongs to the request/order domain:

`Solicitud enviada → En atención → Pedido confirmado → Facturado`

## Out of V1

- prices in favorites;
- stock guarantees;
- totals;
- cart semantics;
- checkout/payment;
- shared/collaborative lists;
- cross-account list transfer;
- automatic purchase.
