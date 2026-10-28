import { site } from '../content.js'

export function whatsappUrl(mensaje = site.whatsapp.mensaje) {
  return `https://wa.me/${site.whatsapp.numero}?text=${encodeURIComponent(mensaje)}`
}

// Destino del botón principal: pre-admisión (Profesional) → WhatsApp.
export function ctaPrincipal() {
  if (site.preadmision) return { href: '#pedir-turno' }
  return { href: whatsappUrl(), target: '_blank', rel: 'noopener noreferrer' }
}
