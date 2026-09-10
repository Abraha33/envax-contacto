# Phase 0 — Checklist

Status at branch creation: **not executed yet**.

## A. Product authority
- [ ] Confirm canonical product documents and precedence.
- [ ] Confirm ENVAX remains B2B catalog, not ecommerce.
- [ ] Confirm landing entry: business name + business type.
- [ ] Confirm anonymous identity is default and Portal is optional.
- [ ] Confirm Favorites = multiple named lists.
- [ ] Confirm customer CTA `Enviar pedido` creates an internal solicitud first.
- [ ] Confirm customer-visible states: Solicitud enviada → En atención → Pedido confirmado → Completado.
- [ ] Confirm promotions target customer or business type and route interest to advisor.

## B. V1 boundaries
- [ ] Record what is in MVP and what is later.
- [ ] Keep direct ERP order creation future/pending.
- [ ] Keep Wappsi/API capabilities pending real validation.
- [ ] Keep public product-field/photo visibility explicitly pending where not approved.
- [ ] Confirm Portal does not become ERP/accounting/ecommerce.

## C. Architecture readiness
- [ ] Confirm TypeScript end-to-end baseline.
- [ ] Confirm React/Vite customer/admin apps.
- [ ] Confirm modular Cloudflare Worker REST API.
- [ ] Confirm D1 operational database, R2 assets, Queues only when needed.
- [ ] Confirm extension writes only through ENVAX API.
- [ ] Confirm no microservices in V1 without measured need.

## D. Repository/deployment readiness
- [ ] Confirm independent deployment boundaries for landing, customer app, admin, API, extension and QR Worker.
- [ ] Audit current landing/QR paths before any future migration.
- [ ] Confirm no destructive moves are required for Phase 1.
- [ ] Confirm branch strategy and phase gate discipline.

## E. Data/source-of-truth readiness
- [ ] Record authority for product concept docs.
- [ ] Record that catalog/product-data source for Phase 2 must be explicitly identified before ingestion.
- [ ] Record that D1 becomes ENVAX operational authority for ENVAX-owned state, not ERP truth.
- [ ] Record identity/favorites/order-request separation.
- [ ] Record audit/history requirements for commercial state changes.

## F. Security/privacy readiness
- [ ] Confirm public repository secret policy.
- [ ] Confirm anonymous identity does not rely on IP.
- [ ] Confirm least-privilege browser extension rule.
- [ ] Confirm admin perimeter baseline and future RBAC needs.
- [ ] Record unresolved privacy/legal items as non-blocking only if isolated from Foundation.

## G. Design readiness interface
- [ ] Confirm visual design work continues separately.
- [ ] Identify which Phase 1 work can proceed without final UI.
- [ ] Block customer-facing visual implementation until the corresponding design gate is approved.

## H. Gate package
- [ ] Update `PHASE-0-DECISION-REGISTER.md`.
- [ ] Update `PHASE-0-RISK-REGISTER.md`.
- [ ] Fill `PHASE-0-EVIDENCE.md`.
- [ ] Set `PHASE-0-GATE.md` to PASS or BLOCKED with reasons.
- [ ] Refresh `PHASE-0-HANDOFF.md` for Foundation.

A pending item does not automatically block Phase 0. It blocks only if Foundation cannot start safely without inventing the answer.
