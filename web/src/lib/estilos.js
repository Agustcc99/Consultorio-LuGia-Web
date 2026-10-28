// Clases compartidas de la dirección A "Aire" (botones, chips, campos). Los colores salen de index.css.

const base =
  'group inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full px-7 text-[17px] font-semibold transition duration-300 ease-resorte hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] active:duration-100 disabled:cursor-not-allowed'

export const botonPrimario = `${base} bg-brand text-sobre-brand hover:bg-brand-oscuro`
export const botonSecundario = `${base} border-[1.5px] border-borde-fuerte bg-fondo text-texto hover:border-brand hover:text-brand-oscuro`
export const botonWhatsapp = `${base} bg-whatsapp font-bold text-sobre-whatsapp hover:brightness-95`

// La flecha de los botones se corre 3 px con el hover.
export const flecha = 'h-5 w-5 transition-transform duration-160 ease-tocar group-hover:translate-x-[3px]'

export const chip = (activo) =>
  `min-h-[52px] rounded-full border-[1.5px] px-5 text-base font-medium transition-colors duration-160 ease-tocar ${
    activo ? 'border-brand bg-brand font-semibold text-sobre-brand' : 'border-borde-fuerte bg-fondo text-texto hover:border-brand'
  }`

export const campo =
  'h-14 w-full rounded-2xl border-[1.5px] border-borde-fuerte bg-fondo px-4 text-[17px] text-texto placeholder:text-suave transition-colors duration-160 focus:border-brand focus:ring-4 focus:ring-brand/15 focus:outline-none'

export const etiquetaCampo = 'flex flex-col gap-1.5 text-[15px] font-semibold text-texto'

// Contenedor de las secciones: mismo ancho y márgenes en toda la página.
export const contenedor = 'mx-auto w-full max-w-6xl px-5 sm:px-8'
