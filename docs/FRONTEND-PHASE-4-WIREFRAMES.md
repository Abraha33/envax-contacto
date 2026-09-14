# ENVAX — Frontend Phase 4: Wireframes / Structural Prototyping

**Status:** IN PROGRESS  
**Date:** 2026-09-14

## Goal

Translate the frozen Phase 3 screen inventory into structural wireframes before final visual styling or frontend implementation.

Phase 4 answers: **where does each approved piece of information/action live on the screen, in mobile and desktop?**

## Rules

- Mobile-first, then desktop adaptation.
- Do not change Phase 1 product scope silently.
- Do not create new V1 screens unless Phase 3 is updated first.
- Do not decide final color, typography, shadows, photography treatment, animation, or polish here.
- Wireframes must include real interaction hierarchy, not decorative mockups.
- Reuse the 13 structural templates identified in `SCREEN-MATRIX-V1.md`.
- Every primary wireframe must account for its important empty/loading/error/contextual states.

## Work order

### Batch 1 — Global shell and navigation
- global header/navigation concept;
- mobile navigation concept;
- search entry;
- access to Lists;
- access to Account/Portal;
- advisor entry;
- breadcrumb/deep-navigation rule.

### Batch 2 — Entry and discovery
- S01 Landing;
- S02 Catalog home;
- S03 Categories;
- S05 Brands.

### Batch 3 — Catalog exploration
- S04 Category / Family;
- S06 Brand;
- S07 Search / Results;
- S08 Product detail.

### Batch 4 — Lists
- S09 My lists;
- S10 List detail;
- A01 Create list;
- A02 Choose list;
- A03 Product added;
- A04 Rename list;
- A05 Confirm deletion;
- A06 Empty list.

### Batch 5 — Request and advisor
- S11 Prepare request;
- S12 Send request;
- S13 Request sent;
- S17 Advisor contact.

### Batch 6 — Customer Portal
- S14 Account / Identification;
- S15 My orders;
- S16 Order detail.

### Batch 7 — Cross-screen states
- A07 No results;
- A08 No orders;
- A09 Loading;
- A10 Generic error;
- A11 Content unavailable;
- A12 Offline;
- A13 Session expired;
- A14 Success feedback;
- A15 Unsaved changes.

### Batch 8 — Responsive convergence
For each approved template:
- mobile;
- tablet behavior;
- desktop;
- navigation continuity;
- content priority;
- overflow/density behavior;
- keyboard/focus implications where structurally relevant.

## Wireframe Definition of Done

A screen/template wireframe is complete when:
- information hierarchy is visible;
- primary and secondary actions are located;
- navigation in/out is represented;
- important states are represented;
- anonymous vs identified behavior is clear where relevant;
- mobile structure is approved;
- desktop adaptation is approved;
- no ecommerce behavior has been introduced;
- it maps back to a frozen Phase 3 screen/template.

## Current next action

Start **Batch 1 — Global shell and navigation**, because all subsequent wireframes depend on the same navigation and layout skeleton.