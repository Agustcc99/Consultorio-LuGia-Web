import { useState } from 'react'
import { site, tieneFormulario } from '../content.js'
import Icono from '../lib/iconos.jsx'
import { botonPrimario, contenedor, flecha } from '../lib/estilos.js'
import { whatsappUrl } from '../lib/whatsapp.js'
import ContactForm from './ContactForm.jsx'
import Reveal from './Reveal.jsx'
import Titulo from './Titulo.jsx'

export default function Contacto() {
  const { etiqueta, titulo, texto, telefono, email, direccion, horarios, mapa } = site.contacto
  const { pagos } = site
  const [mapaListo, setMapaListo] = useState(false)
  // mapa: dirección o lugar para el mapa embebido y el link "Cómo llegar" (Plan Profesional en adelante)
  const mapsUrl = site.contacto.mapsUrl ?? (mapa && `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapa)}`)
  const datos = [
    telefono && { label: 'Teléfono', valor: telefono, href: `tel:${telefono}` },
    email && { label: 'Email', valor: email, href: `mailto:${email}` },
    direccion && { label: 'Dirección', valor: direccion, href: mapsUrl },
    horarios && { label: 'Horarios', valor: horarios },
  ].filter(Boolean)

  return (
    <section id="contacto" className="scroll-mt-[calc(var(--alto-header,7rem)_+_1rem)] bg-superficie py-10 sm:py-14">
      <div className={`${contenedor} grid items-start gap-6 md:grid-cols-2 md:gap-16`}>
        <Reveal efecto="texto">
          <Titulo etiqueta={etiqueta}>{titulo}</Titulo>
          <p className="mt-3.5 text-[17px] text-suave sm:mt-5 sm:text-lg">{texto}</p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={botonPrimario}>
              <Icono nombre="chat" className="h-5 w-5" />
              Escribinos por WhatsApp
            </a>
          </div>
          {datos.length > 0 && (
            <dl className="mt-7 border-t border-borde sm:mt-10">
              {datos.map((d) => (
                <div key={d.label} className="border-b border-borde py-3.5 sm:grid sm:grid-cols-[140px_1fr] sm:gap-4 sm:py-4">
                  <dt className="text-xs font-semibold tracking-[0.1em] text-stone-600 uppercase sm:pt-[3px] sm:text-[13px]">{d.label}</dt>
                  <dd className="mt-0.5 text-[17px] font-medium [overflow-wrap:anywhere] text-texto sm:mt-0">
                    {d.href ? (
                      <a href={d.href} target={d.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="hover:text-brand">
                        {d.valor}
                      </a>
                    ) : (
                      d.valor
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </Reveal>

        <div className="flex flex-col gap-4 sm:gap-5">
          {mapa && (
            <Reveal retraso={1} className="overflow-hidden rounded-[22px] border border-borde bg-fondo sm:rounded-[28px]">
              {/* Hasta que carga se ve el fondo gris; después el mapa entra con un fundido. */}
              <div className="h-[180px] bg-superficie sm:h-[260px]">
                <iframe
                  title={`Mapa de ${site.nombre}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(mapa)}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() => setMapaListo(true)}
                  className={`block h-full w-full grayscale transition-opacity duration-280 ease-pasar ${mapaListo ? 'opacity-100' : 'opacity-0'}`}
                />
              </div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between px-[18px] py-4 text-[17px] font-semibold text-texto transition-colors duration-160 hover:text-brand sm:px-[22px] sm:py-[18px]"
              >
                Cómo llegar <Icono nombre="flecha" className={`${flecha} text-brand`} />
              </a>
            </Reveal>
          )}
          {pagos?.lista.length > 0 && (
            <Reveal retraso={2} className="rounded-[22px] border border-borde bg-fondo px-[18px] py-[22px] sm:rounded-[28px] sm:p-7">
              <p className="font-display text-lg font-bold text-texto sm:text-[19px]">{pagos.titulo}</p>
              <ul className="mt-3.5 flex flex-wrap gap-2 sm:mt-4">
                {pagos.lista.map((o) => (
                  <li
                    key={o}
                    className="rounded-full bg-tinte px-3.5 py-[7px] text-[15px] font-semibold text-brand-oscuro sm:px-4 sm:py-2"
                  >
                    {o}
                  </li>
                ))}
              </ul>
              {pagos.nota && <p className="mt-3 text-sm leading-normal text-suave sm:mt-3.5 sm:text-[15px]">{pagos.nota}</p>}
            </Reveal>
          )}
          {tieneFormulario && (
            <Reveal retraso={3}>
              <ContactForm />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
