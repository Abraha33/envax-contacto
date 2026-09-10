# ENVAX — Phases and Gates V1

## Purpose

Construction is phase-gated. A phase cannot be called complete because files exist; it is complete only when the defined behavior works in staging and the exit evidence exists.

## Phase 0 — Definition readiness

### Scope
- canonical product docs;
- official construction plan;
- architecture baseline;
- visual UX work coordinated in parallel;
- unresolved public product fields explicitly pending;
- Wappsi explicitly non-blocking.

### Gate: `BUILD PLAN READY`
Evidence:
- all construction docs present;
- no contradiction with latest product rules;
- implementation branch can be created without requiring a new product decision.

## Phase 1 — Foundation

### Scope
- pnpm workspace;
- TypeScript project configuration;
- React/Vite shells;
- Cloudflare Worker API shell;
- D1 local/staging bindings;
- test/lint/typecheck/build commands;
- CI;
- independent deployment skeletons;
- current landing preserved.

### Gate: `FOUNDATION PASS`
Evidence:
- `pnpm lint` PASS;
- `pnpm typecheck` PASS;
- unit smoke tests PASS;
- all packages build;
- API health endpoint works locally and staging;
- customer/admin shells deploy separately;
- production landing is not changed or staging parity is proven before switch;
- no secrets in repo.

## Phase 2 — Catalog data

### Scope
- D1 schema/migrations;
- Product Master normalization/import;
- categories/brands/families/products/variants;
- asset metadata/R2 policy;
- catalog API;
- search/filter baseline.

### Gate: `CATALOG DATA PASS`
Evidence:
- clean DB can be created from migrations;
- deterministic import from fixture/source export;
- duplicate/invalid identifiers are reported;
- import can be re-run safely by version;
- contract tests for catalog reads PASS;
- no Wappsi call in required path.

## Phase 3 — Customer catalog UI

### Precondition: `DESIGN READY` for screens being implemented

### Scope
- landing handoff;
- catalog/index;
- category/brand/family/product;
- responsive listings;
- search/filters;
- loading/empty/error/404.

### Gate: `CATALOG UX PASS`
Evidence:
- approved desktop/mobile layouts implemented;
- keyboard navigation baseline;
- responsive matrix PASS;
- no ecommerce cart/checkout language introduced;
- E2E can navigate landing → product;
- performance budget measured.

## Phase 4 — Anonymous identity + Favorites

### Scope
- anonymous account/session;
- business name/type persistence;
- recovery credential;
- cross-device recovery;
- multiple named favorite lists;
- item operations.

### Gate: `IDENTITY FAVORITES PASS`
Evidence:
- no contact information required;
- secure cookie session;
- recovery secret never stored plaintext server-side;
- second device restores same anonymous identity using recovery credential;
- favorites persist;
- ownership isolation test PASS;
- one account cannot read another account's favorites.

## Phase 5 — Pedido request + advisor — MVP

### Scope
- Enviar pedido;
- solicitud creation;
- line snapshots;
- seller assignment;
- visible statuses;
- WhatsApp/email handoff;
- confirmation;
- operational request view.

### Gate: `COMMERCIAL MVP PASS`
Evidence:
- customer submits real seeded products;
- seller/advisor sees correct context;
- duplicate submit with same idempotency key creates one solicitud;
- customer sees `Solicitud enviada`;
- failure to open/send external channel does not mark provider delivery as successful;
- E2E mobile + desktop PASS;
- staging pilot can start.

## Phase 6 — Seller extension

### Precondition
5–10 real sanitized ERP copied-text samples exist.

### Scope
- parser fixture suite;
- Manifest V3 shell;
- manual selection capture;
- request matching;
- automatic validated fast path;
- ambiguity review fallback;
- solicitud → pedido conversion;
- audit/idempotency.

### Gate: `SELLER BRIDGE PASS`
Evidence:
- every approved fixture parses deterministically;
- unrelated page text is not scraped;
- ambiguous sample produces no state write;
- valid sample converts exactly one request to exactly one order;
- retry is idempotent;
- customer status reflects conversion;
- audit record exists.

## Phase 7 — Portal

### Scope
- verified customer upgrade;
- contact verification adapter;
- session/account recovery;
- order list/detail/status;
- preserve anonymous history.

### Gate: `PORTAL PASS`
Evidence:
- anonymous history survives upgrade;
- verified customer sees only own orders;
- logout/revocation works;
- verification attempts rate-limited;
- provider-disabled environment fails gracefully.

## Phase 8 — Admin/promotions

### Scope
- promotion CRUD;
- targeting by customer/business type;
- eligibility;
- selection of one/multiple promotions;
- advisor handoff;
- audit/consent support.

### Gate: `PROMOTIONS PASS`
Evidence:
- admin authorization enforced;
- target query verified;
- non-target customer cannot retrieve promotion;
- selection/handoff context correct;
- promotion lifecycle dates tested;
- changes auditable.

## Phase 9 — Production hardening

### Scope
- accessibility;
- browser/device matrix;
- security;
- observability;
- rate limiting/Turnstile;
- backups/restore;
- load/performance smoke;
- runbooks;
- real pilot.

### Gate: `PRODUCTION READY`
Evidence:
- critical E2E suite PASS;
- dependency/security scan reviewed;
- restore drill PASS;
- staging → production deployment/rollback tested;
- alerts/log lookup tested;
- no unresolved P0/P1 defects;
- pilot confirms customers can discover, favorite and send requests without assistance.

## Parallel external gate — ERP

ERP integration has its own status:

`ERP UNKNOWN → READ VALIDATED → CUSTOMER/INVOICE VALIDATED → ORDER WRITE VALIDATED → RELIABILITY VALIDATED → ERP ADAPTER READY`

ENVAX core never changes its gate to blocked merely because ERP stays `UNKNOWN`.

## Defect severity

- P0: security/data-loss/system unavailable — blocks gate.
- P1: core user flow broken — blocks gate.
- P2: meaningful but workaround exists — can pass only with documented acceptance.
- P3: cosmetic/minor — schedule normally.

## Evidence discipline

For every gate, save:
- command/test output;
- staging URL/version/commit;
- migration version where relevant;
- screenshots only for visual evidence, not as replacement for functional tests;
- known limitations;
- rollback note.
