# Phase 0 — START HERE

Status: **READY TO START**

Execution branch: `phase/0-product-build-readiness`

Base branch: `docs/official-construction-plan-v1`

## Mission

Execute Phase 0 only: remove ambiguity before implementation begins. Do not build application code in this phase.

## Read first

1. `CLAUDE.md`
2. `docs/PRODUCT-VISION.md`
3. `docs/USER-FLOW.md`
4. `docs/FAVORITES.md`
5. `docs/ERP-INTEGRATION-PENDING.md`
6. `docs/construction-v1/README.md`
7. `docs/construction-v1/OFFICIAL-CONSTRUCTION-PLAN.md`
8. `docs/construction-v1/PHASES-AND-GATES.md`
9. this `phase-0/` directory

## What Phase 0 must accomplish

- verify that product, architecture and construction docs do not contradict each other;
- freeze the V1 build boundary well enough to begin Foundation;
- separate approved decisions from intentionally pending decisions;
- confirm that visual design can continue in parallel without blocking backend/foundation work;
- confirm component/deployment boundaries so landing, catalog/customer app, admin, API, extension and QR Worker remain independently deployable;
- confirm the ERP/Wappsi track remains non-blocking and unverified;
- establish source-of-truth, risk and evidence records;
- finish with an explicit `PHASE 0: PASS` or `PHASE 0: BLOCKED`.

## Forbidden in Phase 0

- no production feature implementation;
- no destructive file moves of the current landing or QR Worker;
- no Wappsi assumptions promoted to fact;
- no invented product-field visibility rules;
- no secret, credential, invoice or real customer data committed;
- no changes directly to `main`.

## Exit

When `PHASE-0-GATE.md` is PASS, create the next implementation branch from the approved construction baseline and start Foundation using `docs/construction-v1/BUILD-START-GOAL.md`.
