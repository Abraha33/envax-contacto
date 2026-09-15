# ENVAX — Roadmap V1

## Phase 0 — Definition and architecture

- Consolidate product vision/domain rules.
- Close catalog/entity relationships.
- Close request/order lifecycle.
- Define Supabase Auth email/password identity model.
- Define roles: Customer, one Seller, Admin.
- Define PostgreSQL/RLS/database model.
- Define REST API and backend architecture.
- Keep ERP/Wappsi explicitly pending until validated.

Status: ✅ architecture sufficiently defined for implementation.

## Phase 1 — Technical foundation

- pnpm workspace.
- React/Vite customer/admin shells.
- Supabase CLI/local structure.
- Edge Function `/api/v1` health shell.
- migrations/seed skeleton.
- lint/typecheck/test/build.
- CI.
- preserve current landing and QR behavior.

## Phase 2 — Identity, database and security foundation

- Supabase Auth integration.
- customer/internal profiles and roles.
- one-seller model.
- PostgreSQL migrations.
- RLS policies and isolation tests.
- audit/idempotency foundation.

## Phase 3 — Catalog data/API

- categories/brands/segments/products/variants/attributes.
- public photos/media in Supabase Storage.
- deterministic import/seed path.
- catalog REST API.
- search/filters.
- no prices or stock.

## Phase 4 — Customer catalog UI

After relevant visual designs are approved:
- catalog cover/index;
- category/brand exploration;
- product listing/detail;
- search/filter;
- responsive/loading/error states;
- Analytics hooks.

Public catalog remains usable without login.

## Phase 5 — Customer authentication + persistent lists

- email/password account/login/recovery.
- minimal business profile.
- multiple named persistent lists.
- add/remove concrete variants.
- ownership isolation.
- optional anonymous local favorites remain device-local only.

## Phase 6 — Formal request + seller commercial MVP

- prepare request and quantities.
- formal authenticated solicitud.
- historical snapshots.
- idempotent submission.
- one seller receives all formal requests.
- `Solicitud enviada → En atención`.
- WhatsApp/email handoff.
- customer can consult own request/order state.

## Phase 7 — Pedido lifecycle + extension

- transactional solicitud→pedido conversion.
- `Pedido confirmado`.
- cancellations/closed-without-order.
- seller extension based on real sanitized examples.
- deterministic parser/fail-safe review.
- external processing.
- explicit `FACTURADO` confirmation after external invoicing succeeds.
- audit/idempotency.

## Phase 8 — Admin + promotions

- catalog administration.
- customers/internal members.
- promotion CRUD.
- targeting by specific customer or business segment.
- customer promotion eligibility/display.
- audit/operational supervision.

## Phase 9 — Analytics + hardening

- acquisition/QR campaign tracking.
- navigation/product/list/request/order funnels.
- performance/error monitoring.
- privacy filtering.
- rate limiting.
- security tests.

Detailed-event retention baseline: 12 months, subject to final privacy/legal configuration.

## Phase 10 — Production readiness

- responsive/accessibility/browser matrix.
- RLS/authorization attack tests.
- backup/restore drill.
- deployment/rollback proof.
- performance/load smoke.
- privacy/legal closure.
- operational runbooks.
- real customer pilot.

## Parallel ERP track

Only after real API validation:
- authentication/connectivity;
- safe reads;
- customer/order matching as needed;
- write capability if available;
- reliability/security;
- controlled adapter rollout.

ERP uncertainty does not block core ENVAX.

## Future V1.x / V2 candidates

Only after evidence/explicit approval:
- prices;
- stock/availability;
- MFA;
- PWA/browser notifications;
- sharing/copying lists;
- direct ERP automation;
- richer customer capabilities.

## Rule

Do not let later phases turn the public catalog into ecommerce or reintroduce superseded architecture such as persisted anonymous business accounts, multiple-seller routing or parallel D1 business storage.
