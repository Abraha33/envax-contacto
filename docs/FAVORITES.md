# ENVAX — Favorites Lists v1

## Purpose
Favorites let a customer save products they commonly buy or may want to order later, grouped into reusable named lists.

Examples:
- `Halloween`
- `Cumpleaños`
- `Uso diario`

Favorites are not a cart and do not imply checkout, payment, totals, taxes, shipping calculation, or automatic purchase.

## Core behavior
A customer can:
- create multiple lists;
- name and rename each list;
- add/remove products;
- reopen a list later;
- keep adding products;
- use a list as the starting point for an order request.

## Product action
Canonical concept:
- `Agregar a favoritos`
- choose existing list or create a new named list.

Final microcopy may still be refined by UX.

## Persistence
Favorites should persist for returning customers.

The product concept includes an anonymous profile/login so customers are not forced into a traditional account before saving lists. Same-device persistence is expected. Cross-device recovery/synchronization is required conceptually but the exact technical solution remains pending architecture definition.

## Relation to Customer Portal
Favorites must be usable independently of Customer Portal mode.

The **Customer Portal is part of V1**, but Portal activation/identification is not required just to create or keep favorites. Portal mode exists for identified customers to access approved private functionality such as `Mis pedidos` and order detail/status.

Do not treat favorites as a Portal-only feature.

## Order handoff
A favorites list can be used to prepare an order request:

`Favorites list → Enviar pedido → WhatsApp or Email → Solicitud enviada → Advisor`

The request remains a `solicitud` internally until the seller processes it through the approved internal workflow, at which point ENVAX updates it to `pedido`.
