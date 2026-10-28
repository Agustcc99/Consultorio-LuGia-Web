import { site } from '../content.js'
import Icono from '../lib/iconos.jsx'
import { contenedor, flecha } from '../lib/estilos.js'
import { whatsappUrl } from '../lib/whatsapp.js'
import Reveal from './Reveal.jsx'
import Tilt from './Tilt.jsx'
import Titulo from './Titulo.jsx'

// Tarjetas que se enderezan en 3D de a una fila; al pasar el mouse se inclinan hacia el puntero (el ícono flota) y el borde pasa a verde agua.
const hover = 'transition-colors duration-160 ease-tocar hover:border-brand hover:shadow-[0_22px_40px_-24px_rgba(122,31,61,0.35)]'

// estilo 'lista': carta con línea punteada hasta el precio. estilo 'tarjetas': grilla de tarjetas con ícono.
export default function Servicios() {
  const { etiqueta, titulo, estilo = 'tarjetas', items } = site.servicios

  return (
    <section id="servicios" className="scroll-mt-[calc(var(--alto-header,7rem)_+_1rem)] bg-fondo py-10 sm:py-14">
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
          <div className="mt-8 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {items.map((s, i) => {
              const urgencia = s.icono === 'alerta'
              return (
                <Reveal key={s.titulo} efecto="subir" retraso={i % 4} className="h-full">
                  <Tilt
                    as="article"
                    max={5}
                    gestos
                    tabIndex={0}
                    className={`flex h-full cursor-default outline-none focus-visible:ring-4 focus-visible:ring-brand/20 gap-4 rounded-[22px] border p-[18px] sm:flex-col sm:gap-0 sm:rounded-[28px] sm:p-7 ${hover} ${
                      urgencia ? 'border-alerta-borde bg-alerta-fondo' : 'border-borde bg-fondo'
                    }`}
                  >
                    <span
                      className={`flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full sm:h-[52px] sm:w-[52px] sm:[transform:translateZ(28px)] ${
                        urgencia ? 'bg-alerta-borde text-alerta' : 'bg-tinte text-brand'
                      }`}
                    >
                      <Icono nombre={s.icono} className="h-6 w-6 sm:h-[26px] sm:w-[26px]" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg leading-snug font-bold text-texto sm:mt-5 sm:text-xl">{s.titulo}</h3>
                      <p className={`mt-1 text-base leading-normal sm:mt-2 ${urgencia ? 'text-stone-600' : 'text-suave'}`}>{s.descripcion}</p>
                      {s.precio && <p className="mt-4 font-display text-xl font-bold text-brand">{s.precio}</p>}
                    </div>
                  </Tilt>
                </Reveal>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
