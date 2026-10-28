import gsap from 'gsap'

// Botones con GSAP (todo el sitio, por delegación de eventos):
//  · .btn-gsap  → imán que sigue al cursor (el contenido se mueve un poco más), relleno que nace desde donde entra el mouse
//                 y se retira por donde sale, y apretón con regreso elástico.
//  · .chip-gsap → solo el apretón elástico (opciones del pedido de turno).
//  · [data-brillo] → destello que cruza el botón cada tanto.
// Con "reducir movimiento" del sistema no se activa nada. En pantallas táctiles queda solo el apretón.
const reducir = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const conMouse = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

export function iniciarBotones() {
  if (reducir()) return

  const rellenos = new WeakMap()
  const destellos = new Map()

  const objetivo = (e) => e.target.closest?.('.btn-gsap, .chip-gsap')
  const inactivo = (b) => b.matches('[aria-disabled="true"], :disabled')
  const contenido = (b) => [...b.children].filter((c) => !c.dataset.gsapExtra)

  function relleno(b) {
    let r = rellenos.get(b)
    if (!r) {
      r = document.createElement('span')
      r.dataset.gsapExtra = '1'
      r.setAttribute('aria-hidden', 'true')
      r.className = 'pointer-events-none absolute top-0 left-0 -z-10 rounded-full bg-current'
      gsap.set(r, { scale: 0, opacity: 0 })
      b.appendChild(r)
      rellenos.set(b, r)
    }
    return r
  }

  document.addEventListener('pointerover', (e) => {
    const b = objetivo(e)
    if (!b || !b.classList.contains('btn-gsap') || b.contains(e.relatedTarget) || e.pointerType === 'touch' || inactivo(b)) return
    const r = b.getBoundingClientRect()
    const d = Math.hypot(r.width, r.height) * 2
    gsap.set(relleno(b), { width: d, height: d, x: e.clientX - r.left, y: e.clientY - r.top, xPercent: -50, yPercent: -50, scale: 0, opacity: 0.14 })
    gsap.to(relleno(b), { scale: 1, duration: 0.6, ease: 'power3.out', overwrite: true })
  })

  document.addEventListener('pointermove', (e) => {
    const b = objetivo(e)
    if (!b || !b.classList.contains('btn-gsap') || e.pointerType === 'touch' || !conMouse() || inactivo(b)) return
    const r = b.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    gsap.to(b, { x: dx * 0.2, y: dy * 0.3, duration: 0.45, ease: 'power3.out', overwrite: 'auto' })
    gsap.to(contenido(b), { x: dx * 0.08, y: dy * 0.12, duration: 0.45, ease: 'power3.out', overwrite: 'auto' })
  })

  document.addEventListener('pointerout', (e) => {
    const b = objetivo(e)
    if (!b || b.contains(e.relatedTarget)) return
    if (b.classList.contains('btn-gsap')) {
      const r = b.getBoundingClientRect()
      const sale = rellenos.get(b)
      if (sale) gsap.to(sale, { x: e.clientX - r.left, y: e.clientY - r.top, scale: 0, duration: 0.45, ease: 'power3.in', overwrite: true })
      gsap.to(b, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.35)', overwrite: 'auto' })
      gsap.to(contenido(b), { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.35)', overwrite: 'auto' })
    }
  })

  document.addEventListener('pointerdown', (e) => {
    const b = objetivo(e)
    if (!b || inactivo(b)) return
    gsap.to(b, { scale: 0.94, duration: 0.12, ease: 'power2.out', overwrite: 'auto' })
    const soltar = () => {
      gsap.to(b, { scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' })
      removeEventListener('pointerup', soltar)
      removeEventListener('pointercancel', soltar)
    }
    addEventListener('pointerup', soltar)
    addEventListener('pointercancel', soltar)
  })

  // Destello: una franja clara inclinada que cruza el botón cada ~4 s.
  function sincronizarDestellos() {
    document.querySelectorAll('[data-brillo]').forEach((b) => {
      if (destellos.has(b)) return
      const s = document.createElement('span')
      s.dataset.gsapExtra = '1'
      s.setAttribute('aria-hidden', 'true')
      s.className = 'pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent'
      b.appendChild(s)
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 3.6, delay: 1.5 })
      tl.fromTo(s, { xPercent: -160, skewX: -20 }, { xPercent: 460, skewX: -20, duration: 0.9, ease: 'power2.inOut' })
      destellos.set(b, { s, tl })
    })
    destellos.forEach(({ s, tl }, b) => {
      if (!b.isConnected || !b.hasAttribute('data-brillo')) {
        tl.kill()
        s.remove()
        destellos.delete(b)
      }
    })
  }
  let pendiente = false
  new MutationObserver(() => {
    if (pendiente) return
    pendiente = true
    requestAnimationFrame(() => {
      pendiente = false
      sincronizarDestellos()
    })
  }).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['data-brillo'] })
  sincronizarDestellos()
}
