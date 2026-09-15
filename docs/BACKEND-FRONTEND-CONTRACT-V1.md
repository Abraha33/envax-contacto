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

V1 no muestra precios.

El backend nunca debe devolver datos privados del cliente, promociones privadas, listas persistentes, solicitudes ni pedidos a un visitante anónimo.

Los favoritos anónimos, si existen, viven solo en el dispositivo/navegador y no se persisten como datos comerciales en la base de datos de ENVAX.

## 2. Identidad del cliente

V1 usa Supabase Auth con autenticación simple basada en contraseña. Para mantener la implementación nativa y sencilla, el identificador de acceso será el correo del cliente y la contraseña.

MFA/2FA no es requisito de V1 y podrá añadirse después como refuerzo opcional.

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

V1 tiene un único vendedor. Todas las solicitudes y pedidos comerciales llegan a ese vendedor; no existe lógica de asignación.

El frontend interno del vendedor puede, como mínimo:
- consultar todas las solicitudes y pedidos V1 que debe atender;
- consultar la información mínima necesaria del cliente para realizar el trabajo comercial;
- pasar una solicitud a `EN_ATENCION`;
- confirmar un pedido;
- cancelar una solicitud;
- cancelar un pedido;
- confirmar que la facturación externa fue completada y pasar el pedido a `FACTURADO`;
- utilizar el flujo soportado por la extensión del navegador.

El vendedor no puede borrar el historial comercial.
El vendedor no recibe automáticamente permisos administrativos sobre catálogo, configuración, usuarios u otras áreas por el hecho de ser el único vendedor.

La frontera exacta de permisos del vendedor fuera de este flujo comercial es el principal punto de autorización todavía por cerrar.

## 7. Administrador

El administrador tiene control total sobre las funciones administrativas y operativas de ENVAX V1.

Puede gestionar y supervisar, entre otras áreas:
- vendedor/miembros internos;
- catálogo;
- promociones;
- clientes;
- solicitudes y pedidos;
- configuración del sistema;
- operaciones disponibles en V1.

Las acciones administrativas sensibles deben quedar auditadas.

## 8. Promociones

Solo clientes autenticados pueden recibir promociones privadas.

El frontend puede pedir las promociones que correspondan al cliente autenticado. El backend decide cuáles puede ver según las reglas de segmentación.

Las promociones no crean compras automáticas, checkout, pagos ni motor de precios en V1.

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

- 🟡 Frontera exacta de permisos del vendedor fuera del flujo comercial ya aprobado.
- 🟡 Visibilidad pública definitiva de media y campos adicionales de producto.
- 🟡 Política exacta de analítica, consentimiento y retención.
- 🟡 Stock y cualquier integración futura con ERP, si llega a existir.
- 🟡 Vinculación segura de pedidos históricos con cuentas nuevas, si ENVAX necesita hacerlo.
- 🟡 Datos exactos del perfil comercial del cliente.
- 🟡 Duración y política de expiración de sesiones.

Fuera de alcance V1:
- precios;
- motor de precios;
- facturación electrónica dentro de ENVAX;
- asignación de múltiples vendedores.

## Bloqueos

- 🔴 Ninguno para continuar a diseño de API.
