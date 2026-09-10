# CLAUDE.md

## Read first
Before proposing product or implementation changes, read:
1. `docs/PRODUCT-VISION.md`
2. `docs/USER-FLOW.md`
3. `docs/FAVORITES.md`
4. `docs/SELLER-EXTENSION.md`
5. `docs/ROADMAP.md`
6. `docs/OPEN-QUESTIONS.md`
7. `docs/ERP-INTEGRATION-PENDING.md`

## Canonical rules
- ENVAX is a B2B digital catalog, not ecommerce.
- Do not add public cart, checkout, payment, or marketplace behavior unless explicitly approved.
- Multiple named favorites lists are canonical. The old single `Mi selección` concept is deprecated.
- The customer can send an `Enviar pedido` action, but internally the first state is `solicitud` until seller processing updates it to `pedido`.
- The experience must stay extremely simple for customers.
- Initial entry asks only for business name + business type.
- Anonymous-profile/login concept is approved; exact cross-device recovery technology is still pending architecture definition.
- Favorites must work independently of Customer Portal mode.
- Current approved Portal purpose is to let the customer view orders. Do not add invoices, accounting, private prices, checkout, or ecommerce without approval.
- Public product fields currently approved: name, brand, reference. Product photo is not approved as public. Other fields are pending.
- Promotions are administered from an admin module and may target a specific customer or a business type. Customer may select one/multiple promotions and continue through WhatsApp/email to an advisor.
- Seller/advisor assignment is decided by the system.
- Seller extension uses explicit/manual seller-selected ERP content, not automatic full-screen scraping.
- A successful extension operation automatically updates the corresponding record `solicitud → pedido` across ENVAX.
- ERP/Wappsi API integration is **PENDING REAL VALIDATION IN GENERAL**. Never assume a capability is production-confirmed from documentation alone.
- Do not commit confidential Wappsi documents, credentials, API keys, invoices, or real customer data to this public repository.
- Do not invent ERP text formats. Use real copied samples before implementing extractor logic.

## Deployment discipline
Landing, catalog, extension, Workers, and docs must remain separable. Cloudflare deployment for one component must not accidentally publish unrelated code/assets.

## Change discipline
If a proposed change conflicts with these rules, flag it explicitly instead of silently changing the product definition.
