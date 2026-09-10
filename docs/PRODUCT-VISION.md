# ENVAX — Product Vision v1

Status: canonical product definition draft. Branch: `docs/product-definition-v1`.

## Product definition
ENVAX is a B2B digital catalog, not an ecommerce store. Its purpose is to make the breadth of ENVAX's portfolio immediately visible, help a business discover relevant products, save recurring product interests in named favorites lists, and convert that interest into a human-assisted order flow.

Core promise: **discover → explore → save → send order request → advisor**.

## Experience principles
- Extremely simple for the customer, even if the system is sophisticated behind the scenes.
- The customer should quickly perceive variety, clarity, trust, quality, and easy access to advice.
- No public cart, checkout, online payment, or marketplace behavior.
- Prices are not part of the public catalog experience.
- ENVAX branding has priority; partner brands are secondary.
- Dense product grids are acceptable when they improve the perception of breadth without hurting recognition.
- Do not burden the customer with traditional registration before they can explore and save interests.

## Canonical entry journey
1. Customer reaches the landing from QR, web, social, WhatsApp, or direct link.
2. Customer provides only business name and business type.
3. ENVAX may create an anonymous customer profile/session from this minimal entry.
4. Customer enters the catalog immediately.
5. Customer explores by category, brand, search, family, product, and variant.

## Favorites lists
The previous single `Mi selección` concept is replaced by **named favorites lists**.

Examples:
- `Halloween`
- `Cumpleaños`
- `Uso diario`

A customer can create multiple lists, name them, add/remove products, reopen them later, keep adding products, and use a list as the basis for an order request.

Favorites are not a cart. They do not imply checkout, payment, totals, taxes, or automatic purchase.

## Order-request flow
The customer can send a set of products to ENVAX as an order request.

`Favorites list / product interest → Enviar pedido → WhatsApp or Email → Solicitud enviada → Advisor`

Internally, the customer action first creates a **solicitud de pedido**. When the seller processes it through the approved internal method/extension, ENVAX automatically changes the status from **solicitud** to **pedido** across the system.

Customer-facing order states should remain simple. Exact final labels are still subject to UX definition, but the current conceptual path is:

`Solicitud enviada → En atención → Pedido confirmado → Completado`

## Anonymous profile and Portal mode
The initial experience should support an **anonymous profile/login concept** so the customer can save data without being asked for a full registration form.

Initial requested data remains minimal:
- business name;
- business type.

Cross-device recovery/synchronization for the anonymous profile is required conceptually but the exact technical method is still **PENDING ARCHITECTURE DECISION**.

The optional **Customer Portal** is a separate mode that requires the customer to provide/verify additional data. Its currently approved customer-facing purpose is to let the customer view their orders. Do not expand it into invoices, accounting, prices, or ecommerce without explicit approval.

## Public product information
Currently approved as public:
- product name;
- brand;
- reference.

Product photo is **not approved as public**. The visibility of other product fields remains pending and must not be guessed.

## Promotions
Promotions are customer-facing commercial opportunities managed from an **administrator panel**.

The administrator can choose recipients such as:
- a specific customer;
- a business type (for example, Panadería).

This is one reason business type is collected at entry.

A customer can select one or multiple promotions they are interested in and continue to an advisor through WhatsApp or email. Promotions do not become an automatic ecommerce purchase.

## Seller operations
Seller/advisor assignment is decided by the system.

The internal browser extension remains a bridge while ERP/API integration is unresolved. The approved direction is that the seller uses the extension/manual-copy workflow and, when the operation is successfully processed, the system automatically updates the relevant record from `solicitud` to `pedido` everywhere.

## Primary conversion
The main success event is a customer progressing from catalog exploration/favorites/promotions to a meaningful order request handled by an advisor.

## ERP integration status
All Wappsi/ERP API capabilities remain **PENDING REAL VALIDATION**. Existing documentation is reference material only; do not treat products, prices, invoices, customers, orders, promotions, pagination, production URL, or write capabilities as production-confirmed until tested and approved.

## Future scope
Potential later capabilities include:
- richer customer-portal behavior if approved;
- direct ERP order integration;
- PWA/browser notifications;
- sharing products/lists;
- deeper promotion automation.

These must not turn the public catalog into ecommerce or delay the first useful product version.
