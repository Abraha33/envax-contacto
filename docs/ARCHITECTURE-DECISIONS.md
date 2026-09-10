# ENVAX — Architecture Decisions v1

## Product boundaries
- ENVAX is a B2B digital catalog first.
- Public experience is not ecommerce.
- No public cart, checkout, online payment, or marketplace behavior.
- Named favorites lists replace the old single `Mi selección` concept.
- Customer CTA can say `Enviar pedido`, while the initial internal state is `solicitud` until seller processing promotes it to `pedido`.
- Human advisor remains part of the commercial conversion flow.

## Visual direction
- Minimalist, editorial, clean, professional B2B.
- White/off-white dominant surfaces.
- ENVAX blue as primary accent.
- ENVAX brand first, partner brands second.
- Dense product grids are acceptable when they reinforce breadth without reducing clarity.

## Responsive baseline
- Large desktop: test 6 columns.
- Standard desktop: 5–6.
- Tablet: 3–4.
- Mobile: 2.

## Customer identity
The initial experience should avoid traditional registration friction.

Approved concept:
- collect only business name + business type at entry;
- create/maintain an anonymous customer profile/session concept;
- favorites should work without Portal activation;
- cross-device anonymous recovery/synchronization is required conceptually;
- exact identity technology is still pending architecture definition.

## Optional Customer Portal
Portal activation requires additional verified customer data.

Current approved portal purpose:
- view customer orders.

Do not add invoices, accounting, private prices, checkout, or ecommerce behavior without explicit approval.

## Favorites
Customers can create multiple named favorites lists and reuse them later as the basis for order requests.

## Orders
Canonical internal transition:
`solicitud → pedido`

The seller extension/internal workflow performs this transition automatically after successful processing.

## Seller operations
- Seller/advisor assignment is decided by the system.
- Extension uses explicit/manual seller-selected ERP content; no automatic full-screen scraping.
- Ambiguous or unmatched data must fail safely instead of guessing.

## Promotions
- Managed from an administrator panel/module.
- Admin can target a specific customer or business type.
- Customer can select one or multiple promotions and continue through WhatsApp/email to an advisor.
- PWA/push is later scope.

## Public product data
Approved public fields:
- name;
- brand;
- reference.

Product photo is not approved as public. Other product-field visibility remains pending.

## ERP
All API/integration claims remain pending real validation.

## Deployment boundaries
Landing, catalog, extension, docs, and Workers should remain cleanly separable so Cloudflare can deploy only the intended application portion/assets for each project.

## Security
- Never expose ERP/API secrets in browser code.
- Public repository must contain no confidential ERP documents, credentials, real customer data, or invoices.
- Extension permissions should be minimal.
