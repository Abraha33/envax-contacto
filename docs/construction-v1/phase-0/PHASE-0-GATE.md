# Phase 0 — Gate

Current status: **READY TO START — NOT YET EVALUATED**

## Gate name
`PRODUCT / DESIGN / BUILD READINESS`

## PASS criteria
Phase 0 is PASS only when all of the following are true:

1. Canonical product decisions and precedence are explicit.
2. No contradiction forces Phase 1 to guess product behavior.
3. All unresolved items are either isolated behind a boundary or explicitly blocking.
4. Wappsi/ERP remains non-blocking and unverified.
5. Landing and QR deployment are protected from destructive migration.
6. Phase 1 architecture baseline is confirmed.
7. Visual design dependencies are separated from backend/foundation work.
8. Security/privacy constraints are documented well enough to avoid unsafe defaults.
9. Evidence log is filled.
10. Next branch/task for Foundation is unambiguous.

## Allowed final states

### `PHASE 0: PASS`
Foundation can start without inventing unresolved product decisions.

### `PHASE 0: BLOCKED`
A specific unresolved decision prevents safe Foundation work. List the blocker, owner and exact evidence needed.

## Gate report template

```text
PHASE 0: PASS | BLOCKED

Product authority: PASS | BLOCKED
Architecture readiness: PASS | BLOCKED
Repository/deployment safety: PASS | BLOCKED
Data/source-of-truth readiness: PASS | BLOCKED
Security/privacy readiness: PASS | BLOCKED
Design/build interface: PASS | BLOCKED
ERP isolation: PASS | BLOCKED

Blocking items:
- ...

Non-blocking pending items:
- ...

Evidence:
- ...

Next action:
- ...
```

Do not mark PASS because documents merely exist. PASS requires the evidence log and contradiction/risk review to be completed.
