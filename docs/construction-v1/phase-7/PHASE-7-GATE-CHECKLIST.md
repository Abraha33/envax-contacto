# Phase 7 — Gate Checklist

Final gate: `PORTAL PASS` or `PORTAL BLOCKED`.

- [ ] anonymous account upgrades to verified customer without losing favorites;
- [ ] historical solicitudes/pedidos remain linked correctly;
- [ ] verification adapter contract tested;
- [ ] verification/recovery attempts rate-limited;
- [ ] logout/revocation works;
- [ ] verified customer sees only own orders;
- [ ] cross-customer authorization tests PASS;
- [ ] provider unavailable/disabled path fails gracefully;
- [ ] Portal contains no invoices/accounting/checkout features;
- [ ] upgrade/recovery E2E PASS;
- [ ] sensitive identity events are auditable.

## Evidence
Record migration version, identity-linking tests, authorization tests, E2E output and provider-failure behavior.

## Decision
- Status: NOT EVALUATED
- Blocking defects:
- Next branch if PASS: `build/admin-promotions-v1`