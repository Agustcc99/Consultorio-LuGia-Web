import { m } from 'motion/react'
import { site } from '../content.js'
import Icono from '../lib/iconos.jsx'
import { botonPrimario, botonSecundario, contenedor } from '../lib/estilos.js'
import { curva } from '../lib/movimiento.js'
import { ctaPrincipal, whatsappUrl } from '../lib/whatsapp.js'
import Reveal from './Reveal.jsx'
import Tilt from './Tilt.jsx'

// La profesional (todos los planes): foto en arco, nombre, especialidad, matrícula visible y formación.
export default function Profesional() {
  const { etiqueta, nombre, especialidad, matricula, imagen, frase, formacion = [] } = site.profesional

  return (
    <section id="profesional" className="scroll-mt-[calc(var(--alto-header,7rem)_+_1rem)] overflow-hidden bg-superficie py-10 sm:py-14">
      <div className={`${contenedor} grid items-center gap-10 md:grid-cols-[5fr_6fr] md:gap-24`}>
        <p className="text-[13px] font-semibold tracking-[0.14em] text-brand uppercase md:hidden">{etiqueta}</p>

        {/* Foto: sube 24 px; después el arco fino de atrás se corre a su lugar. */}
        <Reveal efecto="subir" className="relative mx-auto w-full max-w-[440px] pt-4 pr-4 md:mx-0">
          <Tilt max={5} className="relative">
            <m.div
              aria-hidden="true"
              initial={{ x: 0, y: 0 }}
              whileInView={{ x: 16, y: -16 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: curva.entrar, delay: 0.15 + 0.52 }}
              className="absolute inset-0 top-4 right-4 rounded-t-[999px] rounded-b-[28px] border-[1.5px] border-arco"
            />
            <img
              src={imagen}
              alt={`${nombre}, ${especialidad}`}
              loading="lazy"
              className="relative aspect-[22/29] w-full rounded-t-[999px] rounded-b-[28px] object-cover object-[68%_30%]"
            />
          </Tilt>
        </Reveal>

        <Reveal efecto="texto" retraso={1}>
          <p className="hidden text-sm font-semibold tracking-[0.14em] text-brand uppercase md:block">{etiqueta}</p>
          <h2 className="font-display text-4xl leading-[1.1] font-bold tracking-[-0.03em] text-texto md:mt-4 md:text-[52px] md:leading-[1.08]">
            {nombre}
          </h2>
          <div className="mt-3 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5">
            <span className="text-lg font-semibold text-brand sm:text-[19px]">{especialidad}</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-borde bg-fondo px-3.5 py-1.5 text-[15px] font-semibold">
              <Icono nombre="escudo" className="h-4 w-4 text-brand" />
              Matrícula {matricula}
            </span>
          </div>
          {frase && (
            <blockquote className="mt-7 flex gap-3 sm:mt-9 sm:gap-4">
              <span aria-hidden="true" className="font-display text-[56px] leading-[0.9] font-extrabold text-brand sm:text-[72px]">
                “
              </span>
              <p className="text-[19px] leading-[1.55] text-slate-800 sm:text-[23px]">{frase}</p>
            </blockquote>
          )}
          {formacion.length > 0 && (
            <ul className="mt-7 space-y-3 sm:mt-9 sm:space-y-3.5">
              {formacion.map((f) => (
                <li key={f} className="flex items-start gap-3 text-base text-texto sm:items-center sm:gap-3.5 sm:text-[17px]">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fondo text-brand sm:h-[34px] sm:w-[34px]">
                    <Icono nombre="birrete" className="h-[18px] w-[18px]" />
                  </span>
                  <span className="pt-1 sm:pt-0">{f}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-8 flex flex-col gap-3 sm:mt-11 sm:flex-row">
            <a {...ctaPrincipal()} className={botonPrimario}>
              {site.hero.cta}
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={`${botonSecundario} border-borde-fuerte`}>
              <Icono nombre="chat" className="h-[18px] w-[18px] text-brand" />
              WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
