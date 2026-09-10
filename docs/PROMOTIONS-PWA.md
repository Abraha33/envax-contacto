# ENVAX — Promotions and PWA v1

Status: promotions are part of the product roadmap; PWA/push remains later scope.

## Goal
Let ENVAX send relevant promotions to customers without turning the catalog into ecommerce.

## Administrator model
Promotions are controlled from an administrator panel/module.

An administrator can choose recipients such as:
- one specific customer;
- a business type, for example `Panadería`.

Business type collected at landing is therefore a core segmentation field.

## Customer promotion flow
A customer can receive/open promotions, select one or multiple promotions of interest, and continue to an advisor.

`Promotion(s) → Select one or more → Continue → WhatsApp or Email → Advisor`

This mirrors the lightweight interest logic of favorites lists. A promotion selection is not an automatic purchase.

## Channels
Current commercial handoff channels:
- WhatsApp;
- Email.

Future outbound promotion-delivery channels may also include browser/PWA notifications, subject to consent and technical validation.

## PWA
A PWA is preferred over distributing an APK if an app-like experience is eventually useful. Installation must remain optional.

## Consent and privacy
Exact consent wording, opt-out behavior, frequency limits, legal/privacy implementation, and push-notification permissions remain pending detailed design.

## Platform caveat
Browser push behavior differs by platform; do not promise universal delivery until validated.

## Scope rule
Promotions must not delay the first catalog/favorites/order-request product version.
