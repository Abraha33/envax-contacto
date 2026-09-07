# Privacy Data Map

| Dato | Uso | Retención / nota |
| --- | --- | --- |
| `scan_id` | Correlacionar funnel durante sesión | UUID técnico. |
| `visitor_key` | Visitantes aproximados por día | Hash diario con secreto; no IP raw. |
| País, región, ciudad, timezone, colo | Análisis geográfico operativo | Siempre ubicación aproximada. |
| Dispositivo, SO, navegador, idioma | Compatibilidad y agregados | Valores clasificados, no fingerprint. |
| UTM, source, referrer, destination | Atribución de campañas | Sin identidad personal. |
| Canal y página | Medir intención | Sin respuestas ni campos del formulario. |

No se almacena GPS sin consentimiento, IP raw, identificadores publicitarios ni datos voluntarios del formulario en D1 analytics. Definir un periodo de retención antes de producción y purgar registros según esa política.
