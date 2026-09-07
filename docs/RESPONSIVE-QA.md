# Responsive QA

## Principios implementados

- Sin `overflow: hidden` global para forzar desktop en una pantalla.
- Dos columnas solo cuando `min-width: 1100px` y `min-height: 700px` permiten una composicion comoda.
- Tablet y pantallas bajas permanecen en flujo vertical; el contenido puede hacer scroll natural.
- La demo inline tiene altura limitada con `clamp()`; en formatos no aptos se abre explicitamente, no de forma automatica.

## Evidencia local capturada

`qa/capture-responsive.py` usa emulacion de viewport de Edge DevTools, guarda PNGs en `qa/screenshots/` y registra medidas reales en `qa/responsive-results.json`.

- Capturados: 360x800, 390x844, 430x932, 844x390, 1024x768, 1366x768, 1440x900 y 1920x1080.
- Resultado actual: ningun viewport capturado presenta overflow horizontal.
- 1366x768, 1440x900 y 1920x1080 ajustan toda la composicion desktop dentro del viewport; los formatos tablet, movil, paisaje bajo y cualquier contenido adicional conservan scroll natural en vez de recortarse.

## Matriz pendiente de ampliar

360x800, 375x812, 390x844, 430x932, 768x1024, 820x1180, 1024x768, 1280x720, 1366x768, 1440x900, 1920x1080, 2560x1440, 3122x2120, 844x390, 932x430 y 1024x600.

En cada viewport verificar: ausencia de overflow horizontal, contenido no cortado, formulario usable, CTA alcanzables, demo completa, teclado/focus y reduced motion. Las capturas reales deben guardarse en `qa/screenshots/`; no se deben declarar como completadas sin ejecutar navegador.
