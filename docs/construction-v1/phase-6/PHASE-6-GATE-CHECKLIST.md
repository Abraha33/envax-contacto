# Phase 6 — Gate Checklist

Final gate: `SELLER BRIDGE PASS` or `SELLER BRIDGE BLOCKED`.

- [ ] 5–10 real sanitized copied-text fixtures exist;
- [ ] every approved fixture parses deterministically;
- [ ] unrelated selected text does not trigger a state change;
- [ ] extension captures only explicit user-selected/copied text;
- [ ] least-privilege permissions reviewed;
- [ ] ambiguous/incomplete sample requires review and creates no silent write;
- [ ] valid sample matches the correct solicitud;
- [ ] valid conversion creates exactly one pedido;
- [ ] retry/duplicate capture is idempotent;
- [ ] customer-facing status reflects conversion correctly;
- [ ] audit event records actor/source/result;
- [ ] no ERP/API secret embedded in extension;
- [ ] no direct D1 access exists.

## Evidence
Record fixture suite results, extension permissions, API tests, idempotency test and audit example.

## Decision
- Status: NOT EVALUATED
- Blocking defects:
- Next branch if PASS: `build/customer-portal-v1`