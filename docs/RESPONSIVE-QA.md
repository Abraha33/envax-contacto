# Responsive QA

## Principios implementados

- Sin `overflow: hidden` global para forzar desktop en una pantalla.
- En desktop (`min-width: 1100px`) el formulario y la demo se organizan en dos áreas con límites de ancho y alto fluidos.
- En tablet o formatos bajos (`640px` a `1099px`, hasta `779px` de alto) los bloques de contacto se redistribuyen en una grilla compacta de dos áreas. La demo queda disponible desde un control explícito y nunca desplaza ni recorta el formulario.
- En tablet vertical y móvil se usa flujo vertical; cuando la altura no alcanza, el documento conserva scroll natural en lugar de ocultar contenido.
- La demo inline tiene altura limitada con `clamp()`; en formatos no aptos se abre explicitamente, no de forma automatica.

## Evidencia local capturada

`qa/capture-responsive.py` usa emulacion de viewport de Edge DevTools, guarda PNGs en `qa/screenshots/` y registra medidas reales en `qa/responsive-results.json`.

- Capturados: 360x800, 375x812, 390x844, 393x873, 412x915, 430x932, 768x1024, 820x1180, 1024x768, 1024x1366, 1280x720, 1366x768, 1440x900, 1600x900, 1920x1080, 2560x1440, 3122x2120, 844x390, 932x430 y 1024x600.
- Resultado actual: ningun viewport capturado presenta overflow horizontal.
- Los 20 viewports capturados no presentan overflow horizontal, overflow vertical ni elementos críticos recortados. El chequeo registra los bounds del hero, formulario, CTAs, contacto directo, demo y footer para evitar falsos positivos donde el scroll no revela una superposición.

## Cobertura pendiente

La matriz de tamanos requerida ya tiene evidencia automatizada. Sigue pendiente la comprobacion manual en navegadores/dispositivos reales para teclado, zoom 200%, contraste y reduced motion.

En cada viewport verificar: ausencia de overflow horizontal, contenido no cortado, formulario usable, CTA alcanzables, demo completa, teclado/focus y reduced motion. Las capturas reales deben guardarse en `qa/screenshots/`; no se deben declarar como completadas sin ejecutar navegador.
