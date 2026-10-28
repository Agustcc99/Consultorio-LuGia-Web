import { useRef } from 'react'
import { useTextoGsap } from '../lib/textoGsap.js'

// Encabezado de sección: etiqueta chica en color de marca + título grande (se parte en palabras al scrollear, GSAP SplitText).
export default function Titulo({ etiqueta, centrado = false, children }) {
  const h2 = useRef(null)
  useTextoGsap(h2)
  return (
    <div className={centrado ? 'text-center' : ''}>
      {etiqueta && <p className="text-[13px] font-semibold tracking-[0.14em] text-brand uppercase sm:text-sm">{etiqueta}</p>}
      <h2 ref={h2} className="mt-3 font-display text-[32px] leading-[1.12] font-bold tracking-[-0.03em] text-balance text-texto sm:mt-4 sm:text-5xl sm:leading-[1.1]">
        {children}
      </h2>
    </div>
  )
}
