# ENVAX · Contact Experience + QR Analytics

Página de contacto de Desechables ENVAX (Bucaramanga) con demostración animada y atribución first-party para el QR permanente.

- `index.html` — Página de contacto. Solo muestra demo inline cuando el ancho y alto permiten dos columnas cómodas; en el resto de tamaños la demo se abre explícitamente desde el control disponible.
- `demo.html` — Demostración animada que se adapta a su iframe. `?compact=1` reduce el teléfono para el panel de escritorio.
- `qr-worker/` — Worker de Cloudflare + D1 para `/tarjeta` y `/api/qr/event`.
- `docs/` — Contrato QR, funnel, privacidad, notificaciones y QA responsive.

## Publicar con GitHub Pages
Settings → Pages → Deploy from a branch → `main` / `(root)`.

## Configuración (`CONFIG` en index.html)
`whatsapp`, `email`, `catalogUrl` (activa el botón de catálogo), `leadEndpoint` (POST de lead opcional y separado), `analyticsEndpoint` (por defecto `/api/qr/event`) y `firstVisitAutoOpen` (por defecto `false`). `?demo=1` abre la demo explícitamente en móvil.

## QR y analytics

La URL impresa permanente es `https://contacto.desechablesenvax.com/tarjeta`. No se debe cambiar ni regenerar el QR. Consulta [docs/QR-ANALYTICS.md](docs/QR-ANALYTICS.md) antes de desplegar el Worker o aplicar migraciones D1.

## Verificación local del Worker

```powershell
cd qr-worker
npm.cmd test
```

No se ejecutan migraciones ni despliegues automáticamente. Requieren una cuenta Cloudflare autenticada y validación de la configuración externa.

<!-- cloudflare-deploy-test -->
