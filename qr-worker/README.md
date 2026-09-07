# ENVAX QR Tracker

Cloudflare Worker para QR permanente de ENVAX.

## Flujo

`contacto.desechablesenvax.com/tarjeta` → registra escaneo → opcionalmente notifica → redirige a `https://contacto.desechablesenvax.com/`.

Ejemplos de origen:

- `/tarjeta`
- `/tarjeta/flyer`
- `/tarjeta/mostrador`
- `/tarjeta/catalogo`

El Worker añade `scan_id` y `qr_source` al destino para poder atribuir acciones posteriores.

## Privacidad

No se guarda la IP en texto plano. Se genera una clave diaria hash para estimar visitantes únicos sin conservar la IP original. El QR no puede conocer por sí solo el nombre o teléfono de quien escanea; la identidad solo puede asociarse si la persona se identifica después en el sitio.

## Configuración inicial

Desde la raíz del repositorio:

```powershell
cd qr-worker
npx wrangler@latest login
npx wrangler@latest d1 create envax-qr-analytics
```

Cuando Wrangler pregunte, añade el binding con nombre `DB` al archivo `wrangler.jsonc`.

Para una instalación nueva aplica `schema.sql`. Para la base existente usa la migración versionada:

```powershell
npx wrangler@latest d1 migrations apply envax-qr-analytics --remote
```

Crea un secreto para el hash diario:

```powershell
npx wrangler@latest secret put VISITOR_SALT
```

Usa una cadena aleatoria larga y no la publiques en GitHub.

Despliega:

```powershell
npx wrangler@latest deploy
```

Prueba primero el `workers.dev` generado y `/health`.

## Rutas permanentes

Después del primer deploy, en Cloudflare:

Configura rutas específicas, sin tomar todo el host:

- `contacto.desechablesenvax.com/tarjeta*`
- `contacto.desechablesenvax.com/api/qr/*`

El resto de `contacto.desechablesenvax.com/*` debe seguir siendo servido por Pages. La ruta `/tarjeta` es el contrato impreso y no se debe renombrar.

## Email de alertas

El código soporta un binding llamado `EMAIL`, `ALERT_TO`, `ALERT_FROM` y flags como `NOTIFY_ON_WHATSAPP=true`. Las alertas están desactivadas por defecto y no incluyen IP, GPS ni datos del formulario.

Primero configura Cloudflare Email Service para `desechablesenvax.com`, verifica el destino y añade el binding `EMAIL` al Worker. Después configura las variables en el Worker. Si el binding no existe, el tracking y la redirección siguen funcionando sin alertas por correo.

## Endpoint de conversiones

`POST https://contacto.desechablesenvax.com/api/qr/event`

Body:

```json
{
  "scan_id": "<uuid>",
  "event_type": "whatsapp_click",
  "metadata": {}
}
```

Eventos admitidos:

- `scan`, `page_view`, `form_start`, `form_submit`
- `whatsapp_click`, `phone_click`, `email_click`, `catalog_click`

Solo se aceptan llamadas desde los orígenes configurados en `ALLOWED_ORIGINS`. Ejecuta `npm.cmd test` antes de desplegar; no se despliega automáticamente desde este repositorio.
