# ENVAX — Diseño de API V1

## Propósito

Definir la superficie de API que conecta catálogo público, clientes, vendedor, administrador, Analytics y extensión. Este documento no implementa código ni SQL.

## Decisión principal

ENVAX V1 usará una API HTTP REST con JSON, versionada bajo `/api/v1`.

Supabase Auth gestiona autenticación. El backend valida el token de sesión y aplica autorización por rol y propiedad del recurso.

Reglas globales:
- el frontend nunca decide permisos;
- el backend valida identidad, rol, propiedad y transición de estado;
- V1 no devuelve precios ni stock;
- V1 no expone facturas ni documentos fiscales;
- las operaciones sensibles quedan auditadas;
- las creaciones/transiciones importantes deben ser resistentes a reintentos para evitar duplicados.

## 1. API pública de catálogo

Lectura sin login:
- `GET /api/v1/categories`
- `GET /api/v1/categories/{id}`
- `GET /api/v1/brands`
- `GET /api/v1/products`
- `GET /api/v1/products/{id}`
- `GET /api/v1/search`

Filtros de producto podrán usar query parameters, por ejemplo categoría, marca, segmento, atributo, texto y paginación.

El producto público puede incluir nombre, marca, referencia, variantes/presentaciones, atributos públicos y fotografías/media aprobadas.

No incluye precio ni stock.

## 2. Identidad y perfil del cliente

Supabase Auth realiza registro/login/logout y recuperación de contraseña. ENVAX no duplica el sistema de contraseñas.

Backend ENVAX:
- `GET /api/v1/me`
- `GET /api/v1/me/profile`
- `PATCH /api/v1/me/profile`

Perfil comercial mínimo: nombre del negocio, nombre/contacto, correo y tipo/segmento de negocio.

## 3. Listas

Solo cliente autenticado y propietario:
- `GET /api/v1/lists`
- `POST /api/v1/lists`
- `GET /api/v1/lists/{id}`
- `PATCH /api/v1/lists/{id}`
- `DELETE /api/v1/lists/{id}` con semántica de eliminación/desactivación segura
- `POST /api/v1/lists/{id}/items`
- `DELETE /api/v1/lists/{id}/items/{itemId}`

Las listas guardan variantes/presentaciones concretas. No son carrito y no requieren precio.

## 4. Solicitudes del cliente

- `GET /api/v1/requests`
- `GET /api/v1/requests/{id}`
- `POST /api/v1/requests`

`POST /requests` recibe variantes y cantidades confirmadas y crea snapshot histórico.

Debe soportar `Idempotency-Key` para evitar solicitudes duplicadas si el teléfono/navegador reintenta la misma operación.

El cliente no recibe endpoints para cambiar estados comerciales.

## 5. Pedidos del cliente

Solo lectura del propio cliente:
- `GET /api/v1/orders`
- `GET /api/v1/orders/{id}`

El cliente no puede confirmar, cancelar ni marcar `FACTURADO` mediante API.

Estados visibles se derivan del flujo canónico de ENVAX.

## 6. Promociones del cliente

- `GET /api/v1/promotions`
- `GET /api/v1/promotions/{id}`

El backend devuelve únicamente promociones autorizadas para el cliente autenticado.

No existe checkout ni aplicación automática de precios/descuentos.

## 7. API del vendedor

V1 tiene un solo vendedor.

Lectura:
- `GET /api/v1/seller/requests`
- `GET /api/v1/seller/requests/{id}`
- `GET /api/v1/seller/orders`
- `GET /api/v1/seller/orders/{id}`

Acciones de negocio explícitas:
- `POST /api/v1/seller/requests/{id}/start-attention`
- `POST /api/v1/seller/requests/{id}/confirm-order`
- `POST /api/v1/seller/requests/{id}/cancel`
- `POST /api/v1/seller/orders/{id}/cancel`
- `POST /api/v1/seller/orders/{id}/mark-invoiced`

Se prefieren acciones explícitas en lugar de un `PATCH status` genérico, para que el backend controle qué transiciones son válidas.

Toda transición sensible debe:
- validar estado actual;
- validar rol vendedor/admin;
- ser auditable;
- tolerar reintentos sin duplicar efectos.

## 8. Extensión del navegador

La extensión usa únicamente endpoints autenticados para vendedor/admin.

Puede obtener el contexto comercial necesario del pedido, por ejemplo:
- `GET /api/v1/seller/orders/{id}/extension-context`

La extensión puede ayudar a transformar/copiar datos hacia el sistema externo, pero no crea ni administra facturas dentro de ENVAX.

El paso a `FACTURADO` solo ocurre cuando el vendedor confirma que el proceso externo realmente terminó correctamente.

## 9. API administrativa

El administrador tiene control total de ENVAX V1.

La API administrativa se separa por prefijo `/api/v1/admin`.

Áreas principales:
- catálogo: productos, variantes, categorías, marcas, atributos, media;
- promociones;
- clientes;
- miembro vendedor;
- solicitudes y pedidos;
- configuración V1;
- auditoría/Analytics administrativo según corresponda.

Ejemplos conceptuales:
- `POST /api/v1/admin/products`
- `PATCH /api/v1/admin/products/{id}`
- `POST /api/v1/admin/promotions`
- `PATCH /api/v1/admin/promotions/{id}`
- `GET /api/v1/admin/audit`

No se permite borrar silenciosamente historial comercial o de auditoría como operación normal.

## 10. Analytics

Para telemetría propia o puente hacia la herramienta analítica elegida:
- `POST /api/v1/analytics/events`

Se recomienda aceptar lotes pequeños de eventos para reducir llamadas desde móvil.

Nunca incluir contraseñas, credenciales, contenido privado de mensajes o datos personales innecesarios.

La política exacta de retención/consentimiento se define en seguridad/privacidad.

## 11. Paginación, búsqueda y filtros

Colecciones grandes deben ser paginadas.

Baseline recomendado:
- `limit`
- cursor/página según la implementación final;
- filtros explícitos por campos permitidos;
- ordenamiento limitado a opciones conocidas.

No permitir consultas arbitrarias construidas por el cliente.

## 12. Errores consistentes

La API debe distinguir al menos:
- `400` datos inválidos;
- `401` no autenticado;
- `403` autenticado pero sin permiso;
- `404` recurso inexistente/no accesible;
- `409` conflicto con estado actual o duplicado;
- `422` regla de negocio inválida cuando aplique;
- `429` demasiadas solicitudes;
- `500` error interno.

Las respuestas de error deben tener una estructura estable con código interno, mensaje seguro y opcionalmente campos inválidos.

## 13. Seguridad API

- validar JWT/sesión de Supabase en backend;
- aplicar autorización por rol;
- comprobar propiedad para recursos del cliente;
- no confiar en IDs enviados por frontend para determinar propietario;
- limitar tasa de endpoints públicos y sensibles;
- registrar auditoría de cambios comerciales/administrativos;
- nunca exponer service-role keys ni secretos de ERP en navegador/extensión;
- validar payloads en cada endpoint.

## 14. Decisiones fuera de V1

No diseñar endpoints V1 para:
- precios;
- stock garantizado;
- facturación electrónica;
- XML/PDF de facturas;
- checkout/pagos;
- múltiples vendedores y asignación;
- pedidos históricos previos a ENVAX.

## Pendientes deliberados

- 🟡 Campos/atributos finales adicionales del catálogo.
- 🟡 Retención/consentimiento exactos de Analytics.
- 🟡 Contrato real con Wappsi/ERP, solo después de validación.

## Bloqueos

- 🔴 Ninguno para avanzar a diseño físico de base de datos.
