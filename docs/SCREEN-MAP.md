# ENVAX — Screen Map V1

**Status:** CLOSED / APPROVED  
**Phase:** Frontend Phase 3 — Screen Map V1  
**Date:** 2026-09-14

This document is the canonical V1 inventory of customer-facing screens and supporting UI states. It is not the final visual design.

The detailed matrix is in `SCREEN-MATRIX-V1.md`. The reproducible Mermaid source is in `SCREEN-MAP-V1.mmd`.

## 1. Main V1 screens

### Entry
1. `S01` — Landing

### Public catalog
2. `S02` — Catalog home
3. `S03` — Categories
4. `S04` — Category / Family
5. `S05` — Brands
6. `S06` — Brand
7. `S07` — Search / Results
8. `S08` — Product detail

### Lists and commercial intent
9. `S09` — My lists
10. `S10` — List detail
11. `S11` — Prepare request
12. `S12` — Send request
13. `S13` — Request sent

### Identity and Customer Portal
14. `S14` — Account / Identification
15. `S15` — My orders
16. `S16` — Order detail

### Human assistance
17. `S17` — Advisor contact

## 2. Auxiliary V1 views/states

- `A01` — Create list
- `A02` — Choose list
- `A03` — Product added
- `A04` — Rename list
- `A05` — Confirm deletion
- `A06` — Empty list
- `A07` — No results
- `A08` — No orders
- `A09` — Loading
- `A10` — Generic error
- `A11` — Content unavailable
- `A12` — Offline
- `A13` — Session expired
- `A14` — Success feedback
- `A15` — Unsaved changes

Auxiliary elements may be implemented as modals, bottom sheets, drawers, toast/inline feedback, skeletons, or page-level states depending on responsive context. They are not automatically separate routes.

## 3. Core V1 flows

### Discovery
`Landing → Catalog → Category / Brand / Search → Product`

### Lists
`Product → Choose/create list → Product added → List detail`

### Request
`List detail OR Product → Prepare request → Send request → WhatsApp/Email → Request sent`

### Advisor
The advisor must remain reachable from relevant points even without favorites or a prepared request.

### Portal
`Account/Identification → My orders → Order detail → Advisor`

The public catalog remains usable without Portal activation.

## 4. Screen reuse rule

The 17 functional screens do not imply 17 independent frontend architectures. V1 is expected to reuse approximately 13 structural templates, especially for taxonomy indexes, product grids, request steps, and shared states.

## 5. Responsive rule

All core V1 customer flows must support:
- mobile;
- tablet;
- desktop.

No core V1 customer screen is desktop-only.

Exact visual grid counts, typography, colors, spacing, shadows, image treatment, and responsive composition belong to later design phases and are not frozen here.

## 6. Explicitly outside this Phase 3 V1 map

Do not mix the core screen map with later/future product areas such as:
- promotions and promotion administration;
- PWA/install prompts and push notifications;
- richer Portal functionality;
- invoices, accounting, private prices, payments, checkout;
- ERP integration screens;
- seller browser extension UI;
- internal administrator UI;
- sharing products/lists;
- deeper automation.

Those items may be documented in their own later-scope maps. They do not belong to the frozen customer-facing V1 screen inventory unless product scope is explicitly changed.

## 7. Phase 3 audit results

The final screen-map audit confirmed:
- every main V1 screen has an entry and meaningful exit;
- discovery converges on product detail;
- saved-product flow includes explicit choose/create-list and success feedback;
- requests can start from a list or directly from product context;
- advisor contact is available independently of favorites;
- request contact and general advisor contact are separated conceptually;
- Customer Portal is connected to the public experience but is not required for catalog exploration;
- Portal-only order screens require identified-customer access;
- loading, empty, error, offline, session-expired, unavailable-content, success, and unsaved-change states are represented;
- users have recovery paths back to the catalog;
- no additional main V1 screen was required by the audit.

## 8. Freeze rule

**Frontend Phase 3 is CLOSED.**

The canonical Phase 3 artifacts are:
- `SCREEN-MAP.md`
- `SCREEN-MATRIX-V1.md`
- `SCREEN-MAP-V1.mmd`

Any later addition/removal of a V1 screen or material change in screen responsibility must update these artifacts before downstream wireframes or implementation are considered canonical.

## Next phase

Proceed to **Frontend Phase 4 — Wireframes / Structural Prototyping**.

Phase 4 will decide the layout and information placement of every approved screen before visual styling is finalized.