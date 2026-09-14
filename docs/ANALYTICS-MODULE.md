# ENVAX — Módulo de Analítica v1

## Propósito

ENVAX tendrá un módulo transversal de analítica para entender cómo las personas encuentran, usan y convierten dentro del sitio completo.

En términos simples, el módulo debe responder tres preguntas:

1. ¿De dónde llegó la persona?
2. ¿Qué hizo dentro de ENVAX?
3. ¿Hasta dónde llegó en el proceso comercial?

No es un módulo visual separado para el cliente. Es una capacidad interna que observa, mide y resume el uso de la landing, el catálogo y el área identificada.

## Alcance

El módulo cubre conceptualmente:

- landing;
- tráfico web;
- campañas y QR físicos;
- catálogo;
- categorías;
- familias;
- marcas;
- productos;
- variantes/presentaciones;
- imágenes y componentes relevantes;
- búsquedas y filtros;
- listas/favoritos;
- WhatsApp;
- correo;
- solicitudes;
- pedidos;
- área identificada del cliente;
- dispositivos;
- rendimiento y errores relevantes;
- recorridos y abandono;
- conversión comercial;
- experimentos A/B futuros.

## Qué queremos aprender

### 1. Adquisición
- Cuántas personas llegan.
- Cuántas son nuevas o recurrentes.
- Desde dónde llegan: QR, Google, directo, redes, referidos u otros.
- Qué campaña o lote de tarjetas produjo la visita cuando aplique.

### 2. Comportamiento
- Qué páginas visitan.
- Qué categorías, marcas, productos y variantes consultan.
- Qué imágenes o componentes utilizan.
- Qué búsquedas realizan.
- Qué filtros usan.
- Qué agregan o eliminan de listas.
- Qué caminos siguen dentro del sitio.

### 3. Experiencia de usuario
- Dónde abandonan.
- Hasta dónde hacen scroll.
- Qué elementos reciben interacción.
- Qué partes parecen generar fricción.
- Qué diferencias existen entre móvil, escritorio y otros dispositivos.

### 4. Rendimiento
- Velocidad de carga.
- Errores relevantes.
- Problemas por dispositivo, navegador o conexión cuando sea técnicamente posible.

### 5. Conversión comercial
Queremos poder medir recorridos como:

`origen → landing → catálogo → producto → lista → contacto → solicitud → pedido`

También deben poder analizarse recorridos alternativos, por ejemplo:

`QR → landing → WhatsApp`

`Google → landing → catálogo → WhatsApp`

`Directo → catálogo → lista → solicitud → pedido`

## Sesión anónima

Para explorar no se exige registro tradicional.

El sistema puede reconocer una sesión o perfil anónimo para relacionar acciones del mismo visitante sin necesitar conocer inmediatamente su identidad real.

Ejemplo conceptual:

`visitante anónimo → landing → catálogo → producto → lista → WhatsApp`

Si posteriormente la persona se identifica como cliente, la política exacta para relacionar el historial anónimo con la identidad queda:

🟡 PENDIENTE

## QR y campañas físicas

Los QR deben poder identificar su origen mediante enlaces controlados por ENVAX.

Ejemplo conceptual:

`tarjeta física → URL identificable → landing`

Así se podrá diferenciar una visita originada por una tarjeta de una visita proveniente de Google, entrada directa u otra fuente.

Se recomienda medir campañas, segmentos, zonas o lotes de tarjetas antes que crear obligatoriamente un identificador individual para cada tarjeta física.

## Eventos

ENVAX registrará acciones importantes como eventos. La lista exacta se definirá más adelante.

Ejemplos conceptuales:

- landing_view
- catalog_open
- category_view
- product_view
- image_interaction
- search
- filter_used
- favorite_added
- favorite_removed
- whatsapp_click
- email_click
- request_sent
- order_view

Estos nombres son conceptuales y todavía no constituyen contratos técnicos definitivos.

## Principio de diseño

No se debe medir por medir.

Cada dato debe ayudar a responder una pregunta de negocio, producto, UX, rendimiento o conversión.

El objetivo final es poder tomar decisiones con evidencia, por ejemplo:

- qué origen trae visitantes de mayor calidad;
- qué productos generan más interés;
- dónde se pierde la gente;
- qué imágenes o componentes parecen funcionar mejor;
- qué dispositivos presentan más fricción;
- qué recorridos producen más solicitudes;
- qué campañas terminan produciendo pedidos.

## Separación de dominio

La analítica es transversal, pero no debe confundirse con el dominio comercial principal.

Dominio comercial:

`Cliente · Negocio · Producto · Lista · Solicitud · Pedido · Asesor`

Telemetría/analítica:

`Visitante/Sesión · Origen · Campaña · Evento · Recorrido · Conversión`

Un evento de analítica observa lo que ocurre; no reemplaza una entidad de negocio.

## Privacidad y seguridad

La instrumentación debe diseñarse para recopilar solo lo necesario.

Debe prestarse especial atención al área identificada del cliente, pedidos, datos personales y posibles grabaciones de sesión.

Reglas concretas de consentimiento, retención, anonimización, exclusión de datos sensibles y herramientas quedan:

🟡 PENDIENTE

## Herramientas

Todavía no se congela una herramienta concreta.

Posibles categorías de herramientas:

- web analytics;
- product analytics;
- UX/behavior analytics;
- performance monitoring;
- experimentación A/B.

La selección concreta se hará después de definir el mapa de métricas y los requisitos técnicos.

## Decisiones canónicas actuales

- ✅ Analítica será un módulo/capacidad formal de ENVAX.
- ✅ Cubrirá el sitio completo, no solo la landing.
- ✅ Debe permitir diferenciar QR/campañas de otros orígenes.
- ✅ Debe seguir recorridos anónimos dentro de ENVAX.
- ✅ Debe medir comportamiento, UX, rendimiento y conversión comercial.
- ✅ Debe poder conectar, conceptualmente, adquisición con solicitud y pedido.
- ✅ No requiere rediseñar la interfaz para existir.
- 🟡 Herramienta o combinación de herramientas: PENDIENTE.
- 🟡 Lista definitiva de eventos y métricas V1: PENDIENTE.
- 🟡 Heatmaps/session replay: PENDIENTE.
- 🟡 Vinculación de historial anónimo con cliente identificado: PENDIENTE.
- 🟡 Política de privacidad/retención/consentimiento: PENDIENTE.
- 🟡 Diseño de experimentos A/B: PENDIENTE.

## Impacto en frontend

El frontend tendrá que emitir o permitir capturar eventos relevantes, pero este documento no define ni modifica el diseño visual.

Cualquier decisión futura que afecte pantallas, componentes visibles, consentimiento o experimentos deberá marcarse explícitamente como impacto de frontend y llevarse al chat correspondiente.

## Posición en el plan backend

Este módulo se define conceptualmente durante Fase 1 porque afecta sesiones anónimas, identidad, contratos frontend/backend, seguridad y datos.

Su diseño técnico detallado se resolverá más adelante durante las fases de modelo de datos, contratos, API, arquitectura backend, seguridad, pruebas e infraestructura.
