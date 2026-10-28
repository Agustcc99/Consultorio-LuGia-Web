// Íconos de línea (trazo 1.8, 24×24) para tratamientos y datos de contacto. Se eligen por nombre desde content.js.
const DIENTE =
  'M8 3.5c-2.5 0-4 2-4 4.4 0 2 .8 3.4 1.3 5.2.5 1.9.6 4.3 1.2 6.3.4 1.3 1.9 1.4 2.3 0 .5-1.7.8-4 2.2-4s1.7 2.3 2.2 4c.4 1.4 1.9 1.3 2.3 0 .6-2 .7-4.4 1.2-6.3.5-1.8 1.3-3.2 1.3-5.2 0-2.4-1.5-4.4-4-4.4-1.6 0-2.6.8-4 .8s-2.4-.8-4-.8z'

const TRAZOS = {
  diente: [DIENTE],
  raiz: [DIENTE, 'M12 8.5v5'],
  escudo: ['M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z', 'M9 12l2 2 4-4'],
  herramienta: [
    'M14.7 6.3a4 4 0 0 0-5.4 5.4L3.5 17.5a1.8 1.8 0 0 0 2.5 2.5l5.8-5.8a4 4 0 0 0 5.4-5.4l-2.4 2.4-2.2-.4-.4-2.2 2.5-2.3z',
  ],
  corona: ['M4 19h16', 'M5 16 4 7l4.5 3.5L12 5l3.5 5.5L20 7l-1 9H5z'],
  nino: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'M8.5 14a4 4 0 0 0 7 0', 'M9 9.5h.01', 'M15 9.5h.01'],
  brillo: ['M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z', 'M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z'],
  alerta: ['M12 3.5 21.5 20h-19L12 3.5z', 'M12 10v4.5', 'M12 17.5h.01'],
  telefono: [
    'M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5l1.5-2 4 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  ],
  calendario: ['M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v12a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-12z', 'M4 10h16', 'M8 3v4', 'M16 3v4'],
  birrete: ['M2 9l10-5 10 5-10 5L2 9z', 'M6 11v5c3 2 9 2 12 0v-5', 'M22 9v5'],
  check: ['M5 12.5l4.5 4.5L19 7.5'],
  estrella: ['M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8L12 3.5z'],
  flecha: ['M5 12h14', 'M13 6l6 6-6 6'],
  chat: ['M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.5A9 9 0 1 1 21 12z'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  cerrar: ['M6 6l12 12', 'M6 18 18 6'],
  mas: ['M12 5v14', 'M5 12h14'],
  menos: ['M5 12h14'],
}

export default function Icono({ nombre, className = 'h-6 w-6' }) {
  const trazos = TRAZOS[nombre]
  if (!trazos) return <span className={className}>{nombre}</span>
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {trazos.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}
