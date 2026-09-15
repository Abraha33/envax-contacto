# ENVAX — Build Start Goal V1

Use this document as the first implementation goal for Codex/Claude/other coding agents.

## Mission

Begin ENVAX construction from the approved product/domain architecture without changing product scope, without depending on Wappsi, and without breaking the existing landing/QR deployment.

## Repository

`Abraha33/envax-contacto`

## Implementation branch

Create from the current approved documentation state:

`build/foundation-v1`

Do not implement directly on `main` or on the documentation branch.

## Scope

Implement **Foundation only**.

### Required tasks

1. Establish a pnpm workspace and root scripts.
2. Pin Node.js to a currently supported version compatible with the Supabase CLI; Node 20+ is required for npm/pnpm CLI installation.
3. Create non-destructive skeletons:
   - `apps/customer`
   - `apps/admin`
   - `packages/contracts`
   - `packages/ui`
   - `packages/config`
   - `tools/catalog-import`
   - `extensions/seller`
   - `tests/e2e`
4. Preserve current root landing files and `qr-worker/` behavior; do not move/switch production routes in Foundation.
5. Configure TypeScript strict mode.
6. Configure lint, format, test, typecheck and build scripts.
7. Scaffold customer/admin with React + TypeScript + Vite, but do not implement visual product screens beyond safe shells.
8. Add Supabase CLI as a pinned dev dependency and initialize the canonical `supabase/` directory.
9. Commit safe Supabase local configuration, versioned migrations directory and seed scaffolding. Never commit project secrets.
10. Create `supabase/functions/api-v1` with a minimal TypeScript REST shell and `/api/v1/health` behavior.
11. Establish module directories matching the approved backend architecture, without implementing feature logic yet.
12. Add the first foundation migration only for infrastructure/smoke needs. Do not prematurely implement all business tables if Foundation does not need them.
13. Add a test harness using Vitest.
14. Add Playwright skeleton for later E2E.
15. Add GitHub Actions CI running install, lint, typecheck, tests and builds.
16. Add `.gitignore` protection for local Supabase state, `.env*`, build outputs and secrets.
17. Add environment example files containing names/placeholders only.
18. Document local start/reset/build/test commands.

## Recommended target repository shape

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
├── tools/
│   └── catalog-import/
├── tests/
│   └── e2e/
├── qr-worker/            # existing; preserve
├── index.html            # existing landing; preserve
├── demo.html             # existing; preserve
├── pnpm-workspace.yaml
└── package.json
```

## Explicitly NOT in Foundation

Do not implement yet:
- final catalog UI;
- final catalog schema/import;
- persistent favorites;
- customer registration UX beyond a shell;
- formal solicitudes/pedidos;
- promotions;
- seller extension parser;
- Wappsi calls;
- ERP credentials;
- price/stock;
- invoice entities;
- production database migration;
- production DNS/deployment switch;
- anonymous persisted accounts or recovery credentials;
- seller assignment/routing.

## Technical constraints

- TypeScript end-to-end.
- pnpm workspaces.
- React + Vite for customer/admin.
- Supabase Auth/PostgreSQL/Storage/Edge Functions baseline.
- Supabase CLI project structure under `supabase/`.
- PostgreSQL migrations tracked in Git.
- RLS is mandatory when private business tables are introduced.
- Browser apps/extension never receive service-role keys.
- Keep dependency count conservative.
- Shared runtime contracts/validation may use Zod when feature contracts begin; do not add libraries without use.
- Modular monolith; no microservices.

## Local Supabase baseline

Foundation should support the documented Supabase workflow:

```bash
pnpm supabase start
pnpm supabase db reset
```

Local Supabase requires a Docker-compatible runtime.

A clean clone should be able to recreate the local backend from committed config/migrations/seed without manual dashboard-only schema changes.

## Landing protection

Current landing is production-sensitive.

Foundation must not change its production routing/configuration. If `apps/landing` is introduced later, parity and rollback are a dedicated gate.

## Required tests/evidence

Before declaring Foundation complete:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Also prove when the environment is available:
- Supabase local stack starts;
- database can reset cleanly from migrations/seed;
- `api-v1` health route works locally;
- customer shell runs locally;
- admin shell runs locally;
- existing root landing and QR Worker are not accidentally modified;
- repository contains no secrets.

Remote/staging Supabase deployment is not required to call local Foundation code-complete if credentials/project have not yet been provisioned, but the gate must clearly report that evidence as pending rather than pretending it passed.

## Required final report

Report:
- branch and HEAD commit;
- files/directories added;
- dependency/tool choices;
- local Supabase result;
- lint/typecheck/test/build results;
- remote/staging result if available;
- known blockers;
- `FOUNDATION PASS` = PASS or BLOCKED;
- exact next task.

## Stop conditions

Mark BLOCKED only if:
- repository/permissions prevent the work;
- current production landing/QR cannot be isolated safely;
- local development requirements cannot be satisfied;
- a new canonical product/architecture contradiction makes construction unsafe.

Do not stop because Wappsi is unknown; Wappsi is deliberately outside Foundation.
