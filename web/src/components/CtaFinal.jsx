import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { site } from '../content.js'
import Icono from '../lib/iconos.jsx'
import { contenedor, flecha } from '../lib/estilos.js'
import { whatsappUrl } from '../lib/whatsapp.js'
import Reveal from './Reveal.jsx'

// Cierre con foto: el único bloque lleno de verde agua de la página (bloque de diseño, no cuenta como sección).
export default function CtaFinal() {
  const { titulo, texto, boton, imagen } = site.ctaFinal

  // Único parallax de la página: la foto se corre hasta 16 px dentro de su marco. Quieto con "reducir movimiento".
  const ref = useRef(null)
  const quieto = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yFoto = useTransform(scrollYProgress, [0, 1], quieto ? ['0px', '0px'] : ['8px', '-8px'])

  return (
    <section ref={ref} className="bg-fondo pb-10 sm:pb-14">
      <div className="mx-auto w-full max-w-6xl px-3 sm:px-8">
        <Reveal efecto="subir" className="grid overflow-hidden rounded-[32px] bg-brand text-sobre-brand md:min-h-[480px] md:grid-cols-[6fr_5fr] md:rounded-[40px]">
          <div className="order-2 flex flex-col justify-center px-[22px] pt-8 pb-7 md:order-none md:px-16 md:py-[72px]">
            <h2 className="font-display text-[32px] leading-[1.12] font-bold tracking-[-0.03em] text-balance md:text-[50px] md:leading-[1.08]">{titulo}</h2>
            <p className="mt-3.5 max-w-[460px] text-[17px] leading-relaxed text-white/90 md:mt-5 md:text-[19px]">{texto}</p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex min-h-[58px] items-center justify-center gap-3 self-stretch rounded-full bg-fondo px-8 text-[17px] font-semibold text-brand transition duration-160 ease-tocar hover:bg-tinte active:scale-[0.98] md:mt-9 md:self-start md:min-h-[60px] md:text-lg"
            >
              {boton}
              <Icono nombre="flecha" className={flecha} />
            </a>
          </div>
          {imagen && (
            <div className="relative order-1 h-60 overflow-hidden rounded-bl-[140px] md:order-none md:h-auto md:rounded-bl-none md:rounded-tl-[240px]">
              <m.img
                src={imagen}
                alt=""
                loading="lazy"
                style={{ y: yFoto }}
                className="absolute inset-x-0 -top-2 h-[calc(100%_+_16px)] w-full object-cover object-[66%_35%]"
              />
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
