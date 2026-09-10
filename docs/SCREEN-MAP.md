# ENVAX — Screen Map v1

This document defines the inventory of screens/states to design. It is not the final visual design.

## Public / catalog
1. Landing
2. Catalog cover
3. Exploration choice: category / brand
4. Category index
5. Brand index
6. Category page
7. Brand page
8. Family page
9. Product listing
10. Product detail
11. Variant / presentation state
12. Search
13. Search results
14. Filters
15. No-results state
16. Loading state
17. Error state
18. 404

## Anonymous profile / persistence
19. Anonymous-profile creation/confirmation state if UX requires one
20. Anonymous-profile recovery / cross-device state — technical method pending
21. Returning-customer restored state

## Favorites lists
22. Favorites home / lists index
23. Empty favorites state
24. Create named favorites list
25. Rename list
26. Favorites list with products
27. Add product to existing/new list
28. Product-added confirmation
29. Remove product
30. Add more products
31. Prepare/send order from favorites

## Order request / advisor
32. Send-order summary
33. Choose WhatsApp or Email
34. Optional short note
35. Confirm send
36. `Solicitud enviada` confirmation
37. `En atención` state
38. `Pedido confirmado` state
39. `Completado` state
40. Contact advisor without favorites
41. WhatsApp confirmation message
42. Email confirmation message

## Optional Customer Portal
43. Portal activation / identification
44. Portal access/login state
45. `Mis pedidos`
46. Order detail/status

Current approved portal purpose is order visibility only. Do not add invoices, accounting, private prices, checkout, or ecommerce behavior without explicit approval.

## Promotions
47. Promotions feed/list
48. Promotion detail
49. Select one/multiple promotions
50. Promotion selection summary
51. Continue via WhatsApp/Email
52. Promotion request confirmation

## Future notification/PWA states
53. PWA install prompt/state if implemented
54. Notification permission/settings state
55. Deep-linked promotion from notification

## Internal administrator
56. Admin promotions list
57. Create/edit promotion
58. Choose recipients
59. Target specific customer
60. Target business type
61. Send/publish confirmation

## Internal seller extension
62. Extension idle state
63. Selected-text capture state
64. Parsing/validation state
65. Ambiguous/missing-fields state
66. Customer/request matching state
67. Automatic successful write state
68. `solicitud → pedido` success state
69. Failure / retry state

## Responsive baseline
- Desktop large: test 6 product columns.
- Desktop standard: test 5–6 columns.
- Tablet: test 3–4 columns.
- Mobile: 2 columns.

The density rule is not a fixed grid count: show the greatest useful variety without losing product recognition or clarity.
