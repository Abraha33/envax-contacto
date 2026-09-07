# QR Analytics V2

## Contrato permanente

`https://contacto.desechablesenvax.com/tarjeta` es la URL impresa del QR. El Worker debe enrutar solo `/tarjeta*` y `/api/qr/*`; no debe interceptar todo `contacto.desechablesenvax.com/*`.

Flujo: QR → `/tarjeta` → registro de `scan` → redirect a `DESTINATION_URL` con `scan_id` y `qr_source` → eventos first-party.

El destino puede cambiar con `DESTINATION_URL` sin reimprimir el QR.

## Eventos

| Evento | Significado |
| --- | --- |
| `scan` | El Worker recibió el QR. |
| `page_view` | La landing cargó con un `scan_id`. |
| `form_start` | La persona enfocó un campo del formulario. |
| `form_submit` | Inició un canal con formulario válido. |
| `whatsapp_click` | Se intentó abrir WhatsApp; no confirma mensaje enviado. |
| `phone_click` | Se activó un enlace `tel:`; no confirma llamada atendida. |
| `email_click` | Se intentó abrir correo; no confirma correo enviado. |
| `catalog_click` | Se eligió catálogo o tienda cuando esos CTA están activos. |

El cliente guarda `scan_id` únicamente en `sessionStorage`. El endpoint acepta `POST /api/qr/event`; `/event` continúa como compatibilidad temporal.

## Datos y privacidad

Se registran timestamp UTC, timestamp Colombia, origen QR, destino, UTM, landing path, ubicación aproximada de Cloudflare, timezone, colo, dispositivo, SO, navegador, idioma, referrer y `visitor_key` diario pseudónimo.

No se guarda IP raw, GPS, fingerprint persistente, nombre, teléfono, nombre del negocio ni tipo de negocio en telemetry. La ubicación se debe presentar siempre como **aproximada**.

## D1

Para una base existente, revisar y aplicar la migración aditiva:

```powershell
cd qr-worker
npx wrangler d1 migrations apply envax-qr-analytics --remote
```

No ejecutar el comando anterior sin confirmar cuenta, base y ambiente Cloudflare. `schema.sql` es para una instalación nueva.

## Consultas para dashboard

```sql
-- Hoy: scans, visitantes aproximados, contactos e índice de conversión
WITH today_scans AS (
  SELECT scan_id, visitor_key FROM scans WHERE date(scanned_at) = date('now')
), contacts AS (
  SELECT DISTINCT scan_id FROM events
  WHERE date(event_at) = date('now')
    AND event_type IN ('form_submit','whatsapp_click','phone_click','email_click')
)
SELECT
  (SELECT count(*) FROM today_scans) AS scans,
  (SELECT count(DISTINCT visitor_key) FROM today_scans WHERE visitor_key IS NOT NULL) AS unique_visitors_approx,
  (SELECT count(*) FROM contacts) AS contacts,
  ROUND(100.0 * (SELECT count(*) FROM contacts) / NULLIF((SELECT count(*) FROM today_scans), 0), 2) AS conversion_rate;

-- Conversión por canal
SELECT event_type, count(*) AS total
FROM events
WHERE event_type IN ('whatsapp_click','phone_click','email_click','form_submit')
GROUP BY event_type
ORDER BY total DESC;
```
