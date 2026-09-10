# Phase 0 — Execution Goal

## Mission
Execute ENVAX Phase 0 Product / Design / Build Readiness autonomously on branch `phase/0-product-build-readiness`.

Do not implement production features. This phase is documentation, verification and build-readiness only.

## Required behavior
1. Read the canonical product and construction docs listed in `START-HERE.md`.
2. Compare them against the current approved decisions recorded in the Phase 0 decision register.
3. Find contradictions, stale terminology, hidden assumptions and scope drift.
4. Resolve documentation conflicts conservatively when the approved direction is already clear.
5. If a decision is truly unresolved but does not block Foundation, isolate it behind a policy/interface and record it as pending.
6. If a decision truly blocks safe Foundation work, mark Phase 0 BLOCKED and state exactly why.
7. Audit the repository paths for the existing landing and QR Worker; do not move them.
8. Confirm that the construction architecture remains suitable for one maintainer and independent Cloudflare deployments.
9. Confirm that ERP/Wappsi assumptions remain outside the core build path.
10. Complete the checklist, risk register, evidence log and gate report.

## Deliverables
- updated canonical docs only where necessary;
- completed `PHASE-0-CHECKLIST.md`;
- updated `PHASE-0-DECISION-REGISTER.md`;
- updated `PHASE-0-RISK-REGISTER.md`;
- completed `PHASE-0-EVIDENCE.md`;
- final `PHASE-0-GATE.md` with PASS or BLOCKED;
- refreshed `PHASE-0-HANDOFF.md`.

## Stop condition
Stop after the Phase 0 gate is evaluated. Do not start Foundation code in the same phase branch.

If PASS, recommend creating `build/foundation-v1` from the approved construction baseline and executing `docs/construction-v1/BUILD-START-GOAL.md`.
