# ENVAX — Official Construction Plan V1

## 1. Mission

Build ENVAX as a maintainable B2B catalog platform where a business can explore a broad public catalog, authenticate when persistence/private capabilities are needed, organize products into named lists, send a formal commercial request, and continue with one human seller.

ENVAX is not ecommerce. V1 excludes public checkout, payment, price engine, stock engine, marketplace behavior and electronic invoicing.

## 2. Canonical V1 product boundary

Public path:

`Landing → Catalog → Category/Brand/Search → Product/Variant → WhatsApp/Email if desired`

Authenticated structured path:

`Login → Persistent list/selection → Prepare request → Solicitud enviada → Seller → En atención → Pedido confirmado → Facturado`

Rules:
- public browsing requires no login;
- anonymous business data is not persisted in ENVAX;
- optional anonymous favorites are local-device only;
- persistent lists/formal requests/orders require Supabase Auth;
- one seller only in V1;
- admin has full V1 management authority;
- `FACTURADO` only confirms the external invoicing process completed outside ENVAX;
- no invoice entity/files inside ENVAX;
- Wappsi remains optional/pending validation.

## 3. Chosen stack

Optimize for one maintainer and minimal operational overhead.

- Language: TypeScript end-to-end.
- Package manager: pnpm workspaces.
- Customer/Admin frontend: React + Vite + TypeScript.
- Shared contracts/validation: lightweight runtime schemas such as Zod where useful.
- Authentication: Supabase Auth, email + password.
- Database: Supabase PostgreSQL.
- Authorization/data isolation: backend checks + PostgreSQL RLS.
- Backend: Supabase Edge Functions, one modular REST API under `/api/v1`.
- Database migrations: versioned SQL under `supabase/migrations`.
- Media: Supabase Storage for public catalog photos.
- Testing: Vitest + PostgreSQL/Supabase integration tests + Playwright E2E.
- Browser extension: Chromium Manifest V3 first, with deterministic parsing/core isolated from browser APIs.
- Existing Cloudflare landing/QR infrastructure: preserve and migrate only through a separate parity/rollback gate.

Do not introduce microservices, Kubernetes, a separate message broker, a second operational database or a permanent separate Node backend in V1 unless measured requirements force it.

## 4. Construction strategy

Build vertical slices. A phase passes only with evidence, not because files exist.

### Phase 0 — Canonical readiness

Goal: no implementation ambiguity.

Deliverables:
- product/domain decisions synchronized;
- Supabase architecture canonical;
- legacy D1/anonymous-account assumptions removed;
- API/data/security docs aligned;
- Wappsi explicitly non-blocking.

Exit: `BUILD PLAN READY`.

### Phase 1 — Foundation

Goal: reproducible technical base without changing production landing/QR.

Deliverables:
- pnpm workspace;
- React/Vite customer/admin shells;
- Supabase CLI initialized;
- committed `supabase/config.toml`, migrations/seed structure;
- `supabase/functions/api-v1` health shell;
- TypeScript strict configuration;
- lint/typecheck/test/build scripts;
- Vitest and Playwright skeletons;
- CI;
- environment/secret discipline;
- existing root landing and QR Worker preserved.

Exit: `FOUNDATION PASS`.

### Phase 2 — Database + Auth + RLS foundation

Goal: establish real identity/data security before private features.

Deliverables:
- initial PostgreSQL migrations for profiles/roles and core reference tables;
- Supabase Auth integration contract;
- minimal customer profile creation/linking;
- `CUSTOMER`, `SELLER`, `ADMIN` authorization model;
- single-seller configuration;
- RLS policies and isolation tests;
- seed users/data for local tests without real credentials.

Exit: `IDENTITY DATA PASS`.

### Phase 3 — Catalog data/API

Goal: serve a real catalog independently of Wappsi.

Deliverables:
- brands/categories/segments/products/variants/attributes/media schema;
- deterministic import/seed path;
- Supabase Storage media policy;
- public catalog REST endpoints;
- search/filter baseline;
- no price/stock fields;
- public-media rules.

Exit: `CATALOG DATA PASS`.

### Phase 4 — Customer catalog UI

Precondition: relevant screens are design-ready.

Deliverables:
- catalog/index;
- category/brand/search/product routes;
- responsive product listings/detail;
- loading/empty/error states;
- Analytics hooks without provider lock-in;
- no ecommerce semantics.

