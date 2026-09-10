# Phase 4 — Execution Goal

## Mission
Implement anonymous identity and named favorites on `build/identity-favorites-v1`.

## Required work
1. Create anonymous-account/session data model and migrations.
2. Create secure session issuance/rotation/revocation using HttpOnly/Secure/SameSite cookies as appropriate.
3. Persist business name and business type under the anonymous identity.
4. Implement the approved non-IP recovery mechanism and store only safe/hashed recovery material server-side.
5. Prove cross-device recovery of the same anonymous account.
6. Implement favorite-list CRUD and favorite-item add/remove/move operations.
7. Enforce strict ownership isolation in every favorite endpoint.
8. Add rate limiting and abuse controls to recovery-sensitive endpoints.
9. Add unit/integration/E2E coverage for loss, recovery, conflicts and unauthorized access.
10. Document expiration/revocation behavior and recovery UX assumptions.

## Rules
- no phone/email required for anonymous mode;
- no IP-based identity;
- no direct client database writes;
- favorites remain independent from future orders.

## Stop condition
Evaluate `IDENTITY FAVORITES PASS` and stop before pedido implementation.