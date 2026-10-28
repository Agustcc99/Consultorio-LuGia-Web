import { m } from 'motion/react'
import { distancia, resorte } from '../lib/movimiento.js'

// Solo se anima lo que es imagen: fotos en arco, tarjetas y tarjeta del cierre (efecto="subir"): sube 24 px y se endereza
// en 3D (10°) con un resorte amortiguado, una sola vez.
// Títulos, párrafos, tarjetas y formularios quedan quietos (efecto por defecto): el texto no se anima al llegar.
// Con "reducir movimiento" del sistema solo hace el fundido (MotionConfig en main.jsx).
export default function Reveal({ as = 'div', retraso = 0, efecto = 'quieto', className = '', children, ...props }) {
  const Tag = m[as]

  if (efecto !== 'subir') {
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    )
  }

  return (
    <Tag
      initial={{ opacity: 0, y: distancia.bloque, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      style={{ transformPerspective: 900, transformOrigin: '50% 100%' }}
      transition={{ ...resorte.llegar, delay: Math.min(retraso, 3) * 0.06, opacity: { duration: 0.4 } }}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  )
}
