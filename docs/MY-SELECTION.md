# ENVAX — Mi selección v1

## Purpose
`Mi selección` is the customer's shortlist of products of interest. It is a commercial conversation aid, not a shopping cart.

## Product action
Default concept:
- `+ Me interesa`
- selected state: `✓ En mi selección`

The final microcopy can still be refined, but ecommerce wording such as `Agregar al carrito` is prohibited.

## Allowed actions
- Add product
- Remove product
- Reopen product
- Continue exploring
- Quote selected products
- Contact advisor

## Not part of Mi selección
- Price totals
- Subtotals
- Taxes calculation
- Checkout
- Payment
- Shipping checkout
- Required quantities for the public catalog

## Persistence
The product should be able to retain a selection for a returning customer. Exact identity, expiration, cross-device behavior, and multiple-selection history remain pending product/architecture decisions.

## Quote handoff
When the customer chooses to quote the selection, ENVAX should send the product list plus minimal customer/contact context to the advisor workflow. The customer then receives a short confirmation and may return to the catalog.
