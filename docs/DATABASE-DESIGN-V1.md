# ENVAX — Diseño de Base de Datos V1

## Propósito

Traducir el dominio aprobado de ENVAX a un modelo relacional para PostgreSQL/Supabase. Este documento define tablas, relaciones, estados y reglas principales; no contiene todavía migraciones SQL.

## Decisiones base

- PostgreSQL será la base relacional de ENVAX V1.
- Supabase Auth administra credenciales y sesiones; ENVAX no guarda contraseñas propias.
- Los registros comerciales importantes no se borran físicamente como operación normal.
- Precio, stock, facturas electrónicas y pedidos históricos anteriores a ENVAX están fuera de V1.
- Wappsi/ERP no es fuente obligatoria ni dependencia del modelo V1.
- Analytics y Auditoría son dominios distintos.

## 1. Identidad

### `user_profiles`
Perfil ENVAX asociado 1:1 con `auth.users` de Supabase.

Campos conceptuales:
- `id` UUID PK/FK → `auth.users.id`;
- `role`: `CUSTOMER | SELLER | ADMIN`;
- `display_name`;
- `status`: `ACTIVE | DISABLED`;
- `created_at`;
- `updated_at`.

Reglas:
- las credenciales permanecen en Supabase Auth;
- V1 tiene un solo usuario con rol `SELLER`;
- `ADMIN` tiene autoridad administrativa/operativa total;
- `SELLER` solo recibe permisos comerciales aprobados.

### `customer_profiles`
Datos comerciales mínimos del cliente.

Campos:
- `user_id` UUID PK/FK → `user_profiles.id`;
- `business_name`;
- `contact_name`;
- `contact_email`;
- `business_segment_id` nullable FK → `segments.id`;
- `created_at`;
- `updated_at`.

`contact_email` es dato comercial y puede inicialmente coincidir con el correo de login; la contraseña nunca se replica aquí.

## 2. Clasificación y catálogo

### `brands`
- `id` UUID PK;
- `name`;
- `slug` unique;
- `is_active`;
- timestamps.

### `categories`
Jerarquía flexible.

- `id` UUID PK;
- `parent_id` nullable FK → `categories.id`;
- `name`;
- `slug` unique;
- `sort_order`;
- `is_active`;
- timestamps.

Una categoría puede tener cualquier profundidad razonable; no existe profundidad rígida `categoría → familia → producto`.

### `segments`
Clasificación flexible para tipo de negocio/uso.

- `id` UUID PK;
- `name`;
- `kind`: `BUSINESS_TYPE | USE`;
- `is_active`;
- timestamps.

### `products`
- `id` UUID PK;
- `brand_id` nullable FK → `brands.id`;
- `name`;
- `slug` unique;
- `short_description`;
- `is_active`;
- timestamps.

No contiene precio ni stock V1.

### `product_categories`
Relación muchos-a-muchos.

- `product_id` FK → `products.id`;
- `category_id` FK → `categories.id`;
- PK compuesta `(product_id, category_id)`.

### `product_segments`
- `product_id` FK → `products.id`;
- `segment_id` FK → `segments.id`;
- PK compuesta.

### `variants`
Cada producto debe tener al menos una presentación/variante utilizable.

- `id` UUID PK;
- `product_id` FK → `products.id`;
- `label`/nombre de presentación;
- `reference` nullable, unique cuando exista;
- `is_default`;
- `is_active`;
- timestamps.

Regla de aplicación: un producto publicado debe conservar al menos una variante activa/default válida.

### `attributes`
Define características disponibles.

- `id` UUID PK;
- `name`;
- `code` unique;
- `is_public`;
- `is_active`.

### `product_attribute_values`
Atributos comunes al producto.

- `product_id` FK;
- `attribute_id` FK;
- `value_text`;
- PK compuesta `(product_id, attribute_id)`.

### `variant_attribute_values`
Atributos que cambian por presentación.

- `variant_id` FK;
- `attribute_id` FK;
- `value_text`;
- PK compuesta `(variant_id, attribute_id)`.

### `media_assets`
Fotografías/media públicas de catálogo.

