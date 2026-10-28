import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { curva } from '../lib/movimiento.js'
import { site } from '../content.js'
import Icono from '../lib/iconos.jsx'
import LogoAnimado from './LogoAnimado.jsx'
import { contenedor } from '../lib/estilos.js'
import { ctaPrincipal, whatsappUrl } from '../lib/whatsapp.js'

gsap.registerPlugin(ScrollTrigger)

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

  // GSAP: la barra baja desde arriba al cargar, se esconde al bajar y vuelve al subir; un subrayado dorado
  // se desliza hasta el link de la sección que se está viendo.
  const lista = useRef(null)
  const marca = useRef(null)
  const abiertoRef = useRef(false)
  const [activo, setActivo] = useState(null)
  abiertoRef.current = abierto

  useEffect(() => {
    const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (!reducir) {
        gsap.from(ref.current, { yPercent: -100, duration: 0.9, ease: 'power3.out', delay: 0.1 })
        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            const oculta = self.direction === 1 && self.scroll() > 240 && !abiertoRef.current
            gsap.to(ref.current, { yPercent: oculta ? -100 : 0, duration: 0.4, ease: 'power3.out', overwrite: 'auto' })
          },
        })
      }
      links.forEach((l) => {
        const sec = document.querySelector(l.href)
        if (!sec) return
        ScrollTrigger.create({
          trigger: sec,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => self.isActive && setActivo(l.href),
        })
      })
      ScrollTrigger.create({ trigger: document.body, start: 'top top', end: '+=300', onLeaveBack: () => setActivo(null) })
    }, ref)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const a = lista.current?.querySelector(`a[href="${activo}"]`)
    if (!marca.current || !lista.current) return
    if (!a) return void gsap.to(marca.current, { opacity: 0, duration: 0.2 })
    gsap.to(marca.current, { x: a.offsetLeft, width: a.offsetWidth, opacity: 1, duration: reducir ? 0 : 0.55, ease: 'elastic.out(1, 0.7)' })
  }, [activo])

  return (
    <header ref={ref} className="fixed inset-x-0 top-0 z-40">
      <div
        className={`border-b bg-gradient-to-r from-brand-oscuro via-brand to-brand-oscuro text-sobre-brand transition-[border-color,box-shadow] duration-200 ease-tocar ${
          marcada ? 'border-white/10 shadow-[0_14px_30px_-14px_rgba(60,10,30,0.55)]' : 'border-transparent'
        }`}
      >
        <nav ref={barra} className={`${contenedor} flex h-[68px] items-center justify-between gap-6 md:h-[84px]`}>
          <a href="#" className="flex min-w-0 items-center gap-2.5 font-display font-bold tracking-[-0.01em]">
            {site.logo ? (
              <img src={site.logo} alt={site.nombre} className="h-10 w-auto" />
            ) : (
              <>
                {site.logoIcono && <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_6px_16px_-6px_rgba(0,0,0,0.4)] md:h-12 md:w-12">
                    <LogoAnimado src={site.logoIcono} className="h-9 w-9 md:h-10 md:w-10" />
                  </span>}
                <span className="line-clamp-2 text-[17px] leading-tight md:text-[19px]">{site.nombre}</span>
              </>
            )}
          </a>

          <ul ref={lista} className="relative hidden items-center gap-7 text-[15px] font-medium lg:flex">
            <span ref={marca} aria-hidden="true" className="pointer-events-none absolute -bottom-2 left-0 h-[3px] w-0 rounded-full bg-gradient-to-r from-resalte to-[#e3b34f] opacity-0" />
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="block py-2 text-white/80 transition-colors duration-160 ease-tocar hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto hidden items-center gap-5 md:flex lg:ml-0">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base font-semibold text-white transition-colors duration-160 ease-tocar hover:text-resalte">
              <Icono nombre="chat" className="h-[18px] w-[18px] text-resalte" />
              WhatsApp
            </a>
            <a
              {...ctaPrincipal()}
              className="inline-flex h-12 items-center rounded-full bg-white px-6 text-base font-semibold text-brand transition duration-160 ease-tocar hover:bg-tinte active:scale-[0.98]"
            >
              {site.hero.cta}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setAbierto(!abierto)}
            className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-white/35 lg:hidden"
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
              className={`${contenedor} border-t border-white/15 py-2 lg:hidden`}
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