Exit: `CATALOG UX PASS`.

### Phase 5 — Authentication + persistent lists

Goal: let customers persist business interest safely.

Deliverables:
- Supabase email/password login/registration/recovery UX as approved by frontend design;
- minimal commercial profile;
- persistent named lists;
- add/remove concrete variants;
- ownership/RLS tests;
- optional transfer of safe local favorite selections after login only if explicitly implemented.

Exit: `AUTH LISTS PASS`.

### Phase 6 — Formal request + seller commercial MVP

Goal: convert catalog interest into an actionable ENVAX request.

Deliverables:
- prepare request with quantities;
- formal authenticated `solicitud` creation;
- immutable request snapshots;
- idempotency;
- automatic use of the single seller, without assignment engine;
- seller request/order operational views;
- `SENT → IN_ATTENTION`;
- WhatsApp/email handoff as a separate channel action;
- customer request/order views as approved.

Exit: `COMMERCIAL MVP PASS`.

### Phase 7 — Pedido lifecycle + seller extension

Precondition for parser automation: real sanitized external-system copied-text samples exist.

Deliverables:
- transactional `solicitud → pedido` confirmation;
- order snapshots;
- cancel request/order;
- browser extension shell/context flow;
- deterministic parser fixtures where required;
- ambiguous data review/fail-safe behavior;
- `FACTURADO` confirmation after successful external invoicing;
- audit/idempotency.

Exit: `SELLER OPERATIONS PASS`.

### Phase 8 — Admin + promotions

Deliverables:
- catalog admin;
- customer/member management;
- promotion CRUD;
- targeting by customer/business segment;
- eligibility/private promotion display;
- operational supervision;
- audit views;
- admin authorization tests.

Exit: `ADMIN PROMOTIONS PASS`.

### Phase 9 — Analytics + operational hardening

Deliverables:
- approved event taxonomy implementation;
- acquisition/QR and funnel measurement;
- error/performance monitoring;
- privacy-sensitive event filtering;
- rate limiting;
- observability/request IDs;
- dependency/security checks.

Exit: `OBSERVABILITY SECURITY PASS`.

### Phase 10 — Production readiness

Deliverables:
- accessibility/browser/device pass;
- restore drill;
- staging→production deployment/rollback proof;
- RLS/authorization attack tests;
- performance/load smoke;
- privacy/legal requirements closed;
- runbooks;
- real pilot;
- no unresolved P0/P1 defects.

Exit: `PRODUCTION READY`.

## 5. Parallel ERP track

ERP validation is independent:

`UNKNOWN → READ VALIDATED → WRITE VALIDATED → SECURITY/RELIABILITY VALIDATED → ADAPTER READY`

Core ENVAX never becomes blocked merely because ERP stays `UNKNOWN`.

Until validated, seller/manual/extension operations remain valid.

## 6. Milestones

### Milestone A — Technical/data foundation
Phases 1–3.

### Milestone B — Catalog usable
Phase 4.

### Milestone C — Commercial MVP
Phases 5–6.

### Milestone D — Operational platform
Phases 7–9.

### Milestone E — Production ready
Phase 10.

## 7. Scope-drift prevention

1. Do not block ENVAX on Wappsi.
2. Do not build checkout/payments/cart totals.
3. Do not persist anonymous business profiles in V1.
4. Do not build seller assignment for one seller.
5. Do not create price, stock or invoice domains in V1.
6. Do not expose service-role/ERP secrets to browser or extension.
7. Do not implement customer-facing UI before its visual state is approved.
8. Every DB change is a migration.
9. Every private table has an RLS decision/test.
10. Every write endpoint defines validation, authorization, idempotency as needed and audit behavior.
11. Every phase requires automated evidence and a gate.
12. Preserve existing landing/QR until migration parity is proven.

## 8. Definition of done for a feature

A feature is done only when:
- behavior matches canonical docs;
- authorization/ownership is enforced;
- migration is versioned if needed;
- RLS is defined/tested for private data;
- happy/failure paths are tested;
- idempotency exists when retries are dangerous;
- audit exists when state/admin actions are sensitive;
- logs do not leak secrets;
- staging/local evidence exists as appropriate;
- rollback/restore impact is understood;
- documentation remains synchronized.
