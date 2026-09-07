# ENVAX QR Tracker

Cloudflare Worker para QR permanente de ENVAX.

## Flujo

`qr.desechablesenvax.com/<origen>` → registra escaneo → opcionalmente notifica por email → redirige a `https://contacto.desechablesenvax.com/`.

Ejemplos de origen:

- `/tarjeta`
- `/flyer`
- `/mostrador`
- `/catalogo`

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

Después aplica el esquema:

```powershell
npx wrangler@latest d1 execute envax-qr-analytics --remote --file=./schema.sql
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

## Dominio permanente

Después del primer deploy, en Cloudflare:

`Workers & Pages → envax-qr-tracker → Settings/Domains & Routes → Add → Custom Domain`

Añade:

`qr.desechablesenvax.com`

Cloudflare crea el DNS y certificado para el subdominio cuando la zona está administrada por Cloudflare.

## Email de alertas

El código soporta un binding llamado `EMAIL` y variables `ALERT_TO` y `ALERT_FROM`.

Primero configura Cloudflare Email Service para `desechablesenvax.com`, verifica el destino y añade el binding `EMAIL` al Worker. Después configura las variables en el Worker. Si el binding no existe, el tracking y la redirección siguen funcionando sin alertas por correo.

## Endpoint de conversiones

`POST https://qr.desechablesenvax.com/event`

Body:

```json
{
  "scan_id": "<uuid>",
  "event_type": "whatsapp_click",
  "metadata": {}
}
```

Eventos admitidos:

- `page_view`
- `whatsapp_click`
- `email_click`
- `catalog_click`
- `form_submit`

Solo se aceptan llamadas desde los orígenes configurados en `ALLOWED_ORIGINS`.
