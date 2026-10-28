import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Lunares de fondo: círculos de la gama fucsia / rosa / vino repartidos por toda la página, detrás del contenido, en racimos
// pegados a los costados. Tipos: llenos, aros con un lunar al medio, chicos sueltos y tres patrones (empaque de círculos, radial y concentrico).
// Con GSAP se mecen apenas de costado y se corren a distinta velocidad al scrollear (paralaje). Quietos con "reducir movimiento".
const colores = ['#e0307a', '#ff6fa5', '#c2185b', '#7a1f3d', '#f4a9c0', '#ff8fb8']
const tipos = ['empaque', 'lleno', 'radial', 'chico', 'concentrico', 'aro', 'lleno', 'radial', 'empaque', 'chico', 'concentrico', 'lleno']
const azar = (n) => {
  const x = Math.sin(n * 91.7) * 10000
  return x - Math.floor(x)
}
const lunares = Array.from({ length: 44 }, (_, i) => {
  const tipo = tipos[i % tipos.length]
  const tam = tipo === 'chico' ? 22 + azar(i) * 22 : 70 + azar(i + 3) * 120
  return {
    top: 1.5 + i * 2.2 + azar(i + 7) * 1.2,
    lado: i % 2 ? 'left' : 'right',
    borde: -tam * (0.15 + azar(i + 11) * 0.55) + (i % 4 === 3 ? 150 : 0),
    tam,
    color: colores[Math.floor(azar(i + 5) * colores.length)],
    tipo,
  }
})

// Patrones de las imágenes de referencia, dibujados en SVG (cuadro de 100 × 100) con el color de cada lunar:
//  · empaque: círculos de muchos tamaños que se acomodan sin pisarse, dentro de un círculo.
//  · radial: lunares en rayos que crecen hacia afuera desde el centro.
//  · concentrico: aros uno dentro del otro.
const empaque = (() => {
  const c = []
  const radios = [11, 9, 7.5, 6, 5, 4, 3, 2.4, 1.8, 1.3, 1]
  let n = 0
  for (const r of radios) {
    const intentos = r > 6 ? 60 : 140
    const cuantos = r > 6 ? 5 : r > 3 ? 9 : 14
    let puestos = 0
    for (let t = 0; t < intentos && puestos < cuantos; t++) {
      n++
      const ang = azar(n) * Math.PI * 2
      const dist = Math.sqrt(azar(n + 500)) * (49 - r)
      const x = 50 + Math.cos(ang) * dist
      const y = 50 + Math.sin(ang) * dist
      if (c.every((o) => Math.hypot(o.x - x, o.y - y) > o.r + r + 0.9)) {
        c.push({ x, y, r })
        puestos++
      }
    }
  }
  return c
})()

const radial = (() => {
  const c = []
  const rayos = 22
  for (let anillo = 1; anillo <= 8; anillo++)
    for (let k = 0; k < rayos; k++) {
      const ang = (k / rayos) * Math.PI * 2 + (anillo % 2 ? 0 : Math.PI / rayos)
      const dist = anillo * 5.6
      c.push({ x: 50 + Math.cos(ang) * dist, y: 50 + Math.sin(ang) * dist, r: 0.45 + anillo * 0.24 })
    }
  return c
})()

const concentrico = Array.from({ length: 9 }, (_, i) => 6 + i * 5.3)

const Patron = ({ tipo, color }) => (
  <svg viewBox="0 0 100 100" className="h-full w-full" fill={tipo === 'concentrico' ? 'none' : color} stroke={tipo === 'concentrico' ? color : 'none'} strokeWidth="1.6">
    {tipo === 'empaque' && empaque.map((o, i) => <circle key={i} cx={o.x} cy={o.y} r={o.r} />)}
    {tipo === 'radial' && radial.map((o, i) => <circle key={i} cx={o.x} cy={o.y} r={o.r} />)}
    {tipo === 'concentrico' && concentrico.map((r) => <circle key={r} cx="50" cy="50" r={r} />)}
  </svg>
)

const estilo = (l) => {
  const base = { top: `${l.top}%`, [l.lado]: l.borde, width: l.tam, height: l.tam }
  if (l.tipo === 'lleno' || l.tipo === 'chico') return { ...base, background: l.color, opacity: l.tipo === 'chico' ? 0.85 : 0.42 }
  if (l.tipo === 'aro')
    return { ...base, border: `4px solid ${l.color}`, opacity: 0.85, background: `radial-gradient(circle, ${l.color} 0 ${Math.max(7, l.tam * 0.11)}px, transparent ${Math.max(8, l.tam * 0.11 + 1)}px)` }
  return { ...base, opacity: 0.8 }
}

export default function Lunares() {
  const raiz = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-lunar]').forEach((el, i) => {
        gsap.to(el, { x: (i % 2 ? 1 : -1) * (6 + (i % 4) * 3), duration: 4 + (i % 5), ease: 'sine.inOut', repeat: -1, yoyo: true })
        gsap.to(el, {
          y: (i % 2 ? -1 : 1) * (40 + (i % 5) * 25),
          ease: 'none',
          scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.8 },
        })
      })
    }, raiz)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={raiz} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {lunares.map((l, i) => (
        <span key={i} data-lunar className="absolute rounded-full" style={estilo(l)}>
          {['empaque', 'radial', 'concentrico'].includes(l.tipo) && <Patron tipo={l.tipo} color={l.color} />}
        </span>
      ))}
    </div>
  )
}
