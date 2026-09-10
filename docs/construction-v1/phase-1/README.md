# Phase 1 — Foundation

## Objective
Create the technical skeleton that every later ENVAX capability will use, without implementing business features prematurely.

Planned branch: `build/foundation-v1`

Entry condition: `PHASE 0: PASS`.

## In scope
- pnpm workspace and root scripts;
- TypeScript configuration;
- customer app shell and admin app shell;
- modular Cloudflare Worker API shell;
- local/staging D1 binding;
- shared validation/types package;
- testing/lint/typecheck/build commands;
- CI baseline;
- independent deployment boundaries;
- environment/secrets conventions;
- health/readiness endpoint;
- preserve current landing and QR Worker behavior.

## Out of scope
- catalog ingestion;
- final customer-facing catalog screens;
- favorites;
- pedidos;
- portal;
- promotions;
- ERP integration.

## Required outputs
A clean monorepo/build skeleton that can be cloned, installed, tested, built and deployed to staging by one maintainer.

## Exit
Phase 1 ends only at `FOUNDATION PASS` with evidence recorded in `PHASE-1-GATE-CHECKLIST.md`.