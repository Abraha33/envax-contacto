# CLAUDE.md

## Read first
Before proposing product or implementation changes, read:
1. `docs/PRODUCT-VISION.md`
2. `docs/USER-FLOW.md`
3. `docs/SELLER-EXTENSION.md`
4. `docs/ROADMAP.md`
5. `docs/OPEN-QUESTIONS.md`
6. `docs/ERP-INTEGRATION-PENDING.md`

## Canonical rules
- ENVAX is a B2B digital catalog, not ecommerce.
- Do not add public cart, checkout, payment, or marketplace behavior unless explicitly approved.
- `Mi selección` is a shortlist of products of interest.
- The main conversion is a human advisor conversation / quotation request.
- The experience must stay extremely simple for customers.
- ENVAX brand is visually primary; partner brands are secondary.
- ERP/Wappsi API integration is **PENDING REAL VALIDATION IN GENERAL**. Never assume an endpoint/capability is production-confirmed from documentation alone.
- Do not commit confidential Wappsi documents, credentials, API keys, invoices, or real customer data to this public repository.
- Current priority: define and validate the internal seller browser extension using manual text selection, not automatic full-screen scraping.
- Do not invent ERP text formats. Use real copied samples before implementing the extractor.

## Change discipline
If a proposed change conflicts with these rules, flag it explicitly instead of silently changing the product definition.
