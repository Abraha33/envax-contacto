# ENVAX — Seller Browser Extension v1

Status: current definition priority.

## Purpose
The extension is a temporary/internal bridge between the ERP workflow and ENVAX while direct ERP/API integration is unresolved. It must not replace the ERP.

## Core rule
**Manual text selection, not automatic full-screen scraping.**

The seller chooses the exact text/context to capture from the ERP. The extension processes only that selected content.

## Proposed logical flow
1. Seller opens the relevant ERP quotation/order/invoice/customer view.
2. Seller manually selects the relevant text.
3. Seller opens the ENVAX extension.
4. Seller triggers `Capturar selección`.
5. Extension parses candidate fields.
6. Extension shows what it extracted.
7. Seller corrects/validates if necessary.
8. Extension sends the normalized result to ENVAX and/or the internal Google Sheet.
9. Success/failure is shown clearly.

## Candidate fields to extract
Exact schema is not final. Likely candidates:
- customer/business identifier;
- document identifier/type;
- product code/SKU/reference;
- product name;
- quantity;
- unit price;
- totals or document data when required;
- date/status when present.

## Pending critical decision
Should the extension always show a confirmation/review step before it updates ENVAX/Sheet, or can it write automatically when parsing confidence is high? Current status: **PENDING**.

## Data needed before implementation
Collect 5–10 real examples of copied ERP text covering, where possible:
- quotation;
- order;
- invoice;
- customer block;
- line items with product, quantity, and price.

Do not design the parser from invented examples.

## Pilot rule
Validate whether the real operational volume justifies an extension. A manual Google Sheet workflow may be sufficient for the first pilot.

## Safety
- No secrets embedded in extension code.
- Minimum browser permissions.
- No automatic extraction of unrelated page content.
- Clear user confirmation on ambiguous or incomplete data.
- Log failures without exposing customer-sensitive information unnecessarily.
