import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { site } from '../content.js'
import Icono from '../lib/iconos.jsx'
import { botonPrimario, contenedor, flecha } from '../lib/estilos.js'
import { ctaPrincipal } from '../lib/whatsapp.js'
import Reveal from './Reveal.jsx'
import Titulo from './Titulo.jsx'

gsap.registerPlugin(ScrollTrigger)

// "Cómo pedir turno" en 3 pasos, con GSAP: una línea vino se va llenando con el scroll (escritorio: horizontal, celular: vertical),
// cada círculo se enciende cuando la línea lo alcanza y las tarjetas entran escalonadas, con un número grande de fondo.
export default function Pasos() {
  const { etiqueta, titulo, items } = site.pasos
  const raiz = useRef(null)

  useLayoutEffect(() => {
    if (!raiz.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add({ ancho: '(min-width: 768px)' }, (c) => {
        const horizontal = c.conditions.ancho
        const pasos = gsap.utils.toArray('[data-paso]')
        const nodos = gsap.utils.toArray('[data-nodo]')
        // Línea que se llena con el scroll.
        gsap.fromTo(
          '[data-progreso]',
          horizontal ? { scaleX: 0 } : { scaleY: 0 },
          { scaleX: 1, scaleY: 1, ease: 'none', scrollTrigger: { trigger: '[data-lista]', start: 'top 70%', end: 'bottom 60%', scrub: 0.6 } },
        )
        pasos.forEach((p, i) => {
          const nodo = nodos[i]
          const tarjeta = p.querySelector('[data-tarjeta]')
          gsap.from(tarjeta, {
            y: 60,
            opacity: 0,
            scale: 0.92,
            rotate: i === 1 ? 0 : i === 0 ? -2 : 2,
            duration: 0.9,
            ease: 'back.out(1.4)',
            scrollTrigger: { trigger: p, start: 'top 82%', once: true },
          })
          // El círculo se enciende (vino lleno) y rebota cuando la línea llega.
          gsap.timeline({ scrollTrigger: { trigger: p, start: horizontal ? 'top 70%' : 'top 62%', toggleActions: 'play none none reverse' } })
            .to(nodo, { backgroundColor: '#7a1f3d', color: '#ffffff', borderColor: '#7a1f3d', duration: 0.3 }, 0)
            .fromTo(nodo, { scale: 0.7 }, { scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.4)' }, 0)
          // Celular: el ícono da una vuelta cuando el paso entra en pantalla.
          ScrollTrigger.create({ trigger: p, start: 'top 75%', once: true, onEnter: () => !window.matchMedia('(hover: hover)').matches && gsap.fromTo(p.querySelector('[data-icono]'), { rotate: 0 }, { rotate: 360, duration: 0.8, ease: 'back.out(1.6)', delay: 0.2 }) })
          p.addEventListener('pointerenter', (e) => {
            if (e.pointerType === 'touch') return
            gsap.to(tarjeta, { y: -8, duration: 0.4, ease: 'power3.out' })
            gsap.fromTo(p.querySelector('[data-icono]'), { rotate: 0 }, { rotate: 360, duration: 0.7, ease: 'back.out(1.6)' })
          })
          p.addEventListener('pointerleave', () => gsap.to(tarjeta, { y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' }))
        })
      })
    }, raiz)
    return () => ctx.revert()
  }, [])

  const fondo = site.nosotros ? 'bg-superficie/70' : 'bg-transparent'

  return (
    <section ref={raiz} className={`relative overflow-hidden py-12 sm:py-20 ${fondo}`}>
      {/* Manchas de color de fondo para sacarle lo plano. */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-tinte blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-arco/30 blur-3xl" />
      <div className={`${contenedor} relative flex flex-col md:items-center`}>
        <Titulo etiqueta={etiqueta} centrado>
          {titulo}
        </Titulo>
        <ol data-lista className="relative mt-10 grid w-full gap-6 sm:mt-16 md:grid-cols-3 md:gap-8">
          {/* Riel y progreso de la línea. */}
          <li aria-hidden="true" className="absolute top-6 bottom-16 left-[23px] w-[3px] rounded-full bg-arco/50 md:inset-x-[16%] md:top-[30px] md:bottom-auto md:left-auto md:h-[3px] md:w-auto">
            <span data-progreso className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-brand to-acento md:origin-left md:bg-gradient-to-r" />
          </li>
          {items.map((p, i) => (
            <li key={p.titulo} data-paso className="relative flex items-start gap-4 md:flex-col md:items-center md:gap-7 md:text-center">
              <span
                data-nodo
                className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[3px] border-brand bg-fondo font-display text-[19px] font-bold text-brand shadow-[0_0_0_6px_var(--color-superficie)] md:h-[62px] md:w-[62px] md:text-2xl"
              >
                {i + 1}
              </span>
              <div
                data-tarjeta
                className="group relative flex-1 self-stretch overflow-hidden rounded-[22px] border border-borde bg-fondo p-6 shadow-[0_24px_40px_-30px_rgba(122,31,61,0.45)] md:rounded-[28px] md:p-8"
              >
                <span aria-hidden="true" className="pointer-events-none absolute -right-2 -bottom-6 font-display text-[120px] leading-none font-bold text-brand/[0.06]">
                  {i + 1}
                </span>
                <span data-icono className="mx-0 mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-tinte text-brand md:mx-auto">
                  <Icono nombre={p.icono} className="h-6 w-6" />
                </span>
                <h3 className="font-display text-[20px] font-bold text-texto md:text-[23px]">{p.titulo}</h3>
                <p className="mt-2 text-base leading-normal text-suave">{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>
        <Reveal efecto="texto" className="mt-10 sm:mt-16">
          <a {...ctaPrincipal()} data-brillo className={`${botonPrimario} w-full min-h-[58px] px-8 text-lg sm:w-auto`}>
            {site.hero.cta}
            <Icono nombre="flecha" className={flecha} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
