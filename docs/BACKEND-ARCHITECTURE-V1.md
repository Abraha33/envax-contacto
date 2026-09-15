# ENVAX — Arquitectura Backend V1

## Propósito

Definir cómo se organiza técnicamente el backend de ENVAX V1 sin entrar todavía en implementación detallada.

## Decisión principal

ENVAX V1 usará una arquitectura **Supabase-first** y de **monolito modular**.

Componentes principales:
- Supabase Auth: autenticación email + contraseña.
- Supabase Postgres: base de datos principal y autoridad del negocio.
- Supabase Storage: fotografías/media del catálogo.
- Supabase Edge Functions: capa HTTP/API de negocio en TypeScript.
- Row Level Security (RLS): protección adicional de datos por usuario/rol.

ENVAX V1 no necesita microservicios ni un servidor Node/Nest/Fastify separado para lanzamiento.

## Por qué esta arquitectura

La V1 tiene un alcance pequeño y controlado:
- un vendedor;
- un administrador;
- catálogo B2B;
- clientes autenticados;
- listas;
- solicitudes;
- pedidos;
- promociones;
- analytics;
- auditoría;
- extensión del navegador.

Separar esto en múltiples servicios aumentaría mantenimiento, costo y despliegues sin beneficio suficiente.

## Arquitectura lógica

```text
Frontend público / Cliente / Admin / Vendedor / Extensión
                         |
                         v
                  API HTTP /api/v1
                         |
                 Supabase Edge Function
                    `api-v1`
                         |
        --------------------------------------
        |        |       |        |           |
      Auth   Catálogo  Comercial  Admin    Analytics
        |        |       |        |           |
        --------------------------------------
                         |
                  Supabase Postgres
                         |
                  RLS + funciones SQL

Fotos/media -> Supabase Storage
```

## Una sola API modular

Se recomienda una Edge Function principal `api-v1` que actúe como router de la API.

Internamente se divide por módulos, pero se despliega como una unidad lógica en V1.

Estructura conceptual:

```text
supabase/functions/api-v1/
  index.ts
  router.ts
  modules/
    catalog/
    customers/
    lists/
    requests/
    orders/
    promotions/
    seller/
    admin/
    analytics/
    audit/
    extension/
  shared/
    auth/
    db/
    validation/
    errors/
    permissions/
    idempotency/
```

Esto mantiene un único backend, pero evita un archivo gigante.

## Módulos

### Catalog
Responsable de:
- categorías;
- marcas;
- productos;
- variantes/presentaciones;
- atributos;
- media;
- búsqueda/filtros públicos.

No maneja precios ni stock en V1.

### Customers
Responsable de:
- perfil básico del cliente;
- perfil comercial;
- propiedad de recursos del cliente.

Supabase Auth sigue siendo la autoridad de credenciales.

### Lists
Responsable de:
- listas persistentes del cliente;
- elementos de lista;
- validación de propiedad.

### Requests
Responsable de:
- creación de solicitudes;
- snapshots históricos;
- cantidades;
- estado `ENVIADA` / `EN_ATENCION` / cancelación / cierre sin pedido;
- idempotencia.

### Orders
Responsable de:
- creación del pedido desde solicitud;
- snapshots históricos;
- estados `PEDIDO_CONFIRMADO`, `FACTURADO`, `CANCELADO`;
- lectura para cliente;
- cambios de estado controlados.

### Seller
Responsable de las acciones permitidas al único vendedor V1:
- ver solicitudes/pedidos;
- iniciar atención;
- confirmar pedido;
- cancelar;
- marcar `FACTURADO`;
- obtener contexto para extensión.

No contiene funciones administrativas.

### Admin
Responsable de:
- catálogo;
- promociones;
- clientes;
- vendedor/miembros internos;
- configuración;
- supervisión comercial;
- auditoría/analytics administrativo.

El administrador tiene control total de V1, excepto que el historial comercial/auditoría no se borra como operación normal.

### Promotions
Responsable de:
- campañas/promociones;
- vigencia;
- segmentación por cliente/segmento;
- visibilidad privada.

No implementa checkout, pagos ni motor de precios.

### Analytics
Responsable de:
- eventos de navegación/comportamiento;
- origen/campaña;
- producto visto;
- búsqueda/filtros;
- clic WhatsApp/correo;
- conversiones del flujo.

