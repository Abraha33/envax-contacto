# ENVAX — Architecture Decisions v1

## Product boundaries
- ENVAX is a B2B digital catalog first.
- Public experience is not ecommerce.
- Public catalog has no cart/checkout/payment flow.
- `Mi selección` is a shortlist for commercial conversation.
- Human advisor remains the commercial conversion point.

## Visual direction
- Minimalist, editorial, clean, professional B2B.
- White/off-white dominant surfaces.
- ENVAX blue as primary accent.
- ENVAX brand first, partner brands second.
- Product photography is central.
- Dense product grids are acceptable when they reinforce breadth without reducing clarity.

## Responsive baseline
- Large desktop: test 6 columns.
- Standard desktop: 5–6.
- Tablet: 3–4.
- Mobile: 2.

## Customer identity
The initial experience should avoid traditional registration friction. Returning-customer recognition/persistence is required conceptually, but the exact identity model (browser token, contact verification, magic link, account, cross-device merge, etc.) is not yet approved.

## Internal operations
A lightweight Google Sheet may be used as an interim commercial tracker. The seller browser extension is being explored as an internal bridge to reduce manual re-entry from the ERP.

## ERP
All API integration claims are pending real validation.

## Promotions
Promotions/PWA/push are future phases and must not block the MVP.

## Security
- Never expose ERP/API secrets in browser code.
- Public repository must contain no confidential ERP documents, credentials, real customer data, or invoices.
- Extension permissions should be minimal.
