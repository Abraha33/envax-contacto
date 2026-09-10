# Phase 1 — Execution Goal

## Mission
Implement ENVAX Foundation on `build/foundation-v1` only after Phase 0 is PASS.

## Required work
1. Create the approved pnpm/TypeScript monorepo structure without destructively moving the existing production landing or QR Worker.
2. Create minimal React/Vite shells for customer and admin applications; do not invent final visual UI.
3. Create the modular Cloudflare Worker API shell and a versioned `/health` endpoint.
4. Add local and staging configuration boundaries for D1; no production secrets in Git.
5. Add shared runtime schemas/types and error-response conventions.
6. Add root commands for lint, typecheck, unit tests and builds.
7. Add CI that runs those gates on pull requests.
8. Prove components can be deployed independently to staging.
9. Document local setup, environment variables, rollback and known limitations.

## Quality rules
- no business features beyond smoke fixtures;
- no direct browser-to-D1 access;
- no ERP/Wappsi assumptions;
- no secrets or `.dev.vars` committed;
- keep architecture maintainable by one person.

## Stop condition
Stop after evaluating `FOUNDATION PASS`. If PASS, prepare the Phase 2 handoff; do not start catalog ingestion in the same branch.