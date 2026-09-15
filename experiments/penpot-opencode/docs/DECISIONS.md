
# Decisions

## D-001 — Use existing ENVAX repository

Status: APPROVED

Repository:

`Abraha33/envax-contacto`

The Penpot/OpenCode automation experiment will be developed on an isolated
experiment branch rather than creating a new repository.

---

## D-002 — Zero-cost architecture

Status: APPROVED

Canonical operation must not require paid APIs or paid subscriptions.

Free hosted models may be used opportunistically.

A local-model fallback must remain possible.

---

## D-003 — Penpot as editable design target

Status: APPROVED

Penpot is the target design environment.

Screens must be reconstructed as editable objects rather than flattened images.

---

## D-004 — Incremental validation

Status: APPROVED

Do not attempt full ENVAX automation first.

Validate:

1. image → editable screens
2. components
3. QA
4. batch processing
5. design system
6. prototype
7. complete application

---

## D-005 — Separate deterministic work from AI work

Status: APPROVED

Deterministic scripts should handle:

* naming
* IDs
* file movement
* directory creation
* manifests
* basic validation

Models should handle work that genuinely requires interpretation:

* screen understanding
* hierarchy
* visual reconstruction
* ambiguity resolution
* QA reasoning

---

## D-006 — Prompt alone is not the product

Status: APPROVED

The final solution will consist of:

* environment configuration
* model selection
* scripts
* agent instructions
* Penpot rules
* QA gates
* benchmark cases
* versioned prompts

rather than relying on one large prompt.
