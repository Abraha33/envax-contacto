# Phase 5 — Pedido Request + Advisor — Commercial MVP

## Objective
Turn catalog interest into a real ENVAX commercial request handled by an advisor.

Planned branch: `build/commercial-mvp-v1`

Entry condition: `IDENTITY FAVORITES PASS`.

## In scope
- `Enviar pedido` customer flow;
- create internal `order_request` / solicitud;
- snapshot requested products independently from favorites;
- idempotency for submission;
- seller/advisor assignment by system rule;
- customer-visible states: `Solicitud enviada → En atención → Pedido confirmado → Completado`;
- WhatsApp/email handoff adapters;
- customer confirmation;
- minimal internal operational view/API;
- order-request audit/history.

## Out of scope
- direct ERP order creation;
- seller extension automation;
- verified Portal;
- promotions.

## Required outputs
A real customer can browse, choose products, send a pedido request and have the correct context reach the assigned advisor without ecommerce checkout/payment.

## Exit
Phase 5 ends at `COMMERCIAL MVP PASS`. This is the first pilot-ready commercial milestone.