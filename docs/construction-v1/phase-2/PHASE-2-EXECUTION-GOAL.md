# Phase 2 — Execution Goal

## Mission
Implement the ENVAX catalog data layer on `build/catalog-data-v1` after Foundation passes.

## Required work
1. Freeze the exact catalog source used for this phase and document its checksum/version/date.
2. Define D1 tables/migrations for brands, categories, families, products, variants, catalog versions and asset metadata.
3. Implement a deterministic importer that can validate, normalize and report rejected/duplicate rows.
4. Make imports rerunnable without silently duplicating catalog entities.
5. Implement catalog read endpoints and basic search/filter contracts.
6. Keep public/private product fields behind a visibility policy instead of hard-coding every field as public.
7. Define R2 object/key conventions without exposing private credentials.
8. Add contract/integration tests from a clean database.
9. Document data authority, import procedure, rollback and recovery.

## Rules
- no Wappsi dependency in the required path;
- no final UI implementation;
- no hidden manual database edits;
- every schema change uses a committed migration.

## Stop condition
Evaluate `CATALOG DATA PASS`, write the handoff for Phase 3 and stop.