# ENVAX — Internal Google Sheet Bridge v1

Status: provisional operating model while direct ERP integration remains unresolved.

## Purpose
Provide a lightweight internal source of truth for advisor requests and manually confirmed orders without building a CRM prematurely.

## Proposed tabs
### 1. Solicitudes automáticas
Candidate fields:
- request_id
- created_at
- business_name
- business_type
- contact_channel
- contact_value
- selected_products
- source
- assigned_seller
- status
- notes

Provisional status flow:
`Nuevo → Contactado → Cotizado → Ganado / Perdido`

### 2. Pedidos confirmados
Candidate fields:
- order_record_id
- customer/business identifier
- source document identifier
- date
- product lines
- quantities
- prices if operationally required
- seller
- confirmation status
- notes

## Relationship with extension
The seller extension may populate or update these records from manually selected ERP text after parsing/confirmation.

## Pending
- Final columns
- Ownership
- Permissions
- Write mechanism
- Whether seller confirmation is mandatory
- How records map back to ENVAX customer/request IDs
- Data-retention/security rules
