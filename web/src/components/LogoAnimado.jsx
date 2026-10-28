import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

gsap.registerPlugin(DrawSVGPlugin)

// Logo del diente: al cargar, el contorno se dibuja trazo a trazo (DrawSVG) y después el logo real aparece por encima.
// Los trazos están calcados del PNG (mismo recorte cuadrado que logo-centrado.png). Con "reducir movimiento" se muestra el logo directo.
const trazos = [
  { d: 'M245 378C215 378 205 330 197 262C190 205 152 170 152 118C152 70 185 35 235 36C275 37 295 65 320 80C345 90 375 50 410 38C450 30 475 70 465 115C452 165 390 195 345 218C305 240 290 270 280 320C272 365 265 378 245 378Z', color: '#7a1f3d', ancho: 16 },
  { d: 'M306 52C345 50 385 70 408 88C370 92 330 80 306 52Z', color: '#7a1f3d', ancho: 12 },
  { d: 'M250 68C215 65 188 100 182 150', color: '#b98a2e', ancho: 16 },
  { d: 'M322 265C345 270 352 320 362 355C375 395 410 380 420 330C425 280 430 230 468 158', color: '#b98a2e', ancho: 16 },
]

export default function LogoAnimado({ src, className = '' }) {
  const raiz = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const img = raiz.current.querySelector('img')
      const svg = raiz.current.querySelector('svg')
      gsap.set(img, { opacity: 0 })
      gsap.set(svg, { opacity: 1 })
      gsap
        .timeline({ delay: 0.2 })
        .fromTo('path', { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.1, ease: 'power2.inOut', stagger: 0.25 })
        .to(img, { opacity: 1, duration: 0.5, ease: 'power1.out' }, '-=0.1')
        .to(svg, { opacity: 0, duration: 0.5, ease: 'power1.out' }, '<')
    }, raiz)
    return () => ctx.revert()
  }, [])

  return (
    <span ref={raiz} className={`relative inline-block shrink-0 ${className}`}>
      <img src={src} alt="" className="block h-full w-full" />
      <svg viewBox="108 6 400 400" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-0" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {trazos.map((t) => (
          <path key={t.d} d={t.d} stroke={t.color} strokeWidth={t.ancho} />
        ))}
      </svg>
    </span>
  )
}
