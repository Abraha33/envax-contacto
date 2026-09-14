# ENVAX — Screen Matrix V1

**Status:** APPROVED / FROZEN  
**Phase:** Frontend Phase 3 — Screen Map V1  
**Date:** 2026-09-14

This matrix is the canonical V1 screen inventory. It defines each functional screen, its conceptual route, entry points, essential content, primary action, exits, access mode, key states, and reusable template.

| ID | Screen | Conceptual route | Main entry | Essential content | Primary action | Main exit | Access | Key states | Template |
|---|---|---|---|---|---|---|---|---|---|
| S01 | Landing | `/` | QR/web/social/WhatsApp/direct | ENVAX identity, short proposition, business name, business type, Portal access | Enter catalog | S02 | Public | initial, validation, loading, error, returning | Landing |
| S02 | Catalog home | `/catalogo` | S01/global return | cover, index, search, categories, brands, lists, Portal, advisor | Explore | S03/S05/S07/S09/S14/S17 | Public | normal, restored session, loading, partial error | Catalog Home |
| S03 | Categories | `/categorias` | S02/global nav | category index | Open category | S04 | Public | normal, empty, loading, error | Taxonomy Index |
| S04 | Category / Family | `/categorias/:slug` | S03/breadcrumb | category/family title, products, filters, contextual search | Explore products | S08 | Public | normal, filtered, no results, empty, loading, error | Product Grid |
| S05 | Brands | `/marcas` | S02/global nav | brand index, brand search if needed | Open brand | S06 | Public | normal, loading, error | Taxonomy Index |
| S06 | Brand | `/marcas/:slug` | S05 | brand, related taxonomy, products, filters | Explore products | S08 | Public | normal, filtered, no results, loading, error | Product Grid |
| S07 | Search / Results | `/buscar?q=` | global/S02-S08 | query, results, filters, suggestions | Find product | S08 | Public | initial, typing, results, no results, error | Product Grid |
| S08 | Product detail | `/productos/:slug` | S04/S06/S07/lists | approved product fields, variant/presentation state, list action, advisor action | Save / request product | A02/S11/S17 | Public | normal, variants, saved, unavailable, error | Product Detail |
| S09 | My lists | `/listas` | global/S02/product flow | named lists | Open/create list | S10/A01 | Anonymous or identified | empty, normal, loading, error | Lists Index |
| S10 | List detail | `/listas/:id` | S09/A03 | saved products, references, variants, list actions | Prepare request | S11 | Anonymous or identified | normal, empty, unavailable product, error | List Detail |
| S11 | Prepare request | `/solicitud/preparar` | S10/S08 contextual request | selected products, optional message, review | Continue | S12 | Anonymous or identified | normal, edited, error, unsaved-change warning | Request |
| S12 | Send request | `/solicitud/enviar` | S11 | short summary, WhatsApp/email, required contact data, optional message | Send | S13 | Anonymous or identified | channel pending, sending, offline, error, success | Request |
| S13 | Request sent | `/solicitud/enviada` | S12 | confirmation, request id if available, initial status, next actions | Continue/track | S02/S14/S15/S17 | Contextual | success, confirmation error | Request Confirmation |
| S14 | Account / Identification | `/cuenta` | Landing/global/Portal/request | identify, activate, login, recover | Enter Portal | S15 | Public to private | login, validation, error, recovery, expired | Identity |
| S15 | My orders | `/portal/pedidos` | S14/S13 | requests/orders, dates, status, ids | Open order | S16 | Identified customer | normal, empty, loading, error, expired session | Orders Index |
| S16 | Order detail | `/portal/pedidos/:id` | S15 | products, date, status, progression, advisor | Review status/contact | S15/S17 | Identified customer | normal, loading, not found, error, expired session | Order Detail |
| S17 | Advisor contact | `/contacto` or contextual | catalog/product/search/list/request/order | optional context/products/message, WhatsApp, email | Contact ENVAX | external channel / S02 | Public | with products, without products, error | Advisor Contact |

## Auxiliary views and states

| ID | Element | Expected form | Used by | Purpose |
|---|---|---|---|---|
| A01 | Create list | Modal / bottom sheet | S08/S09 | Create named list |
| A02 | Choose list | Modal / bottom sheet | S08 | Select existing list or create one |
| A03 | Product added | Toast / confirmation | S08 | Confirm save and offer continue/view list |
| A04 | Rename list | Modal | S09/S10 | Rename list |
| A05 | Confirm deletion | Modal | S09/S10 | Prevent accidental deletion |
| A06 | Empty list | Empty state | S09/S10 | Recovery toward catalog |
| A07 | No results | Empty state | S04/S06/S07 | Recover search/filter flow |
| A08 | No orders | Empty state | S15 | Recovery toward catalog |
| A09 | Loading | Skeleton/state | transversal | Await data |
| A10 | Generic error | Inline/page state | transversal | Retry |
| A11 | Content unavailable | Inline/page state | product/category/brand | Explain unavailable content |
| A12 | Offline | Global/inline state | transversal | Explain network loss and retry |
| A13 | Session expired | Modal/page | Portal | Re-identify |
| A14 | Success feedback | Toast/inline | transversal | Confirm action |
| A15 | Unsaved changes | Modal | request/forms | Prevent accidental loss |

## Access matrix

| Area | New visitor | Anonymous session | Portal customer |
|---|---:|---:|---:|
| Landing | Yes | Yes | Yes |
| Catalog / taxonomy / search / product | Yes | Yes | Yes |
| Lists | Yes* | Yes | Yes |
| Request | Yes* | Yes | Yes |
| Advisor | Yes | Yes | Yes |
| Account / identification | Yes | Yes | Yes |
| My orders / order detail | No | No | Yes |

`*` ENVAX may create the anonymous context automatically; traditional registration is not required.

## Responsive rule

All V1 customer flows must support mobile, tablet, and desktop. No core V1 screen is desktop-only.

## Template reuse

17 functional screens are expected to reuse approximately 13 primary templates: Landing, Catalog Home, Taxonomy Index, Product Grid, Product Detail, Lists Index, List Detail, Request, Request Confirmation, Identity, Orders Index, Order Detail, and Advisor Contact.

## Freeze rule

This matrix is frozen as the Phase 3 V1 baseline. A new screen, removed screen, or materially changed responsibility must be reflected here and in `SCREEN-MAP.md` / `SCREEN-MAP-V1.mmd` before downstream wireframes or implementation are treated as canonical.