# ENVAX — Phases and Gates V1

## Purpose

Construction is phase-gated. A phase is complete only when defined behavior works and evidence exists.

## Phase 0 — Definition readiness

### Scope
- canonical product/domain docs;
- Supabase architecture baseline;
- legacy Cloudflare D1/anonymous-account assumptions removed;
- Wappsi explicitly non-blocking.

### Gate: `BUILD PLAN READY`

Evidence:
- canonical and construction docs do not contradict each other;
- implementation branch can be created without a new product decision;
- no unresolved architecture blocker.

## Phase 1 — Foundation

### Scope
- pnpm workspace;
- TypeScript strict config;
- React/Vite customer/admin shells;
- Supabase CLI/project directory;
- Edge Function API health shell;
- test/lint/typecheck/build commands;
- CI;
- existing landing/QR preserved.

### Gate: `FOUNDATION PASS`

Evidence:
- `pnpm lint` PASS;
- `pnpm typecheck` PASS;
- unit smoke tests PASS;
- all packages/apps build;
- Supabase local stack starts when required local runtime is available;
- clean `supabase db reset` works;
- API health route works locally;
- customer/admin shells run;
- root landing/QR behavior/files were not accidentally changed;
- no secrets in repo.

Remote staging may remain `PENDING ENVIRONMENT` if credentials/project are not provisioned; do not report a false remote PASS.

## Phase 2 — Identity, roles, database and RLS

### Scope
- user/customer profile migrations;
- Supabase Auth integration;
- roles `CUSTOMER`, `SELLER`, `ADMIN`;
- one seeded/configured V1 seller model;
- RLS policies;
- authorization helpers;
- local/test fixtures.

### Gate: `IDENTITY DATA PASS`

Evidence:
- clean DB rebuild from migrations PASS;
- email/password auth integration test PASS;
- Customer A cannot access Customer B private data;
- customer cannot perform seller/admin actions;
- seller cannot perform admin-only actions;
- admin authorization PASS;
- no service-role key in browser/extension bundles.

## Phase 3 — Catalog data/API

### Scope
- brands/categories/segments/products/variants/attributes/media;
- deterministic catalog import/seed path;
- Storage media policy;
- catalog REST API;
- search/filter;
- no price/stock.

### Gate: `CATALOG DATA PASS`

Evidence:
- clean migration/seed/import PASS;
- duplicate/invalid identifiers reported;
- catalog read contract tests PASS;
- public media read works; unauthorized media writes fail;
- no Wappsi call in customer critical path;
- no price/stock leaked.

## Phase 4 — Customer catalog UI

### Precondition
Relevant visual screens are Design Ready.

### Scope
- catalog/index;
- categories/brands/search;
- product/variant detail;
- responsive listings;
- loading/empty/error/404;
- analytics hooks.

### Gate: `CATALOG UX PASS`

Evidence:
- approved desktop/mobile layouts implemented;
- keyboard/accessibility baseline;
- responsive matrix PASS;
- no cart/checkout/price/stock semantics;
- E2E landing/catalog→product PASS;
- performance measured.

## Phase 5 — Authentication + persistent lists

### Scope
- Supabase email/password customer UX;
- minimal business profile;
- persistent named lists;
- add/remove concrete variants;
- list rename/deactivate;
- optional safe local-to-account favorite transfer if implemented.

### Gate: `AUTH LISTS PASS`

Evidence:
- registration/login/logout/recovery behavior PASS;
- persistent lists require authentication;
- ownership isolation PASS;
- Customer A cannot access Customer B lists;
- anonymous visitor cannot access persistent-list API;
- no quantity/price/cart semantics required in list.

## Phase 6 — Formal request + seller MVP

### Scope
- request preparation with quantities;
- authenticated formal request creation;
- item snapshots;
- idempotency;
- single-seller commercial view;
- `SENT → IN_ATTENTION`;
- customer request/order reads;
- WhatsApp/email handoff behavior.

### Gate: `COMMERCIAL MVP PASS`

Evidence:
- customer submits seeded products successfully;
- duplicate submit with same idempotency key creates one request;
- seller sees correct context;
- no seller-assignment engine/path exists;
- customer cannot mutate commercial state;
- channel failure does not create false success;
- mobile/desktop E2E PASS.

## Phase 7 — Pedido lifecycle + seller extension

### Precondition
Real sanitized external-system text examples exist before parser automation.

### Scope
- transactional request→order conversion;
- order snapshots;
- cancel request/order;
- extension shell/context;
- deterministic parser fixture suite if required;
- ambiguity review fallback;
- `FACTURADO` confirmation;
- audit/idempotency.

### Gate: `SELLER OPERATIONS PASS`

Evidence:
- valid request converts exactly once into one order;
- retry is idempotent;
- ambiguous extension input produces no silent write;
- external failure cannot mark `FACTURADO`;
- seller explicit confirmation required for `FACTURADO`;
- audit records exist;
- seller cannot access admin-only operations.

## Phase 8 — Admin + promotions

### Scope
- catalog management;
- customers/internal member management;
- promotion CRUD/targeting;
- eligibility;
- operational supervision;
- audit views.

### Gate: `ADMIN PROMOTIONS PASS`

Evidence:
- admin authorization enforced;
- seller/customer denied admin actions;
- non-target customer cannot retrieve private promotion;
- lifecycle dates/targeting tested;
- sensitive changes auditable.

## Phase 9 — Analytics + hardening

### Scope
- event taxonomy;
- QR/campaign attribution;
- product/conversion funnels;
- privacy filtering;
- observability/request IDs;
- rate limiting;
- security/dependency review.

### Gate: `OBSERVABILITY SECURITY PASS`

Evidence:
- required events recorded without sensitive payloads;
- Analytics outage does not break commercial flow;
- request IDs/log lookup tested;
- rate-limit behavior tested;
- secret scanning/review PASS.

## Phase 10 — Production readiness

### Scope
- accessibility/browser/device matrix;
- backups/restore;
- deployment/rollback;
- RLS attack tests;
- load/performance smoke;
- privacy/legal closure;
- runbooks;
- pilot.

### Gate: `PRODUCTION READY`

Evidence:
- critical E2E PASS;
- restore drill PASS;
- staging→production and rollback tested;
- Customer A/B isolation proven;
- seller/admin permission boundaries proven;
- no unresolved P0/P1 defects;
- privacy requirements closed;
- pilot validates discover→request→seller/order flow.

## Parallel ERP gate

`ERP UNKNOWN → READ VALIDATED → WRITE VALIDATED → SECURITY/RELIABILITY VALIDATED → ERP ADAPTER READY`

Core ENVAX never becomes blocked merely because ERP stays `UNKNOWN`.

## Defect severity

- P0: security/data loss/system unavailable — blocks gate.
- P1: core flow broken — blocks gate.
- P2: meaningful issue with workaround — pass only with documented acceptance.
- P3: minor/cosmetic — schedule normally.

## Evidence discipline

For every gate save:
- exact commit;
- commands/test output;
- migration version where relevant;
- local/staging environment used;
- limitations/blockers;
- rollback/restore note where relevant;
- screenshots only as visual evidence, never as replacement for functional tests.
