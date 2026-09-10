# CLAUDE.md

## Current execution state

ENVAX construction planning is complete enough to begin **Phase 0 — Product / Design / Build Readiness**.

Current execution branch:
`phase/0-product-build-readiness`

Start with:
1. `docs/construction-v1/phase-0/START-HERE.md`
2. `docs/construction-v1/phase-0/PHASE-0-EXECUTION-GOAL.md`

Do not implement Foundation code until the Phase 0 gate is PASS.

## Read first

Before proposing product or implementation changes, read in this order:

1. `docs/PRODUCT-VISION.md`
2. `docs/USER-FLOW.md`
3. `docs/FAVORITES.md`
4. `docs/SELLER-EXTENSION.md`
5. `docs/ERP-INTEGRATION-PENDING.md`
6. `docs/construction-v1/README.md`
7. `docs/construction-v1/OFFICIAL-CONSTRUCTION-PLAN.md`
8. `docs/construction-v1/ARCHITECTURE.md`
9. `docs/construction-v1/REPO-STRUCTURE.md`
10. `docs/construction-v1/DATA-MODEL.md`
11. `docs/construction-v1/API-CONTRACTS.md`
12. `docs/construction-v1/PHASES-AND-GATES.md`
13. `docs/construction-v1/phase-0/START-HERE.md`

## Canonical product rules

- ENVAX is one B2B digital catalog platform, not ecommerce.
- Do not add public cart, checkout, payment, marketplace behavior, or cart totals unless explicitly approved later.
- Entry must stay low-friction: business name + business type.
- ENVAX creates/uses an anonymous identity before forcing a traditional account.
- Anonymous cross-device recovery must not depend on IP.
- Favorites are **multiple named lists**, not the old single `Mi selección` model.
- Customer CTA may say `Enviar pedido`.
- Internally the first commercial entity is a `solicitud`/`order_request`.
- A validated seller/extension flow converts the solicitud into a real `pedido`.
- Customer-visible lifecycle: `Solicitud enviada → En atención → Pedido confirmado → Completado`.
- Seller/advisor assignment is decided by the system.
- Customer portal is optional and intentionally small.
- Promotions are admin-managed and may target a specific customer or a business type.
- Public product field/photo visibility is not fully frozen. Implement through a visibility policy; do not hard-code all product media as public.
- ENVAX brand is visually primary; partner brands are secondary.

## ERP/Wappsi rule

ERP/Wappsi API integration is **PENDING REAL VALIDATION IN GENERAL**.

Never assume an endpoint/capability is production-confirmed from documentation alone. Do not block core ENVAX construction on ERP uncertainty.

No ERP secret may be placed in frontend, extension, Git or public documentation.

## Seller extension rules

- Manual user-selected ERP text only; no automatic full-screen scraping.
- Collect 5–10 real sanitized copied-text examples before implementing parser logic.
- Use deterministic parsing first.
- Ambiguous/incomplete extraction must require review and must not write silently.
- Extension writes only through ENVAX API, never directly to D1.
- Conversion must be idempotent and auditable.

## Construction architecture

Baseline:
- TypeScript end-to-end;
- pnpm workspaces;
- React + TypeScript + Vite customer/admin apps;
- Cloudflare Workers REST API;
- D1 relational database;
- R2 assets;
- Queues only for async/retryable jobs;
- Turnstile selectively;
- Cloudflare Access preferred for initial internal admin perimeter;
- modular monolith, not microservices.

If proposing a different architecture, document the concrete measured reason before changing this baseline.

## Deployment discipline

Landing, customer app, admin, API, seller extension and QR Worker must remain independently deployable.

Do not destructively move or rewrite the current production landing/QR structure before staging parity and rollback are proven.

Do not commit confidential Wappsi documents, credentials, API keys, invoices, real customer data, `.dev.vars`, or provider secrets to this public repository.

## Build discipline

- Work on branches; do not implement directly on `main`.
- Execute one phase at a time using explicit gates.
- Phase 0 is documentation/readiness only.
- Do not implement customer-facing visual UI before the relevant design is approved.
- Every database change later uses versioned migrations.
- Every write endpoint later defines validation, authorization, idempotency where needed, and audit behavior.
- Run lint, typecheck, tests and build before declaring implementation phases complete.
- Report every phase gate as PASS or BLOCKED with evidence.

## Next implementation after Phase 0

Only after `PHASE 0: PASS`, create/use:
`build/foundation-v1`

Then execute:
`docs/construction-v1/BUILD-START-GOAL.md`

## Change discipline

If a proposed change conflicts with these rules, flag it explicitly instead of silently changing the product definition or architecture.
