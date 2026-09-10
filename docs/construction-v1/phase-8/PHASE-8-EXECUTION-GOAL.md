# Phase 8 — Execution Goal

## Mission
Implement internal admin promotion management and customer promotion interest on `build/admin-promotions-v1`.

## Required work
1. Implement admin authentication/perimeter and role checks appropriate to the chosen deployment model.
2. Create promotion, targeting, lifecycle and interest migrations.
3. Implement promotion CRUD with start/end/status validation.
4. Implement targeting for a specific customer and for a business type.
5. Enforce eligibility at API query time so non-target customers cannot retrieve private promotions.
6. Let customers select one or multiple eligible promotions and continue to an advisor through approved WhatsApp/email handoff.
7. Include promotion IDs/context in the commercial handoff without creating an automatic order.
8. Add audit events for creation, targeting, edits, activation/deactivation and customer interest.
9. Add consent/channel hooks where legally/operationally required; do not invent unapproved push behavior.
10. Add authorization, lifecycle, eligibility and E2E tests.

## Rules
- promotions support advisor conversion, not checkout;
- admin operations require explicit authorization;
- do not rely on unvalidated ERP pricing/stock claims;
- customer segmentation starts with customer ID and business type only unless later approved.

## Stop condition
Evaluate `PROMOTIONS PASS` and stop before production-hardening work.