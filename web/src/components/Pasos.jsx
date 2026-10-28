import { m } from 'motion/react'
import { site } from '../content.js'
import Icono from '../lib/iconos.jsx'
import { botonPrimario, contenedor, flecha } from '../lib/estilos.js'
import { curva, duracion } from '../lib/movimiento.js'
import { ctaPrincipal } from '../lib/whatsapp.js'
import Reveal from './Reveal.jsx'
import Titulo from './Titulo.jsx'

// "Cómo pedir turno" en 3 pasos (bloque de diseño, no cuenta como sección).
// La línea punteada se dibuja (horizontal en escritorio, vertical en celular) y cada paso aparece cuando la línea llega.
const dibujar = { duration: 0.7, ease: curva.entrar }
const lineaX = { oculto: { scaleX: 0 }, visible: { scaleX: 1, transition: dibujar } }
const lineaY = { oculto: { scaleY: 0 }, visible: { scaleY: 1, transition: dibujar } }
const paso = (i) => ({
  oculto: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: duracion.entrar, ease: curva.entrar, delay: 0.1 + i * 0.2 } },
})

export default function Pasos() {
  const { etiqueta, titulo, items } = site.pasos
  // Alterna con la sección anterior: después de "El consultorio" (blanco) va arena; sin ella, blanco.
  const fondo = site.nosotros ? 'bg-superficie' : 'bg-fondo'
  const tarjeta = site.nosotros ? 'bg-fondo' : 'bg-superficie'
  const anillo = site.nosotros ? 'ring-superficie' : 'ring-fondo'

  return (
    <section className={`py-10 sm:py-14 ${fondo}`}>
      <div className={`${contenedor} flex flex-col md:items-center`}>
        <Reveal efecto="texto">
          <Titulo etiqueta={etiqueta} centrado>
            {titulo}
          </Titulo>
        </Reveal>
        <m.ol
          initial="oculto"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="relative mt-8 grid w-full gap-4 sm:mt-16 md:grid-cols-3 md:gap-6"
        >
          <m.li
            aria-hidden="true"
            variants={lineaX}
            className="absolute inset-x-[16%] top-[31px] hidden origin-left border-t-2 border-dashed border-arco md:block"
          />
          <m.li
            aria-hidden="true"
            variants={lineaY}
            className="absolute top-6 bottom-16 left-[23px] origin-top border-l-2 border-dashed border-arco md:hidden"
          />
          {items.map((p, i) => (
            <m.li key={p.titulo} variants={paso(i)} className="relative flex items-start gap-4 md:flex-col md:items-center md:gap-7 md:text-center">
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-[19px] font-bold ring-[6px] md:h-16 md:w-16 md:text-2xl md:ring-8 ${anillo} ${
                  i === 0 ? 'bg-brand text-sobre-brand' : 'border-2 border-brand bg-fondo text-brand'
                }`}
              >
                {i + 1}
              </span>
              <div className={`flex-1 self-stretch rounded-[22px] p-5 md:rounded-[28px] md:p-7 ${tarjeta}`}>
                <h3 className="font-display text-[19px] font-bold text-texto md:text-[22px]">{p.titulo}</h3>
                <p className="mt-1 text-base leading-normal text-suave md:mt-2">{p.texto}</p>
              </div>
            </m.li>
          ))}
        </m.ol>
        <Reveal efecto="texto" className="mt-8 sm:mt-14">
          <a {...ctaPrincipal()} className={`${botonPrimario} w-full min-h-[58px] px-8 text-lg sm:w-auto`}>
            {site.hero.cta}
            <Icono nombre="flecha" className={flecha} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
