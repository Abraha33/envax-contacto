# Phase 8 — Gate Checklist

Final gate: `PROMOTIONS PASS` or `PROMOTIONS BLOCKED`.

- [ ] admin authorization enforced on every mutation;
- [ ] promotion CRUD/lifecycle validation PASS;
- [ ] targeting a specific customer works;
- [ ] targeting a business type works;
- [ ] non-target customer cannot retrieve targeted promotion;
- [ ] eligible customer can select one promotion;
- [ ] eligible customer can select multiple promotions;
- [ ] advisor handoff contains correct promotion context;
- [ ] no promotion flow creates checkout/automatic purchase;
- [ ] audit trail covers admin changes and customer interest;
- [ ] lifecycle dates/time boundaries tested;
- [ ] ERP-dependent claims are absent unless separately validated.

## Evidence
Record authorization tests, target-query tests, lifecycle tests, E2E handoff evidence and audit examples.

## Decision
- Status: NOT EVALUATED
- Blocking defects:
- Next branch if PASS: `release/production-readiness-v1`