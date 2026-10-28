import { useEffect, useState } from 'react'
import { site } from '../content.js'
import Icono from '../lib/iconos.jsx'
import { ctaPrincipal, whatsappUrl } from '../lib/whatsapp.js'

// Celular: barra fija abajo con "WhatsApp" y "Pedir turno" (reemplaza al botón flotante de WhatsApp).
// Entra desde abajo al pasar el 70 % de la portada, que ya tiene esos dos botones, y se va al volver arriba.
export default function BarraMovil() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-50 flex gap-2.5 border-t border-linea bg-fondo/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-12px_28px_-18px_rgba(15,23,42,0.3)] backdrop-blur transition-transform duration-240 motion-reduce:transition-none md:hidden ${
        visible ? 'translate-y-0 ease-entrar' : 'pointer-events-none translate-y-full ease-salir'
      }`}
    >
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? 0 : -1}
        className="flex min-h-14 flex-1 items-center justify-center gap-2 rounded-full border-[1.5px] border-borde-fuerte bg-fondo text-[17px] font-semibold text-texto active:scale-[0.98]"
      >
        <Icono nombre="chat" className="h-5 w-5 text-brand" />
        WhatsApp
      </a>
      <a
        {...ctaPrincipal()}
        tabIndex={visible ? 0 : -1}
        className="flex min-h-14 flex-[1.4] items-center justify-center gap-2 rounded-full bg-brand text-[17px] font-semibold text-sobre-brand active:scale-[0.98]"
      >
        <Icono nombre="calendario" className="h-5 w-5" />
        {site.hero.cta}
      </a>
    </div>
  )
}
