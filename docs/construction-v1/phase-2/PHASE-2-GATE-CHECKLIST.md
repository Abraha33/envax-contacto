# Phase 2 — Gate Checklist

Final gate: `CATALOG DATA PASS` or `CATALOG DATA BLOCKED`.

- [ ] clean D1 database can be built entirely from migrations;
- [ ] catalog source/version is documented;
- [ ] deterministic importer succeeds on approved fixture/source;
- [ ] duplicate and invalid identifiers are reported explicitly;
- [ ] rerun does not silently duplicate entities;
- [ ] brands/categories/families/products/variants relationships validated;
- [ ] catalog read contract tests PASS;
- [ ] search/filter baseline tests PASS;
- [ ] public/private visibility policy is enforced at API boundary;
- [ ] asset metadata/R2 conventions documented;
- [ ] no required Wappsi call exists;
- [ ] rollback/reimport procedure documented.

## Evidence
Record migration version, source checksum/version, import report, test output and representative API responses.

## Decision
- Status: NOT EVALUATED
- Blocking defects:
- Known limitations:
- Next branch if PASS: `build/catalog-ui-v1`