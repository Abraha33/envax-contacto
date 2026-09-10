# ENVAX — Open Questions

Most remaining questions are UX/architecture/implementation decisions that can be resolved from the approved product rules. The items below are the true unresolved dependencies or decisions that must not be guessed.

## 1. Anonymous identity / cross-device
- Exact technical mechanism for anonymous-profile recovery across devices.
- How an anonymous profile is later linked to optional Portal identity.
- Duplicate-profile merge/recovery rules.

## 2. Customer Portal
- Exact additional data/verification required to activate Portal mode.
- Final order-detail fields visible to the customer.

Current approved portal purpose: view orders. Do not add invoices, accounting, private prices, checkout, or ecommerce behavior without approval.

## 3. Public product fields
Approved public fields:
- name;
- brand;
- reference.

Product photo is not approved as public.

Still pending:
- variants/presentation;
- descriptions/features;
- availability/stock;
- technical data;
- any additional ERP-derived fields.

## 4. Seller extension / real ERP samples
- Collect 5–10 real copied-text examples from the actual ERP seller workflow.
- Final extraction schema.
- Exact matching keys between ERP content and ENVAX request/customer.
- Error behavior for incomplete/ambiguous selections.

Canonical effect after successful processing is already defined: `solicitud → pedido` automatically across ENVAX.

## 5. ERP / Wappsi — all pending real validation
Do not assume any capability until tested and approved, including:
- products/prices;
- customer-specific prices;
- customer lookup;
- invoices;
- create/send orders;
- order readback/status;
- promotions/stock/variants;
- pagination/limits;
- production URL;
- credentials/permissions;
- errors/synchronization.

## 6. Interim internal operations
- Final Google Sheet schema if a Sheet is still used.
- Whether Sheet remains necessary once ENVAX internal states are implemented.

## 7. Promotions implementation details
Product concept is approved: admin targets a specific customer or business type; customer can select one/multiple promotions and continue through WhatsApp/email to an advisor.

Still pending implementation policy:
- exact consent wording;
- sending frequency limits;
- opt-out behavior;
- future push/PWA channel rules.

## 8. Infrastructure / architecture
- Final application stack.
- Backend/data model.
- Anonymous identity architecture.
- Order-state/event model.
- Extension architecture.
- Cloudflare domain/subdomain cleanup after architecture is closed.
- Analytics event schema.
- Privacy/data-retention policy.

## 9. Visual validation
- Final product-grid density after real responsive prototypes.
- Final catalog content presentation once public product fields are closed.

## 10. Pilot validation
- Whether real customers understand favorites lists.
- Whether catalog breadth is perceived as intended.
- Whether order-request and advisor handoff work with minimal friction.
- Whether seller-extension workflow saves enough time operationally.
