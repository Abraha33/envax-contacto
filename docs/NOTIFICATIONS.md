# Notificaciones

El Worker usa un adapter de email opcional (`env.EMAIL`). Si falta el binding o la configuración, scans, eventos y redirects continúan normalmente.

## Variables

- `ALERT_TO` y `ALERT_FROM`: direcciones configuradas fuera del repositorio.
- `NOTIFY_ON_SCAN`
- `NOTIFY_ON_WHATSAPP`
- `NOTIFY_ON_PHONE`
- `NOTIFY_ON_EMAIL`
- `NOTIFY_ON_FORM_SUBMIT`

Usa `"true"` para activar una alerta. Los defaults son `false` para evitar ruido. Las alertas incluyen canal, origen, ubicación aproximada, dispositivo, hora Colombia y scan ID corto; nunca IP, GPS ni datos del formulario.

Para otro proveedor, sustituir el adapter dentro de `sendNotification` sin cambiar el flujo de tracking.
