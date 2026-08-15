# ENVAX · Página de contacto

Página de contacto de Desechables ENVAX (Bucaramanga) con demostración animada integrada.

- `index.html` — Página de contacto. En escritorio (≥1024px) muestra la demo incrustada a la derecha; en móvil la abre en un modal (automático solo la primera visita).
- `demo.html` — Demostración animada; se auto-escala a cualquier tamaño de pantalla o iframe. `?compact=1` reduce el teléfono para el panel de escritorio.

## Publicar con GitHub Pages
Settings → Pages → Deploy from a branch → `main` / `(root)`.

## Configuración (`CONFIG` en index.html)
`whatsapp`, `email`, `catalogUrl` (activa el botón de catálogo), `leadEndpoint` (POST JSON opcional), `firstVisitAutoOpen`. `?demo=1` fuerza la demo en móvil.
