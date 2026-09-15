# ENVAX — Contrato conceptual Frontend ↔ Backend V1

## Propósito

Este documento define qué información puede pedir o enviar el frontend y qué debe garantizar el backend. No define todavía URLs, endpoints REST, SQL ni implementación.

Regla principal: el frontend muestra y solicita; el backend valida identidad, permisos, reglas de negocio y datos.

## 1. Acceso público

Sin login, el frontend puede pedir al backend información pública del catálogo:
- categorías y jerarquía;
- marcas;
- productos activos;
- variantes/presentaciones activas;
- atributos públicos aprobados;
- segmentos/usos públicos;
- búsqueda y filtros;
- media pública únicamente cuando su visibilidad sea aprobada.

El backend nunca debe devolver datos privados del cliente, promociones privadas, listas persistentes, solicitudes ni pedidos a un visitante anónimo.

Los favoritos anónimos, si existen, viven solo en el dispositivo/navegador y no se persisten como datos comerciales en la base de datos de ENVAX.

## 2. Identidad del cliente

Después de un login válido, el frontend puede pedir:
- identidad/perfil básico del cliente;
- perfil comercial asociado;
- listas persistentes propias;
- promociones autorizadas para ese cliente;
- solicitudes propias;
- pedidos propios y su estado.

Regla obligatoria: un cliente solo puede leer o modificar recursos que le pertenecen. El backend debe comprobarlo siempre; el frontend no es una barrera de seguridad.

## 3. Listas

Cliente autenticado puede solicitar al backend:
- crear lista;
- renombrar lista;
- eliminar/desactivar lista;
- añadir variante/presentación;
- retirar variante/presentación;
- consultar sus propias listas.

V1 no incluye colaboración entre clientes, importar/copiar listas recibidas ni compartir listas como flujo funcional del sistema.

## 4. Solicitudes

Cliente autenticado puede enviar una solicitud comercial.

El frontend envía la selección confirmada y las cantidades requeridas.

El backend debe:
- verificar que el cliente está autenticado;
- validar los productos/variantes enviados;
- crear una fotografía histórica de los elementos enviados;
- registrar la solicitud como `ENVIADA`;
- conservarla aunque luego cambie la lista o el catálogo.

El cliente no puede convertir directamente una solicitud en pedido ni marcarla como facturada.

## 5. Pedidos

El cliente puede consultar únicamente sus pedidos y estados permitidos para cliente.

Flujo canónico:
`SOLICITUD_ENVIADA → EN_ATENCION → PEDIDO_CONFIRMADO → FACTURADO`

Estados de excepción permitidos según reglas internas:
- solicitud cancelada;
- solicitud cerrada sin pedido;
- pedido cancelado.

`FACTURADO` solo significa que el vendedor confirmó que la facturación fue realizada fuera de ENVAX. ENVAX no crea, edita, muestra ni administra facturas electrónicas.

## 6. Vendedor

El frontend interno del vendedor puede pedir al backend los recursos que le correspondan y ejecutar acciones autorizadas como:
- consultar solicitudes/pedidos asignados o disponibles según la futura regla de asignación;
- pasar una solicitud a `EN_ATENCION`;
- confirmar un pedido;
- cancelar una solicitud;
- cancelar un pedido;
- confirmar el resultado de facturación y pasar el pedido a `FACTURADO`;
- consultar la información mínima necesaria del cliente para realizar el trabajo comercial.

El vendedor no puede borrar el historial comercial.

## 7. Administrador

El frontend administrativo podrá pedir capacidades de gestión como:
- vendedores/miembros internos;
- catálogo;
- promociones;
- supervisión de solicitudes y pedidos;
- configuración autorizada.

La matriz exacta de permisos administrativos se definirá en seguridad/autorización. El backend debe validar el rol en cada operación sensible.

## 8. Promociones

Solo clientes autenticados pueden recibir promociones privadas.

El frontend puede pedir las promociones que correspondan al cliente autenticado. El backend decide cuáles puede ver según las reglas de segmentación.

Las promociones no crean compras automáticas, checkout ni pagos.

## 9. Analítica

El frontend puede emitir eventos de analítica sobre navegación y comportamiento, por ejemplo:
- vistas de landing/catálogo/producto;
- búsquedas;
- filtros;
- interacción con imágenes/componentes;
- clics en WhatsApp/correo;
- acciones de listas;
- envío de solicitud;
- navegación por dispositivo/origen/campaña.

La analítica anónima no equivale a una cuenta de cliente ni autoriza acceso privado.

Datos sensibles, credenciales, contenidos privados y campos restringidos no deben enviarse como eventos de analítica.

## 10. Errores y validaciones

El backend debe responder de forma consistente cuando:
- falta login;
- el usuario no tiene permiso;
- un recurso no existe;
- un producto/variante está inactivo;
- los datos enviados son inválidos;
- una acción contradice el estado actual;
- una integración externa falla o queda incierta.

El frontend debe mostrar el resultado, pero no debe inventar que una operación fue exitosa antes de recibir confirmación del backend.

## 11. Regla de confianza

Nunca confiar en el frontend para:
- identidad;
- rol;
- propiedad de recursos;
- cambios de estado;
- facturación confirmada;
- permisos;
- validaciones comerciales.

El backend es la autoridad para esas decisiones.

## 12. Pendientes deliberados

- 🟡 Proveedor y mecanismo técnico final de autenticación.
- 🟡 Regla exacta de asignación de vendedor.
- 🟡 Matriz exacta de permisos del administrador.
- 🟡 Visibilidad pública definitiva de media y campos adicionales de producto.
- 🟡 Política exacta de analítica, consentimiento y retención.
- 🟡 Fuente de verdad futura para precios/stock/ERP, si llega a existir.

## Bloqueos

- 🔴 Ninguno para continuar a diseño de API.
