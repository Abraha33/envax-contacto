# ENVAX — Product Vision v1

Status: canonical product definition draft. Branch: `docs/product-definition-v1`.

## Product definition
ENVAX is a B2B digital catalog, not an ecommerce store. Its purpose is to make the breadth of ENVAX's portfolio immediately visible, help a business discover relevant products, save products of interest, and turn that interest into a human commercial conversation.

Core promise: **discover → explore → select → talk to an advisor**.

## Experience principles
- Extremely simple for the customer, even if the system is sophisticated behind the scenes.
- The customer should quickly perceive variety, clarity, trust, quality, and easy access to advice.
- No public cart, checkout, online payment flow, or ecommerce-style pressure.
- Prices are not part of the public catalog experience.
- ENVAX branding has priority; partner brands are secondary.
- Dense product grids are acceptable when they improve the perception of breadth without hurting recognition.

## Canonical public journey
1. Customer reaches the landing from QR, web, social, WhatsApp, or direct link.
2. Customer provides the business name and business type.
3. Customer enters the catalog immediately.
4. Customer explores by category, brand, search, family, product, and variant.
5. Customer can mark products as `Me interesa` and collect them in `Mi selección`.
6. Customer can keep exploring, remove products, add more, or request help.
7. When ready, customer chooses WhatsApp or email and sends the selected products to an advisor.
8. Customer receives a short confirmation showing the selected products, stating that an advisor will attend shortly, and providing a link back to the catalog.
9. The commercial team continues the conversation manually.

## Mi selección
`Mi selección` is not a cart. It represents products the customer wants to ask about, quote, compare, or receive advice on. It can be persisted so the customer can return later and continue.

## Primary conversion
The main success event is not a page view or time-on-site. It is a visitor progressing from catalog exploration to a meaningful advisor conversation or quotation request.

## Future relationship layer
After the catalog flow is validated, ENVAX may recognize returning customers, preserve selections/history, support customer-specific relationship features, and send relevant promotions with consent.

## Future promotions / PWA
Promotions may be personalized using business type and observed interests. A PWA and browser notifications are a future capability, not an MVP requirement. No APK is required for the initial product.

## ERP integration status
All Wappsi/ERP API capabilities remain **PENDING REAL VALIDATION**. Existing documentation is reference material only; do not treat products, prices, invoices, customers, orders, promotions, pagination, production URL, or write capabilities as production-confirmed until tested and approved.

## Current implementation priority
Continue defining the internal seller browser extension and its operational workflow while the ERP/API integration remains unresolved.
