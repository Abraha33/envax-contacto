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

### Batch 1 — Global shell and navigation — APPROVED STRUCTURE / READY FOR SCREEN WIREFRAMES
- global header/navigation concept;
- mobile navigation concept;
- search entry;
- access to Lists;
- access to Account/Portal;
- advisor entry;
- breadcrumb/deep-navigation rule.

#### Batch 1 decision: three structural shell states

1. **Landing shell** — minimal entry shell for S01. It does not show the complete catalog navigation.
2. **Catalog shell** — primary shell used across S02–S13 and S17.
3. **Portal-aware shell** — same product shell, with identified-customer context for S14–S16; it is not a separate visual product.

#### Mobile shell

Top header:
- ENVAX identity/logo at left;
- compact `Asesor` access at right;
- no cart or checkout affordance.

Global search:
- persistent search entry immediately below the header on catalog/discovery screens;
- may collapse to a search trigger on task-focused screens such as request/identity/order detail;
- opens S07 Search/Results.

Bottom navigation, maximum five destinations:
1. `Inicio` → S02;
2. `Explorar` → category/brand exploration entry;
3. `Buscar` → S07;
4. `Listas` → S09;
5. `Cuenta` → S14 when anonymous, or Portal/account context when identified.

Advisor access remains outside the five-item bottom navigation so it is always reachable without displacing the catalog destinations.

Mobile deep navigation:
- use a back affordance plus short contextual title;
- do not force desktop-style full breadcrumbs into narrow screens;
- optional compact breadcrumb may be used only when it adds orientation without wrapping excessively.

#### Desktop shell

Primary header row:
- ENVAX identity/logo;
- global search field;
- `Mis listas`;
- account/Portal access;
- `Hablar con asesor`.

Secondary catalog navigation row:
- `Inicio`;
- `Categorías`;
- `Marcas`;
- optional current-section context when useful.

Deep navigation:
- breadcrumb below the navigation shell on taxonomy, product, lists/request and Portal detail screens where hierarchy matters.

#### Anonymous vs identified behavior

Anonymous/session customer:
- can browse catalog;
- can search;
- can create/use named lists;
- can prepare/send a request;
- can contact an advisor;
- account destination leads to identification/Portal activation.

Identified Portal customer:
- retains the same catalog navigation;
- account destination exposes Portal context;
- `Mis pedidos` becomes directly reachable from the account/Portal area and may receive a desktop shortcut;
- Portal never replaces or hides the catalog.

#### Navigation priorities

Priority 1 — discover:
- Inicio;
- Explorar;
- Buscar.

Priority 2 — preserve intent:
- Listas.

Priority 3 — follow-up:
- Cuenta / Mis pedidos.

Always available:
- Asesor.

#### Structural rules

- ENVAX logo/identity always returns to S02 once inside the catalog experience.
- Landing logo does not bypass S01 entry requirements unless the session already has the necessary context.
- Search is globally reachable from every catalog screen.
- Lists are globally reachable from every catalog screen.
- Advisor contact is never blocked by authentication or favorites.
- Portal authentication must not be required for public browsing.
- No cart icon, checkout icon, payment affordance, order-total badge or ecommerce language in the global shell.
- `Mis pedidos` is not presented as a shopping cart/history shortcut for anonymous users.
- Deep screens must provide a deterministic way back to their parent and to Catalog Home.

#### Mobile structural wireframe

```text
┌──────────────────────────────────┐
│ ENVAX                    Asesor  │
├──────────────────────────────────┤
│ 🔎 Buscar productos...           │  ← global search when applicable
├──────────────────────────────────┤
│                                  │
│          SCREEN CONTENT          │
│                                  │
│                                  │
├──────────────────────────────────┤
│ Inicio  Explorar  Buscar  Listas │
│                 Cuenta           │
└──────────────────────────────────┘
```

On deep/task screens:

```text
┌──────────────────────────────────┐
│ ←  Contexto / título     Asesor  │
├──────────────────────────────────┤
│                                  │
│          SCREEN CONTENT          │
│                                  │
├──────────────────────────────────┤
│ Inicio  Explorar  Buscar  Listas │
│                 Cuenta           │
└──────────────────────────────────┘
```

#### Desktop structural wireframe

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ ENVAX      [ Buscar productos........................ ]  Mis listas  Cuenta │
│                                                           Hablar con asesor │
├──────────────────────────────────────────────────────────────────────────────┤
│ Inicio        Categorías        Marcas                                      │
├──────────────────────────────────────────────────────────────────────────────┤
│ Inicio › Categoría › Familia › Contexto actual                              │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                            SCREEN CONTENT                                    │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

#### Batch 1 acceptance checklist

- [x] Landing shell separated from full catalog shell.
- [x] Mobile global navigation defined.
- [x] Desktop global navigation defined.
- [x] Search entry defined.
- [x] Lists access defined.
- [x] Account/Portal access defined.
- [x] Advisor access defined and independent of authentication/lists.
- [x] Anonymous vs identified behavior defined.
- [x] Mobile deep-navigation rule defined.
- [x] Desktop breadcrumb rule defined.
- [x] Ecommerce affordances explicitly excluded.
- [x] Portal remains integrated with, not separate from, the catalog experience.

### Batch 2 — Entry and discovery — NEXT
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

Proceed to **Batch 2 — Entry and discovery**, producing structural mobile-first wireframes for S01 Landing, S02 Catalog Home, S03 Categories and S05 Brands, followed by desktop adaptations.