# ENVAX — User Flow v1

## 1. Public entry

Sources:
- QR card;
- website;
- social networks;
- WhatsApp;
- search;
- direct link.

Canonical public flow:

`Entry → Landing → Catalog`

The public catalog can be explored without login.

ENVAX does not persist anonymous business data in its database. Analytics may record anonymous technical events under the approved privacy rules.

## 2. Catalog exploration

`Catalog cover → Index / exploration mode → Category or Brand → Product list → Product detail → Variant/Presentation`

Supporting actions:
- Search
- Filters
- Return to index
- Switch between category and brand exploration
- Direct WhatsApp/email contact

V1 shows approved catalog information and photos/media, but not prices or stock.

## 3. Anonymous favorites

Before login, favorites may exist only as local browser/device convenience state.

Rules:
- they are not persisted as customer business data in ENVAX;
- they may be lost if local storage/browser/device changes;
- they do not authorize access to private areas;
- they may be offered for transfer into a customer's persistent lists after login when implementation supports it safely.

## 4. Identification/login

Persistent customer capabilities require authentication.

V1 login:

`Account / Identification → Email + Password → Supabase Auth → Authenticated ENVAX experience`

No separate username system is required.

MFA/2FA is future optional reinforcement.

## 5. Persistent favorites

Authenticated customer flow:

`Product → Add to favorites → Choose existing list OR create named list → Continue exploring`

Allowed actions:
- Create list
- Name/rename list
- Add/remove variants/presentations
- Reopen list
- Keep adding products
- Use list to prepare a formal request

Lists are not carts and contain no V1 price totals.

## 6. Formal request

A formal ENVAX request requires authentication.

Structured flow:

`List / selected products → Prepare request → confirm quantities → Enviar pedido → choose WhatsApp or Email handoff → Solicitud enviada`

Backend creates the formal `solicitud` and historical item snapshots before reporting success.

The source list remains reusable and editable; changes after submission do not alter the historical request.

## 7. Direct contact without a formal request

A visitor/customer must never be blocked from contacting ENVAX.

`Hablar con vendedor/asesor → WhatsApp or Email`

Direct contact alone does not automatically create a formal `solicitud` in ENVAX.

## 8. Commercial processing

V1 has exactly one seller.

Every formal request reaches that seller; the customer does not choose a seller and ENVAX does not run assignment/routing logic.

Canonical flow:

`SOLICITUD_ENVIADA → EN_ATENCION → PEDIDO_CONFIRMADO → FACTURADO`

Exception paths:
- solicitud cancelada;
- solicitud cerrada sin pedido;
- pedido cancelado.

Customer does not directly change commercial states.

`FACTURADO` means the seller/admin confirms the external invoicing process completed successfully outside ENVAX. ENVAX does not expose invoice files or electronic invoicing functionality.

## 9. My orders / authenticated customer area

Private capability flow:

`Authenticated ENVAX → Mis pedidos → Order detail/status → Contact seller if needed`

This is part of the same ENVAX experience; it is not a separate ecommerce application.

Initial V1 only guarantees visibility for orders created/recognized through ENVAX after the customer account relationship exists.

## 10. Promotions

Private promotions require authentication.

Intended flow:

`Authenticated customer → Eligible promotion → Select interest → WhatsApp/Email → Seller`

Promotions do not trigger checkout, automatic purchase or payment.

## 11. Seller extension

Operational flow:

`Seller opens relevant external-system context → invokes extension → extension validates/normalizes allowed data → ENVAX API → review when ambiguous → seller confirms external completion when appropriate`

The extension must not silently guess and must not contain permanent ERP/service secrets.

## 12. Future notifications

PWA/browser notifications remain future scope and do not block V1.
