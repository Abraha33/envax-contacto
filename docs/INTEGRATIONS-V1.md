# ENVAX — Integraciones V1

## Propósito

Definir cómo ENVAX se relaciona con servicios y herramientas externas sin hacer que el núcleo del producto dependa de ellas.

Regla principal:

> ENVAX debe seguir funcionando aunque una integración externa falle, esté caída o todavía no exista.

Las integraciones son bordes del sistema. El dominio central (catálogo, clientes, listas, solicitudes, pedidos y estados) permanece dentro de ENVAX.

## 1. Supabase

Supabase es infraestructura base de V1, no una integración comercial opcional.

Responsabilidades aprobadas:
- Supabase Auth: registro/login con correo + contraseña;
- PostgreSQL: datos operativos de ENVAX;
- RLS: aislamiento y protección de datos;
- Storage: fotografías públicas del catálogo;
- Edge Functions: API/backend TypeScript;
- sesiones estándar de Supabase.

ENVAX no duplica contraseñas ni implementa un sistema de autenticación propio.

## 2. WhatsApp

V1 usa WhatsApp como canal de contacto comercial.

Reglas:
- ENVAX puede abrir WhatsApp con un mensaje prellenado o contexto comercial;
- ENVAX puede medir `whatsapp_click` antes de abrir WhatsApp;
- con WhatsApp Business básico, ENVAX no debe afirmar que un mensaje fue enviado, recibido o leído si no tiene una integración que lo confirme;
- un clic en WhatsApp no crea por sí solo una `solicitud` formal;
- una solicitud formal se crea únicamente mediante el flujo estructurado de ENVAX.

WhatsApp no es fuente de verdad de solicitudes ni pedidos en V1.

## 3. Correo

V1 puede usar correo como canal de contacto/salida comercial.

Reglas:
- ENVAX puede preparar el contenido que el cliente enviará;
- puede registrar el evento de intención/clic correspondiente;
- no debe marcar una comunicación como entregada o leída sin evidencia real del proveedor de correo;
- el correo no sustituye las entidades `solicitud` o `pedido`.

El proveedor técnico de envío de correo transaccional, si se necesita, se elige en implementación/infraestructura.

## 4. Extensión del navegador

La extensión es una herramienta interna del vendedor.

Objetivo:
- tomar información comercial ya confirmada por el vendedor/cliente;
- transformarla al formato esperado por el sistema externo usado por la empresa;
- ayudar a copiar/pegar o completar la operación del vendedor;
- reducir errores manuales.

Reglas:
- usa autenticación de vendedor/admin;
- obtiene únicamente el contexto necesario desde la API de ENVAX;
- no almacena secretos permanentes del ERP en código del navegador;
- no convierte a ENVAX en un sistema de facturación electrónica;
- no crea, edita, visualiza ni administra facturas dentro de ENVAX;
- si los datos son ambiguos o no coinciden, debe detenerse y pedir revisión humana en lugar de adivinar;
- el vendedor confirma explícitamente antes de que ENVAX pase un pedido a `FACTURADO`.

## 5. Analytics

Analytics es transversal a landing, catálogo, área autenticada y conversiones.

V1 registra comportamiento útil como:
- origen/campaña/QR;
- páginas y productos vistos;
- búsquedas y filtros;
- interacciones con categorías, marcas, variantes y media;
- listas;
- envío de solicitud;
- clics en WhatsApp/correo;
- dispositivo/contexto técnico;
- rendimiento y errores no sensibles.

Reglas:
- Analytics no es fuente de verdad comercial;
- un evento analítico nunca crea por sí solo una solicitud o pedido;
- no registrar contraseñas, credenciales, contenido privado de mensajes ni datos sensibles innecesarios;
- retención detallada inicial recomendada: 12 meses;
- consentimiento/privacidad exactos se cierran en Fase 11.

La herramienta final de producto analytics puede ser propia o externa; la arquitectura no debe quedar atada a una sola herramienta.

## 6. Wappsi / ERP

Estado: 🟡 PENDIENTE DE VALIDACIÓN REAL.

ENVAX V1 no depende de Wappsi/ERP para existir ni para operar el flujo básico.

Reglas canónicas:
- no asumir API disponible;
- no asumir permisos de lectura/escritura;
- no asumir productos, precios, stock, clientes, pedidos o facturas accesibles por API;
- no asumir sincronización automática;
- no diseñar V1 alrededor de una integración no validada;
- si más adelante existe una integración fiable, se implementará mediante un adaptador separado.

Arquitectura futura recomendada:

`ENVAX domain → ERP adapter → Wappsi/ERP`

El resto del backend no debería hablar directamente con Wappsi.

## 7. Flujo comercial sin ERP

ENVAX debe soportar completamente:

`cliente → solicitud → vendedor → pedido → proceso externo manual → vendedor confirma FACTURADO`

Esto funciona incluso si:
- Wappsi está caído;
- no existe API;
- la API cambia;
- la integración todavía no está implementada.

## 8. Fallos externos

Las integraciones deben fallar de forma segura.

Ejemplos:
- WhatsApp no abre → mostrar error/reintento, no crear un pedido ficticio;
- proveedor de correo falla → no marcar como entregado;
- ERP no responde → pedido NO pasa a `FACTURADO`;
- extensión no reconoce datos → detenerse y pedir revisión;
- Analytics falla → la navegación comercial debe seguir funcionando.

Una falla externa no debe corromper el estado comercial interno.

## 9. Reintentos e idempotencia

Operaciones sensibles deben tolerar reintentos sin duplicar efectos.

Aplicaciones principales:
- creación de solicitudes;
- confirmación de pedidos;
- cambios de estado sensibles;
- cualquier integración futura que escriba en un sistema externo.

## 10. Fuera de alcance V1

- facturación electrónica dentro de ENVAX;
- precios;
- stock garantizado;
- sincronización ERP obligatoria;
- automatización total de WhatsApp;
- múltiples vendedores/asignación;
- importación de facturas;
- descarga/visualización de factura;
- sincronización bidireccional no validada con Wappsi.

## Pendientes

- 🟡 Validación real de Wappsi/ERP.
- 🟡 Proveedor técnico de correo, solo si se requiere envío directo desde ENVAX.
- 🟡 Política final de consentimiento/retención de Analytics (Fase 11).

## Bloqueos

- 🔴 Ninguno para continuar a seguridad.
