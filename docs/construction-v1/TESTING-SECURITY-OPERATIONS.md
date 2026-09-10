# ENVAX — Testing, Security and Operations V1

## 1. Testing strategy

Testing is part of construction, not a final cleanup phase.

### Unit tests
Cover pure business rules:
- seller assignment policy;
- customer-visible status mapping;
- favorites list rules;
- product visibility policy;
- promotion eligibility;
- parser functions;
- idempotency helpers.

### Database integration tests
Use isolated local/test D1 database created from migrations.

Cover:
- constraints;
- ownership queries;
- transactional state changes where supported by chosen data access path;
- request → order conversion;
- catalog import/upsert behavior;
- anonymous → customer linking.

### API contract tests
For every public/admin/seller endpoint:
- valid request;
- invalid schema;
- unauthorized/forbidden;
- not found;
- ownership isolation;
- idempotency if applicable;
- stable error codes.

### Browser E2E
Use Playwright.

Critical journeys:
1. landing → catalog → product;
2. anonymous creation;
3. create named favorites list;
4. add/remove/move favorite;
5. recover anonymous identity on another browser context;
6. send pedido request;
7. confirmation/status view;
8. portal upgrade/order history when Phase 7 exists;
9. admin promotion target → customer visibility when Phase 8 exists.

### Extension tests
- parser fixtures are plain unit tests;
- browser extension integration tests use controlled HTML fixtures;
- no production ERP is required for normal CI;
- real ERP smoke is manual/controlled until automation is safe.

## 2. Responsive/browser matrix

Minimum before commercial MVP:
- Chrome desktop current;
- Edge desktop current;
- Safari desktop current where available;
- Chrome Android representative viewport;
- Safari iPhone representative viewport;
- 360px mobile width;
- common tablet width;
- standard desktop;
- large desktop.

Test zoom and text scaling. Do not validate responsive design only by resizing one desktop browser.

## 3. Accessibility baseline

- semantic headings/landmarks;
- keyboard-operable navigation/actions;
- visible focus;
- form labels/errors;
- sufficient contrast;
- touch targets;
- reduced-motion handling where motion exists;
- no color-only status communication;
- automated accessibility checks plus manual keyboard pass.

## 4. Security model

### Browser/customer auth
- Secure/HttpOnly session cookie;
- random server-side session secret;
- session secret stored hashed if persisted;
- CSRF strategy appropriate to same-site cookie API;
- session rotation/revocation;
- no primary auth token in localStorage.

### Anonymous recovery
- recovery credential generated cryptographically randomly;
- shown only when created/rotated;
- only hash stored;
- rate-limit recovery attempts;
- credential rotation invalidates previous one;
- never derive recovery from business name/type.

### Admin
- internal admin should sit behind Cloudflare Access initially;
- application role checks on every admin API route;
- audit sensitive actions;
- no trust based only on hidden URL.

### Seller extension
- no permanent secret bundled in extension;
- short-lived/pairing auth;
- minimum host/browser permissions;
- selected text only;
- no silent full-page scraping;
- state transition validated on server;
- raw ERP text not stored by default.

### Public abuse
Use rate limiting and Turnstile selectively for abuse-prone flows such as account/recovery/verification or excessive submissions. Server must always verify Turnstile token when used.

### Secrets
Secrets belong in Cloudflare secret bindings / CI secret storage, never:
- Git;
- frontend code;
- extension bundle;
- D1 public rows;
- logs.

## 5. Data minimization/privacy

- collect only business name/type for anonymous mode;
- contact data only when customer chooses a verified portal/contact flow;
- IP may be security/analytics metadata but never identity;
- avoid storing raw ERP clipboard text;
- redact logs;
- retention remains configurable until policy/legal review closes it;
- support contact/session revocation and later deletion/anonymization workflow.

## 6. Idempotency

Required for:
- order-request creation;
- extension ingestion/conversion;
- async email/provider jobs;
- promotion fan-out/delivery jobs if introduced.

Queue consumers must tolerate at-least-once delivery.

## 7. Observability

Every API request gets `requestId`.

Structured log minimum:
- timestamp;
- requestId;
- route/action;
- status code;
- duration;
- actor type/id pseudonymous where safe;
- error code;
- deployment version/commit.

Never log:
- recovery secret;
- session secret;
- provider keys;
- full copied ERP text;
- unnecessary customer contact data.

Business metrics baseline:
- landing → catalog entries;
- product views;
- favorites created/items added;
- pedido requests submitted;
- requests by status;
- conversion request → order;
- promotion interest later;
- error/retry rates.

## 8. Backup/recovery

D1 migration discipline:
- every schema change is a committed migration;
- apply staging first;
- verify application compatibility;
- production migration has rollback/restore note.

Before `PRODUCTION READY`, perform a real restore drill using D1 recovery capabilities and document recovery time/result.

R2 asset recovery/source lineage:
- assets should be reproducible or backed by canonical source;
- never treat a browser cache as source of truth;
- store checksums/source metadata where useful.

## 9. Performance budgets

Initial targets are budgets to measure, not contractual SLAs:
- keep customer JS bundle small enough for ordinary mobile networks;
- lazy-load non-critical routes/features;
- image sizes responsive and optimized when visible;
- avoid loading admin/portal code in public landing bundle;
- API catalog queries paginated/indexed;
- no network call to ERP in customer critical path.

Measure Core Web Vitals in staging/production and set concrete thresholds after first real design build.

## 10. CI gates

Every PR should run:
- install with lockfile;
- lint;
- typecheck;
- unit tests;
- API/database integration tests;
- build all affected packages/apps;
- E2E critical smoke where environment supports it;
- dependency/security audit review.

A deployment workflow must identify the exact Git commit.

## 11. Release/rollback

Use staging before production.

For each production release:
- know changed migrations;
- know affected deployables;
- deploy independent components only when needed;
- retain previous working deployment/rollback path;
- smoke critical flow immediately after release.

## 12. Operational runbook minimum

Document before production:
- how to deploy each app/worker;
- how to roll back;
- how to inspect API errors;
- how to revoke seller/admin/customer sessions;
- how to disable promotion sending;
- how to stop extension conversion if parser issue is found;
- how to restore D1;
- how to rotate provider secrets;
- whom to contact/what to do if Wappsi integration later fails.
