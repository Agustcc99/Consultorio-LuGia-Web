import { m, useScroll } from 'motion/react'

// Barra fina arriba de todo que se llena a medida que se baja por la página (sigue al scroll, sin resorte).
export default function ProgresoScroll() {
  const { scrollYProgress } = useScroll()

  return <m.div aria-hidden="true" style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-brand" />
}
