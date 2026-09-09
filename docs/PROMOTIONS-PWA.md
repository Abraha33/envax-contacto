# ENVAX — Promotions and PWA v1

Status: future scope after the catalog/advisor flow is validated.

## Goal
Use known business type, product interests, and consent to send relevant promotions that bring customers back into the catalog.

## Principle
Promotions must support the catalog relationship without turning ENVAX into ecommerce.

## Potential inputs
- Business type
- Selected products
- Categories/brands of interest
- Previous requests
- Explicit promotion consent

## Potential flow
`Known customer → Relevant promotion → Notification/message → Deep link to product/category → Mi selección → Advisor`

## Channels
Possible channels include browser/PWA notifications, email, and WhatsApp according to consent and implementation strategy.

## PWA
A PWA is preferred over distributing an APK if an app-like experience is eventually needed. Installation must remain optional.

## Platform caveat
Browser push behavior differs by platform. In particular, iPhone/Safari has additional requirements compared with common Android/desktop flows. This must be validated before promising universal push delivery.

## Consent
Promotional communication requires an explicit, recorded user choice. Exact wording, unsubscribe behavior, retention, and legal/privacy implementation remain pending.

## Not MVP
Do not make promotions, PWA installation, or push notifications prerequisites for launching the initial catalog.
