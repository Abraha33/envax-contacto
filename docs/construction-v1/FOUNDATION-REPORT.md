# ENVAX — Foundation Report V1

## Gate

`FOUNDATION PASS: PASS`

Evidence source: GitHub Actions `Foundation CI`, run `35047829295`, branch `build/foundation-v1`, validated code commit `f760c43396e3511b20349f1b915cd36e3ba713b3`.

## What was established

- pnpm workspace and committed `pnpm-lock.yaml`;
- Node.js 22 baseline;
- TypeScript strict configuration;
- ESLint + Prettier;
- React + TypeScript + Vite customer shell;
- React + TypeScript + Vite admin shell;
- shared contracts package with Zod;
- Vitest contract smoke test;
- Deno Edge Function smoke test;
- Playwright harness;
- Supabase CLI/config/seed/migrations structure;
- modular `supabase/functions/api-v1` boundary;
- backend module placeholders for catalog, customers, lists, requests, orders, promotions, seller, admin, analytics, audit and extension;
- shared backend boundaries for auth, database, validation, errors, permissions and idempotency;
- seller extension and catalog-import tool placeholders;
- GitHub Actions Foundation gate;
- secret/build-output protection through `.gitignore` and `.env.example` files.

## Reproducibility evidence

The clean CI run passed:

- `pnpm install --frozen-lockfile`: PASS;
- lint: PASS;
- Prettier format check: PASS;
- TypeScript typecheck: PASS;
- Vitest contract test: 1 PASS, 0 FAIL;
- Deno health route test: 1 PASS, 0 FAIL;
- Playwright harness: PASS (foundation test intentionally skipped until a real approved UI journey exists);
- customer/admin production builds: PASS;
- customer shell HTTP smoke: PASS;
- admin shell HTTP smoke: PASS;
- existing `index.html`, `demo.html` and `qr-worker/` presence check: PASS;
- local Supabase startup from a clean runner: PASS;
- local database reset from repository state: PASS;
- local `api-v1` Edge Function runtime health: PASS;
- Supabase foundation/module structure verification: PASS.

Observed health response:

```json
{"service":"envax-api","status":"ok","version":"v1"}
```

## Tool versions observed in CI

- Node.js: `22.23.2`;
- pnpm: `10.15.1`;
- Deno: `2.9.6`;
- Supabase CLI: `2.117.0`;
- TypeScript: `5.9.3`;
- Vitest: `3.2.7`;
- Vite build observed: `7.3.6`.

## Architecture verified by Foundation

Foundation uses the approved Supabase-first baseline:

- Supabase Auth;
- PostgreSQL + RLS;
- Supabase Storage;
- TypeScript Edge Functions;
- one modular REST API boundary;
- no D1/R2 operational backend;
- no persisted anonymous business account model;
- no seller-assignment engine;
- no price/stock/invoice subsystem.

## Production-sensitive files

Foundation did not intentionally migrate or replace the existing production landing or QR Worker. Their migration/deployment remains a separate staged operation with parity and rollback evidence.

## Non-blocking observations

- GitHub Actions emits deprecation notices for some action runtimes targeting Node 20 while the runner forces Node 24. This is an upstream action-maintenance warning, not a Foundation failure.
- pnpm reports an ignored `esbuild` install script under its default build-script security behavior; both Vite production builds pass in CI, so this is not currently blocking.
- Fresh CI runners may encounter transient public container-registry rate limiting while downloading Supabase images; the validated run recovered and completed successfully.

## Remote/staging status

🟡 A hosted Supabase staging project has not been proven by this Foundation gate. Local clean-runner reproducibility is PASS. Hosted environment provisioning/deployment belongs to the later infrastructure/deployment work and is not required to close Foundation.

## External pending items

- 🟡 Wappsi/ERP real validation;
- 🟡 final legal privacy/consent text before production;
- 🟡 real sanitized external-system samples before seller-extension parser implementation.

## Next implementation task

Phase 2 — Catalog Data:

1. create the first real PostgreSQL migration;
2. introduce catalog identity/classification tables and RLS/public-read policy;
3. define a deterministic import fixture/source contract;
4. seed a small safe catalog fixture;
5. implement public catalog read endpoints;
6. add database/API contract tests;
7. prove clean `db reset` and deterministic catalog reads without Wappsi.
