# Contact Funnel

El funnel medible es: `scan` → `page_view` → `form_start` → intención de canal → contacto potencial.

La telemetría no bloquea navegación: usa `sendBeacon()` y cae a `fetch(..., { keepalive: true })`. WhatsApp, correo, catálogo y teléfono siguen funcionando aunque D1 o analytics fallen.

`leadEndpoint` sigue separado de analytics para cualquier integración que reciba datos voluntarios del formulario. El endpoint de QR nunca recibe esos campos.

Un click no prueba el resultado final: `whatsapp_click` no confirma mensaje enviado; `email_click` no confirma envío; `phone_click` no confirma llamada atendida.
