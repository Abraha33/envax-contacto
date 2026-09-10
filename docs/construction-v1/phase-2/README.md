# Phase 2 — Catalog Data

## Objective
Create the authoritative ENVAX catalog data layer independently of live ERP/Wappsi.

Planned branch: `build/catalog-data-v1`

Entry condition: `FOUNDATION PASS`.

## In scope
- D1 catalog schema and versioned migrations;
- identify and document the exact Product Master/source used for ingestion;
- normalization for brands, categories, families, products, variants and asset metadata;
- deterministic import pipeline;
- validation and duplicate/error reporting;
- catalog read API;
- search/filter baseline;
- R2 asset-reference policy;
- public/private product-field visibility policy boundary.

## Out of scope
- final visual catalog UI;
- favorites and identity;
- pedidos;
- Wappsi as required catalog source.

## Required outputs
A clean D1 database reproducibly created from migrations and populated from a controlled source, with read contracts that later UI can consume.

## Exit
Phase 2 ends at `CATALOG DATA PASS`.