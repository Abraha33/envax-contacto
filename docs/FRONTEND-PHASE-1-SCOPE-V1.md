# ENVAX — Frontend Phase 1: Product Scope & Rules

**Status:** CLOSED / APPROVED  
**Date:** 2026-09-14  
**Branch:** `docs/product-definition-v1`

This document is the formal closure of Frontend Phase 1. Its purpose is to freeze what ENVAX V1 is, what the customer can do, what remains pending, and what must not be added without explicit product approval.

## 1. Product definition

ENVAX is a **B2B digital catalog**, not an ecommerce store.

Its core objective is:

`discover → explore → save → send order request → advisor`

The experience must emphasize variety, clarity, trust, quality, and easy human assistance.

## 2. V1 customer surfaces

V1 includes two clearly separated customer-facing areas:

### A. Public catalog
- Landing / catalog entry
- Catalog cover and index
- Exploration by category and brand
- Families
- Product listing
- Product detail
- Variant/presentation state
- Search and filters
- Anonymous profile/session foundation
- Named favorites lists
- Order-request preparation
- WhatsApp/email handoff
- Direct advisor contact without favorites
- Simple request/order status

### B. Customer Portal
The **Customer Portal is officially part of V1** as a separate identified/private mode.

Approved V1 portal scope:
- Portal activation / identification
- Portal access/login
- `Mis pedidos`
- Order detail
- Order status

The public catalog must remain usable without activating the Portal.

## 3. Entry and identity rules

The initial public-catalog experience must not require traditional registration.

Minimum entry data currently defined:
- business name
- business type

ENVAX may create an anonymous profile/session so the customer can preserve favorites without completing a full registration process.

Same-device persistence is expected.

Cross-device anonymous-profile recovery/synchronization remains **PENDING ARCHITECTURE DECISION**.

Portal mode may require additional identification or verification.

## 4. Catalog rules

The catalog may be explored by:
- category
- brand
- family
- search
- filters
- product
- variant/presentation

ENVAX branding has priority over partner brands.

Dense product grids are acceptable when they improve perception of variety without hurting recognition or usability.

## 5. Favorites rules

The canonical persistence model is **multiple named favorites lists**.

Examples:
- `Halloween`
- `Cumpleaños`
- `Uso diario`

A customer can:
- create a list
- name/rename a list
- add/remove products
- reopen a list
- continue adding products
- use a list to prepare an order request

Favorites are **not a cart** and do not imply totals, taxes, checkout, payment, shipping calculation, or automatic purchase.

Favorites must work independently of Customer Portal activation.

## 6. Order-request and advisor rules

Canonical flow:

`Favorites list / product interest → Enviar pedido → WhatsApp or Email → Solicitud enviada → Advisor`

A customer must also be able to contact an advisor without having favorites.

A short message may be offered but must remain optional.

Customer-facing conceptual status path:

`Solicitud enviada → En atención → Pedido confirmado → Completado`

Internally, the record remains a `solicitud` until the seller processes it through the approved internal workflow/extension, after which ENVAX updates it to `pedido`.

## 7. Public product information

Currently approved as public:
- product name
- brand
- reference

Product photo is **not currently approved as public** in the canonical product definition.

Any additional product field must be explicitly approved rather than inferred.

## 8. Explicit non-ecommerce rules

V1 must not introduce:
- public shopping cart
- checkout
- online payment
- marketplace behavior
- automatic purchase
- public ecommerce totals/taxes flow

For the Customer Portal, the following are also **not approved for V1** unless explicitly changed later:
- invoices
- accounting functionality
- private prices
- payments
- checkout

## 9. Integrations

All Wappsi/ERP API capabilities remain **PENDING REAL VALIDATION**.

Do not treat any of the following as production-confirmed until tested and approved:
- products
- prices
- invoices
- customers
- orders
- promotions
- pagination
- production URL
- write capabilities

The current internal seller extension/manual-copy workflow remains the operational bridge while ERP integration is unresolved.

## 10. Approved later / non-blocking scope

These product directions are approved conceptually but must not block core V1 delivery:
- promotions and promotion targeting
- richer returning-customer behavior
- deeper Portal capabilities
- direct ERP order integration
- PWA/installability
- browser notifications
- product/list sharing
- deeper automation

## 11. Phase 1 exit criteria

Frontend Phase 1 is considered complete because the following are now explicitly defined:

- what ENVAX is
- who the experience serves
- what the customer can do in V1
- what ENVAX must not become
- catalog behavior
- named favorites behavior
- order/advisor handoff
- anonymous-profile role
- Customer Portal inclusion in V1
- current Portal boundaries
- ERP integration status
- later-scope boundaries

## 12. Freeze rule

**Frontend Phase 1 is CLOSED.**

Future work must treat this document together with `PRODUCT-VISION.md`, `USER-FLOW.md`, `FAVORITES.md`, `SCREEN-MAP.md`, and `ROADMAP.md` as the current product baseline.

If a later decision changes Phase 1 scope, the change must be documented explicitly before downstream architecture, screens, components, backend contracts, or database models are updated.

## Next phase

Proceed to **Frontend Phase 2 — Information Architecture**:

- hierarchy
- navigation
- routes
- relationships between screens
- catalog structure
- Portal structure
- entry/exit paths
- edge/navigation states

No visual styling or implementation decisions should supersede the information architecture before Phase 2 is closed.
