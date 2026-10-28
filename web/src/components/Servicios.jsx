import { site } from '../content.js'
import Icono from '../lib/iconos.jsx'
import { contenedor, flecha } from '../lib/estilos.js'
import { whatsappUrl } from '../lib/whatsapp.js'
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Reveal from './Reveal.jsx'
import Titulo from './Titulo.jsx'

gsap.registerPlugin(ScrollTrigger)

// Tarjetas con GSAP: entran con escalón (suben, giran apenas y rebotan), flotan con el scroll a distinta velocidad,
// y al pasar el mouse se llenan de vino desde el punto de entrada mientras el ícono salta y aparece una línea dorada.

// estilo 'lista': carta con línea punteada hasta el precio. estilo 'tarjetas': grilla de tarjetas con ícono.
export default function Servicios() {
  const { etiqueta, titulo, estilo = 'tarjetas', items } = site.servicios
  const grilla = useRef(null)

  useLayoutEffect(() => {
    if (!grilla.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const conMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const ctx = gsap.context(() => {
      const tarjetas = gsap.utils.toArray('[data-tarjeta]')
      gsap.from(tarjetas, {
        y: 90,
        opacity: 0,
        scale: 0.88,
        rotate: (i) => (i % 2 ? 3 : -3),
        duration: 1,
        ease: 'back.out(1.5)',
        stagger: 0.12,
        scrollTrigger: { trigger: grilla.current, start: 'top 82%', once: true },
      })
      // Paralaje: el número de cada tarjeta se corre distinto mientras se scrollea (también en celular).
      tarjetas.forEach((t, i) =>
        gsap.fromTo(t.querySelector('[data-numero]'), { y: 0 }, { y: 28 + (i % 3) * 14, ease: 'none', scrollTrigger: { trigger: t, start: 'top bottom', end: 'bottom top', scrub: true } }),
      )
      tarjetas.forEach((t) => {
        const relleno = t.querySelector('[data-relleno]')
        const icono = t.querySelector('[data-icono]')
        const linea = t.querySelector('[data-linea]')
        const entrar = (x, y) => {
          t.classList.add('activa')
          gsap.fromTo(relleno, { clipPath: `circle(0px at ${x}px ${y}px)` }, { clipPath: `circle(160% at ${x}px ${y}px)`, duration: 0.7, ease: 'power3.out', overwrite: true })
          gsap.fromTo(icono, { y: 0, rotate: 0 }, { keyframes: [{ y: -10, rotate: -12, duration: 0.18 }, { y: 0, rotate: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' }], overwrite: true })
          gsap.to(linea, { scaleX: 1, duration: 0.6, ease: 'power3.out' })
          gsap.to(t, { y: -8, duration: 0.4, ease: 'power3.out' })
        }
        const salir = (x, y) => {
          t.classList.remove('activa')
          gsap.to(relleno, { clipPath: `circle(0px at ${x}px ${y}px)`, duration: 0.5, ease: 'power3.in', overwrite: true })
          gsap.to(linea, { scaleX: 0, duration: 0.4, ease: 'power3.in' })
          gsap.to(t, { y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' })
        }
        const punto = (e) => {
          const r = t.getBoundingClientRect()
          return [e.clientX - r.left, e.clientY - r.top]
        }
        if (conMouse) {
          t.addEventListener('pointerenter', (e) => e.pointerType !== 'touch' && entrar(...punto(e)))
          t.addEventListener('pointerleave', (e) => e.pointerType !== 'touch' && salir(...punto(e)))
        } else {
          // Celular: la tarjeta que pasa por el centro de la pantalla se llena de vino desde abajo, y se vacía al irse.
          ScrollTrigger.create({
            trigger: t,
            start: 'top 62%',
            end: 'bottom 38%',
            onEnter: () => entrar(t.offsetWidth / 2, t.offsetHeight),
            onEnterBack: () => entrar(t.offsetWidth / 2, 0),
            onLeave: () => salir(t.offsetWidth / 2, 0),
            onLeaveBack: () => salir(t.offsetWidth / 2, t.offsetHeight),
          })
        }
      })
    }, grilla)
    return () => ctx.revert()
  }, [])

  return (
    <section id="servicios" className="scroll-mt-[calc(var(--alto-header,7rem)_+_1rem)] bg-transparent py-10 sm:py-14">
      <div className={contenedor}>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-12">
          <Reveal efecto="texto" className="max-w-2xl">
            <Titulo etiqueta={etiqueta}>{titulo}</Titulo>
          </Reveal>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden shrink-0 items-center gap-2 text-[17px] font-semibold text-brand hover:text-brand-oscuro md:inline-flex"
          >
            Consultar por un tratamiento
            <Icono nombre="flecha" className={flecha} />
          </a>
        </div>

        {estilo === 'lista' ? (
          <div className="mt-10 grid gap-x-16 sm:mt-14 md:grid-cols-2">
            {items.map((s, i) => (
              <Reveal key={s.titulo} retraso={i % 2} className="border-b border-linea py-5">
                <div className="flex items-baseline gap-4">
                  <h3 className="font-display text-xl font-bold text-texto">{s.titulo}</h3>
                  <span className="flex-1 border-b-2 border-dotted border-borde" />
                  {s.precio && <span className="font-display text-xl font-bold text-brand">{s.precio}</span>}
                </div>
                <p className="mt-2 text-suave">{s.descripcion}</p>
              </Reveal>
            ))}
          </div>
        ) : (
          <div ref={grilla} className="mt-8 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {items.map((s, i) => {
              const destacada = i === 0
              return (
                <article
                  key={s.titulo}
                  data-tarjeta
                  tabIndex={0}
                  className={`group relative isolate cursor-default overflow-hidden rounded-[22px] border border-borde bg-gradient-to-br from-fondo to-superficie p-[22px] outline-none focus-visible:ring-4 focus-visible:ring-brand/20 sm:rounded-[28px] sm:p-7 ${
                    destacada ? 'sm:col-span-2' : ''
                  }`}
                >
                  {/* Relleno vino que nace desde donde entra el mouse (GSAP). */}
                  <span data-relleno aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-brand to-brand-oscuro" style={{ clipPath: 'circle(0% at 50% 50%)' }} />
                  {/* Número grande de fondo. */}
                  <span aria-hidden="true" data-numero className="pointer-events-none absolute -top-3 right-4 -z-10 font-display text-[88px] leading-none font-bold text-brand/[0.07] transition-colors duration-300 group-hover:text-white/15 group-[.activa]:text-white/15 sm:text-[110px]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span data-icono className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-tinte text-brand transition-colors duration-300 group-hover:bg-white/15 group-[.activa]:bg-white/15 group-hover:text-white group-[.activa]:text-white sm:h-[60px] sm:w-[60px]">
                    <Icono nombre={s.icono} className="h-7 w-7 sm:h-[30px] sm:w-[30px]" />
                  </span>
                  <h3 className="mt-5 font-display text-xl leading-snug font-bold text-texto transition-colors duration-300 group-hover:text-white group-[.activa]:text-white sm:text-[22px]">{s.titulo}</h3>
                  <p className={`mt-2 text-base leading-normal text-suave transition-colors duration-300 group-hover:text-white/85 group-[.activa]:text-white/85 ${destacada ? 'sm:max-w-md' : ''}`}>{s.descripcion}</p>
                  {s.precio && <p className="mt-4 font-display text-xl font-bold text-brand group-hover:text-white group-[.activa]:text-white">{s.precio}</p>}
                  <span aria-hidden="true" data-linea className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand via-resalte to-arco" />
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
