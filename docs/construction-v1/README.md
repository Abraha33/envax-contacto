# ENVAX — Construction V1

Status: **official construction plan, Phase 0 ready to start**.

Planning branch: `docs/official-construction-plan-v1`

Current execution branch: `phase/0-product-build-readiness`

This directory converts the approved ENVAX product concept into a buildable technical plan. It does **not** assume that Wappsi/ERP integration works; that track remains isolated and pending real validation.

## Start now — Phase 0

Read:

1. `phase-0/START-HERE.md`
2. `phase-0/PHASE-0-EXECUTION-GOAL.md`
3. `phase-0/PHASE-0-CHECKLIST.md`
4. `phase-0/PHASE-0-DECISION-REGISTER.md`
5. `phase-0/PHASE-0-RISK-REGISTER.md`
6. `phase-0/PHASE-0-EVIDENCE.md`
7. `phase-0/PHASE-0-GATE.md`
8. `phase-0/PHASE-0-HANDOFF.md`

Phase 0 must finish with `PHASE 0: PASS` or `PHASE 0: BLOCKED`. Do not start Foundation code inside the Phase 0 branch.

## Full construction read order

1. `OFFICIAL-CONSTRUCTION-PLAN.md`
2. `ARCHITECTURE.md`
3. `WORKSTREAMS.md`
4. `REPO-STRUCTURE.md`
5. `DATA-MODEL.md`
6. `API-CONTRACTS.md`
7. `PHASES-AND-GATES.md`
8. `TESTING-SECURITY-OPERATIONS.md`
9. `CLOUDFLARE-DEPLOYMENT.md`
10. `ERP-EXTENSION-TRACK.md`
11. `BUILD-START-GOAL.md`
12. `HANDOFF.md`

Also read the canonical product documents in `docs/`, especially `PRODUCT-VISION.md`, `USER-FLOW.md`, `FAVORITES.md`, `SCREEN-MAP.md`, `ROADMAP.md`, and `ERP-INTEGRATION-PENDING.md`.

## Technical direction

ENVAX will be built as one product with independently deployable components:

- customer web app: catalog + anonymous mode + later customer portal;
- admin web app;
- modular REST API on Cloudflare Workers;
- Cloudflare D1 as the operational relational database for V1;
- Cloudflare R2 for product/media assets;
- Cloudflare Queues only where asynchronous/retryable work is useful;
- seller browser extension as a temporary ERP bridge;
- existing QR Worker kept independent;
- provider-neutral adapters for email, WhatsApp and future ERP integration.

Frontend baseline: **React + TypeScript + Vite**.

Backend baseline: **TypeScript Cloudflare Worker**, modular routing, shared runtime validation, no direct database access from any browser app or extension.

## Construction rule

Build vertical capabilities, not isolated screens. Every phase must end with a testable user/business outcome and an explicit gate.

## MVP boundary

The first commercial MVP ends when a customer can:

`enter → explore catalog → create named favorites lists → send a pedido request → receive confirmation → be routed to an advisor`

The customer CTA may say **Enviar pedido**. Internally ENVAX first creates a `solicitud`; a validated seller/extension flow later converts it into a real `pedido`.

## Non-blocking parallel work

Visual UX/UI can continue separately while Phase 0 and Foundation planning proceed. Customer-facing UI implementation must not invent unapproved visual design; it waits for the relevant Design Ready gate.

## ERP rule

Wappsi/API is **PENDING REAL VALIDATION**. Product construction must not be blocked by it and must not expose unverified ERP assumptions in the core domain model.
