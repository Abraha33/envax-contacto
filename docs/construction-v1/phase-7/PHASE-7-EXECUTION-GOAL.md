# Phase 7 — Execution Goal

## Mission
Implement the optional verified-customer layer on `build/customer-portal-v1` without creating a second product.

## Required work
1. Finalize the minimum verified customer fields and contact verification adapter contract.
2. Add customer/contact/session migrations and linking rules from anonymous account → verified customer.
3. Preserve anonymous favorites and commercial history during upgrade.
4. Implement verification, logout, revocation and recovery flows.
5. Implement `Mis pedidos` list/detail/status using ownership-scoped API endpoints.
6. Keep the Portal intentionally small; favorites may reuse existing app capability rather than be duplicated.
7. Rate-limit verification/recovery attempts and audit sensitive identity changes.
8. Ensure provider-disabled/unavailable environments fail gracefully without corrupting identity.
9. Add authorization tests proving one customer cannot access another customer's orders.
10. Add upgrade/recovery E2E coverage.

## Rules
- one ENVAX app, optional customer mode;
- no invoices/accounting/checkout;
- no data loss when anonymous identity upgrades;
- verification provider is replaceable behind an adapter.

## Stop condition
Evaluate `PORTAL PASS` and stop before Admin/Promotions implementation.