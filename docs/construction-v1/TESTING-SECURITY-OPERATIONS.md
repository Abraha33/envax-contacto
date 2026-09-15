# ENVAX — Testing, Security and Operations V1

## 1. Testing strategy

Testing is part of every construction phase.

### Unit tests
Cover pure rules such as:
- state-transition rules;
- favorites/list rules;
- catalog visibility;
- promotion eligibility;
- idempotency helpers;
- extension/parser normalization;
- permission decision helpers.

### Database integration tests
Use a local/test Supabase PostgreSQL instance rebuilt from migrations.

Cover:
- constraints/indexes;
- RLS policies;
- customer ownership isolation;
- request→order transaction;
- idempotency;
- catalog import/upsert behavior;
- audit writes.

### API contract tests
Every endpoint as applicable:
- valid request;
- invalid schema;
- unauthenticated/forbidden;
- ownership isolation;
- invalid state transition;
- idempotency;
- stable error code.

### Browser E2E
Use Playwright.

Critical journeys by phase:
1. landing → catalog → product;
2. customer login/register/recovery;
3. create named persistent list;
4. add/remove product variant;
5. prepare/send formal request;
6. seller starts attention;
7. seller confirms order;
8. customer sees own order/status;
9. admin promotion targeting;
10. seller marks `FACTURADO` after simulated successful external process.

Anonymous browser contexts are used to prove private APIs are inaccessible; no persisted anonymous-account recovery flow exists in V1.

### Extension tests
- parser fixtures are pure unit tests;
- browser extension integration uses controlled fixtures;
- no production ERP needed for normal CI;
- ambiguous input must produce no silent write;
- real ERP smoke remains controlled/manual until safe automation exists.

## 2. Accessibility/browser matrix

Before production test representative:
- current Chromium desktop;
- Edge desktop;
- Safari where available;
- Android Chrome viewport/device;
- iPhone Safari viewport/device;
- 360px mobile;
- tablet;
- standard and large desktop;
- zoom/text scaling.

## 3. Security model

### Customer auth
- Supabase Auth email + password;
- standard secure Supabase sessions/JWT;
- no second password store;
- no password/token logging;
- MFA future optional reinforcement.

### Database isolation
- RLS enabled for private tables;
- policies derive ownership from authenticated identity;
- browser-provided `customer_id` is never trusted as ownership proof;
- service-role keys are server-only.

### Admin
- Supabase-authenticated `ADMIN` application role;
- full V1 administration/operations;
- sensitive actions audited;
- hidden route is never considered authorization.

Additional perimeter protection such as Cloudflare Access may be added for admin defense-in-depth, but it does not replace application authorization.

### Seller
- one authenticated `SELLER` in V1;
- commercial operations only;
- cannot administer catalog/users/promotions/config;
- cannot erase audit/commercial history.

### Seller extension
- uses seller auth context;
- no permanent service-role/ERP secret bundled;
- minimum browser permissions;
- selected/necessary external context only;
- no silent state write from ambiguous data.

### Secrets
Never commit or expose:
- Supabase service-role/secret keys;
- ERP/provider credentials;
- real customer data;
- auth tokens;
- `.env` files.

Use Supabase project secrets/environment and CI secret storage.

## 4. Privacy/data minimization

Public browsing requires no customer identity.

Persistent business data is collected only after authentication and is limited to approved needs.

Do not use IP as customer identity.

Analytics may use pseudonymous/anonymous session identifiers but must not capture passwords, credentials, private messages or unnecessary personal data.

Detailed Analytics retention baseline: 12 months, subject to legal/privacy closure before production.

## 5. Idempotency

Required at minimum for:
- formal request creation;
- request→order conversion;
- sensitive retryable commercial commands;
- future external integration writes.

## 6. Observability

Every API request should have a `requestId`/correlation ID.

Structured log baseline:
- timestamp;
- requestId;
- route/action;
- status;
- duration;
- safe actor identifier/role when appropriate;
- error code;
- deployment version/commit.

Never log passwords, full tokens, service keys, ERP secrets or private message content.

Audit and technical logs are separate.

## 7. Backup/recovery

- migrations in Git;
- staging before production;
- Supabase/platform backup capability chosen according to final plan;
- real restore drill required before `PRODUCTION READY`;
- RPO/RTO recorded in operations docs once infrastructure plan is selected;
- catalog media must have recoverable source/metadata.

## 8. Performance baseline

Measure rather than guess.

Initial goals:
- small customer bundle and lazy loading where useful;
- responsive images;
- paginated/indexed catalog queries;
- no ERP call in customer critical path;
- Edge Functions remain short-lived; heavy future jobs move out of request path;
- query plans reviewed after realistic seed volume exists.

## 9. CI gates

Every implementation PR should run:
- frozen-lockfile install;
- lint;
- typecheck;
- unit tests;
- database/RLS integration tests when schema changes;
- API contract tests when API changes;
- affected app/package builds;
- E2E smoke when environment supports it;
- dependency/security review.

CI/deploy output must identify the exact Git commit.

## 10. Release/rollback

Use staging before production.

For each release know:
- migrations included;
- functions/apps changed;
- rollback strategy;
- whether DB migration is backward compatible;
- post-deploy critical smoke tests.

## 11. Required pre-production security evidence

Must prove:
- Customer A cannot read/write Customer B resources;
- anonymous visitor cannot access private customer data;
- customer cannot perform seller/admin transitions;
- seller cannot perform admin-only operations;
- service-role secrets are absent from browser/extension builds;
- RLS enabled on private tables;
- Storage public bucket cannot be anonymously written;
- retries do not duplicate formal requests/orders;
- logs do not leak auth/provider secrets;
- sensitive actions leave audit records.

## 12. Operational runbook minimum

Before production document:
- how to deploy/rollback customer/admin/API;
- how to apply/check migrations;
- how to inspect API/log errors;
- how to revoke customer/seller/admin sessions;
- how to disable the seller-extension write path;
- how to restore PostgreSQL/project data;
- how to rotate secrets;
- how to respond if future ERP integration fails.
