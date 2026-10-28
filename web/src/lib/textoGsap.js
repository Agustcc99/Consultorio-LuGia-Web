import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

// SplitText + ScrollTrigger: el título se parte en líneas (con máscara) y las palabras suben una a una
// cuando la sección entra en pantalla. Con "reducir movimiento" no se toca el texto.
export function useTextoGsap(ref) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let split
    const ctx = gsap.context(() => {
      split = SplitText.create(el, {
        type: 'lines,words',
        mask: 'lines',
        autoSplit: true,
        aria: 'auto',
        onSplit: (self) =>
          gsap.from(self.words, {
            yPercent: 115,
            rotate: 4,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.06,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }),
      })
    }, el)
    return () => {
      ctx.revert()
      split?.revert()
    }
  }, [ref])
}
