# ENVAX — Construction V1

Status: **canonical construction plan aligned with current V1 decisions**.

Branch: `docs/product-definition-v1`.

This directory converts the approved ENVAX product/domain architecture into an executable build plan. Wappsi/ERP remains isolated and pending real validation.

## Authority and read order

Read the current canonical architecture first:

1. `../ARCHITECTURE-DECISIONS.md`
2. `../BACKEND-FRONTEND-CONTRACT-V1.md`
3. `../API-DESIGN-V1.md`
4. `../DATABASE-DESIGN-V1.md`
5. `../BACKEND-ARCHITECTURE-V1.md`
6. `../INTEGRATIONS-V1.md`
7. `../SECURITY-PRIVACY-V1.md`
8. `OFFICIAL-CONSTRUCTION-PLAN.md`
9. `ARCHITECTURE.md`
10. `REPO-STRUCTURE.md`
11. `DATA-MODEL.md`
12. `API-CONTRACTS.md`
13. `PHASES-AND-GATES.md`
14. `TESTING-SECURITY-OPERATIONS.md`
15. `ERP-EXTENSION-TRACK.md`
16. `BUILD-START-GOAL.md`
17. `HANDOFF.md`

If a construction document conflicts with the canonical files above, correct it before coding.

## Technical direction

ENVAX V1 uses a modular-monolith architecture centered on Supabase:

- customer web app: React + TypeScript + Vite;
- admin/internal web app: React + TypeScript + Vite;
- Supabase Auth: email + password;
- Supabase PostgreSQL: operational source of truth;
- PostgreSQL RLS: row-level protection for private data;
- Supabase Storage: public catalog photos/media;
- Supabase Edge Functions: versioned REST API in TypeScript;
- versioned SQL migrations under `supabase/migrations`;
- seller browser extension as an operational bridge while ERP integration remains unverified;
- existing landing and QR Worker preserved until safe staging parity/rollback is proven.

Cloudflare may continue hosting the public landing, static frontends and QR routing. It is no longer the V1 operational database/API authority.

Do not build D1/R2 business storage in parallel with Supabase.

## Product rules that construction must preserve

- public catalog works without login;
- anonymous business data is not persisted in ENVAX;
- anonymous favorites, if offered, are device-local only;
- persistent lists and formal commercial records require authentication;
- one seller only in V1;
- no seller routing engine;
- no price or stock engine;
- no electronic-invoice domain/entity;
- public product photography/media is allowed;
- commercial lifecycle ends at `FACTURADO` as an external-process confirmation;
- Wappsi does not block core ENVAX.

## Construction rule

Build vertical capabilities, not isolated screens. Every phase ends with a verifiable user/business outcome and an explicit gate.

## MVP boundary

The commercial MVP must prove:

`public catalog → authenticated persistent list/selection → formal solicitud → single seller → confirmed pedido`

Then the seller can later mark the order `FACTURADO` only after the external invoicing process really succeeds.

Direct WhatsApp/email contact remains a separate valid path and does not automatically create a formal request.

## Non-blocking parallel work

UX/UI can continue independently. Do not invent unapproved customer-facing visual design while building backend/foundation.

## ERP rule

Wappsi/API is **PENDING REAL VALIDATION**.

Core construction must use provider-neutral boundaries and manual/seller-extension fallbacks so ERP uncertainty cannot block V1.
