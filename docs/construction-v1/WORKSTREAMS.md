# ENVAX — Workstreams V1

This document answers who/what owns each responsibility even if one maintainer plus AI agents execute the work.

## 1. Frontend — Customer

Owns:
- public catalog navigation/UI;
- category/brand/search/product experiences;
- temporary local anonymous favorites if implemented;
- Supabase-authenticated customer UX;
- persistent named-list UI;
- request preparation/submission UI;
- own-order/status views;
- eligible-promotion UI;
- responsive/accessibility states.

Does not own:
- identity truth;
- database authorization;
- business state transitions;
- ERP secrets;
- promotion eligibility rules;
- seller/admin permissions.

## 2. Frontend — Admin/Internal

Owns presentation for:
- requests/orders;
- catalog administration;
- customers/internal member management;
- promotions;
- configuration;
- audit/analytics views;
- seller commercial operations as appropriate.

UI visibility never replaces API/RLS authorization.

## 3. Backend / API

Supabase Edge Functions own application/business rules:
- session/JWT validation;
- role/permission checks;
- ownership checks;
- catalog contracts;
- customer profile operations;
- persistent list operations;
- formal request creation/snapshots;
- idempotency;
- request/order transitions;
- promotion eligibility;
- audit events;
- integration adapters;
- extension contracts.

There is no V1 seller-assignment engine because V1 has one seller.

## 4. Database / Data

Supabase PostgreSQL owns:
- relational schema;
- migrations;
- constraints/indexes;
- RLS policies;
- transactional functions/RPC where useful;
- development seed fixtures;
- request/order snapshots;
- data integrity;
- audit/idempotency storage;
- backup/restore evidence.

No D1 business schema exists in the current baseline.

## 5. Authentication

Supabase Auth owns:
- email/password credentials;
- login/logout;
- password recovery;
- sessions/JWT.

ENVAX stores application role/profile data, not passwords.

## 6. Catalog content/assets

Owns:
- canonical catalog source/import data;
- reference/SKU mapping;
- category/brand/variant taxonomy;
- product descriptions/attributes;
- approved public photos/media;
- media quality/alt text.

Storage lives in Supabase Storage; metadata/relations live in PostgreSQL.

Prices and stock are outside V1.

## 7. Seller extension

Owns:
- explicit seller-initiated capture/context;
- deterministic normalization/parsing where needed;
- ambiguity reporting;
- authenticated calls to ENVAX API;
- no secrets in bundle;
- no silent commercial writes from uncertain data.

It does not own state-transition rules; the server does.

## 8. Analytics

Owns:
- acquisition/QR/campaign events;
- navigation/product events;
- search/filter/list/request conversion events;
- device/performance/error events;
- event filtering/minimization;
- provider-neutral event contract.

Analytics is not authorization or commercial source of truth.

## 9. Audit

Owns immutable/append-oriented evidence for sensitive actions:
- request/order transitions;
- cancellations;
- `FACTURADO`;
- admin changes;
- extension writes.

Audit is separate from Analytics.

## 10. DevOps / Infrastructure

Owns:
- pnpm/Node toolchain;
- Supabase CLI/local environment;
- CI;
- staging/production environment separation;
- migrations/deploys;
- secret management;
- restore drills;
- Cloudflare landing/QR/static delivery where retained;
- release/rollback evidence.

## 11. ERP validation track

Independent from core construction.

Owns:
- real credentials/environment validation;
- read/write capability testing;
- reliability/security findings;
- eventual `ErpGateway` adapter only after evidence.

It must not modify core domain contracts based on unverified assumptions.
