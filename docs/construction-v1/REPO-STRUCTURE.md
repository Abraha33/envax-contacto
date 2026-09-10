# ENVAX — Repository Structure V1

## Target monorepo

```text
envax-contacto/
├── apps/
│   ├── landing/
│   ├── customer/
│   └── admin/
├── services/
│   └── api/
├── extensions/
│   └── seller/
├── workers/
│   └── qr/
├── packages/
│   ├── contracts/
│   ├── db/
│   ├── ui/
│   └── config/
├── tools/
│   └── catalog-import/
├── tests/
│   ├── e2e/
│   ├── fixtures/
│   └── contract/
├── docs/
│   └── construction-v1/
├── pnpm-workspace.yaml
├── package.json
└── CLAUDE.md
```

## Responsibilities

### `apps/landing`
Current public landing. Keep deployable without customer/admin/API code. Migration must preserve current behavior before switching Cloudflare production root.

### `apps/customer`
Catalog, anonymous mode, favorites, pedido requests, portal mode, promotions UI.

### `apps/admin`
Internal operations and promotions admin.

### `services/api`
Only privileged application entry point to D1/R2/Queues and integrations.

Suggested module layout:

```text
services/api/src/
├── app.ts
├── modules/
│   ├── identity/
│   ├── catalog/
│   ├── favorites/
│   ├── order-requests/
│   ├── orders/
│   ├── promotions/
│   ├── portal/
│   ├── admin/
│   └── audit/
├── integrations/
├── middleware/
└── worker.ts
```

### `packages/contracts`
Shared runtime schemas, request/response DTOs, enums, public error codes. Browser apps may import these; database implementation types may not leak into UI.

### `packages/db`
D1/Drizzle schema, repositories, migration helpers and test seeds. Only server-side code imports privileged database access.

### `packages/ui`
ENVAX visual primitives once design is approved: typography, buttons, cards, layout, states. Avoid generic ecommerce component names/semantics.

### `packages/config`
Shared lint/TypeScript/test config only. Never store secrets.

### `tools/catalog-import`
Offline/CI import pipeline from canonical Product Master export to validated normalized catalog data.

### `extensions/seller`
Manifest V3 extension shell + parser core. Parser fixtures should be independent from browser APIs where possible.

## Migration from current repository

The repository currently has root landing files and `qr-worker/`. Do not move them destructively in the first code commit.

Safe migration:
1. create new workspace structure alongside current production files;
2. copy current landing into `apps/landing`;
3. run visual/functional regression against current landing;
4. deploy `apps/landing` to staging;
5. update Cloudflare build/root configuration only after parity passes;
6. keep old root files until production switch is verified;
7. remove duplicates in a separate cleanup PR;
8. do the same for `qr-worker/` only after QR routing and D1 analytics behavior are confirmed.

## Dependency rules

Allowed:
- apps → contracts/ui/config;
- API → contracts/db/config;
- extension → contracts + extension-local parser;
- tools → contracts/db schema if required.

Not allowed:
- browser app → db;
- extension → db;
- UI → server secrets;
- catalog domain → Wappsi-specific DTOs;
- order domain → Cloudflare-specific response objects.

## Branch strategy

For a one-maintainer project use simple trunk-based development:
- `main` = production-ready;
- documentation branches for major plans;
- implementation branches such as `build/foundation-v1`, `feat/favorites`, `feat/order-request`;
- PR required before merge to `main`;
- CI must pass before merge;
- do not create a permanent `develop` branch unless team size/workflow later requires it.

## Standard commands

Root scripts should converge on:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

Deployment commands stay app-specific, e.g. `pnpm --filter @envax/customer deploy:staging`.

## Environment separation

Each deployable component has explicit local/staging/production config. D1/R2/Queue resources must not be shared between staging and production.

Use `.dev.vars`/local secrets only for local development and never commit them.
