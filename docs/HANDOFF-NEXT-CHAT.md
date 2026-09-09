# ENVAX — Handoff / Next Chat

## Repository
`Abraha33/envax-contacto`

## Working branch
`docs/product-definition-v1`

Do not treat `main` as updated until this documentation branch is reviewed/merged.

## Product in one sentence
ENVAX is a B2B digital catalog designed to show breadth, let customers save products in `Mi selección`, and convert interest into a fast human advisor conversation without becoming ecommerce.

## Current canonical customer flow
`Landing → business name → business type → catalog → category/brand/search → products → Me interesa → Mi selección → quote/advisor → WhatsApp or email → short confirmation → human follow-up`

## Current priority
Continue the internal seller browser extension definition.

Rules for the extension:
- manual text selection from ERP;
- no automatic full-screen scraping;
- parse only selected content;
- collect 5–10 real ERP text examples before implementing parser logic;
- decide whether seller confirmation is mandatory before writes;
- provisional destination may be ENVAX and/or the internal Google Sheet.

## ERP/API status
Everything is pending real validation in general. Existing Wappsi API documents do not authorize the project to assume production capability for products/prices, invoices, customer-specific data, orders, or any other integration until tested.

## Major later work
- Final seller-extension flow/schema
- Google Sheet schema
- Final screen map and states
- Customer identity/persistence model
- Advisor routing/operations
- Catalog content/master mapping
- Architecture/stack
- Cloudflare cleanup after architecture
- MVP implementation and pilot
- Promotions/PWA only after MVP validation

## Public repository warning
Never commit secrets, API keys, confidential Wappsi files, invoices, or real customer data.
