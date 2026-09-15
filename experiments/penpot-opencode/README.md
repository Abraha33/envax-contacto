# ENVAX — OpenCode + Penpot Design Automation Experiment

## Status

EXPERIMENTAL

This experiment investigates whether ENVAX can build a zero-cost,
repeatable pipeline for converting visual references into native,
editable Penpot screens and eventually a complete interactive prototype.

## Core constraint

The target workflow must be usable at **$0 in API/subscription costs**.

Paid model APIs must not be required for the canonical workflow.

Free hosted models may be used when available, but the architecture must
support local models as the permanent fallback.

---

# Target workflow

```text
Input image(s)
      ↓
Local ingestion / organization script
      ↓
Screen detection and cropping
      ↓
Vision analysis
      ↓
Structured screen specification
      ↓
OpenCode
      ↓
Penpot MCP
      ↓
Native editable Penpot objects
      ↓
Visual QA
      ↓
Correction loop
      ↓
Approved screens
      ↓
Reusable components / design system
      ↓
Prototype interactions
      ↓
Complete ENVAX application prototype
````

---

# Important requirement

An input image may contain multiple screens.

Example:

```text
┌────────────┬────────────┬────────────┐
│ Screen 01  │ Screen 02  │ Screen 03  │
└────────────┴────────────┴────────────┘
```

The system must detect and extract them as individual screen references.

The expected result in Penpot is:

```text
ENVAX-001
ENVAX-002
ENVAX-003
```

as separate boards.

---

# Penpot output requirements

The final Penpot result must NOT be:

* a PNG used as the screen
* a screenshot
* a flattened SVG
* one monolithic vector
* a fake editable representation

UI elements must be native/editable whenever practical:

* boards
* text
* rectangles
* circles
* groups
* fills
* borders
* spacing
* buttons
* cards
* navigation
* reusable components

Individual elements must remain selectable and editable.

---

# Proposed pipeline

## Stage 0 — Intake

A user drops an image into the inbox.

The image may contain one or multiple UI screens.

## Stage 1 — Ingestion

A deterministic local script:

* assigns an ID
* preserves the original
* creates metadata
* organizes files
* determines destination folders

The LLM should not be responsible for basic file organization.

## Stage 2 — Screen extraction

Detect individual screens and create high-resolution crops.

Example:

```text
ENVAX-MOB-001.png
ENVAX-MOB-002.png
ENVAX-MOB-003.png
```

## Stage 3 — Visual interpretation

A vision-capable model analyzes each screen.

Expected output is a structured specification describing:

* viewport
* hierarchy
* sections
* text
* components
* spacing
* alignment
* buttons
* lists
* navigation
* visual uncertainty

## Stage 4 — Penpot reconstruction

OpenCode uses Penpot MCP to construct native Penpot objects.

## Stage 5 — QA

The reconstructed board is compared against the original reference.

Expected loop:

```text
BUILD
  ↓
EXPORT
  ↓
COMPARE
  ↓
FAIL ──→ FIX ──→ COMPARE
  ↓
PASS
```

## Stage 6 — Component convergence

Repeated UI elements become reusable Penpot components.

Examples:

* mobile header
* desktop header
* search bar
* category card
* product card
* bottom navigation
* advisor CTA

## Stage 7 — Design system

Approved repeated properties become canonical tokens and components.

## Stage 8 — Prototype

Once screens are stable, define:

* navigation
* back actions
* overlays
* menus
* modals
* user flows

The final target is a navigable prototype containing all application screens.

---

# Experiment strategy

We will NOT attempt the entire application immediately.

The system will be developed iteratively.

```text
v0.1
 ↓
test
 ↓
identify failures
 ↓
v0.2
 ↓
test
 ↓
improve rules
 ↓
...
 ↓
v1.0 canonical
```

The goal is not to discover a single "magic prompt".

The goal is to produce a reproducible environment consisting of:

* model configuration
* OpenCode configuration
* Penpot MCP
* deterministic scripts
* agent instructions
* reconstruction rules
* QA rules
* benchmark inputs
* measurable acceptance gates

---

# Initial phases

## Phase 1

One source image containing multiple screens:

```text
IMAGE
  ↓
SCREEN DETECTION
  ↓
INDIVIDUAL CROPS
  ↓
EDITABLE PENPOT BOARDS
```

Success requires proving that this works reliably.

## Phase 2

Reusable components.

## Phase 3

Automated visual QA.

## Phase 4

Batch processing.

## Phase 5

Design-system convergence.

## Phase 6

Prototype interactions.

## Phase 7

Complete ENVAX prototype.

---

# Current technical stack

Planned:

* OpenCode
* Penpot
* Penpot MCP
* Git / GitHub
* PowerShell / Python
* free OpenCode models when useful
* local vision model as permanent zero-cost fallback
* Ollama if required

---

# Current experiment

Workspace originally started at:

```text
D:\test-envax-tools
```

Initial Penpot MCP attempt:

```text
Node:
v24.18.0

Command:
npx -y @penpot/mcp@latest

Result:
ERR_PNPM_IGNORED_BUILDS
```

Ignored dependency build scripts included:

* esbuild
* sharp

This is NOT considered a successful MCP startup.

Next environment investigation should determine the cleanest reproducible
Node/Penpot MCP setup before beginning UI reconstruction benchmarks.

---

# Rule

Do not mark a phase as PASS because an agent says it succeeded.

A phase passes only when observable evidence confirms its acceptance gates.
