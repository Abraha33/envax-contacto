# Phase 3 — Execution Goal

## Mission
Implement the approved ENVAX catalog UX on `build/catalog-ui-v1` after Catalog Data and the relevant Design Ready gate pass.

## Required work
1. Map approved design screens/states to real routes and components.
2. Implement landing handoff, catalog index, category/brand/family/product navigation, search and filters.
3. Build responsive layouts for desktop, tablet and mobile using approved visual rules.
4. Add loading, empty, no-results, error and 404 states.
5. Preserve catalog character: no cart, checkout, payment, totals or ecommerce pressure.
6. Add keyboard navigation, semantic landmarks, focus handling and accessible labels.
7. Add E2E navigation from landing to product detail.
8. Measure performance and document any asset bottlenecks.
9. Keep later favorites/pedido actions behind placeholders only if approved; do not fake persistence.

## Rules
- do not invent visual design missing from approved references;
- do not expose fields/media the visibility policy marks private;
- use the API, never direct D1 access.

## Stop condition
Evaluate `CATALOG UX PASS`, document evidence and stop before implementing identity/favorites.