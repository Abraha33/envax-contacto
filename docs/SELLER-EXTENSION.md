# ENVAX — Seller Browser Extension v1

Status: current definition priority.

## Purpose
The extension is an internal bridge between the seller's ERP workflow and ENVAX while direct ERP/API integration is unresolved. It must not replace the ERP.

## Core rule
**Manual text selection / explicit seller action, not automatic full-screen scraping.**

The seller chooses the relevant ERP content and invokes the extension.

## Canonical operational effect
When the extension successfully processes the relevant request/order information, ENVAX automatically updates the corresponding record from:

`solicitud → pedido`

The change must propagate consistently across ENVAX.

Seller/advisor assignment is determined by the system, not by the customer.

## Proposed logical flow
1. Seller opens the relevant ERP view.
2. Seller selects/copies the relevant information.
3. Seller opens or invokes the ENVAX extension.
4. Extension parses the selected content.
5. Extension matches the correct ENVAX customer/request.
6. If required data is valid, it writes the normalized result.
7. ENVAX changes `solicitud` to `pedido` automatically.
8. Success/failure is shown clearly.

## Candidate fields
Exact schema is not final. Likely candidates:
- customer/business identifier;
- request/order/document identifier;
- product code/SKU/reference;
- product name;
- quantity;
- price/document values when needed;
- date/status when present.

## Validation behavior
A mandatory confirmation screen is no longer a product requirement. The extension may update automatically when the selected data is valid and confidently matched. Ambiguous, incomplete, or unmatched data must stop and ask for correction instead of guessing.

## Data needed before implementation
Collect 5–10 real examples of copied ERP text covering the actual seller workflow. Do not design the parser from invented examples.

## ERP/API status
Direct Wappsi/API integration remains completely pending real validation. The extension must be able to serve as the operational bridge without assuming the API will be available.

## Safety
- No secrets embedded in extension code.
- Minimum browser permissions.
- No automatic extraction of unrelated page content.
- Never guess a customer/request match.
- Log failures without exposing unnecessary customer-sensitive information.
