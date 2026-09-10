# ENVAX — Workstreams V1

This document answers “who/what builds what” even if one person/AI pair executes all work.

## 1. Frontend — Customer

Owns:
- landing handoff;
- catalog navigation/UI;
- categories/brands/families/products;
- search/filter UI;
- anonymous-mode prompts;
- favorites lists;
- pedido-request UI;
- customer status views;
- portal/order history;
- promotion selection;
- responsive/accessibility states.

Does not own:
- identity truth;
- seller assignment;
- database writes directly;
- ERP credentials;
- promotion eligibility rules;
- request/order state transitions.

## 2. Frontend — Admin

Owns:
- internal operational views;
- incoming solicitudes/pedidos;
- seller/admin controls exposed by API;
- promotion creation/targeting;
- customer/business-type targeting UI;
- audit/status presentation.

Does not bypass API authorization.

## 3. Backend / API

Owns the business rules:
- sessions/identity;
- anonymous recovery;
- portal upgrade;
- catalog visibility policy;
- favorites ownership;
- solicitud creation;
- idempotency;
- seller assignment;
- solicitud → pedido conversion;
- customer-visible status mapping;
- promotion eligibility;
- audit events;
- provider adapters;
- ERP gateway interface.

This is the only application layer that performs privileged D1/R2/Queue actions.

## 4. Database / Data

Owns:
- relational schema;
- migrations;
- constraints/indexes;
- Product Master import format;
- seeds/fixtures;
- request/order snapshots;
- identity linking;
- catalog versions;
- data integrity;
- backup/restore evidence.

Data layer does not contain UI logic or vendor-specific Wappsi assumptions.

## 5. Catalog Content / Assets

Owns:
- canonical product source/export;
- SKU/reference mapping;
- categories/brands/families;
- variant mapping;
- asset lineage;
- image/media preparation;
- public/customer/internal visibility metadata.

This track can evolve separately from app code as long as import contracts stay stable.

## 6. Seller Extension

Owns:
- manual selected-text capture;
- deterministic parser;
- normalized payload;
- ambiguity review;
- authenticated API handoff;
- extension UX;
- no secret storage;
- fixture-based tests.

Does not directly update D1 or talk to ERP API with server credentials.

## 7. Integrations

Owns provider adapters:
- WhatsApp click-to-chat or future official provider;
- email provider/fallback;
- optional Google Sheet projection;
- future Wappsi adapter;
- outbound retry logic.

Core domains call interfaces, not provider-specific code.

## 8. Infrastructure / Cloudflare

Owns:
- Workers deployments;
- custom domains/routes;
- D1/R2/Queues bindings;
- Turnstile;
- Access for internal admin;
- staging/production separation;
- secrets;
- CI/CD deployment configuration;
- monitoring/rollback.

## 9. QA / Security / Operations

Owns:
- unit/integration/E2E suites;
- responsive/browser matrix;
- accessibility;
- security checks;
- recovery/restore drills;
- logs/metrics;
- release checklist;
- runbooks;
- pilot evidence.

## 10. Phase-to-workstream matrix

| Phase | Frontend | Backend | DB/Data | Extension | Infra | QA |
|---|---|---|---|---|---|---|
| 1 Foundation | shells | API shell | binding skeleton | shell only | CI/staging | smoke |
| 2 Catalog data | minimal consumer | catalog API | schema/import | — | D1/R2 | contract/import |
| 3 Catalog UX | primary | read support | seed data | — | deploy | responsive/E2E |
| 4 Identity/Favorites | primary | primary | identity/favorites | — | security config | isolation/E2E |
| 5 Pedido MVP | primary | primary | request/order model | — | handoff config | idempotency/E2E |
| 6 Seller bridge | status only | conversion API | ingestion/audit | primary | extension auth | fixtures/E2E |
| 7 Portal | primary | primary | customer linking | — | auth provider | privacy/E2E |
| 8 Promotions | customer+admin | eligibility/handoff | promotion model | — | async/provider | targeting/E2E |
| 9 Hardening | fixes | fixes | restore/indexes | fixes | monitoring | primary |

## 11. Practical execution order for one maintainer

Within each phase:
1. contract/schema first;
2. backend rule second;
3. frontend/extension consumer third;
4. integration fourth;
5. automated tests throughout;
6. staging verification;
7. gate evidence;
8. merge.

This prevents UI from inventing business rules and prevents the database from being shaped by one temporary screen.
