# CLAUDE.md

## Read first

Before proposing product or implementation changes, read in this order:

1. `docs/ARCHITECTURE-DECISIONS.md`
2. `docs/PRODUCT-VISION.md`
3. `docs/USER-FLOW.md`
4. `docs/FAVORITES.md`
5. `docs/BACKEND-FRONTEND-CONTRACT-V1.md`
6. `docs/API-DESIGN-V1.md`
7. `docs/DATABASE-DESIGN-V1.md`
8. `docs/BACKEND-ARCHITECTURE-V1.md`
9. `docs/INTEGRATIONS-V1.md`
10. `docs/SECURITY-PRIVACY-V1.md`
11. `docs/SELLER-EXTENSION.md`
12. `docs/ERP-INTEGRATION-PENDING.md`
13. `docs/construction-v1/README.md`
14. `docs/construction-v1/OFFICIAL-CONSTRUCTION-PLAN.md`
15. `docs/construction-v1/PHASES-AND-GATES.md`
16. `docs/construction-v1/BUILD-START-GOAL.md`

If an older construction document conflicts with the first ten documents above, the newer canonical decisions above win and the conflicting construction document must be corrected before implementation.

## Canonical product rules

- ENVAX is one B2B digital catalog platform for a general distributor, not ecommerce.
- No public cart, checkout, online payment, marketplace behavior, price engine or stock engine in V1.
- Public catalog can be browsed without login.
- Anonymous visitors do not persist business data in the ENVAX database.
- Optional anonymous favorites may exist only in local browser/device storage and may be lost.
- Persistent named favorites lists, formal solicitudes, pedidos, private promotions and private customer data require login.
- V1 authentication is Supabase Auth with email + password.
- MFA/2FA is future optional reinforcement, not a launch requirement.
- Favorites are multiple named lists and are not a cart.
- Customer CTA may say `Enviar pedido`; internally that creates a `solicitud` first.
- Formal flow: `Solicitud enviada → En atención → Pedido confirmado → Facturado`.
- `FACTURADO` means the seller confirmed invoicing happened outside ENVAX. ENVAX does not create, store, show or manage electronic invoices.
- V1 has exactly one seller. No seller-assignment/routing engine is required.
- The seller controls the commercial workflow only.
- The administrator has full V1 administrative/operational authority, while commercial/audit history is not silently hard-deleted as a normal action.
- Public catalog media/photos are allowed in V1.
- Public catalog fields include at least name, brand, reference, presentation/variant, short description, approved useful attributes and public media.
- Prices and stock are outside V1.
- Wappsi/ERP remains pending real validation and must never block core ENVAX.
- The customer experience remains one integrated product; private capabilities appear after authentication rather than becoming a separate ecommerce/ERP product.

## Seller extension rules

- Seller/advisor are the same role; technical term is `seller` / `vendedor`.
- Use explicit seller action and only the commercial context needed.
- Collect real sanitized ERP examples before implementing parser assumptions.
- Deterministic parsing first.
- Ambiguous/incomplete extraction must stop for review and must not write silently.
- Extension writes only through the ENVAX API.
- Extension never receives Supabase service-role keys or permanent ERP secrets.
- Request/order transitions must be idempotent and auditable.
- `FACTURADO` requires explicit seller/admin confirmation after the external process actually succeeds.

## Construction architecture

Current approved V1 baseline:

- TypeScript end-to-end;
- pnpm workspaces;
- React + TypeScript + Vite customer/admin apps;
- Supabase Auth for email/password authentication;
- Supabase PostgreSQL as the operational source of truth;
- Supabase Storage for public catalog media;
- Supabase Edge Functions for the versioned REST API;
- PostgreSQL RLS on private tables;
- versioned SQL migrations in `supabase/migrations`;
- modular monolith, not microservices;
- no separate NestJS/Fastify server required for V1;
- no mandatory queue/worker in the critical path;
- Cloudflare may continue hosting the existing landing/QR/static web delivery, but D1/R2 are not the V1 business-data backend.

Do not reintroduce D1, R2, anonymous-account persistence, seller routing, price/stock tables or invoice entities without a new explicit architecture decision.

## Deployment discipline

Landing, customer app, admin app, Supabase backend, seller extension and QR Worker must remain independently deployable where practical.

Do not destructively move or rewrite the current production landing/QR structure before staging parity and rollback are proven.

Do not commit confidential Wappsi documents, credentials, API keys, invoices, real customer data, `.env` files, Supabase service-role keys or provider secrets to this public repository.

## Build discipline

- Work on implementation branches; do not implement directly on `main`.
- Build one phase at a time using `docs/construction-v1/PHASES-AND-GATES.md`.
- Do not implement customer-facing visual UI before the relevant design is approved.
- Every database change uses versioned Supabase/PostgreSQL migrations.
- Every private table requires an explicit RLS decision.
- Every write endpoint defines validation, authorization, idempotency where needed and audit behavior.
- Run lint, typecheck, tests and build before declaring a phase complete.
- Report gate status as PASS or BLOCKED with evidence.

## First implementation task

If construction has not started yet, use:

`docs/construction-v1/BUILD-START-GOAL.md`

and implement Foundation only.

Foundation must establish the Supabase local/migration/function structure before catalog or commercial features.

## Change discipline

If a proposed change conflicts with these rules, flag it explicitly instead of silently changing the product definition or architecture.
