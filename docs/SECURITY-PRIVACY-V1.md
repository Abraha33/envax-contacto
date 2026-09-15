# ENVAX — Seguridad y Privacidad V1

## Propósito

Definir la línea base de seguridad, privacidad, autorización y protección de datos de ENVAX V1. Esta fase protege el catálogo público, clientes, vendedor, administrador, extensión, Edge Functions, PostgreSQL, Storage, Analytics y auditoría.

## 1. Principio general

ENVAX aplica defensa en profundidad:

1. Supabase Auth identifica al usuario.
2. Edge Functions validan sesión, rol y reglas de negocio.
3. PostgreSQL RLS limita qué filas puede leer/modificar cada usuario.
4. Auditoría registra acciones comerciales/administrativas sensibles.

El frontend nunca es una barrera de seguridad.

## 2. Autenticación

V1 usa Supabase Auth con correo + contraseña.

Reglas:
- no existe sistema paralelo de contraseñas en ENVAX;
- no guardar contraseñas en tablas propias;
- no registrar contraseñas en logs o Analytics;
- MFA/2FA queda fuera de V1 y podrá añadirse después;
- usar el manejo estándar de sesiones de Supabase para lanzamiento.

## 3. Roles y autorización

Roles V1:
- `customer`;
- `seller`;
- `admin`.

Cliente:
- solo accede a sus listas, solicitudes, pedidos, perfil y promociones permitidas.

Vendedor:
- puede operar el flujo comercial aprobado;
- no administra catálogo, usuarios, promociones, configuración ni Analytics administrativo;
- no puede borrar historial comercial o auditoría.

Administrador:
- puede realizar todas las funciones administrativas y operativas de V1;
- las acciones sensibles quedan auditadas;
- no se permite borrado silencioso de historial comercial/auditoría como operación normal.

## 4. Row Level Security (RLS)

Todas las tablas privadas deben tener RLS habilitado y políticas explícitas.

Reglas mínimas:
- cliente solo puede leer/modificar filas cuyo propietario sea su `auth.uid()` o una relación validada equivalente;
- vendedor puede leer/operar los recursos comerciales requeridos por V1;
- administrador puede gestionar los recursos autorizados;
- tablas de auditoría no son editables por clientes;
- tablas públicas del catálogo exponen solo filas/campos aprobados mediante vistas o políticas seguras.

Nunca confiar en un `customer_id` enviado por el navegador para decidir propiedad; el backend/RLS deriva la identidad desde la sesión autenticada.

## 5. Claves y secretos

Reglas obligatorias:
- ninguna `service_role`, secret key, secreto ERP o credencial administrativa en frontend o extensión;
- secretos solo en variables seguras de Edge Functions/entorno servidor;
- no subir secretos al repositorio Git;
- usar llaves públicas/publicables únicamente donde corresponda;
- rotar secretos ante sospecha de exposición.

Las claves con bypass de RLS se reservan para operaciones servidor estrictamente necesarias.

## 6. Edge Functions / API

Cada endpoint sensible debe:
- validar JWT/sesión;
- validar rol;
- validar propiedad del recurso cuando aplique;
- validar payload;
- validar transición de estado;
- ser idempotente cuando una repetición pueda causar duplicados;
- registrar auditoría cuando cambie estado comercial o configuración sensible.

No exponer mensajes internos, stack traces, secretos o SQL en errores enviados al cliente.

## 7. Operaciones comerciales

Transiciones críticas como `EN_ATENCION`, `PEDIDO_CONFIRMADO`, cancelaciones y `FACTURADO` requieren:
- usuario autenticado con rol permitido;
- estado previo válido;
- transacción de base de datos cuando intervengan varias escrituras;
- auditoría con actor, acción, recurso, estado anterior/nuevo y fecha.

`FACTURADO` solo puede registrarse después de confirmación explícita del vendedor/admin de que el proceso externo terminó correctamente.

## 8. Auditoría

Guardar para acciones sensibles:
- quién actuó;
- qué acción hizo;
- sobre qué recurso;
- cuándo;
- resultado;
- cambio de estado relevante;
- contexto técnico mínimo útil para investigación.

No guardar contraseñas, tokens completos, contenido privado innecesario ni secretos.

La auditoría es distinta de Analytics y debe conservar integridad histórica.

## 9. Supabase Storage

V1 usa Storage para fotografías/media públicas del catálogo.