No guarda contraseñas, mensajes privados ni datos sensibles innecesarios.

### Audit
Responsable de registrar acciones sensibles:
- cambios de estado;
- cancelaciones;
- confirmación de pedido;
- `FACTURADO`;
- acciones administrativas.

Analytics y Audit son módulos distintos.

### Extension
Responsable únicamente del contrato necesario para la extensión del vendedor.

La extensión:
- obtiene contexto comercial aprobado;
- ayuda a transformar/copiar información hacia el sistema externo;
- no crea facturas electrónicas dentro de ENVAX;
- no recibe secretos ERP.

## Autenticación y autorización

### Autenticación
Supabase Auth gestiona:
- registro;
- login email + contraseña;
- logout;
- recuperación de contraseña;
- sesiones/JWT.

### Autorización
Cada petición protegida debe validar:
1. identidad;
2. rol;
3. propiedad del recurso cuando aplica;
4. transición de estado válida.

Roles V1:
- `customer`;
- `seller`;
- `administrator`.

El administrador puede ejecutar todas las acciones V1.
El vendedor queda restringido al flujo comercial aprobado.

## RLS

Se recomienda RLS como segunda barrera de seguridad, especialmente para recursos del cliente.

Ejemplos conceptuales:
- un cliente solo puede leer sus listas;
- un cliente solo puede leer sus solicitudes/pedidos;
- un cliente no puede leer recursos de otro cliente;
- admin/backend privilegiado puede ejecutar operaciones autorizadas usando contexto de servicio controlado.

RLS no reemplaza las validaciones de negocio del backend; las complementa.

## Transacciones críticas

Las operaciones que deben ocurrir completas o no ocurrir son transacciones.

Ejemplo principal:

```text
confirmar solicitud como pedido
  -> validar estado actual
  -> crear order
  -> copiar snapshot a order_items
  -> actualizar request
  -> registrar auditoría
```

Si una parte falla, toda la operación debe revertirse.

Para estas operaciones se recomienda una función transaccional en Postgres/RPC o una transacción directa controlada por backend.

## Idempotencia

Crear solicitudes y transiciones críticas debe soportar reintentos sin duplicar efectos.

V1 mantiene `idempotency_records` y/o claves únicas apropiadas.

## Media

Las fotografías del catálogo son públicas en V1.

Supabase Storage es la opción recomendada para V1.
La base de datos guarda referencias/metadata, no los bytes de las imágenes.

## Procesos en segundo plano

V1 no necesita worker, cola ni microservicio de background como requisito inicial.

Si en el futuro aparecen necesidades como:
- procesamiento masivo;
- sincronización ERP;
- importaciones grandes;
- notificaciones intensivas;
- tareas largas;

se añadirá un worker/cola separado.

No introducirlo antes de necesitarlo.

## Integraciones externas

Wappsi/ERP queda detrás de una interfaz/adaptador futuro.

Regla:
`dominio ENVAX -> adapter -> ERP`

Nunca:
`dominio ENVAX -> código Wappsi disperso por módulos`

La V1 debe funcionar aunque el ERP no esté integrado.

## Observabilidad mínima

Desde V1 registrar:
- errores de API;
- latencia básica;
- endpoint/operación;
- request/correlation ID;
- errores de integración externa;
- cambios comerciales mediante audit log.

No registrar passwords, tokens completos, secretos ni contenido privado innecesario.

## Entornos

Mínimo:
- local/desarrollo;
- staging/pruebas;
- producción.

Cada entorno debe tener su propio proyecto/configuración/secretos; nunca reutilizar datos reales en desarrollo.

## Fuera de V1

No construir de lanzamiento:
- microservicios;
- Kubernetes;
- worker/queue dedicado;
- múltiples vendedores/routing;
- motor de precios;
- stock;
- facturación electrónica;
- sincronización ERP obligatoria;
- event bus complejo.

## Pendientes

- 🟡 Contrato real de Wappsi/ERP después de validación.
- 🟡 Política final de privacidad/consentimiento de Analytics en Fase 11.
- 🟡 Detalles de despliegue/entornos y costos finales en Fase 14.

## Bloqueos

- 🔴 Ninguno para continuar a Fase 10 — Integraciones.
