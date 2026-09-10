# Phase 5 — Execution Goal

## Mission
Implement the ENVAX commercial MVP on `build/commercial-mvp-v1`.

## Required work
1. Create order-request/order-request-item/status-history migrations and domain rules.
2. Implement `Enviar pedido` from a favorite list or approved product selection.
3. Snapshot product references/data required to preserve what the customer requested even if favorites/catalog later change.
4. Require idempotency on solicitud creation and test retries/double-clicks.
5. Implement deterministic seller/advisor assignment with an auditable rule.
6. Implement customer-visible status mapping and confirmation.
7. Implement provider-neutral WhatsApp/email handoff adapters; external channel failure must not be recorded as successful delivery.
8. Create the minimum internal operational read/view needed for advisors to see request context.
9. Add audit/status history and authorization tests.
10. Run desktop/mobile E2E from catalog through successful solicitud creation.

## Rules
- customer language may say `Enviar pedido`; backend entity begins as solicitud;
- no checkout, online payment or cart totals;
- no direct ERP dependency;
- deleting favorites must never delete an already-created solicitud.

## Stop condition
Evaluate `COMMERCIAL MVP PASS`. If PASS, the product may begin a controlled pilot while Phase 6 is developed separately.