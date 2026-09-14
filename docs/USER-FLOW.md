# ENVAX — User Flow v1

## Entry
Sources: QR card, website, social networks, WhatsApp, direct link.

`Entry → Landing → Business name → Business type → Continue → Catalog`

No traditional account creation is required for the initial catalog experience.

ENVAX may create an anonymous profile/session from this minimal entry so the customer can save favorites without being forced through a full registration form.

## Catalog exploration
`Catalog cover → Index / exploration mode → Category or Brand → Family → Product list → Product detail → Variant`

Supporting actions:
- Search
- Filters
- Return to index
- Switch between category and brand exploration

## Favorites
The canonical persistence model is multiple **named favorites lists**, not one single `Mi selección`.

Examples:
- Halloween
- Cumpleaños
- Uso diario

Flow:
`Product → Add to favorites → Choose existing list OR create named list → Continue exploring`

Allowed actions:
- Create list
- Name/rename list
- Add/remove products
- Reopen list
- Keep adding products
- Use list to prepare an order request

## Order request from favorites
`Favorites list → Enviar pedido → Choose WhatsApp or Email → Confirm → Solicitud enviada → Advisor handles request`

The customer may include a short optional message, but it must never be required.

## Contact without favorites
A customer must never be blocked from contacting ENVAX.

`Hablar con un asesor → Suggest using favorites if useful → Continue directly OR choose products → WhatsApp/Email → Advisor`

## Customer-visible status
After sending, the customer can later see a simple status such as:

`Solicitud enviada → En atención → Pedido confirmado → Completado`

The internal transition from `solicitud` to `pedido` occurs when the seller processes the request through the approved internal workflow/extension.

## Return visit / anonymous profile
Same-device persistence should restore the customer's anonymous context and favorites where possible.

Cross-device synchronization is required conceptually, but the exact anonymous-login/recovery technology is **PENDING ARCHITECTURE DECISION**.

## Customer Portal — V1
The Customer Portal is part of V1 as a separate mode from the public catalog.

Portal activation may require the customer to provide or verify additional information.

Current approved portal flow:
`Catalog / returning customer → Activate or access Portal → Identification/login → Mis pedidos → Order detail/status`

Current approved portal purpose:
- view their orders;
- view order detail;
- view the simple order status.

Do not add invoices, accounting, private prices, checkout, payments, or ecommerce behavior without explicit approval.

Favorites remain usable independently of Customer Portal mode.

## Promotions
Promotions are approved as a later product capability and must not block the core V1 catalog + order-request + Customer Portal implementation.

Intended customer flow:
`Promotion received/opened → Select one or more promotions → Continue → WhatsApp or Email → Advisor`

Promotions support commercial intent; they do not trigger automatic purchase.

## Future notifications / PWA
Browser/PWA notifications remain future scope. They must not block V1.
