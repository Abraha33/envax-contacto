# ENVAX — ERP / Wappsi Integration Status

## Canonical status
**PENDING REAL VALIDATION.**

Do not treat any ERP integration capability as production-ready or product-committed until it has been tested against the real environment and approved.

## Capabilities that must be validated
- Read products externally
- Read product prices
- Determine whether prices can be customer-specific
- Read stock / variants
- Read promotions
- Search/identify customers
- Read each customer's invoices with full detail
- Read products, quantities, prices, taxes, totals, dates, and identifiers from invoices
- Create/send orders from ENVAX into Wappsi
- Read order status
- Pagination for large catalogs
- API rate limits / quotas
- Production base URL
- Authentication/permissions
- Error behavior and availability
- Synchronization strategy

## Existing documentation
Wappsi documentation has been received for product-related endpoints, but the project decision is to keep the integration **unconfirmed in general** until real validation is performed.

Because the repository is public, do not commit confidential Wappsi documents, API keys, credentials, customer data, invoices, or production secrets here.

## Architecture rule
If/when integration is approved, the customer's browser must not receive Wappsi API credentials. The expected pattern is:

`Browser → ENVAX backend → Wappsi`

not direct browser-to-Wappsi calls containing secret API keys.

## Current fallback
Until direct integration is validated, use the internal operational flow (Google Sheet and/or seller browser extension) as the provisional bridge where justified.
