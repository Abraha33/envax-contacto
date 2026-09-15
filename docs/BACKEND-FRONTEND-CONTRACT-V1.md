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
- fotografías/media pública necesaria para presentar el catálogo.

V1 no muestra precios ni stock.

El backend nunca debe devolver datos privados del cliente, promociones privadas, listas persistentes, solicitudes ni pedidos a un visitante anónimo.

Los favoritos anónimos, si existen, viven solo en el dispositivo/navegador y no se persisten como datos comerciales en la base de datos de ENVAX.

## 2. Identidad del cliente

V1 usa Supabase Auth con autenticación simple por correo + contraseña. El correo funciona como identificador de acceso; V1 no crea un nombre de usuario separado.

MFA/2FA no es requisito de V1 y podrá añadirse después como refuerzo opcional.
V1 usa la gestión de sesión segura estándar de Supabase; no requiere un sistema propio de duración de sesiones para lanzamiento.

Después de un login válido, el frontend puede pedir:
- identidad/perfil básico del cliente;
- perfil comercial asociado;
- listas persistentes propias;
- promociones autorizadas para ese cliente;
- solicitudes propias;
- pedidos propios y su estado.

Regla obligatoria: un cliente solo puede leer o modificar recursos que le pertenecen. El backend debe comprobarlo siempre; el frontend no es una barrera de seguridad.

V1 no intenta vincular automáticamente pedidos históricos anteriores a ENVAX con cuentas nuevas. La visibilidad garantizada comienza con pedidos creados/reconocidos por ENVAX después de existir la cuenta.

Perfil comercial mínimo aprobado:
- nombre del negocio;
- nombre/contacto;
- correo;
- tipo/segmento de negocio.

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

El vendedor puede:
- consultar todas las solicitudes y pedidos V1;
- consultar los datos del cliente necesarios para vender;
- pasar una solicitud a `EN_ATENCION`;
- confirmar un pedido;
- cancelar una solicitud;
- cancelar un pedido;
- confirmar que la facturación externa fue completada y pasar el pedido a `FACTURADO`;
- utilizar el flujo soportado por la extensión del navegador;
- consultar historial comercial necesario para su trabajo.

El vendedor no puede:
- crear, editar o eliminar productos;
- administrar categorías o marcas;
- administrar promociones;
- crear o administrar usuarios/roles;
- modificar configuración del sistema;
- usar capacidades administrativas de Analytics;
- borrar solicitudes, pedidos o historial comercial;
- borrar auditoría.

## 7. Administrador

El administrador tiene control total sobre las funciones administrativas y operativas de ENVAX V1.

Puede gestionar y supervisar, entre otras áreas:
- vendedor/miembros internos;
- catálogo;
- promociones;
- clientes;
- solicitudes y pedidos;
- configuración del sistema;
- Analytics administrativo;
- operaciones disponibles en V1.

Las acciones administrativas sensibles deben quedar auditadas.
Como regla operativa normal, ni siquiera el administrador elimina historial comercial o auditoría; se prefieren cancelar, archivar o desactivar.

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

La estrategia V1 es capturar ampliamente comportamiento útil desde el lanzamiento, con estructura suficiente para análisis futuros.

La analítica anónima no equivale a una cuenta de cliente ni autoriza acceso privado.

Nunca deben enviarse a Analytics:
- contraseñas o credenciales;
- valores sensibles de formularios;
- contenido privado de mensajes;
- información personal innecesaria.

Retención y consentimiento exactos se terminan de definir en la fase de seguridad/privacidad.

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

## 12. Pendientes deliberados restantes

- 🟡 Esquema final de campos/atributos adicionales del producto, más allá del baseline ya aprobado.
- 🟡 Política exacta de consentimiento y retención de Analytics.
- 🟡 Integración futura con ERP/Wappsi, únicamente después de validación real.

Fuera de alcance V1:
- precios;
- motor de precios;
- stock como dato garantizado de catálogo;
- facturación electrónica dentro de ENVAX;
- asignación de múltiples vendedores;
- vinculación automática de pedidos históricos previos a ENVAX.

## Bloqueos

- 🔴 Ninguno para continuar a diseño de API.
