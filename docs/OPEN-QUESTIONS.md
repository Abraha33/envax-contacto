# ENVAX — Open Questions

## Current priority: seller extension
1. Does the seller have to confirm extracted data before the extension writes to ENVAX/Sheet?
2. What exact text does Wappsi expose when a seller manually copies a quotation/order/invoice?
3. What is the minimum extraction schema?
4. How are ambiguous/missing fields handled?
5. How is the correct ENVAX customer/request matched?
6. Does real transaction volume justify building the extension now?

## Google Sheet
7. Final columns for `Solicitudes automáticas`.
8. Final columns for `Pedidos confirmados`.
9. Who owns/maintains the Sheet?
10. How does ENVAX write to it securely?
11. How are seller assignment and states represented?

## Customer identity / persistence
12. How is a returning customer recognized without traditional login friction?
13. How is identity joined across phone and desktop?
14. How long is Mi selección retained?
15. Are multiple named/dated selections required in the MVP or later?

## Advisor operations
16. Exact destination of new requests.
17. Assignment logic for sellers.
18. Required response-time promise / wording.
19. Whether advisor status lives only in Sheet or later in ENVAX.

## Catalog content
20. Final public product fields.
21. Final canonical source for name/category/family/brand/image.
22. Product-master-to-ERP identifier mapping.
23. Missing-image policy.
24. Final grid density after visual testing.

## ERP / Wappsi — all pending validation
25. Products/prices in real production environment.
26. Customer-specific prices.
27. Customer lookup/identity.
28. Full invoices by customer.
29. Create/send orders externally.
30. Order status/readback.
31. Promotions/stock/variants behavior.
32. Pagination, limits, production URL, credentials, permissions, errors, synchronization.

## Promotions / PWA
33. Promotion eligibility rules.
34. Consent copy and record.
35. Frequency limits.
36. Channel strategy.
37. iPhone/Safari push constraints.
38. Whether PWA adds enough value after MVP validation.

## Infrastructure
39. Final application architecture/stack.
40. Cloudflare domain/subdomain cleanup after architecture is closed.
41. Analytics event schema.
42. Privacy/data-retention policy.
