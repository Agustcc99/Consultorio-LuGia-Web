// Ritmo del movimiento (dirección A "Aire"): el movimiento acompaña, no se luce.
// Solo opacidad y desplazamientos cortos, una sola vez, sin rebotes. Las curvas son las mismas que --ease-* en index.css.
// Con "reducir movimiento" del sistema, MotionConfig (main.jsx) deja solo el fundido.

export const curva = {
  entrar: [0.16, 1, 0.3, 1],
  pasar: [0.65, 0, 0.35, 1],
  salir: [0.4, 0, 1, 1],
  tocar: [0.3, 0.7, 0.4, 1],
  respirar: [0.25, 0.6, 0.15, 1],
}

// En segundos (Motion). En Tailwind: duration-160, duration-280…
export const duracion = { tocar: 0.16, pasar: 0.28, entrar: 0.52, foto: 0.9 }

// En px: 12 para textos, 24 para tarjetas y fotos.
export const distancia = { texto: 12, bloque: 24 }

// Entre elementos de un mismo grupo (máximo 4 seguidos; después van juntos).
export const escalonado = 0.06

// Resortes (3D): amortiguados, casi sin rebote. `llegar` para apariciones; `inclinar` para seguir al mouse.
export const resorte = {
  llegar: { type: 'spring', stiffness: 110, damping: 19, mass: 0.9 },
  gesto: { type: 'spring', stiffness: 260, damping: 22, mass: 0.6 },
  inclinar: { stiffness: 140, damping: 18, mass: 0.6 },
}

export const entrar = (retraso = 0) => ({ duration: duracion.entrar, ease: curva.entrar, delay: retraso })

// Variantes para grupos que aparecen en orden (portada, listas).
export const grupo = (retraso = 0) => ({
  visible: { transition: { staggerChildren: escalonado, delayChildren: retraso } },
})
export const item = (y = distancia.texto) => ({
  oculto: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: entrar() },
})
