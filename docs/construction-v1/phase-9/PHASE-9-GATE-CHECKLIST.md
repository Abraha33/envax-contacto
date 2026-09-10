# Phase 9 — Gate Checklist

Final gate: `PRODUCTION READY` or `PRODUCTION BLOCKED`.

- [ ] critical E2E suite PASS;
- [ ] supported browser/device matrix PASS;
- [ ] accessibility blocking issues resolved;
- [ ] dependency/security scan reviewed and blocking findings resolved;
- [ ] authorization/secret exposure review PASS;
- [ ] rate limiting/abuse controls validated where required;
- [ ] logs and request correlation verified;
- [ ] critical alert path tested;
- [ ] restore drill PASS using real backup/recovery procedure;
- [ ] staging → production deployment rehearsal PASS;
- [ ] rollback rehearsal PASS;
- [ ] performance/load smoke results recorded with measured limits;
- [ ] privacy/data-retention release requirements reviewed;
- [ ] deployment/rollback/incident/restore/provider-outage runbooks complete;
- [ ] controlled pilot completed;
- [ ] no unresolved P0 defects;
- [ ] no unresolved P1 defects;
- [ ] known P2/P3 defects documented and accepted/scheduled.

## Evidence
Record release commit, CI runs, staging/production candidate identifiers, restore evidence, rollback evidence, performance report, security review, pilot findings and final defect list.

## Decision
- Status: NOT EVALUATED
- Release candidate:
- Blocking defects:
- Known accepted limitations:
- Final result: `PRODUCTION READY` or `PRODUCTION BLOCKED`