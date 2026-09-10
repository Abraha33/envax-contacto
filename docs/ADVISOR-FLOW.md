# ENVAX — Advisor / Order Flow v1

## Goal
Convert product or promotion interest into a fast human-assisted order flow.

## With favorites
`Favorites list → Enviar pedido → WhatsApp or Email → Solicitud enviada → Advisor`

Advisor context should include at minimum:
- business name;
- business type;
- contact channel/details when provided;
- selected products or promotions;
- timestamp;
- optional customer note.

## Without favorites
Do not block the customer.

`Hablar con un asesor → Continue directly OR choose products/promotions → WhatsApp/Email → Advisor`

## Customer confirmation
Keep it short.

### WhatsApp concept
- ENVAX received the request.
- Products/promotions of interest.
- `En breve uno de nuestros asesores te atenderá.`
- Link back to the catalog.

### Email concept
Subject: `Recibimos tu solicitud ENVAX`

Body:
- Products/promotions of interest.
- Advisor-attention-soon message.
- `Ver catálogo` link/button.

## Request vs order
Customer CTA may say `Enviar pedido`, but internally the first state is a **solicitud de pedido**.

When the seller successfully processes it through the approved extension/internal workflow, ENVAX automatically updates the record from `solicitud` to `pedido` across the system.

## Customer-visible states
Current conceptual path:
`Solicitud enviada → En atención → Pedido confirmado → Completado`

## Seller assignment
Seller/advisor assignment is determined by the system. The customer does not choose a seller.

## ERP
Direct ERP/API behavior remains pending real validation and must not be assumed.
