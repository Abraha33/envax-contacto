# Phase 7 — Customer Portal

## Objective
Upgrade an anonymous ENVAX user into a verified customer without losing prior favorites/request history, and provide a small recurrent-customer area.

Planned branch: `build/customer-portal-v1`

Entry condition: `SELLER BRIDGE PASS` or an explicitly documented decision to defer the extension while keeping commercial data stable.

## In scope
- optional verified-customer upgrade;
- contact verification adapter;
- account/session recovery;
- linking anonymous identity to verified customer;
- preserve favorites and historical solicitudes/pedidos;
- customer-owned order list/detail/status;
- logout/revocation;
- authorization/isolation;
- rate limiting for verification attempts.

## Out of scope
- invoices/accounting;
- ERP-style customer account;
- checkout/payment;
- full CRM;
- promotion administration.

## Required outputs
A verified customer can enter the same ENVAX app, recover their own commercial history and view their own orders/status without seeing another customer's data.

## Exit
Phase 7 ends at `PORTAL PASS`.