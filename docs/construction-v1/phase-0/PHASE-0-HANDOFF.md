# Phase 0 — Handoff

## Repository
`Abraha33/envax-contacto`

## Execution branch
`phase/0-product-build-readiness`

## Base
`docs/official-construction-plan-v1`

## Current status
`READY TO START — PHASE 0 NOT YET EXECUTED`

## Start here
`docs/construction-v1/phase-0/START-HERE.md`

Then use:
`docs/construction-v1/phase-0/PHASE-0-EXECUTION-GOAL.md`

## What Phase 0 is
A short readiness phase that verifies product authority, architecture boundaries, repository/deployment safety, unresolved decisions, ERP isolation, design/build dependencies, security constraints and phase evidence before Foundation begins.

## What Phase 0 is not
- not application implementation;
- not frontend visual construction;
- not ERP integration;
- not migration of the production landing;
- not seller-extension parser development.

## Canonical non-negotiables
- ENVAX is B2B catalog, not ecommerce.
- Anonymous identity first; Portal optional.
- Multiple named Favorites lists.
- `Enviar pedido` creates solicitud first.
- Seller/extension can later convert solicitud → pedido.
- Wappsi/API is pending real validation.
- Independent Cloudflare deployments.
- One-maintainer simplicity.
- No secrets or real customer/ERP confidential data in the public repository.

## Expected next step after PASS
Create `build/foundation-v1` and execute `docs/construction-v1/BUILD-START-GOAL.md`.
