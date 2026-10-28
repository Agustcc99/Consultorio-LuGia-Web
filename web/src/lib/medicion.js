import { site } from '../content.js'

// Google Analytics 4 y Píxel de Meta (Profesional en adelante). Solo en la página publicada:
// nunca en `npm run dev`, ni en el Básico. Los IDs van en content.js → medicion.
const { ga4, metaPixel } = site.medicion || {}
export const medicionActiva = !import.meta.env.DEV && site.plan !== 'basico' && Boolean(ga4 || metaPixel)

export function iniciarMedicion() {
  if (!medicionActiva) return

  if (ga4) {
    cargar(`https://www.googletagmanager.com/gtag/js?id=${ga4}`)
    window.dataLayer = window.dataLayer || []
    // gtag necesita el objeto `arguments`, no un array: no cambiar por (...args).
    window.gtag = function () {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', ga4)
  }

  if (metaPixel) {
    // Mismo arranque que el código oficial de Meta: encola los eventos hasta que carga fbevents.js.
    const fbq = (window.fbq = function () {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments)
    })
    if (!window._fbq) window._fbq = fbq
    fbq.push = fbq
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.queue = []
    cargar('https://connect.facebook.net/en_US/fbevents.js')
    fbq('init', metaPixel)
    fbq('track', 'PageView')
  }

  // Un solo listener para todos los botones de WhatsApp (menú, portada, flotante, contacto, cierre):
  // en GA4 queda como evento `contacto_whatsapp` y en Meta como `Contact`.
  document.addEventListener('click', (e) => {
    if (!e.target.closest?.('a[href*="wa.me/"]')) return
    window.gtag?.('event', 'contacto_whatsapp')
    window.fbq?.('track', 'Contact')
  })
}

function cargar(src) {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  document.head.appendChild(s)
}
