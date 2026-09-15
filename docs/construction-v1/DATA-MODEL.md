# ENVAX — Data Model V1

## Authority

The canonical V1 data model is:

`docs/DATABASE-DESIGN-V1.md`

This construction file exists to prevent implementation drift. If details differ, `DATABASE-DESIGN-V1.md` wins.

## Platform

- PostgreSQL on Supabase is the V1 operational source of truth.
- Supabase Auth owns credentials/sessions.
- PostgreSQL migrations are versioned in `supabase/migrations`.
- Private tables use RLS policies.
- Supabase Storage holds public catalog media.
- Wappsi/ERP is not a source-of-truth dependency for V1.

## V1 entity groups

### Identity
- `user_profiles` linked 1:1 to `auth.users`;
- role: `CUSTOMER | SELLER | ADMIN`;
- `customer_profiles` for minimal business data.

V1 does not create persisted anonymous-account/session/recovery tables.

### Catalog
- `brands`;
- `categories` with flexible parent hierarchy;
- `segments`;
- `products`;
- `variants`;
- product/category and product/segment many-to-many relations;
- flexible attributes and values;
- `media_assets` pointing to Supabase Storage.

No V1 price or stock tables.

### Favorites
- `favorite_lists` owned by authenticated customers;
- `favorite_list_items` referencing concrete variants/presentations.

No persistent anonymous favorites.

### Requests
- `requests` owned by customer and handled by the single V1 seller;
- states: `SENT`, `IN_ATTENTION`, `ORDER_CONFIRMED`, `CANCELLED`, `CLOSED_NO_ORDER`;
- `request_items` are historical snapshots with requested quantities.

No seller-assignment/routing tables are required in V1.

### Orders
- `orders`, at most one per request;
- states: `CONFIRMED`, `INVOICED`, `CANCELLED`;
- `order_items` historical snapshots.

`INVOICED` maps to customer/business concept `FACTURADO` and only means external invoicing was confirmed by seller/admin.

There is no V1 `Invoice/Factura` entity.

### Promotions
- promotions;
- product/variant relations as needed;
- customer/segment targeting.

No automatic pricing/discount checkout engine.

### Audit
- append-only `audit_log` for sensitive commercial/admin actions.

### Idempotency
- `idempotency_records` for request creation and critical state-changing commands.

### Analytics
Analytics is logically separate from commercial/audit data. If first-party events are stored in PostgreSQL, use a separate logical area/schema and never use analytics as authorization/source of truth.

## Critical constraints

- one authenticated customer cannot access another customer's private rows;
- one request → zero or one order;
- item snapshots preserve historical names/reference/presentation/quantity;
- product/category/variant deletion is normally deactivation, not hard deletion;
- requests/orders/audit are not hard-deleted as normal operations;
- seller role cannot administer catalog/users/promotions/configuration;
- admin has V1 administrative/operational authority;
- service-role keys never reach browser/extension.

## Critical transactions

Must be atomic:
1. create request + items + idempotency result;
2. request state transition + audit;
3. confirm order: create order + copy items + update request + audit;
4. cancel request/order + audit;
5. mark `FACTURADO/INVOICED` + timestamp + audit.

## RLS

RLS policies are part of the schema/migrations and must have automated isolation tests.

At minimum prove:
- Customer A cannot read/write Customer B lists/profile;
- Customer A cannot read Customer B requests/orders;
- customer cannot mutate commercial state;
- seller cannot perform admin-only actions;
- public catalog reads expose only approved public data.

## Explicitly superseded legacy model

Do not implement:
- D1 as business source of truth;
- anonymous persisted customer/recovery/session tables;
- seller-assignment tables/policy;
- rigid `Category → Family → Product` ownership;
- invoice/fiscal-document tables;
- price/stock tables.
