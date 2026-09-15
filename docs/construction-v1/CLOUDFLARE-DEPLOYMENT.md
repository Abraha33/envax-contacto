# ENVAX — Cloudflare Deployment V1

## 1. Current role

Cloudflare remains useful for the existing ENVAX public edge/delivery setup, but it is **not** the V1 operational backend authority.

Canonical backend is Supabase:
- Auth;
- PostgreSQL;
- RLS;
- Storage;
- Edge Functions.

Cloudflare must not introduce a parallel D1/R2 copy of ENVAX business data.

## 2. What Cloudflare may host

Current/possible Cloudflare responsibilities:
- existing landing/domain/DNS/CDN;
- static customer app delivery if chosen;
- static admin app delivery if chosen;
- existing QR Worker;
- optional Cloudflare Access perimeter for internal admin defense-in-depth;
- optional Turnstile or edge protections if later justified.

These are delivery/security helpers, not business source of truth.

## 3. Existing landing safety

The current root landing and QR flow are production-sensitive.

Migration procedure if/when frontend structure changes:
1. leave production route untouched;
2. create/copy new app structure;
3. deploy staging/preview;
4. compare behavior and destinations;
5. verify rollback;
6. switch production only after parity;
7. remove old duplicates in a later cleanup.

Foundation does not switch the live landing.

## 4. Customer/Admin web deployment

React + Vite apps may be deployed through Cloudflare static/Workers assets or another approved static host.

Business logic remains behind the Supabase API and Auth/RLS boundaries.

Public client configuration may contain only public values such as:
- Supabase project URL;
- Supabase publishable/anon key intended for browser use;
- environment name;
- public analytics/feature configuration.

Never expose service-role/secret keys.

## 5. Supabase environment separation

Use distinct local/staging/production environments or projects according to the final infrastructure plan.

Database schema changes are applied from versioned migrations.

Do not use Cloudflare D1 as a staging mirror for business records.

## 6. QR Worker

Keep existing `qr-worker/` independent until dedicated regression/migration work is approved.

QR analytics/source attribution may continue to route traffic into ENVAX, but commercial/customer state belongs to Supabase.

## 7. Cloudflare Access

Optional defense-in-depth for admin:
- restrict internal admin hostname/app to approved operator identities;
- still require Supabase/application role authorization;
- do not treat Access alone as business authorization.

## 8. Turnstile/rate protection

May be used selectively on abuse-prone public flows if real abuse or security review justifies it.

Normal catalog browsing should remain low-friction.

Any Turnstile token must be verified server-side.

## 9. Secrets

Cloudflare environment/CI may store only secrets needed by Cloudflare-hosted components.

Supabase service-role/ERP/provider secrets required by backend functions belong in the corresponding secure server environment and never in frontend bundles, Git or extension code.

## 10. CI/CD

Preferred pattern:
- PR → CI;
- staging/preview deployment;
- smoke tests;
- production after phase gate;
- path-specific deployment so docs/extension changes do not redeploy unrelated apps.

## 11. Infrastructure inventory

Before production maintain a non-secret inventory of:
- domains/DNS;
- landing deployment;
- customer/admin deployment locations;
- QR Worker routes;
- Supabase project/environment identifiers;
- Storage buckets;
- Edge Functions;
- optional Access/Turnstile resources.

## 12. Superseded Cloudflare backend baseline

The prior plan to use Cloudflare Workers + D1 + R2 + Queues as ENVAX's core application backend is superseded by the approved Supabase architecture.

Do not implement parallel D1 business tables or R2 catalog-media authority unless a future architecture decision explicitly replaces Supabase.
