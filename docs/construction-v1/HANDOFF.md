# ENVAX — Construction Handoff V1

## Repository

`Abraha33/envax-contacto`

## Canonical documentation branch

`docs/product-definition-v1`

## Product in one sentence

ENVAX is one B2B catalog platform where anyone can browse the public catalog, identified customers can persist named lists and send formal commercial requests, one seller processes those requests into orders, and customers can see their own order status without ENVAX becoming ecommerce or an ERP.

## Current technical decisions

- TypeScript end-to-end.
- pnpm workspace monorepo.
- React + Vite customer/admin apps.
- Supabase Auth: email + password.
- Supabase PostgreSQL: operational source of truth.
- PostgreSQL RLS: private-data isolation.
- Supabase Storage: public catalog photos/media.
- Supabase Edge Functions: REST API `/api/v1`.
- modular monolith.
- versioned SQL migrations.
- seller browser extension as operational bridge while ERP remains unverified.
- existing landing/QR infrastructure preserved until dedicated migration parity/rollback.

## Product rules

- public catalog needs no login;
- anonymous business data is not persisted;
- anonymous favorites, if offered, are local only;
- persistent lists/formal requests/orders require authentication;
- no public cart/checkout/payment;
- no V1 price or stock engine;
- one seller only; no assignment/routing;
- admin has full V1 authority;
- seller only controls approved commercial operations;
- flow: `Solicitud enviada → En atención → Pedido confirmado → Facturado`;
- `FACTURADO` confirms external invoicing, not an ENVAX invoice;
- no invoice entity/files inside ENVAX;
- product photography/media is public;
- Wappsi is pending real validation and non-blocking.

## Construction order

1. Foundation
2. Identity/roles/PostgreSQL/RLS
3. Catalog data/API
4. Customer catalog UI
5. Auth + persistent lists
6. Formal request + seller commercial MVP
7. Pedido lifecycle + seller extension + `FACTURADO`
8. Admin + promotions
9. Analytics/security hardening
10. Production readiness

ERP validation runs independently in parallel.

## First code goal

Use:

`docs/construction-v1/BUILD-START-GOAL.md`

Create implementation branch:

`build/foundation-v1`

and implement Foundation only.

## Foundation non-goals

Do not implement in Foundation:
- complete catalog/domain schema;
- final UI;
- persistent lists;
- solicitudes/pedidos;
- ERP calls;
- extension parser;
- price/stock;
- invoice entities;
- anonymous persisted accounts;
- seller routing;
- production DNS/backend switch.

## Deployment rule

Landing, customer app, admin, Supabase backend, extension and QR Worker remain independently manageable/deployable where practical.

Do not destructively change the current production landing/QR until staging parity and rollback are proven.

## External unknowns that do NOT block Foundation

- Wappsi API uncertainty;
- ERP credentials;
- direct ERP write capability;
- transactional email provider;
- WhatsApp server API;
- final analytics vendor.

## Current recommended next action

Canonical documentation is now the prerequisite. Once Phase 0 `BUILD PLAN READY` is verified, branch from that exact documentation commit into `build/foundation-v1` and execute Foundation with CI evidence.
