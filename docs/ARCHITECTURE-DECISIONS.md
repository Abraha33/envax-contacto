# ENVAX — Architecture Decisions v1

## Product boundaries
- ENVAX is a B2B digital catalog first.
- ENVAX represents a general distributor, not a catalog tied to one exclusive business type such as bakeries or restaurants.
- Public experience is not ecommerce.
- No public cart, checkout, online payment, or marketplace behavior.
- Named favorites lists replace the old single `Mi selección` concept.
- Customer CTA can say `Enviar pedido`, while the initial internal state is `solicitud` until seller processing promotes it to `pedido`.
- Human seller remains part of the commercial conversion flow.
- ENVAX is NOT an electronic invoicing system.
- ENVAX does not create, edit, extract, upload, download, display, validate, transmit or manage electronic invoices.
- Customers do not see or operate invoices inside ENVAX.
- Electronic invoicing remains an external operational process performed in the seller's existing system/ERP.

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
- view customer orders and their ENVAX status.

Customer-only capabilities also include access to promotions when applicable.

Do not add invoices, electronic invoicing, accounting, private prices, checkout, or ecommerce behavior without explicit approval.

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

## Requests
Canonical meaning:
- A `solicitud` is a formal commercial intention sent to ENVAX by an identified/logged-in customer.
- An anonymous visitor may contact ENVAX through WhatsApp, but that alone does not create a formal ENVAX request.
- When a request is submitted from a list, ENVAX must preserve a snapshot of what was sent at that moment.
- Later edits to the source list must not alter an already-submitted request.
- A submitted request does not automatically become an order.
- Requests must be representable and processable even if Wappsi/ERP is unavailable or has no usable API.
- Only an internal seller can cancel a formal request in the operational flow; cancellation never deletes its history.

## Orders
Canonical customer/commercial transition:
`solicitud enviada → en atención → pedido confirmado → facturado`

Domain separation:
- `solicitud enviada` and `en atención` belong to the request stage.
- `pedido confirmado` begins the order stage.
- `facturado` is only a status flag inside ENVAX meaning the seller confirms that the external invoicing/sale formalization step has been completed.
- `facturado` does NOT mean ENVAX generated, stored, displayed or managed an invoice.
- ENVAX must not create a first-class `Invoice/Factura` entity in V1.
- ENVAX must not store invoice files, XML/PDF, electronic tax documents or invoice line-item details in V1.
- A `pedido` is created/recognized only after ENVAX/seller processing confirms the commercial operation.
- ENVAX owns its order concept independently of the ERP.
- A seller may cancel a confirmed order; cancellation does not delete it.
- V1 intentionally keeps the customer-visible state model small rather than exposing many operational states.

## Internal members and roles
ENVAX has internal company members.

Canonical V1 roles:
- `seller` (`vendedor`): commercial operator. The previous word `advisor/asesor` is a customer-facing synonym only; technically `asesor` and `vendedor` mean the same role.
- `administrator` (`administrador`): internal role with broader management permissions; exact permission matrix is defined later in identity/authorization design.

## Seller operations
- The seller is the human operator who receives and works commercial requests/orders.
- The customer does not choose the seller manually in V1.
- ENVAX assigns or routes requests internally.
- Exact seller-assignment logic (automatic, manual, by territory, by customer, queue, or another rule) remains pending.
- Seller can move a request into attention, confirm the commercial order, cancel a request, cancel an order, and confirm that external invoicing has been completed.
- Seller cannot erase commercial history through normal operations.
- The browser extension supports the seller's external operational workflow by transforming/copying confirmed WhatsApp/order information into the format expected by the existing external system.
- The extension does not make ENVAX an invoicing application and must not add electronic-invoice creation/editing/display capabilities to ENVAX.
- The seller must review the customer/products/quantities and explicitly confirm before ENVAX records the `facturado` status.
- ENVAX must not mark an order `facturado` before the seller confirms that the external invoicing step actually succeeded.
- Manual processing is valid while ERP integration remains unverified.
- Any future extension/integration must fail safely on ambiguous or unmatched data instead of guessing.

## Commercial contact
ENVAX supports two valid but distinct paths:
- `catalog → WhatsApp/email → seller` as direct contact;
- `catalog → list → solicitud → seller → pedido` as the structured ENVAX flow.

Direct WhatsApp/email contact does not automatically create a formal request unless ENVAX later captures that action through an explicit business workflow.

## Promotions
- Promotions are for registered/identified customers, not anonymous visitors.
- Managed from an administrator panel/module.
- Admin can target a specific customer or business type.
- Customer can select one or multiple promotions and continue through WhatsApp/email to a seller.
- Promotions must not turn ENVAX into ecommerce: no checkout, payment, or automatic purchase.
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
- Public repository must contain no confidential ERP documents, credentials, real customer data, invoices, invoice XML/PDF or tax documents.
- Extension permissions should be minimal.
