# Phase 1 — Gate Checklist

Final gate: `FOUNDATION PASS` or `FOUNDATION BLOCKED`.

## Build
- [ ] clean clone installs with documented package-manager version;
- [ ] `pnpm lint` PASS;
- [ ] `pnpm typecheck` PASS;
- [ ] unit/smoke tests PASS;
- [ ] all packages/apps build;
- [ ] no untracked generated secrets/config required.

## Runtime
- [ ] API health endpoint works locally;
- [ ] API health endpoint works in staging;
- [ ] customer shell deploys independently;
- [ ] admin shell deploys independently;
- [ ] D1 local/staging binding verified;
- [ ] current landing and QR Worker remain functional.

## Safety
- [ ] no secrets/confidential data in repository;
- [ ] no customer-facing visual assumptions beyond approved shell behavior;
- [ ] no Wappsi dependency in startup path;
- [ ] rollback note exists.

## Evidence
Record commit SHA, CI run, staging URLs, commands executed, known limitations and rollback instructions.

## Decision
- Status: NOT EVALUATED
- Evidence:
- Blocking defects:
- Next branch if PASS: `build/catalog-data-v1`