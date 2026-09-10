# ENVAX — Handoff / Next Chat

## Repository
`Abraha33/envax-contacto`

## Working branch
`docs/product-definition-v1`

Do not treat `main` as updated until this documentation branch is reviewed/merged.

## Product in one sentence
ENVAX is a B2B digital catalog designed to show breadth, let customers save products in reusable named favorites lists, and turn that interest into human-assisted order requests without becoming ecommerce.

## Canonical customer flow
`Landing → business name → business type → anonymous profile/session → catalog → category/brand/search → products → favorites lists → Enviar pedido → WhatsApp or email → Solicitud enviada → advisor → seller processing → pedido`

## Favorites
The old single `Mi selección` model is deprecated.

Canonical behavior:
- multiple named favorites lists;
- examples: Halloween, Cumpleaños, Uso diario;
- favorites work without Customer Portal;
- lists persist for returning customers;
- cross-device anonymous recovery/synchronization is required conceptually but exact technology is pending architecture definition.

## Anonymous profile / Portal
Initial entry remains minimal: business name + business type.

ENVAX should support an anonymous profile/login concept so customers can save favorites without feeling forced to register.

Optional Customer Portal requires additional verified data. Current approved portal purpose: view orders.

Do not add invoices, accounting, private prices, checkout, or ecommerce behavior without explicit approval.

## Orders
Customer-facing CTA can say `Enviar pedido`.

Internal state starts as `solicitud`.

A seller uses the approved internal extension/manual-copy workflow. When processing succeeds, ENVAX automatically changes the relevant record:

`solicitud → pedido`

Customer-visible conceptual states:
`Solicitud enviada → En atención → Pedido confirmado → Completado`

Seller/advisor assignment is decided by the system.

## Promotions
Promotions are managed through an administrator panel/module.

Admin can target:
- a specific customer;
- a business type.

Customer can select one or multiple promotions and continue through WhatsApp or email to an advisor.

PWA/browser push remains later scope.

## Public product data
Approved public fields:
- name;
- brand;
- reference.

Product photo is not approved as public. Other field visibility remains pending.

## Seller extension — current priority
Rules:
- explicit/manual seller-selected ERP content;
- no automatic full-screen scraping;
- parse only selected/copied content;
- collect 5–10 real ERP text examples before final parser design;
- never guess ambiguous customer/request matches;
- successful processing automatically updates `solicitud → pedido` across ENVAX.

## ERP/API status
Everything remains pending real validation in general. Existing Wappsi API documents do not authorize the project to assume production capability for products/prices, invoices, customers, orders, or any other integration until tested.

## Deployment boundary
Landing, catalog, extension, docs, and Cloudflare Workers must remain separable so each can be deployed independently without publishing unrelated code/assets.

## True unresolved items
1. Anonymous cross-device recovery technology.
2. Exact additional data required for Customer Portal activation.
3. Final public product fields beyond name/brand/reference; photo is currently not public.
4. 5–10 real ERP copied-text examples and final extension extraction schema.
5. Full Wappsi/API real validation.
6. Final Sheet usage/schema if still needed.
7. Promotion consent/frequency/opt-out policy.
8. Final technical architecture/stack, analytics, privacy, Cloudflare cleanup.
9. Visual density/content validation.
10. Real-customer pilot validation.

## Public repository warning
Never commit secrets, API keys, confidential Wappsi files, invoices, or real customer data.