Baseline:
- lectura pública únicamente para media aprobada del catálogo;
- escritura/subida/actualización/eliminación solo por administrador o flujo servidor autorizado;
- aplicar políticas de Storage/RLS;
- limitar tipos MIME y tamaño de archivo;
- usar nombres/rutas controlados y no derivados ciegamente de entradas del usuario;
- no almacenar documentos privados, facturas, XML/PDF fiscales ni secretos en el bucket público.

## 10. Extensión del navegador

La extensión se considera cliente privilegiado del vendedor, no servidor confiable.

Reglas:
- usa sesión autenticada del vendedor;
- nunca contiene `service_role` ni secretos ERP permanentes en código distribuido;
- permisos del navegador mínimos;
- solo accede al contexto comercial necesario;
- no realiza scraping amplio si no es necesario;
- ante datos ambiguos debe detenerse y pedir revisión humana;
- no cambia `FACTURADO` sin confirmación explícita del vendedor.

## 11. Rate limiting y abuso

Aplicar límites por IP/usuario según tipo de endpoint.

Prioridad:
- login/recuperación: protegidos por Supabase y controles antiabuso;
- endpoints públicos de búsqueda/catálogo: limitar abuso y automatización excesiva;
- escrituras (listas/solicitudes/transiciones): límites más estrictos;
- Analytics: aceptar lotes pequeños y limitar spam.

Los valores exactos se calibran en pruebas de carga y operación; no se bloquea arquitectura por no fijarlos ahora.

## 12. Analytics y privacidad

V1 mide ampliamente comportamiento útil, pero aplica minimización de datos.

Permitido conceptualmente:
- páginas/vistas;
- búsquedas y filtros;
- productos/variantes vistos;
- interacciones con media/componentes;
- listas y solicitudes;
- clics a WhatsApp/correo;
- campaña/origen/QR;
- dispositivo/navegador aproximado;
- rendimiento y errores técnicos.

No registrar:
- contraseñas;
- tokens;
- mensajes privados;
- contenido sensible de formularios;
- información personal innecesaria;
- secretos o credenciales.

Retención inicial recomendada para eventos detallados: 12 meses, revisable según necesidades y obligaciones aplicables.

Antes de producción debe existir aviso/política de privacidad y configuración de consentimiento adecuada a la jurisdicción aplicable.

## 13. Logs

Logs técnicos deben:
- usar IDs de correlación;
- evitar PII innecesaria;
- enmascarar tokens/secretos;
- no registrar payloads completos por defecto si contienen datos privados;
- separar errores técnicos de auditoría comercial.

## 14. Backups y recuperación

Requisitos V1:
- backups automáticos de PostgreSQL según capacidad del plan Supabase elegido;
- verificar restauración antes de producción y periódicamente;
- conservar migraciones SQL/versionadas en Git;
- media pública debe poder reconstruirse desde Storage + metadatos;
- definir RPO/RTO concreto en Fase 14 cuando se elija plan/infraestructura final.

## 15. Eliminación y desactivación

Preferir:
- desactivar;
- cancelar;
- archivar;

en lugar de borrar entidades comerciales históricas.

El borrado físico se reserva para casos explícitos y controlados, por ejemplo obligaciones de privacidad o datos creados por error, y debe evaluarse caso por caso.

## 16. Seguridad del repositorio y CI

- `.env` y secretos fuera de Git;
- secret scanning/dependency scanning cuando sea posible;
- migraciones revisadas;
- pruebas de autorización/RLS obligatorias;
- ramas protegidas y revisión antes de producción cuando la operación lo permita.

## 17. Pruebas de seguridad mínimas antes de producción

Debe demostrarse al menos:
- Cliente A no puede leer/modificar datos de Cliente B;
- vendedor no puede usar endpoints de admin;
- cliente no puede cambiar estados comerciales;
- usuario anónimo no puede leer datos privados;
- `service_role` no aparece en frontend/extensión/builds;
- RLS está activa en tablas privadas;
- media pública no permite uploads anónimos;
- reintentos no duplican solicitudes/pedidos;
- logs no filtran tokens/contraseñas;
- acciones sensibles dejan auditoría.

## 18. Pendientes deliberados

- 🟡 Texto legal/política de privacidad final antes de producción.
- 🟡 Valores exactos de rate limiting, a calibrar con pruebas.
- 🟡 RPO/RTO y plan exacto de backup/restore según plan Supabase en Fase 14.
- 🟡 Contrato de seguridad de Wappsi/ERP solo si la integración llega a validarse.

## Bloqueos

- 🔴 Ninguno para continuar a implementación.
- ⚠️ Antes de producción sí deben estar cerrados privacidad legal, backups/restore y pruebas de autorización/RLS.
