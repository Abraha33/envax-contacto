# Phase 4 — Gate Checklist

Final gate: `IDENTITY FAVORITES PASS` or `IDENTITY FAVORITES BLOCKED`.

- [ ] anonymous account can be created without contact data;
- [ ] secure session cookie verified;
- [ ] business name/type persists;
- [ ] recovery secret is not stored plaintext server-side;
- [ ] second device restores same anonymous identity using approved recovery flow;
- [ ] recovery can be revoked/rotated as designed;
- [ ] multiple named favorite lists persist;
- [ ] add/remove/move operations work;
- [ ] one anonymous account cannot read/write another account's favorites;
- [ ] recovery abuse/rate-limit tests PASS;
- [ ] favorites remain independent from future order records;
- [ ] E2E persistence/recovery flow PASS.

## Evidence
Record migration version, security tests, ownership tests, E2E output and recovery-flow evidence.

## Decision
- Status: NOT EVALUATED
- Blocking defects:
- Next branch if PASS: `build/commercial-mvp-v1`