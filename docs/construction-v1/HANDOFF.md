# ENVAX — Construction Handoff V1

## Repository

`Abraha33/envax-contacto`

## Product-definition branch

`docs/product-definition-v1`

## Construction-plan branch

`docs/official-construction-plan-v1`

This branch is based on the current product-definition branch so the construction documents inherit the latest canonical product decisions.

## Product in one sentence

ENVAX is one B2B catalog platform where a business can enter with minimal friction, explore a broad catalog, organize products into named favorites lists, send a pedido request, and continue with a human advisor; later the same customer experience can expose order history and promotions without becoming ecommerce.

## Core technical decisions

- TypeScript end-to-end.
- pnpm workspace monorepo.
- React + Vite customer/admin apps.
- Cloudflare Workers REST API.
- D1 operational database.
- R2 product/media assets.
- Queues only for async/retry work.
- Turnstile selectively for public abuse protection.
- Cloudflare Access preferred for initial admin perimeter.
- seller browser extension is temporary ERP bridge.
- Wappsi direct integration remains disabled/pending validation.

## Construction order

1. Foundation
2. Catalog data/import
3. Customer catalog UI after relevant visual Design Ready
4. Anonymous identity + named favorites
5. Pedido request + advisor = commercial MVP
6. Seller extension
7. Customer portal/order history
8. Admin + promotions
9. Hardening/pilot/production

ERP validation runs independently in parallel.

## First code goal

Use `docs/construction-v1/BUILD-START-GOAL.md`.

After documentation is approved/merged, create:

`build/foundation-v1`

and implement Phase 1 only.

## Important product rules

- no cart/checkout/payment;
- no public ecommerce behavior;
- favorites are multiple named lists;
- CTA can say `Enviar pedido`;
- internal first record is `solicitud`;
- extension/validated seller flow converts solicitud → pedido;
- customer status mapping: Solicitud enviada → En atención → Pedido confirmado → Completado;
- assignment is decided by system;
- portal initial core value is order visibility;
- promotions target a specific customer or business type;
- product public-field/photo policy is still configurable/pending final UX/content decision;
- do not identify customers by IP;
- anonymous mode asks only business name/type initially;
- cross-device anonymous recovery uses a generated non-personal recovery credential;
- verified portal later links contact data to the prior anonymous identity.

## Deployment rule

Landing, customer app, admin, API, seller extension and QR Worker remain independently deployable. A change in one component must not require publishing the others.

Do not destructively move the currently deployed landing/QR files until staging parity and rollback are demonstrated.

## External blockers that do NOT block foundation/core build

- Wappsi API uncertainty;
- invoice/order endpoint uncertainty;
- production ERP credentials;
- WhatsApp server API availability;
- final promotion delivery provider;
- final public product-field visibility.

Use adapters/configuration and keep these capabilities disabled or fallback-based until real evidence exists.

## Current recommended next action

Review this construction plan. If approved, merge product-definition documentation first (or keep branch ancestry intact), then merge/retarget the construction PR as appropriate and start `build/foundation-v1` using the Build Start Goal.
