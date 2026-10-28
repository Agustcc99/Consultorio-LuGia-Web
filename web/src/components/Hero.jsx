import { m } from 'motion/react'
import { site } from '../content.js'
import Icono from '../lib/iconos.jsx'
import { botonPrimario, botonSecundario, contenedor, flecha } from '../lib/estilos.js'
import { curva, duracion, grupo, item, resorte } from '../lib/movimiento.js'
import { ctaPrincipal, whatsappUrl } from '../lib/whatsapp.js'
import Tilt from './Tilt.jsx'

// Portada: texto a la izquierda y foto en arco a la derecha (en celular, la foto va debajo del texto).
// Al cargar, una vez: etiqueta → título → texto → botones → datos suben 12 px; la foto pasa de 1.03 a 1.
export default function Hero() {
  const { etiqueta, titulo, subtitulo, cta, imagen } = site.hero
  const datos =
    site.hero.datos ??
    [
      site.contacto.horarios && { label: 'Horarios', valor: site.contacto.horarios },
      site.contacto.direccion && { label: 'Dónde', valor: site.contacto.direccion },
    ].filter(Boolean)
  const { profesional } = site

  // Las dos últimas palabras del título van en color de marca ("buenas manos.").
  const palabras = titulo.split(' ')
  const corte = palabras.length > 3 ? palabras.length - 2 : palabras.length - 1
  const inicio = palabras.slice(0, corte).join(' ')
  const final = palabras.slice(corte).join(' ')

  return (
    // --alto-header lo mide Navbar.
    <section className="pt-[calc(var(--alto-header,8rem)_+_1.5rem)] pb-8 md:pt-[calc(var(--alto-header,8rem)_+_2.5rem)] md:pb-14">
      <div className={`${contenedor} grid items-center gap-x-16 md:grid-cols-2 md:grid-rows-[auto_auto]`}>
        <m.div variants={grupo()} initial="oculto" animate="visible" className="flex flex-col md:self-end">
          {etiqueta && (
            <m.p
              variants={item()}
              className="inline-flex items-center gap-2.5 self-start rounded-full bg-tinte px-4 py-2 text-sm leading-snug font-semibold text-brand sm:text-[15px]"
            >
              <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-brand" />
              {etiqueta}
            </m.p>
          )}
          <m.h1
            variants={item()}
            className="mt-6 font-display text-[44px] leading-[1.06] font-bold tracking-[-0.035em] text-balance sm:text-6xl lg:mt-7 lg:text-[70px] lg:leading-[1.04]"
          >
            {inicio} <span className="text-brand">{final}</span>
          </m.h1>
          <m.p variants={item()} className="mt-5 max-w-[520px] text-lg leading-relaxed text-suave sm:text-xl lg:mt-7">
            {subtitulo}
          </m.p>
          <m.div variants={item()} className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-10">
            <a {...ctaPrincipal()} data-brillo className={`${botonPrimario} min-h-[58px] px-8 text-lg`}>
              {cta}
              <Icono nombre="flecha" className={flecha} />
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={`${botonSecundario} min-h-[58px] text-lg`}>
              <Icono nombre="chat" className="h-5 w-5 text-brand" />
              WhatsApp
            </a>
          </m.div>
        </m.div>

        <Tilt max={5} className="relative mt-10 h-[430px] sm:h-[560px] md:row-span-2 md:mt-0 md:h-[640px]">
          <div aria-hidden="true" className="absolute top-8 -right-5 h-[260px] w-[260px] rounded-full bg-superficie sm:h-[360px] sm:w-[360px] md:top-10 md:-right-6 md:h-[440px] md:w-[440px] md:[transform:translateZ(-40px)]" />
          <m.img
            src={imagen}
            alt="Consultorio odontológico luminoso"
            fetchpriority="high"
            initial={{ scale: 1.03 }}
            animate={{ scale: 1 }}
            transition={{ duration: duracion.foto, ease: curva.respirar }}
            className="absolute top-0 right-0 left-4 h-[410px] w-[calc(100%_-_1rem)] rounded-t-[999px] rounded-b-[28px] object-cover object-[55%_60%] sm:h-[540px] md:left-auto md:h-[620px] md:w-[min(calc(100%_-_2.25rem),500px)]"
          />
          {profesional && (
            <div className="absolute bottom-0 left-0 [transform:translateZ(60px)]">
              <m.div
                initial={{ opacity: 0, y: 12, rotateX: 18 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                style={{ transformPerspective: 700 }}
                transition={{ ...resorte.llegar, delay: 0.45, opacity: { duration: 0.4, delay: 0.45 } }}
                className="flex items-center gap-3.5 rounded-[22px] bg-fondo py-3 pr-5 pl-3 shadow-[0_24px_48px_-16px_rgba(15,23,42,0.22)] sm:py-4 sm:pr-6 sm:pl-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-tinte text-brand sm:h-11 sm:w-11">
                  <Icono nombre="escudo" className="h-5 w-5" />
                </span>
                <span className="flex flex-col leading-snug">
                  <span className="text-[15px] font-semibold sm:text-base">{profesional.nombre}</span>
                  <span className="text-sm text-suave">Matrícula {profesional.matricula}</span>
                </span>
              </m.div>
            </div>
          )}
        </Tilt>

        {datos.length > 0 && (
          <m.dl
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duracion.entrar, ease: curva.entrar, delay: 0.4 }}
            className="mt-8 flex flex-col md:mt-14 md:grid md:grid-cols-3 md:gap-6 md:self-start md:border-t md:border-linea md:pt-6"
          >
            {datos.map((d) => (
              <div
                key={d.label}
                className="flex justify-between gap-4 border-t border-linea py-3.5 last:border-b md:flex-col md:justify-start md:gap-1 md:border-0 md:py-0 md:last:border-0"
              >
                <dt className="text-[13px] font-semibold tracking-[0.08em] text-slate-500 uppercase">{d.label}</dt>
                <dd className="text-right text-base font-semibold md:text-left md:text-[17px]">{d.valor}</dd>
              </div>
            ))}
          </m.dl>
        )}
      </div>
    </section>
  )
}
