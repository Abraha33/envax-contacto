# ENVAX — Repository Structure V1

## Target monorepo

```text
envax-contacto/
├── apps/
│   ├── customer/
│   └── admin/
├── extensions/
│   └── seller/
├── packages/
│   ├── contracts/
│   ├── ui/
│   └── config/
├── supabase/
│   ├── config.toml
│   ├── migrations/
│   ├── seed.sql
│   └── functions/
│       └── api-v1/
│           ├── index.ts
│           ├── modules/
│           └── shared/
├── tools/
│   └── catalog-import/
├── tests/
│   ├── e2e/
│   ├── fixtures/
│   └── contract/
├── docs/
│   └── construction-v1/
├── qr-worker/          # existing, preserved
├── index.html          # existing landing, preserved until migration gate
├── demo.html
├── pnpm-workspace.yaml
├── package.json
└── CLAUDE.md
```

## Responsibilities

### Existing root landing

Production-sensitive public entry. Do not move it destructively during Foundation.

A later migration may create `apps/landing`, but only after staging parity and rollback are proven.

### `apps/customer`

Owns customer-facing UI:
- public catalog;
- search/filter;
- local anonymous convenience state if approved by UI implementation;
- authenticated persistent lists;
- formal request flow;
- `Mis pedidos`;
- eligible promotions.

It never receives privileged DB/service-role credentials.

### `apps/admin`

Internal UI for:
- catalog management;
- customers;
- requests/orders;
- promotions;
- seller/internal members;
- configuration;
- analytics/audit views.

Authorization still lives in API/database policies; hiding a screen is not security.

### `supabase/functions/api-v1`

Single logical REST API for V1.

Suggested module layout:

```text
supabase/functions/api-v1/
├── index.ts
├── modules/
│   ├── catalog/
│   ├── customers/
│   ├── lists/
│   ├── requests/
│   ├── orders/
│   ├── promotions/
│   ├── seller/
│   ├── admin/
│   ├── analytics/
│   ├── audit/
│   └── extension/
└── shared/
    ├── auth/
    ├── validation/
    ├── errors/
    ├── permissions/
    ├── idempotency/
    └── integrations/
```

### `supabase/migrations`

Versioned PostgreSQL schema, constraints, RLS policies, functions/RPC and indexes.

No production schema changes by hand without a migration captured in Git.

### `supabase/seed.sql`

Development/test seed only. Never include real customer/ERP data.

### `packages/contracts`

Shared DTO/runtime schemas/enums/error codes that are safe for browser/server use.

Do not leak privileged database implementation details or secrets.

### `packages/ui`

Approved visual primitives after frontend design is ready.

### `packages/config`

Shared lint/TypeScript/test configuration only. No secrets.

### `tools/catalog-import`

Deterministic catalog ingestion/validation tooling independent of Wappsi availability.

### `extensions/seller`

Manifest V3 extension plus deterministic parser/core where needed. It consumes ENVAX API only and never direct privileged database access.

### `qr-worker/`

Existing QR Worker remains independent until a dedicated migration/regression gate.

## Dependency rules

Allowed:
- apps → contracts/ui/config;
- Edge Function API → contracts;
- extension → contracts + extension-local parser;
- tools → contracts and safe generated database types if useful.

Not allowed:
- browser app → service-role key;
- extension → service-role key;
- browser/extension → direct privileged SQL;
- UI → server secrets;
- core catalog/domain → Wappsi-specific DTOs;
- order domain → vendor-specific infrastructure assumptions.

## Supabase generated types

When schema exists, generate database types from the canonical schema and treat generated code as build artifact/source according to the chosen workflow.

Do not replace runtime authorization/RLS with TypeScript types.

## Branch strategy

For one maintainer:
- `main` = production-ready;
- `docs/product-definition-v1` = current design/architecture documentation branch until merged;
- `build/foundation-v1` = first implementation branch;
- later short-lived feature branches;
- CI must pass before production merges.

## Standard commands

Root scripts should converge on:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
pnpm supabase start
pnpm supabase db reset
```

## Environment separation

Maintain distinct local, staging and production Supabase environments/data.

Never point normal development/staging jobs at production data.

Secrets use environment/CI/Supabase secret mechanisms and are never committed.
