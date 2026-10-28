# Alcance — LuGia

## Objetivo del sitio
Que los pacientes encuentren al consultorio de la Od. Luciana Gianello en Google, conozcan sus tratamientos y pidan turno por WhatsApp.

## Plan elegido
**Profesional** (id `semi`). Trabajo gratuito: sin presupuesto, seña ni PDF. Lo aprueban el usuario y la Od. Gianello.

## Incluido
| Funcionalidad | Estado |
|---|---|
| Portada, Servicios, Quiénes somos / la profesional (MP 7700), Preguntas frecuentes, Contacto (hasta 6 secciones) | Incluido en Profesional |
| Pedido de turno (pre-admisión: nombre, motivo, horario) que abre WhatsApp, con checkbox de términos y privacidad | Incluido (formulario) |
| Mapa con "Cómo llegar" | Incluido |
| Dominio propio (lugia.com.ar, lo compra el usuario) y mail con el dominio | Incluido |
| Ficha de Google + cartel QR de reseñas (cuando la ficha esté verificada) | Incluido |
| SEO local y datos estructurados `Dentist` | Incluido |
| Medición (GA4 / píxel Meta) | Incluida si se quiere; se puede dejar para después |
| Tarjeta con QR e imagen para estados | Incluido |
| Turnero online / agenda | **Excede** → Premium. La profesional no lo quiere |
| Panel, backend, base de datos | **Excede** → Premium. No se hace |
| Reseñas en la web | No hasta que existan reseñas reales en Google |
| Antes y después | Solo con autorización escrita del paciente; hoy no hay |

## No incluido
Turnero, panel de administración, backend, pagos online, precios publicados, ortodoncia (no la realiza), obras sociales (atención particular), campañas de publicidad.

## Contenido a cargo del cliente (vía el usuario)
Logo y flyers, horas exactas de atención, links de Instagram/Facebook/ficha de Google, frase y respuestas de las preguntas frecuentes, fotos reales (fachada, sala de espera, sillón, retrato, instrumental).
Mientras tanto: fotos de Unsplash de marcador.

## Revisiones
2 rondas de cambios estéticos (textos, colores, imágenes, orden de secciones), aunque sea gratis. Una ronda = una lista única. Secciones o funciones nuevas quedan fuera. Las actualizaciones de horarios y precios las hace el usuario sin costo.

## Plazos y pago
Sin seña ni saldo. Dominio: lo paga el usuario. Hosting gratis (Cloudflare Pages).

## Aceptación
Visto bueno del usuario y de la Od. Gianello sobre este alcance.

## Notas técnicas (internas)
- Base: `D:/Escritorio/clientes/Odontologia/demo-alameda` copiada a `web/`. React + Tailwind + motion.
- `content.js`: `demo: null`, `plan: 'semi'`. Sin DemoBanner/Comparacion.
- Hosting: Cloudflare Pages, subdominio `*.pages.dev` al inicio. Sin Render/Mongo.
- Turno: `PreAdmision.jsx` → wa.me al +5493513938777. Contacto: lucygianello@gmail.com. Horario provisorio: Lunes a viernes, 9 a 21.
