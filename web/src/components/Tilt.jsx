import { useEffect, useRef, useState } from 'react'
import { m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { resorte } from '../lib/movimiento.js'

// Inclinación 3D con resorte que sigue al mouse (máx. `max` grados). Solo con mouse: en celular y con
// "reducir movimiento" queda quieto. Los hijos pueden separarse en profundidad con [transform:translateZ(..)].
export default function Tilt({ as = 'div', max = 6, gestos = false, className = '', children, ...props }) {
  const Tag = m[as]
  const reducir = useReducedMotion()
  const ref = useRef(null)
  const [conMouse, setConMouse] = useState(false)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const x = useSpring(px, resorte.inclinar)
  const y = useSpring(py, resorte.inclinar)
  const rotateY = useTransform(x, [-0.5, 0.5], [-max, max])
  const rotateX = useTransform(y, [-0.5, 0.5], [max, -max])

  useEffect(() => {
    setConMouse(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  const activo = conMouse && !reducir

  // Celular (sin mouse): la inclinación sigue al scroll; la pieza se acomoda mientras cruza la pantalla.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const sx = useSpring(scrollYProgress, resorte.inclinar)
  const scrollX = useTransform(sx, [0, 0.5, 1], [max * 0.9, 0, -max * 0.9])
  const scrollY = useTransform(sx, [0, 0.5, 1], [-max * 0.7, 0, max * 0.7])
  const porScroll = !conMouse && !reducir

  const mover = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const soltar = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <Tag
      ref={ref}
      onPointerMove={activo ? mover : undefined}
      onPointerLeave={activo ? soltar : undefined}
      // gestos (tarjetas): crece un poco con el mouse encima, se hunde al tocar o hacer clic, y se marca al enfocar con teclado.
      whileHover={gestos && activo ? { scale: 1.025, transition: resorte.gesto } : undefined}
      whileTap={gestos ? { scale: 0.97, transition: resorte.gesto } : undefined}
      whileFocus={gestos ? { scale: 1.015, transition: resorte.gesto } : undefined}
      style={activo ? { rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' } : porScroll ? { rotateX: scrollX, rotateY: scrollY, transformPerspective: 900, transformStyle: 'preserve-3d' } : undefined}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  )
}