- `id` UUID PK;
- `product_id` nullable FK;
- `variant_id` nullable FK;
- `storage_path`/URL administrada;
- `alt_text`;
- `sort_order`;
- `is_public`;
- timestamps.

Regla: cada media pertenece a producto o variante según corresponda; V1 no guarda documentos fiscales aquí.

## 3. Listas de favoritos

### `favorite_lists`
- `id` UUID PK;
- `customer_id` FK → `user_profiles.id`;
- `name`;
- `status`: `ACTIVE | DELETED`;
- timestamps.

### `favorite_list_items`
- `id` UUID PK;
- `list_id` FK → `favorite_lists.id`;
- `variant_id` FK → `variants.id`;
- `created_at`.

Restricción recomendada: unique `(list_id, variant_id)`.

V1 no exige cantidades en favoritos y no guarda precio.

## 4. Solicitudes

### `requests`
- `id` UUID PK;
- `customer_id` FK → `user_profiles.id`;
- `seller_id` FK → `user_profiles.id`;
- `source_list_id` nullable FK → `favorite_lists.id`;
- `status`: `SENT | IN_ATTENTION | ORDER_CONFIRMED | CANCELLED | CLOSED_NO_ORDER`;
- `submitted_at`;
- `updated_at`.

V1 tiene un vendedor único; las solicitudes apuntan a ese vendedor sin motor de asignación.

### `request_items`
Snapshot histórico de lo enviado.

- `id` UUID PK;
- `request_id` FK → `requests.id`;
- `variant_id` nullable FK → `variants.id`;
- `product_name_snapshot`;
- `variant_label_snapshot`;
- `reference_snapshot`;
- `quantity` > 0;
- `created_at`.

Regla esencial: cambiar el catálogo después no cambia los snapshots de solicitudes existentes.

## 5. Pedidos

### `orders`
- `id` UUID PK;
- `request_id` unique FK → `requests.id`;
- `seller_id` FK → `user_profiles.id`;
- `status`: `CONFIRMED | INVOICED | CANCELLED`;
- `confirmed_at`;
- `invoiced_at` nullable;
- `cancelled_at` nullable;
- timestamps.

Relación V1: una solicitud produce como máximo un pedido.

`INVOICED`/`FACTURADO` solo registra que el vendedor confirmó que la facturación externa terminó. No existe tabla `invoices` en V1.

### `order_items`
Snapshot histórico del pedido confirmado.

- `id` UUID PK;
- `order_id` FK → `orders.id`;
- `variant_id` nullable FK → `variants.id`;
- `product_name_snapshot`;
- `variant_label_snapshot`;
- `reference_snapshot`;
- `quantity` > 0;
- `created_at`.

Al confirmar una solicitud como pedido, creación de `orders`, copia de items y transición de estado deben ejecutarse en una sola transacción.

## 6. Promociones

### `promotions`
- `id` UUID PK;
- `name`;
- `description`;
- `status`: `DRAFT | SCHEDULED | ACTIVE | ENDED | CANCELLED`;
- `starts_at`;
- `ends_at`;
- timestamps.

No contiene motor de descuentos/precios V1.

### `promotion_products`
- `promotion_id` FK;
- `product_id` FK;
- PK compuesta.

### `promotion_variants`
Solo si una promoción aplica a presentaciones concretas.

- `promotion_id` FK;
- `variant_id` FK;
- PK compuesta.

### `promotion_segments`
Target por tipo/segmento de negocio.

- `promotion_id` FK;
- `segment_id` FK;
- PK compuesta.

### `promotion_customers`
Target explícito a clientes concretos.

- `promotion_id` FK;
- `customer_id` FK;
- PK compuesta.

## 7. Auditoría

### `audit_log`
Registro append-only de acciones importantes.

- `id` UUID PK;
- `actor_user_id` nullable FK → `user_profiles.id`;
- `actor_role`;
- `action`;
- `entity_type`;
- `entity_id`;
- `before_state` JSONB nullable;
- `after_state` JSONB nullable;
- `correlation_id` nullable;
- `created_at`.

Debe registrar como mínimo cambios de estado comerciales y acciones administrativas sensibles.

No se elimina ni edita como operación normal.

## 8. Idempotencia

