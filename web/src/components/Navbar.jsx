import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { curva } from '../lib/movimiento.js'
import { site } from '../content.js'
import Icono from '../lib/iconos.jsx'
import { contenedor } from '../lib/estilos.js'
import { ctaPrincipal, whatsappUrl } from '../lib/whatsapp.js'

const nombreDe = (seccion) => seccion?.etiqueta ?? seccion?.titulo

const links = [
  { href: '#servicios', label: nombreDe(site.servicios), visible: true },
  { href: '#profesional', label: nombreDe(site.profesional), visible: Boolean(site.profesional) },
  { href: '#nosotros', label: nombreDe(site.nosotros), visible: Boolean(site.nosotros) },
  { href: '#galeria', label: nombreDe(site.galeria), visible: site.galeria?.imagenes.length > 0 },
  { href: '#contacto', label: nombreDe(site.contacto), visible: true },
  { href: '#faq', label: 'Preguntas', visible: site.faq.length > 0 },
].filter((l) => l.visible)

export default function Navbar() {
  const [abierto, setAbierto] = useState(false)
  const [scrolleado, setScrolleado] = useState(false)

  // Siempre blanca; al dejar de estar arriba de todo aparecen un filete y una sombra suave.
  useEffect(() => {
    const onScroll = () => setScrolleado(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // El alto real de la barra queda en --alto-header:
  // la portada lo usa para no quedar tapada.
  // Se mide hasta el borde de abajo de la barra, sin contar el menú desplegado.
  const ref = useRef(null)
  const barra = useRef(null)
  useEffect(() => {
    const medir = () => {
      if (!barra.current || !ref.current) return
      const alto = barra.current.getBoundingClientRect().bottom - ref.current.getBoundingClientRect().top
      document.documentElement.style.setProperty('--alto-header', `${Math.round(alto)}px`)
    }
    const observador = new ResizeObserver(medir)
    observador.observe(ref.current)
    return () => observador.disconnect()
  }, [])

  const marcada = scrolleado || abierto

  return (
    <header ref={ref} className="fixed inset-x-0 top-0 z-40">
      <div
        className={`border-b bg-fondo/95 text-texto backdrop-blur-md transition-[border-color,box-shadow] duration-200 ease-tocar ${
          marcada ? 'border-linea shadow-[0_8px_24px_-18px_rgba(15,23,42,0.35)]' : 'border-transparent'
        }`}
      >
        <nav ref={barra} className={`${contenedor} flex h-[68px] items-center justify-between gap-6 md:h-[84px]`}>
          <a href="#" className="flex min-w-0 items-center gap-2.5 font-display font-bold tracking-[-0.01em]">
            {site.logo ? (
              <img src={site.logo} alt={site.nombre} className="h-10 w-auto" />
            ) : (
              <>
                {site.logoIcono && <img src={site.logoIcono} alt="" className="h-9 w-9 shrink-0 md:h-10 md:w-10" />}
                <span className="line-clamp-2 text-[17px] leading-tight md:text-[19px]">{site.nombre}</span>
              </>
            )}
          </a>

          <ul className="hidden items-center gap-7 text-[15px] font-medium lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-slate-700 transition-colors duration-160 ease-tocar hover:text-brand">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto hidden items-center gap-5 md:flex lg:ml-0">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base font-semibold transition-colors duration-160 ease-tocar hover:text-brand">
              <Icono nombre="chat" className="h-[18px] w-[18px] text-brand" />
              WhatsApp
            </a>
            <a
              {...ctaPrincipal()}
              className="inline-flex h-12 items-center rounded-full bg-brand px-6 text-base font-semibold text-sobre-brand transition duration-160 ease-tocar hover:bg-brand-oscuro active:scale-[0.98]"
            >
              {site.hero.cta}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setAbierto(!abierto)}
            className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-linea lg:hidden"
            aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={abierto}
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.span
                key={abierto ? 'cerrar' : 'menu'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.1, ease: curva.entrar } }}
                exit={{ opacity: 0, transition: { duration: 0.08, ease: curva.salir } }}
                className="flex"
              >
                <Icono nombre={abierto ? 'cerrar' : 'menu'} className="h-[22px] w-[22px]" />
              </m.span>
            </AnimatePresence>
          </button>
        </nav>

        {/* Menú del celular: se destapa de arriba hacia abajo (clip-path) con un fundido y 4 px de subida; cierra más rápido. */}
        <AnimatePresence initial={false}>
          {abierto && (
            <m.ul
              key="menu"
              initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0, y: -4 }}
              animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1, y: 0, transition: { duration: 0.2, ease: curva.entrar } }}
              exit={{ clipPath: 'inset(0 0 100% 0)', opacity: 0, y: -4, transition: { duration: 0.14, ease: curva.salir } }}
              className={`${contenedor} border-t border-linea py-2 lg:hidden`}
            >
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setAbierto(false)} className="block py-3.5 font-display text-lg font-bold">
                    {l.label}
                  </a>
                </li>
              ))}
            </m.ul>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
