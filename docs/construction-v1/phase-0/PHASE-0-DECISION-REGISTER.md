# Phase 0 — Decision Register

This file distinguishes approved construction decisions from intentionally unresolved items.

## Approved / baseline

| Area | Decision | Status |
|---|---|---|
| Product | One ENVAX B2B catalog platform; not ecommerce | Approved |
| Entry | Business name + business type | Approved |
| Identity | Anonymous profile first; optional verified Portal later | Approved concept |
| Favorites | Multiple named favorite lists | Approved |
| Commercial flow | `Enviar pedido` creates solicitud first; later becomes pedido | Approved |
| Portal | Keep small; order visibility/status is core value | Approved |
| Promotions | Admin can target one customer or a business type | Approved |
| Seller routing | System decides seller/advisor assignment | Approved |
| ERP | Wappsi/API integration remains pending real validation | Approved constraint |
| Extension | Manual user-selected ERP text; extension writes through ENVAX API | Approved direction |
| Architecture | TypeScript + React/Vite + Cloudflare Worker modular API + D1 + R2 | Construction baseline |
| Deployment | Landing/customer/admin/API/extension/QR remain independently deployable | Approved |
| Operations | Build vertical slices with explicit phase gates | Approved |

## Intentionally pending — does not block Foundation by itself

| Area | Pending decision | Must be resolved by |
|---|---|---|
| Anonymous cross-device UX | final recovery interaction/microcopy | Identity implementation phase |
| Portal data requirements | exact verified fields | Portal phase |
| Product visibility | exact public/private field and image policy | Before catalog UI/data exposure |
| Product data authority | exact catalog source and ingestion contract | Before Phase 2 ingestion |
| ERP/API | all production capabilities and credentials | ERP integration track |
| Promotions channels | exact WhatsApp/email/push delivery strategy | Promotions phase |
| Final frontend visuals | complete approved screen set | Before affected customer-facing UI implementation |
| Extension parser schema | exact fields based on real copied ERP samples | Seller-extension phase |

## Rule

Do not convert a pending item into an implementation assumption. Use an interface, policy boundary, mock, fake or deferred adapter when Foundation can proceed without the final answer.