### `idempotency_records`
Evita duplicados por reintentos de red.

- `id` UUID PK;
- `actor_user_id` nullable;
- `scope`;
- `idempotency_key`;
- `request_hash`;
- `result_entity_type` nullable;
- `result_entity_id` nullable;
- `created_at`;
- `expires_at`.

Restricción unique recomendada por actor/scope/key.

Se usa especialmente al crear solicitudes y ejecutar transiciones comerciales sensibles.

## 9. Analytics

Analytics no sustituye a las tablas de negocio ni a `audit_log`.

Si V1 almacena eventos propios en PostgreSQL, deben vivir en una zona lógica separada, por ejemplo `analytics.events`, con un contrato equivalente a:
- `event_id`;
- `anonymous_session_id`;
- `user_id` nullable;
- `event_name`;
- `occurred_at`;
- `page/context`;
- `source/campaign`;
- `device/browser`;
- ids opcionales de producto/categoría;
- propiedades permitidas JSONB.

Reglas:
- nunca guardar contraseñas, credenciales, mensajes privados ni valores sensibles;
- no usar Analytics como autorización o fuente de verdad comercial;
- objetivo inicial de retención de eventos detallados: 12 meses;
- si se elige una plataforma analítica externa, el contrato de eventos puede enviarse allí sin obligar a duplicar todos los eventos en la base operacional.

## 10. RLS y propiedad

Tablas con datos privados de cliente deben protegerse con Row Level Security o controles equivalentes además de la autorización del backend.

Reglas mínimas:
- cliente solo puede leer/escribir su perfil y sus listas permitidas;
- cliente solo puede leer sus solicitudes/pedidos;
- cliente no puede cambiar estados comerciales;
- vendedor puede operar el flujo comercial pero no administrar catálogo/promociones/usuarios;
- administrador tiene acceso administrativo total V1;
- service-role keys nunca llegan al navegador o extensión.

## 11. Eliminación y desactivación

Preferir:
- producto/variante/categoría: `is_active=false`;
- cliente/miembro: `status=DISABLED`;
- lista: `status=DELETED`;
- solicitud/pedido: estados de cancelación/cierre;
- promoción: `ENDED/CANCELLED`.

No hacer hard-delete normal de solicitudes, pedidos o auditoría.

## 12. Índices mínimos recomendados

- `products(is_active, brand_id)`;
- `variants(product_id, is_active)` y unique parcial/normal para `reference` cuando exista;
- `product_categories(category_id, product_id)`;
- `favorite_lists(customer_id, status)`;
- `requests(customer_id, status, submitted_at)`;
- `requests(seller_id, status, submitted_at)`;
- `orders(status, confirmed_at)`;
- `promotions(status, starts_at, ends_at)`;
- `audit_log(entity_type, entity_id, created_at)`;
- Analytics por `occurred_at` y `event_name` si se almacena localmente.

## 13. Operaciones transaccionales críticas

Deben ejecutarse de forma atómica:

1. Crear solicitud + `request_items` + idempotencia.
2. `SENT → IN_ATTENTION` + auditoría.
3. Confirmar pedido: actualizar solicitud + crear pedido + copiar `order_items` + auditoría.
4. Cancelar solicitud/pedido + auditoría.
5. Marcar `FACTURADO/INVOICED` + fecha + auditoría.

Si cualquier paso falla, no debe quedar el proceso a medias.

## 14. Fuera de V1

No crear tablas V1 para:
- precios/listas de precios;
- inventario/stock;
- facturas electrónicas;
- XML/PDF fiscal;
- pagos/checkout;
- múltiples vendedores/rutas de asignación;
- pedidos históricos previos a ENVAX;
- colaboración de listas entre clientes.

## Pendientes deliberados

- 🟡 Contrato real de Wappsi/ERP, si finalmente se integra. No modifica el núcleo V1 hasta ser validado.
- 🟡 Implementación final del consentimiento/privacidad de Analytics en la fase de seguridad.
- 🟡 Tecnología exacta para almacenamiento/serving de media si no se usa Supabase Storage.

## Bloqueos

- 🔴 Ninguno para avanzar a arquitectura del backend.
