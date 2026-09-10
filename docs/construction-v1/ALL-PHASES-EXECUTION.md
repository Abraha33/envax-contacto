# ENVAX — All Construction Phases

Status: **canonical execution map for V1**.

This file is the index for every construction phase. Phase 0 is the only active phase until its gate passes. Future phase branches are created only when their entry preconditions are satisfied.

| Phase | Capability | Planned branch | Exit gate |
|---|---|---|---|
| 0 | Product / Design / Build Readiness | `phase/0-product-build-readiness` | `PHASE 0: PASS` |
| 1 | Foundation | `build/foundation-v1` | `FOUNDATION PASS` |
| 2 | Catalog Data | `build/catalog-data-v1` | `CATALOG DATA PASS` |
| 3 | Customer Catalog UI | `build/catalog-ui-v1` | `CATALOG UX PASS` |
| 4 | Anonymous Identity + Favorites | `build/identity-favorites-v1` | `IDENTITY FAVORITES PASS` |
| 5 | Pedido Request + Advisor — MVP | `build/commercial-mvp-v1` | `COMMERCIAL MVP PASS` |
| 6 | Seller Browser Extension | `build/seller-extension-v1` | `SELLER BRIDGE PASS` |
| 7 | Customer Portal | `build/customer-portal-v1` | `PORTAL PASS` |
| 8 | Admin + Promotions | `build/admin-promotions-v1` | `PROMOTIONS PASS` |
| 9 | Production Hardening | `release/production-readiness-v1` | `PRODUCTION READY` |

## Per-phase package

Each Phase 1–9 directory contains:
- `README.md`: objective, boundaries, preconditions and outputs;
- `PHASE-X-EXECUTION-GOAL.md`: autonomous execution instructions for Claude/Codex;
- `PHASE-X-GATE-CHECKLIST.md`: evidence-based PASS/BLOCKED criteria.

Phase 0 contains a larger readiness package because it establishes authority, risks, evidence and handoff for the full build.

## Execution discipline

1. Never implement directly on `main`.
2. Start a phase only after the previous required gate is PASS.
3. Do not let Wappsi/API uncertainty block ENVAX core; ERP remains a parallel validation track.
4. Do not invent unapproved customer-facing visual design. Phase 3 requires `DESIGN READY` for the screens being implemented.
5. Every database change is migration-driven.
6. Every write path defines validation, authorization, idempotency where relevant, and audit behavior.
7. A phase is complete only with test/build/staging evidence, not because code exists.
8. Record final state as PASS or BLOCKED and write a handoff before moving to the next phase.

## MVP milestone

The commercial MVP is reached at the end of Phase 5:

`enter → explore catalog → create named favorite lists → send pedido request → receive confirmation → advisor receives context`

Phases 6–9 improve internal operations, recurrence, promotions and production readiness without redefining the core product.