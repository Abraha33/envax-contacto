# ENVAX — Cloudflare Deployment V1

## 1. Decision

ENVAX V1 will stay Cloudflare-first to reduce operational burden and preserve the user's existing Cloudflare setup.

Current recommended platform baseline (September 2026):
- Cloudflare Workers + Static Assets for web apps;
- Cloudflare Vite plugin for React/Vite apps;
- D1 for relational operational data;
- R2 for unstructured product/media assets;
- Queues for retryable/background jobs only when needed;
- Turnstile for abuse-prone public forms;
- Cloudflare Access preferred for internal Admin protection;
- existing QR Worker retained independently.

Do not start new Workers Sites deployments. Cloudflare currently recommends Workers Static Assets for new full-stack/static Worker applications.

## 2. Why this fits ENVAX

- one-maintainer friendly;
- no server/VPS maintenance;
- React SPA and Worker API can run in the same Cloudflare runtime model;
- independent deployables are easy to keep separate;
- D1 fits relational favorites/orders/promotions data;
- R2 lets us control media access separately from catalog metadata;
- Queues can isolate slow/retryable provider calls without blocking customer requests.

## 3. Deployment units

Keep separate Cloudflare projects/scripts for:

1. Landing
2. Customer app
3. Admin app
4. API Worker
5. QR Worker
6. Async/Queue consumer Worker if introduced later

The exact DNS names are not frozen yet. A possible structure is:

```text
www.<domain>       -> landing
catalogo.<domain>  -> customer app
admin.<domain>     -> admin
api.<domain>       -> API Worker
qr.<domain>        -> QR Worker
```

A path-based alternative is allowed if preferred later. Do not hard-code domains into business logic; use environment configuration.

## 4. Existing landing safety

The current landing must remain independently deployable.

Migration procedure:
1. leave current production route untouched;
2. create `apps/landing` copy;
3. staging deploy from that directory;
4. compare HTML/behavior/QR destination/forms;
5. switch Cloudflare root/build configuration only after parity;
6. keep rollback route until verification is complete.

## 5. Workers Static Assets / Vite

For new React customer/admin apps use:
- React + Vite;
- `@cloudflare/vite-plugin`;
- Wrangler config per deployable app;
- SPA fallback for customer/admin client-side routes where appropriate;
- Worker routes for API paths only when frontend+API are intentionally co-located.

ENVAX still prefers a distinct API deployable for clearer boundaries because landing, customer, admin and extension all consume it.

## 6. D1 resources

Create independent D1 databases:
- local emulator/test;
- staging;
- production.

Never point staging to production D1.

Database changes:
- migrations in Git;
- staging apply first;
- verify;
- production apply;
- record migration/commit in release notes.

D1 Time Travel/backups provide recovery capabilities, but a documented restore drill is still required before production readiness.

## 7. R2 resources

Separate staging and production buckets.

Recommended key convention:

```text
products/{productId}/{assetId}/{filename}
promotions/{promotionId}/{assetId}/{filename}
internal/... 
```

Object visibility is not inferred from path alone. D1 metadata/policy decides whether the API returns public, customer-scoped, or internal access.

For protected assets use a Worker-controlled response or time-limited signed/presigned access. Never expose R2 API credentials to the browser.

## 8. Queues

Introduce a Queue when the task is retryable/background, e.g.:
- email send;
- future provider message;
- promotion fan-out;
- future ERP synchronization;
- batched analytics.

Do not queue basic catalog reads or synchronous favorites writes.

Because Cloudflare Queues are at-least-once delivery, every consumer must use event/job IDs for deduplication/idempotency. Configure a dead-letter queue for important outbound/integration jobs before production.

## 9. Turnstile

Use Turnstile selectively on abuse-prone public flows:
- anonymous account/recovery when risk threshold is met;
- verification;
- excessive request submission.

The browser widget alone is not validation; the server must verify the token.

Do not make every catalog navigation step show a challenge.

## 10. Cloudflare Access

For initial internal admin:
- restrict by approved ENVAX operator identity/email;
- use Access as perimeter protection;
- still enforce application authorization for admin actions.

Seller extension authentication should use ENVAX-issued short-lived pairing/session credentials, not a permanent Access/service secret embedded in the extension.

## 11. Environment variables and secrets

Each deployable has explicit bindings/configuration.

Examples of non-secret config:
- API base URL;
- environment name;
- public Turnstile sitekey;
- feature flags.

Secrets:
- provider API keys;
- Turnstile secret;
- R2 signing credentials if using S3 presign;
- future ERP credentials;
- internal webhook secrets.

Store secrets using Cloudflare/CI secret mechanisms, not Git.

## 12. CI/CD

Preferred path:
- GitHub PR → CI;
- merge approved code;
- staging deployment automatically or explicitly;
- smoke tests;
- production deploy after gate.

Do not configure every directory change to deploy every application. Use path filters or app-specific workflows so editing `docs/` or extension code cannot unexpectedly redeploy the landing.

## 13. Infrastructure inventory

Before production, create `docs/operations/CLOUDFLARE-INVENTORY.md` recording without secrets:
- zones/domains;
- DNS records used by ENVAX;
- Worker names;
- routes/custom domains;
- D1 database names/IDs;
- R2 bucket names;
- Queue names;
- Turnstile widget names;
- Access applications/policies;
- environment ownership.

This becomes the cleanup source for the currently cluttered Cloudflare account.

## 14. Official references

- Workers Static Assets: https://developers.cloudflare.com/workers/static-assets/
- React + Vite on Workers: https://developers.cloudflare.com/workers/framework-guides/web-apps/react/
- Cloudflare Vite plugin: https://developers.cloudflare.com/workers/vite-plugin/
- D1: https://developers.cloudflare.com/d1/
- D1 migrations: https://developers.cloudflare.com/d1/reference/migrations/
- R2 presigned URLs: https://developers.cloudflare.com/r2/api/s3/presigned-urls/
- Queues: https://developers.cloudflare.com/queues/
- Turnstile: https://developers.cloudflare.com/turnstile/

Validate product limits/pricing again before production because platform limits can change.
