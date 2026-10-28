import { site } from '../content.js'
import Icono from '../lib/iconos.jsx'
import { contenedor } from '../lib/estilos.js'
import Reveal from './Reveal.jsx'
import Titulo from './Titulo.jsx'

// Reseñas reales de Google (Profesional en adelante). En la demo no se inventa ninguna:
// se muestran tarjetas vacías que explican qué va ahí.
function Estrellas() {
  return (
    <span className="flex gap-0.5 text-amber-600" aria-label="5 estrellas">
      {[0, 1, 2, 3, 4].map((i) => (
        <Icono key={i} nombre="estrella" className="h-4 w-4 fill-current" />
      ))}
    </span>
  )
}

export default function Resenas() {
  const { etiqueta, titulo, items } = site.resenas
  const deEjemplo = items.length === 0

  if (deEjemplo && !site.demo) return null

  // Alterna con la sección anterior: después de los turnos online (blanco) va arena.
  const arena = Boolean(site.reservas)
  const tarjeta = arena ? 'bg-fondo' : 'bg-superficie'
  const relleno = arena ? 'bg-superficie' : 'bg-borde'

  return (
    <section id="resenas" className={`scroll-mt-[calc(var(--alto-header,7rem)_+_1rem)] py-10 sm:py-14 ${arena ? 'bg-superficie' : 'bg-fondo'}`}>
      <div className={contenedor}>
        <Reveal efecto="texto">
          <Titulo etiqueta={etiqueta} centrado>
            {titulo}
          </Titulo>
        </Reveal>

        {/* Tarjetas y aviso aparecen juntos, como un solo bloque. Sin carrusel automático. */}
        <Reveal efecto="texto" className="relative mt-8 sm:mt-14">
          <div className={`grid gap-3 sm:gap-5 md:grid-cols-3 ${deEjemplo ? 'select-none' : ''}`} aria-hidden={deEjemplo || undefined}>
            {(deEjemplo ? [1, 2, 3] : items).map((r, i) => (
              <article
                key={deEjemplo ? i : r.autor}
                className={`rounded-[22px] p-[22px] sm:rounded-[28px] sm:p-7 ${tarjeta} ${deEjemplo && i === 2 ? 'hidden md:block' : ''}`}
              >
                {deEjemplo ? (
                  <div className="flex flex-col gap-3">
                    <span className="flex items-center gap-3">
                      <span className={`h-11 w-11 rounded-full ${relleno}`} />
                      <span className={`h-3 w-28 rounded-full ${relleno}`} />
                    </span>
                    <span className={`mt-2 block h-2.5 rounded-full ${relleno}`} />
                    <span className={`block h-2.5 w-11/12 rounded-full ${relleno}`} />
                    <span className={`block h-2.5 w-3/5 rounded-full ${relleno}`} />
                  </div>
                ) : (
                  <>
                    <Estrellas />
                    <p className="mt-4 leading-relaxed text-texto">“{r.texto}”</p>
                    <p className="mt-4 text-sm font-semibold text-suave">{r.autor} · Google</p>
                  </>
                )}
              </article>
            ))}
          </div>

          {deEjemplo && (
            <div className="absolute inset-0 flex items-center justify-center px-3">
              <p className="max-w-[460px] rounded-[20px] border border-borde bg-fondo px-5 py-5 text-center text-[15px] leading-normal text-suave shadow-[0_24px_48px_-20px_rgba(15,23,42,0.22)] sm:rounded-3xl sm:px-7 sm:py-6 sm:text-base">
                <strong className="block font-display text-[17px] text-texto sm:text-[19px]">Acá van tus reseñas reales de Google</strong>
                <span className="mt-1.5 block">Las de tus pacientes, con su permiso. En el plan Profesional te damos el cartel con QR y el mensaje para pedirlas.</span>
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
