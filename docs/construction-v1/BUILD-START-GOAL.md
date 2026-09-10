# ENVAX — Build Start Goal V1

Use this document as the first implementation goal for Claude/Codex/other coding agents.

## Mission

Begin ENVAX construction from the approved product definition and official construction plan without changing product scope, without depending on Wappsi, and without breaking the current landing/QR deployment.

## Repository

`Abraha33/envax-contacto`

## Authority

Read first:
1. `CLAUDE.md`
2. `docs/PRODUCT-VISION.md`
3. `docs/USER-FLOW.md`
4. `docs/FAVORITES.md`
5. `docs/construction-v1/README.md`
6. `docs/construction-v1/OFFICIAL-CONSTRUCTION-PLAN.md`
7. `docs/construction-v1/ARCHITECTURE.md`
8. `docs/construction-v1/REPO-STRUCTURE.md`
9. `docs/construction-v1/PHASES-AND-GATES.md`

## First implementation branch

Create a new branch from the final approved/merged documentation state:

`build/foundation-v1`

Do not implement directly on `main`.

## Scope of first build

Implement **Phase 1 only: Foundation**.

### Required tasks

1. Establish pnpm workspace and root scripts.
2. Create skeletons:
   - `apps/customer`
   - `apps/admin`
   - `services/api`
   - `packages/contracts`
   - `packages/db`
   - `packages/ui`
   - `packages/config`
   - `tools/catalog-import`
   - `extensions/seller`
3. Do not destructively move the current root landing yet.
4. Do not modify the working QR Worker behavior.
5. Configure TypeScript strict mode.
6. Configure lint/format/test/typecheck/build.
7. Scaffold customer/admin using React + TypeScript + Vite compatible with Cloudflare Workers Static Assets / Cloudflare Vite plugin.
8. Scaffold API Worker with `/api/v1/health` only plus modular directory structure.
9. Add D1 local/staging binding configuration with no production secret/data.
10. Add test harness using Vitest.
11. Add Playwright skeleton for later E2E.
12. Add GitHub Actions CI running install, lint, typecheck, tests and builds.
13. Add `.gitignore` protection for local secrets/build outputs.
14. Add environment example files containing names/placeholders only, never secrets.
15. Add README instructions for local start/build/test.

## Explicitly NOT in Phase 1

Do not implement yet:
- product catalog UI beyond empty shell;
- favorites;
- anonymous auth behavior;
- pedido requests;
- promotions;
- portal;
- extension parser;
- Wappsi calls;
- ERP credentials;
- final visual design;
- production database migrations beyond foundation smoke if not needed;
- Cloudflare production DNS changes.

## Technical constraints

- TypeScript end-to-end.
- pnpm workspaces.
- Keep dependency count conservative.
- Hono is preferred for API routing, but if raw Workers produces a materially simpler Phase 1 shell, document the decision before changing the architecture baseline.
- Zod/shared runtime schemas baseline.
- Drizzle+D1 baseline; no ORM implementation beyond what Phase 1 requires to prove package/binding wiring.
- Browser apps/extension cannot import privileged DB code.
- No secret committed.

## Landing protection

Current landing is production-sensitive.

Phase 1 may create `apps/landing` only as a non-production copy after auditing current files. Do not change Cloudflare deployment root/domain in the same change.

A later dedicated migration task must prove parity before switching production.

## Required tests/evidence

Before declaring Phase 1 complete:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Also prove:
- customer shell runs locally;
- admin shell runs locally;
- API `/api/v1/health` returns expected JSON locally;
- staging deployment succeeds if Cloudflare credentials/environment are available;
- current landing and QR files are not accidentally modified.

## Required final report

At end of Phase 1 report exactly:
- branch and HEAD commit;
- files/directories added;
- dependency choices and why;
- test/build results;
- staging deployment result;
- known blockers;
- whether `FOUNDATION PASS` is PASS or BLOCKED;
- exact next task for Phase 2.

## Stop conditions

Stop and mark BLOCKED only if:
- repository/permissions prevent required work;
- current production deployment cannot be safely isolated;
- required Cloudflare credentials are unavailable for staging verification;
- a canonical product/architecture contradiction makes foundation unsafe.

Do not stop for Wappsi/API uncertainty; it is intentionally outside Phase 1.
