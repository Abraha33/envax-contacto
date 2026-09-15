# ENVAX — Seller Browser Extension v1

Status: approved operational direction; parser details depend on real sanitized examples.

## Purpose

The extension is an internal tool for the single ENVAX seller while direct ERP/Wappsi integration remains unresolved.

It helps transform/copy validated ENVAX commercial information into the external system and/or validate external operational results without turning ENVAX into an invoicing application.

## Core rule

**Explicit seller action only. No silent full-screen scraping or guessing.**

The seller chooses the relevant context and invokes the extension.

## Canonical commercial role

V1 has one seller; there is no assignment/routing logic.

The extension supports approved seller operations but does not decide state transitions on its own.

ENVAX server remains authoritative for:
- request state;
- request→order conversion;
- cancellation;
- `FACTURADO`.

## Preferred logical flow

1. Seller opens the relevant ENVAX request/order.
2. Extension obtains permitted ENVAX context through authenticated API.
3. Seller opens/uses the external operational system.
4. Seller explicitly selects/invokes only the relevant external information where capture is needed.
5. Deterministic parser/validation extracts candidate values.
6. If incomplete/ambiguous/unmatched, extension stops for review.
7. If valid, extension performs only the approved API operation/context handoff.
8. ENVAX server validates identity, role, current state and idempotency.
9. Seller explicitly confirms external invoicing success before ENVAX records `FACTURADO`.

## Request → order

A formal request becomes a real ENVAX order only through an approved seller/admin server command.

The operation must be transactional and idempotent:
- validate request state;
- create exactly one order;
- copy historical item snapshots;
- update request;
- write audit event.

The extension may assist this workflow but cannot bypass server rules.

## `FACTURADO`

`FACTURADO` means only:

> The seller/admin confirmed that the order was invoiced/formalized successfully in the external system.

The extension must never mark `FACTURADO` merely because:
- an external screen opened;
- data was copied;
- a parser found an identifier;
- a click occurred.

Explicit confirmed success is required.

## Candidate external fields

Exact parser schema must come from real sanitized examples, not invented assumptions.

Potentially useful external context may include:
- ENVAX request/order reference;
- external document/order identifier;
- product reference/SKU;
- quantity;
- customer/business identifier where needed for safe matching;
- external status/result.

Prices are not part of the ENVAX V1 catalog/order domain and should not be persisted merely because the ERP displays them.

## Authentication and security

- Seller authenticates through Supabase Auth.
- Extension uses seller session/context through ENVAX API.
- No Supabase service-role/secret key in extension code.
- No permanent ERP secret in extension bundle.
- Minimum browser permissions.
- No direct privileged database access.
- No unrelated page scraping.
- No raw ERP clipboard text stored by default.
- Fail closed on ambiguity.

## Data needed before parser implementation

Collect 5–10 sanitized real examples covering the actual seller workflow before implementing deterministic parser patterns.

Fixtures in a public repository must contain fake/sanitized customer/business values.

## ERP/API status

Direct Wappsi/API integration remains **PENDING REAL VALIDATION**.

The extension must remain useful without assuming an ERP API will exist.
