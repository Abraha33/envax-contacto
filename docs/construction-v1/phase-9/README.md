# Phase 9 — Production Hardening

## Objective
Prove ENVAX can be operated safely in production with known performance, recovery, security and support procedures.

Planned branch: `release/production-readiness-v1`

Entry condition: `PROMOTIONS PASS` or an explicitly documented release scope that defers later optional capabilities while preserving the commercial MVP.

## In scope
- accessibility review;
- browser/device compatibility matrix;
- security review and dependency scan;
- rate limiting / Turnstile where justified;
- observability/logging/alerts;
- backup and restore drill;
- deployment and rollback rehearsal;
- performance/load smoke tests;
- privacy/data-retention implementation review;
- operational runbooks;
- controlled real-user pilot;
- defect triage and release checklist.

## Out of scope
- new product features;
- speculative scale architecture;
- unvalidated ERP integration as a release blocker.

## Required outputs
A production release candidate with reproducible deployment, tested rollback/restore, observable failure modes and no unresolved P0/P1 defects.

## Exit
Phase 9 ends only at `PRODUCTION READY`.