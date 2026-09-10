# Phase 8 — Admin + Promotions

## Objective
Give ENVAX an internal administrative module for promotion management and targeted commercial outreach without turning promotions into automatic ecommerce purchases.

Planned branch: `build/admin-promotions-v1`

Entry condition: `PORTAL PASS`.

## In scope
- internal admin authorization boundary;
- promotion CRUD and lifecycle dates;
- targeting one customer or a business type;
- eligibility queries;
- customer-visible eligible promotions;
- select one or multiple promotions of interest;
- advisor handoff with selected promotion context;
- audit trail;
- consent/channel hooks where required;
- basic operational analytics/events.

## Out of scope
- automatic purchase/checkout;
- broad marketing automation platform;
- push/PWA unless separately approved and technically validated;
- ERP-dependent pricing logic unless validated.

## Required outputs
An authorized ENVAX admin can create and target promotions, and only eligible customers can see/select them and continue to an advisor.

## Exit
Phase 8 ends at `PROMOTIONS PASS`.