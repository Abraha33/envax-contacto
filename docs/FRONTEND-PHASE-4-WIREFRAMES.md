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
- The public experience must continue to feel like a B2B catalog, not ecommerce.

## Batch 1 — Global shell and navigation — APPROVED

### Approved navigation direction: Option B — Header + side menu/drawer

The previously considered bottom-navigation shell is **rejected** as the canonical direction. ENVAX V1 adopts the **header + side menu/drawer** pattern as the structural baseline.

### Why this direction

- Fits a catalog better than an app-style bottom navigation.
- Scales to more destinations without forcing a five-item limit.
- Keeps the main canvas cleaner for dense product browsing.
- Gives the Portal, lists and advisor actions a predictable home.
- Preserves one coherent navigation model across mobile and desktop.

### Three shell states

1. **Landing shell** — minimal entry shell for S01; no full catalog navigation before entry context is established.
2. **Catalog shell** — primary shell across S02–S13 and S17.
3. **Portal-aware shell** — same ENVAX shell, with identified-customer context for S14–S16; Portal is not a separate visual product.

### Mobile shell

Top header:
- menu trigger at left;
- ENVAX identity/logo centered or visually dominant;
- compact advisor/contact trigger at right;
- no cart, checkout or ecommerce badge.

Search:
- prominent search field below the header on discovery-heavy screens;
- may collapse to a search action on task-focused screens;
- opens S07 Search/Results.

Side drawer/menu destinations:
1. Inicio → S02
2. Categorías → S03
3. Marcas → S05
4. Buscar → S07
5. Mis listas → S09
6. Mi cuenta / Portal → S14
7. Mis pedidos → S15 only when identified
8. Hablar con asesor → S17
9. Ayuda/contact context if later approved as content, not a new V1 screen by default

Deep navigation:
- back affordance + short contextual title;
- compact breadcrumb only when it adds orientation without wrapping excessively.

### Desktop shell

Primary structure:
- persistent left navigation rail/sidebar using the same information architecture as the mobile drawer;
- top utility area for search and contextual account/advisor actions;
- main content canvas to the right;
- breadcrumb/context line on deep taxonomy, product, list/request and Portal detail views when useful.

Primary desktop destinations:
- Inicio
- Categorías
- Marcas
- Mis listas
- Mi cuenta / Portal
- Mis pedidos when identified
- Hablar con asesor

Global search remains highly visible in the top utility area.

### Anonymous vs identified behavior

Anonymous/session customer:
- can browse catalog;
- can search;
- can create/use named lists;
- can prepare/send requests;
- can contact an advisor;
- `Mi cuenta` leads to identification/Portal activation.

Identified Portal customer:
- keeps the same catalog navigation;
- `Mi cuenta` exposes Portal context;
- `Mis pedidos` becomes directly available;
- Portal never replaces or hides the catalog.

### Structural rules

- ENVAX identity returns to S02 once inside the catalog experience.
- Landing identity does not bypass S01 entry requirements unless session context already exists.
- Search, lists and advisor are reachable from all relevant catalog screens.
- Advisor contact is never blocked by authentication or favorites.
- Portal authentication is never required for public browsing.
- No cart icon, checkout icon, payment affordance, order-total badge or ecommerce language.
- Deep screens must provide a deterministic way back to their parent and to Catalog Home.
- The mobile drawer and desktop sidebar share the same information architecture even if their visual treatment differs.

### Batch 1 acceptance checklist

- [x] Navigation alternatives were visualized before approval.
- [x] Option B — Header + side menu/drawer selected.
- [x] Bottom-navigation proposal rejected as canonical shell.
- [x] Landing shell separated from full catalog shell.
- [x] Mobile header/drawer defined structurally.
- [x] Desktop sidebar/header model defined structurally.
- [x] Search entry defined.
- [x] Lists access defined.
- [x] Account/Portal access defined.
- [x] Advisor access defined and independent of authentication/lists.
- [x] Anonymous vs identified behavior defined.
- [x] Deep-navigation rule defined.
- [x] Ecommerce affordances explicitly excluded.

## Batch 2 — Entry and discovery — IN PROGRESS

Produce wireframes using the approved Option B shell:
- S01 Landing
- S02 Catalog Home
- S03 Categories
- S05 Brands

Order:
1. mobile wireframes;
2. review/approval;
3. desktop adaptations;
4. review/approval.

## Batch 3 — Catalog exploration
- S04 Category / Family
- S06 Brand
- S07 Search / Results
- S08 Product detail

## Batch 4 — Lists
- S09 My lists
- S10 List detail
- A01 Create list
- A02 Choose list
- A03 Product added
- A04 Rename list
- A05 Confirm deletion
- A06 Empty list

## Batch 5 — Request and advisor
- S11 Prepare request
- S12 Send request
- S13 Request sent
- S17 Advisor contact

## Batch 6 — Customer Portal
- S14 Account / Identification
- S15 My orders
- S16 Order detail

## Batch 7 — Cross-screen states
- A07 No results
- A08 No orders
- A09 Loading
- A10 Generic error
- A11 Content unavailable
- A12 Offline
- A13 Session expired
- A14 Success feedback
- A15 Unsaved changes

## Batch 8 — Responsive convergence
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

Continue **Batch 2 — Entry and discovery** with structural mobile wireframes for S01 Landing, S02 Catalog Home, S03 Categories and S05 Brands using the approved Option B navigation model.