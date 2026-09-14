# ENVAX — Architecture Decisions v1

## Product boundaries
- ENVAX is a B2B digital catalog first.
- ENVAX represents a general distributor, not a catalog tied to one exclusive business type such as bakeries or restaurants.
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

## Customer identity and anonymous access
Approved canonical rules:
- Anyone can browse the public catalog without login.
- Anonymous visitors cannot access the customer area / portal.
- Anonymous visitors cannot access customer-only promotions.
- Anonymous visitors do not have business data persisted in the ENVAX database.
- Anonymous favorites or similar convenience state may exist only locally on the device/browser.
- Local anonymous state may be lost if browser/device storage is cleared, reset or unavailable.
- Persistent favorites, customer benefits, orders and other private capabilities require an identified/logged-in customer.
- Login/customer identification is the boundary that allows ENVAX to persist customer-owned business data in the database.
- Exact login/authentication technology remains pending architecture definition.

Important separation:
- anonymous business persistence: not allowed;
- anonymous analytics/telemetry: allowed conceptually, under the analytics privacy and retention rules to be defined later.

## Customer area / portal capabilities
Customer identification/login enables private capabilities inside the same ENVAX experience.

Current approved private capability:
- view customer orders.

Customer-only capabilities also include access to promotions when applicable.

Do not add invoices, accounting, private prices, checkout, or ecommerce behavior without explicit approval.

## Favorites
- Anonymous favorites may exist only as local browser/device state and are not guaranteed to survive local storage loss.
- Persistent named favorites lists require a logged-in/identified customer.
- Identified customers can create multiple named favorites lists and reuse them later as the basis for order requests.
- Lists belong to the individual customer account; V1 does not support collaborative/shared editing between customer accounts.
- Sharing, copying, importing or adding received lists through WhatsApp or similar flows is outside V1 and is reserved for future evaluation after the core product is complete.

## Catalog domain
ENVAX must support the breadth of a general distributor without tying catalog structure to one customer/business type.

Canonical concepts:
- `Category`: flexible classification/navigation node.
- `Product`: main commercial product identity.
- `Variant/Presentation`: concrete version/presentation of a product.
- `Brand`: commercial brand associated primarily with the product.
- `Attribute`: descriptive characteristic such as capacity, material, dimensions or color.
- `Segment/Use`: optional discovery dimension indicating where or for whom a product may be useful; it does not own the product.
- `Reference/SKU`: identifier associated with the concrete sellable/reference presentation when applicable.
- `Media`: images or other media associated with a product and, when needed, a variant.

Approved catalog rules:
- Categories are hierarchical and may have as many levels as the catalog needs; ENVAX does not require a rigid `Category → Family → Product` depth.
- A product may belong to more than one category.
- Customer/business type does not define or own a product.
- Business type/segment may be used as an optional discovery or merchandising dimension.
- Product and variant are separate concepts.
- A variant may have its own reference/SKU and its own media.
- A product may have general media shared by its variants.
- Product attributes may vary according to product type/category instead of forcing the same attributes on every product.
- Exact product fields, attribute schema, SKU/reference policy and source-of-truth synchronization are intentionally deferred to later data/integration phases.

## Orders
Canonical internal transition:
`solicitud → pedido`

The seller extension/internal workflow performs this transition automatically after successful processing.

## Seller operations
- Seller/advisor assignment is decided by the system.
- Extension uses explicit/manual seller-selected ERP content; no automatic full-screen scraping.
- Ambiguous or unmatched data must fail safely instead of guessing.

## Promotions
- Promotions are for registered/identified customers, not anonymous visitors.
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
