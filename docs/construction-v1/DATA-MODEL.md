# ENVAX — Data Model V1

## 1. Principles

- D1 is the operational relational source of truth for ENVAX V1.
- Product catalog data is imported from the canonical ENVAX Product Master/export, not pulled live from Wappsi.
- Historical pedido/request data is immutable enough to remain understandable even if catalog names/assets later change.
- Anonymous and verified customer identities must be linkable without duplicating business history.
- Sensitive provider credentials never live in database rows accessible to browser clients.

## 2. Core entities

### Identity / customer

`anonymous_accounts`
- `id`
- `business_name`
- `business_type_id`
- `created_at`
- `last_seen_at`
- `upgraded_customer_id` nullable
- `status`

`anonymous_recovery_credentials`
- `id`
- `anonymous_account_id`
- `secret_hash`
- `created_at`
- `rotated_at` nullable
- `revoked_at` nullable

`sessions`
- `id`
- `anonymous_account_id` nullable
- `customer_id` nullable
- `session_secret_hash`
- `created_at`
- `expires_at`
- `revoked_at` nullable

`customers`
- `id`
- `business_name`
- `business_type_id`
- `status`
- `created_at`

`customer_contacts`
- `id`
- `customer_id`
- `type` (`email`, `whatsapp`)
- `value_normalized`
- `verified_at` nullable
- `is_primary`

`business_types`
- `id`
- `slug`
- `name`
- `active`

Do not use IP as an identity key.

## 3. Catalog

`brands`
- `id`, `slug`, `name`, `active`

`categories`
- `id`, `parent_id` nullable, `slug`, `name`, `sort_order`, `active`

`families`
- `id`, `category_id`, `slug`, `name`, `sort_order`, `active`

`products`
- `id`
- `source_key` (stable Product Master identifier)
- `sku/reference`
- `name`
- `brand_id`
- `family_id`
- `short_description` nullable
- `active`
- `catalog_version_id`

`product_variants`
- `id`
- `product_id`
- `source_key`
- `reference`
- `presentation` nullable
- `attributes_json`
- `active`

`product_assets`
- `id`
- `product_id`/`variant_id` nullable as applicable
- `r2_key`
- `kind`
- `visibility` (`public`, `customer`, `internal`)
- `sort_order`
- `status`

`catalog_versions`
- `id`
- `source_file_hash`
- `source_label`
- `imported_at`
- `import_report_json`

Public product-field policy remains configurable because final public visibility is not fully closed.

## 4. Favorites

`favorite_lists`
- `id`
- `owner_type` (`anonymous`, `customer`)
- `anonymous_account_id` nullable
- `customer_id` nullable
- `name`
- `created_at`
- `updated_at`

`favorite_items`
- `id`
- `favorite_list_id`
- `product_id`
- `variant_id` nullable
- `created_at`

Constraints:
- prevent duplicate same product/variant in one list unless product requirements later justify duplicates;
- deleting favorites never cascades into historical solicitudes/pedidos.

## 5. Order request

`order_requests`
- `id`
- `public_reference`
- `anonymous_account_id` nullable
- `customer_id` nullable
- `source_favorite_list_id` nullable
- `business_name_snapshot`
- `business_type_snapshot`
- `note` nullable
- `status` (`submitted`, `assigned`, `in_attention`, `converted`, `cancelled`)
- `assigned_seller_id` nullable
- `idempotency_key`
- `created_at`
- `updated_at`

`order_request_items`
- `id`
- `order_request_id`
- `product_id` nullable for historical resilience
- `variant_id` nullable
- `reference_snapshot`
- `name_snapshot`
- `brand_snapshot` nullable
- `variant_snapshot` nullable
- `quantity_requested` nullable
- `metadata_json` nullable

The snapshot fields are intentional. Changing a catalog product later must not rewrite the commercial history.

## 6. Orders

`orders`
- `id`
- `public_reference`
- `source_order_request_id` unique
- `external_system` nullable
- `external_order_id` nullable
- `status` (`confirmed`, `completed`, `cancelled`)
- `confirmed_at`
- `completed_at` nullable
- `created_at`

`order_items`
- normalized/snapshot fields required to preserve the confirmed order;
- exact pricing/quantity fields are included only when the seller/ERP workflow provides authoritative values.

`order_status_events`
- `id`
- `order_id` nullable
- `order_request_id` nullable
- `from_status`
- `to_status`
- `actor_type`
- `actor_id` nullable
- `reason_code` nullable
- `created_at`

## 7. Sellers/admin

`sellers`
- `id`
- `display_name`
- `active`
- `assignment_weight` default 1

`admin_users`
- application-level internal identity only if/when needed in addition to Cloudflare Access;
- never duplicate provider secrets.

`seller_assignments`
- `id`
- `order_request_id`
- `seller_id`
- `assigned_at`
- `closed_at` nullable

## 8. Promotions

`promotions`
- `id`
- `title`
- `body`
- `asset_id` nullable
- `status` (`draft`, `scheduled`, `active`, `expired`, `archived`)
- `starts_at` nullable
- `ends_at` nullable
- `created_by`
- timestamps

`promotion_targets`
- `id`
- `promotion_id`
- `target_type` (`customer`, `business_type`)
- `customer_id` nullable
- `business_type_id` nullable

`promotion_interests`
- `id`
- `promotion_id`
- `anonymous_account_id` nullable
- `customer_id` nullable
- `created_at`
- `handoff_id` nullable

`promotion_deliveries` may be added when outbound delivery is implemented. Do not create it before a real channel/provider is selected unless needed for auditing.

## 9. Handoffs / notifications

`commercial_handoffs`
- `id`
- `source_type` (`order_request`, `promotion_interest`, `advisor_contact`)
- `source_id`
- `channel` (`whatsapp`, `email`)
- `status`
- `provider_message_id` nullable
- `created_at`

This separates the customer request from the delivery mechanism.

## 10. Extension ingestion

`extension_ingestions`
- `id`
- `seller_id`
- `order_request_id`
- `idempotency_key`
- `source_document_type` nullable
- `source_document_id` nullable
- `normalized_payload_json`
- `raw_selection_hash`
- `parse_status`
- `created_at`

Do not store raw ERP copied text by default. Store only normalized fields and a hash unless a temporary diagnostic mode is explicitly approved with safe data.

## 11. Audit

`audit_events`
- `id`
- `request_id`
- `actor_type`
- `actor_id` nullable
- `action`
- `entity_type`
- `entity_id`
- `metadata_json` redacted/minimized
- `created_at`

Audit events are required for:
- identity upgrade/link;
- recovery credential rotation;
- order-request state change;
- request → order conversion;
- admin promotion changes;
- seller assignment changes;
- extension writes.

## 12. Indexing baseline

Create indexes for common lookup paths:
- product `source_key`, reference, family, brand;
- favorite lists by owner;
- request by owner/status/seller/created_at;
- order by customer/source request/external ID;
- promotion by status/date;
- target by promotion/business type/customer;
- sessions by owner/expiry;
- recovery credential hash.

Exact index plan must be validated using real query plans after seed volume exists.

## 13. Deletion and retention

Do not hard-code a final retention period before privacy/legal policy is approved.

Build the model so we can:
- revoke sessions;
- rotate/revoke anonymous recovery credentials;
- anonymize or delete customer contact data when required;
- preserve legally/operationally necessary order records under a documented policy;
- separate analytics retention from commercial records.
