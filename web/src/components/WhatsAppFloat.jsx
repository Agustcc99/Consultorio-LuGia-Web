import { m } from 'motion/react'
import Icono from '../lib/iconos.jsx'
import { curva, duracion } from '../lib/movimiento.js'
import { whatsappUrl } from '../lib/whatsapp.js'

// Escritorio: botón flotante de WhatsApp. Aparece con un fundido después de la portada; sin latido ni giro.
export default function WhatsAppFloat() {
  return (
    <m.a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duracion.entrar, ease: curva.entrar, delay: 1.2 }}
      className="fixed right-6 bottom-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-sobre-whatsapp shadow-[0_16px_32px_-12px_rgba(5,46,22,0.45)] transition-[filter] duration-160 ease-tocar hover:brightness-95 md:flex"
    >
      <Icono nombre="chat" className="h-7 w-7" />
    </m.a>
  )
}
