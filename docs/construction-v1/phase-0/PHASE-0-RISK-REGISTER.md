# Phase 0 — Risk Register

| ID | Risk | Impact | Phase 0 treatment |
|---|---|---|---|
| R1 | Product docs contradict newer approved decisions | Wrong build | Audit precedence and update only canonical docs |
| R2 | Final visual design is incomplete | UI rework | Allow backend/foundation work; block affected UI implementation |
| R3 | Product public/private visibility is not frozen | Data exposure risk | Implement policy boundary; do not expose unapproved fields |
| R4 | Wappsi documentation is mistaken for validated integration | Architectural coupling | Keep ERP adapter isolated and mark all capabilities unverified |
| R5 | Current landing/QR production structure is moved too early | Deployment outage | No destructive move before staging parity + rollback evidence |
| R6 | Anonymous identity design leaks or over-collects data | Privacy/trust issue | No IP identity; minimum data; recovery design deferred behind interface |
| R7 | Extension becomes privileged scraper | Security/maintenance issue | Manual selected text only, least permissions, API-only writes |
| R8 | Phase scope expands into Portal/promotions/ERP early | Delayed MVP | Enforce phase gates and MVP boundary |
| R9 | Repo contains secrets or confidential ERP/client material | Security/confidentiality | Public-repo secret policy; sanitized fixtures only |
| R10 | One-maintainer constraint is ignored | Operational burden | No microservices/extra DB/broker without measured need |

## Blocking rule

A risk blocks Phase 0 only if there is no safe boundary that allows Phase 1 Foundation to proceed without guessing. Otherwise record the mitigation and defer resolution to the owning phase.
