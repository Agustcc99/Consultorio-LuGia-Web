import { site } from '../content.js'
import Icono from '../lib/iconos.jsx'
import { contenedor, flecha } from '../lib/estilos.js'
import { whatsappUrl } from '../lib/whatsapp.js'
import Reveal from './Reveal.jsx'
import Titulo from './Titulo.jsx'

// Acordeón: la respuesta se destapa con clip-path y fundido (index.css) y el "+" pasa a "−" con el círculo lleno, sin girar.
export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-[calc(var(--alto-header,7rem)_+_1rem)] bg-transparent py-10 sm:py-14">
      <div className={`${contenedor} grid items-start gap-6 md:grid-cols-[4fr_7fr] md:gap-20`}>
        <Reveal efecto="texto">
          <Titulo etiqueta="Dudas">Preguntas frecuentes</Titulo>
          <p className="mt-4 hidden text-lg text-suave md:block">¿No encontrás tu duda? Escribinos y te respondemos en el horario de atención.</p>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 hidden items-center gap-2 text-[17px] font-semibold text-brand hover:text-brand-oscuro md:inline-flex"
          >
            Escribinos por WhatsApp
            <Icono nombre="flecha" className={flecha} />
          </a>
        </Reveal>
        <Reveal efecto="texto" retraso={1} className="border-t border-linea">
          {site.faq.map((f, i) => (
            <details key={f.pregunta} open={i === 0} className="group border-b border-linea">
              <summary className="flex min-h-[68px] cursor-pointer list-none items-center justify-between gap-4 py-2.5 font-display text-lg leading-snug font-bold text-texto sm:min-h-[76px] sm:gap-5 sm:text-xl [&::-webkit-details-marker]:hidden">
                {f.pregunta}
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-borde-fuerte text-brand transition-colors duration-280 ease-pasar group-open:border-brand group-open:bg-brand group-open:text-sobre-brand sm:h-10 sm:w-10">
                  <Icono nombre="mas" className="h-[18px] w-[18px] group-open:hidden" />
                  <Icono nombre="menos" className="hidden h-[18px] w-[18px] group-open:block" />
                </span>
              </summary>
              <p className="respuesta pb-5 text-base leading-relaxed text-suave sm:pr-16 sm:pb-6 sm:text-[17px]">{f.respuesta}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
