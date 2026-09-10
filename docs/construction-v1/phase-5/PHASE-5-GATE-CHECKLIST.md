# Phase 5 — Gate Checklist

Final gate: `COMMERCIAL MVP PASS` or `COMMERCIAL MVP BLOCKED`.

- [ ] customer submits a solicitud using real seeded catalog products;
- [ ] solicitud snapshots correct product context;
- [ ] duplicate submission with same idempotency key creates one solicitud;
- [ ] seller/advisor assignment is deterministic/auditable;
- [ ] assigned advisor can see business/request/product context;
- [ ] customer sees `Solicitud enviada` after successful creation;
- [ ] status history is append-only/auditable;
- [ ] favorites can change/delete without corrupting solicitud;
- [ ] failed WhatsApp/email open/send is not marked successful;
- [ ] unauthorized customer cannot read another customer's request;
- [ ] desktop E2E PASS;
- [ ] mobile E2E PASS;
- [ ] staging pilot instructions exist.

## Evidence
Record migration version, API/E2E tests, idempotency evidence, assignment evidence and staging pilot URL.

## Decision
- Status: NOT EVALUATED
- Blocking defects:
- Pilot readiness:
- Next branch if PASS: `build/seller-extension-v1`