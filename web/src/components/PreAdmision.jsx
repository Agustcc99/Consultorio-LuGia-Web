import { useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { site } from '../content.js'
import Icono from '../lib/iconos.jsx'
import { botonPrimario, botonSecundario, botonWhatsapp, campo, chip, contenedor, etiquetaCampo } from '../lib/estilos.js'
import { curva, duracion } from '../lib/movimiento.js'
import { whatsappUrl } from '../lib/whatsapp.js'
import Reveal from './Reveal.jsx'
import Titulo from './Titulo.jsx'

// Pre-admisión (Profesional): 4 pasos que arman el pedido de turno y lo abren en WhatsApp.
// Solo preguntas administrativas, no historia clínica. No guarda nada (ni servidor ni localStorage).
const DIAS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const FRANJAS = ['Mañana', 'Tarde', 'Me da igual']
const PASOS = ['Motivo', 'Tus datos', 'Cuándo', 'Enviar']

const medir = (evento) => window.gtag?.('event', evento) // sin datos del paciente: solo en qué paso va

// Cambio de paso: sale 8 px a la izquierda y entra el nuevo desde 8 px a la derecha.
const cambioDePaso = {
  initial: { opacity: 0, x: 8 },
  animate: { opacity: 1, x: 0, transition: { duration: duracion.pasar, ease: curva.pasar } },
  exit: { opacity: 0, x: -8, transition: { duration: duracion.pasar * 0.7, ease: curva.salir } },
}

function armarMensaje(d) {
  const lineas = [
    'Pedido de turno (desde la página)',
    `Motivo: ${d.motivo}`,
    `Paciente: ${d.nombre}, ${d.edad} años`,
    d.edad && Number(d.edad) < 18 && d.adulto && `Adulto responsable: ${d.adulto}`,
    `Prefiere: ${d.franja.toLowerCase()}${d.dias.length ? `, ${d.dias.join(', ')}` : ''}`,
    d.nota && `Nota: ${d.nota}`,
  ].filter(Boolean)
  return lineas.join('\n')
}

export default function PreAdmision() {
  const { etiqueta, titulo, texto, motivos } = site.preadmision

  const [paso, setPaso] = useState(0)
  const [copiado, setCopiado] = useState(false)
  const [d, setD] = useState({
    motivo: null,
    nombre: '',
    edad: '',
    adulto: '',
    franja: 'Me da igual',
    dias: [],
    nota: '',
    acepta: false,
  })
  const cambiar = (campo) => (e) => setD({ ...d, [campo]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

  function elegirMotivo(motivo) {
    if (paso === 0 && !d.motivo) medir('preadmision_inicio')
    setD({ ...d, motivo })
    ir(1)
  }

  function ir(n) {
    setPaso(n)
    medir(`preadmision_paso_${n + 1}`)
  }

  const esMenor = d.edad !== '' && Number(d.edad) < 18
  const datosOk = d.nombre.trim() && d.edad !== '' && (!esMenor || d.adulto.trim())
  const faltaDato = !d.nombre.trim() || d.edad === '' ? 'Completá nombre y edad para seguir.' : 'Completá el adulto responsable para seguir.'
  const mensaje = armarMensaje(d)

  async function copiar() {
    try {
      await navigator.clipboard.writeText(mensaje)
      setCopiado(true)
    } catch {
      setCopiado(false)
    }
  }

  const pregunta = 'font-display text-[23px] leading-tight font-bold tracking-[-0.02em] text-texto sm:text-[28px]'

  return (
    <section id="pedir-turno" className="scroll-mt-[calc(var(--alto-header,7rem)_+_1rem)] bg-fondo py-10 sm:py-14">
      <div className={`${contenedor} grid gap-8 lg:grid-cols-[2fr_3fr] lg:gap-20`}>
        <Reveal efecto="texto" className="lg:pt-2">
          <Titulo etiqueta={etiqueta}>{titulo}</Titulo>
          <p className="mt-4 text-[17px] text-suave sm:mt-5 sm:text-[19px]">{texto}</p>
          <ul className="mt-6 hidden space-y-3.5 text-[17px] text-texto sm:mt-8 sm:block">
            {['Sin descargar nada ni crear cuentas', 'El pedido llega ordenado y se responde más rápido', 'No guardamos tus datos en la página'].map((p) => (
              <li key={p} className="flex gap-3">
                <Icono nombre="check" className="mt-0.5 h-[22px] w-[22px] shrink-0 text-brand" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* El formulario no lleva Reveal: si se llega con "Pedir turno" tiene que estar ya visible */}
        <div
          id="formulario-turno"
          className="rounded-[26px] border border-linea bg-fondo px-5 py-6 shadow-[0_32px_64px_-32px_rgba(15,23,42,0.2)] sm:rounded-[32px] sm:p-10"
        >
          {/* Progreso */}
          <ol aria-label="Pasos" className="grid grid-cols-4 gap-1.5 sm:gap-2">
            {PASOS.map((nombre, i) => {
              const hecho = i < paso
              const actual = i === paso
              return (
                <li key={nombre} aria-current={actual ? 'step' : undefined} className="flex flex-col gap-2 sm:gap-2.5">
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors duration-280 ease-pasar sm:h-8 sm:w-8 sm:text-[15px] ${
                        hecho ? 'bg-tinte text-brand' : actual ? 'bg-brand text-sobre-brand' : 'border-[1.5px] border-borde-fuerte font-semibold text-slate-500'
                      }`}
                    >
                      {hecho ? <Icono nombre="check" className="h-4 w-4" /> : i + 1}
                    </span>
                    {i < PASOS.length - 1 && (
                      <span className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-linea">
                        <span
                          className={`absolute inset-0 origin-left bg-brand transition-transform duration-280 ease-pasar ${hecho ? 'scale-x-100' : 'scale-x-0'}`}
                        />
                      </span>
                    )}
                  </span>
                  <span className={`text-[13px] sm:text-sm ${actual ? 'font-semibold text-brand' : 'text-slate-500'}`}>{nombre}</span>
                </li>
              )
            })}
          </ol>

          <AnimatePresence mode="wait" initial={false}>
            <m.div key={paso} {...cambioDePaso} className="mt-7 sm:mt-10">
              {paso === 0 && (
                <div>
                  <p className="text-sm font-medium text-slate-500 sm:text-[15px]">Paso 1 de 4</p>
                  <p className={`mt-1 ${pregunta}`}>¿Por qué querés el turno?</p>
                  <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-6 sm:gap-3">
                    {motivos.map((mo) => (
                      <button key={mo} type="button" aria-pressed={d.motivo === mo} onClick={() => elegirMotivo(mo)} className={chip(d.motivo === mo)}>
                        {mo}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {paso === 1 && (
                <div>
                  <p className="text-sm font-medium text-slate-500 sm:text-[15px]">Paso 2 de 4</p>
                  <p className={`mt-1 ${pregunta}`}>¿Quién viene a la consulta?</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-[3fr_1fr]">
                    <label className={etiquetaCampo}>
                      Nombre y apellido
                      <input value={d.nombre} onChange={cambiar('nombre')} autoComplete="name" className={campo} />
                    </label>
                    <label className={etiquetaCampo}>
                      Edad
                      <input value={d.edad} onChange={cambiar('edad')} type="number" inputMode="numeric" min="0" max="120" className={`${campo} max-w-[120px] sm:max-w-none`} />
                    </label>
                  </div>
                  <AnimatePresence initial={false}>
                    {esMenor && (
                      <Desplegar key="adulto">
                        <label className={`${etiquetaCampo} mt-3 rounded-[18px] bg-tinte p-3.5 text-brand-oscuro`}>
                          Es menor de edad: nombre del adulto responsable
                          <input value={d.adulto} onChange={cambiar('adulto')} className={`${campo} border-brand font-normal`} />
                        </label>
                      </Desplegar>
                    )}
                  </AnimatePresence>
                  <Navegacion atras={() => setPaso(0)} siguiente={() => ir(2)} habilitado={datosOk} pista={faltaDato} />
                </div>
              )}

              {paso === 2 && (
                <div>
                  <p className="text-sm font-medium text-slate-500 sm:text-[15px]">Paso 3 de 4</p>
                  <p className={`mt-1 ${pregunta}`}>¿Cuándo te queda mejor?</p>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {FRANJAS.map((f) => (
                      <button key={f} type="button" aria-pressed={d.franja === f} onClick={() => setD({ ...d, franja: f })} className={chip(d.franja === f)}>
                        {f}
                      </button>
                    ))}
                  </div>
                  <p className="mt-6 text-[15px] font-semibold text-texto">Días que podés (opcional)</p>
                  <div className="mt-2 grid grid-cols-6 gap-1.5 sm:gap-2">
                    {DIAS.map((dia) => {
                      const activo = d.dias.includes(dia)
                      return (
                        <button
                          key={dia}
                          type="button"
                          aria-pressed={activo}
                          onClick={() => setD({ ...d, dias: activo ? d.dias.filter((x) => x !== dia) : DIAS.filter((x) => x === dia || d.dias.includes(x)) })}
                          className={`${chip(activo)} px-0 text-[15px]`}
                        >
                          {dia}
                        </button>
                      )
                    })}
                  </div>
                  <label className={`${etiquetaCampo} mt-6`} htmlFor="nota-turno">
                    Algo más (opcional)
                  </label>
                  <textarea
                    id="nota-turno"
                    value={d.nota}
                    onChange={cambiar('nota')}
                    maxLength={140}
                    rows={2}
                    placeholder="Ej. prefiero después de las 18"
                    className={`${campo} mt-1.5 h-auto py-3`}
                  />
                  <p className="mt-1.5 text-sm text-suave">No escribas diagnósticos ni datos médicos: eso lo hablamos en la consulta.</p>
                  <Navegacion atras={() => setPaso(1)} siguiente={() => ir(3)} habilitado />
                </div>
              )}

              {paso === 3 && (
                <div>
                  <p className="text-sm font-medium text-slate-500 sm:text-[15px]">Paso 4 de 4</p>
                  <p className={`mt-1 ${pregunta}`}>Revisá y enviá</p>
                  <p className="mt-1.5 text-base text-suave">Así le llega el mensaje al consultorio:</p>
                  <pre className="mt-3.5 rounded-[20px] rounded-bl-md bg-superficie px-5 py-4 font-sans text-[15px] leading-[1.7] whitespace-pre-wrap text-texto first-line:font-semibold sm:rounded-[22px] sm:rounded-bl-md sm:text-base">
                    {mensaje}
                  </pre>
                  <label className="mt-5 flex cursor-pointer items-start gap-3 text-[15px] leading-normal text-slate-800 sm:text-base">
                    <input type="checkbox" checked={d.acepta} onChange={cambiar('acepta')} className="mt-0.5 h-6 w-6 shrink-0 cursor-pointer accent-brand" />
                    <span>
                      Acepto los{' '}
                      <a href="#privacidad" onClick={() => document.getElementById('privacidad')?.setAttribute('open', '')} className="font-semibold underline">
                        términos y la política de privacidad
                      </a>{' '}
                      y que estos datos se envíen por WhatsApp al consultorio solo para coordinar mi turno.
                    </span>
                  </label>
                  <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                    <a
                      href={d.acepta ? whatsappUrl(mensaje) : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-disabled={!d.acepta}
                      onClick={(e) => (d.acepta ? medir('preadmision_enviada') : e.preventDefault())}
                      className={`${botonWhatsapp} min-h-[58px] flex-1 ${d.acepta ? '' : 'cursor-not-allowed opacity-40'}`}
                    >
                      <Icono nombre="chat" className="h-5 w-5" />
                      Enviar por WhatsApp
                    </a>
                    <button type="button" onClick={copiar} className={`${botonSecundario} min-h-[58px] text-base`}>
                      {copiado ? 'Copiado ✓' : 'Copiar mensaje'}
                    </button>
                  </div>
                  <button type="button" onClick={() => setPaso(2)} className="mt-5 text-base font-semibold text-suave underline">
                    Volver
                  </button>
                </div>
              )}
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

// Campo que aparece o desaparece según una respuesta: la altura crece (o se cierra) en vez de empujar "Siguiente" de golpe.
// Los márgenes de -4/+4 px dejan lugar al aro de foco, que el overflow recortaría.
function Desplegar({ children }) {
  return (
    <m.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1, transition: { duration: 0.22, ease: curva.pasar } }}
      exit={{ height: 0, opacity: 0, transition: { duration: 0.16, ease: curva.salir } }}
      className="-mx-1 overflow-hidden px-1 pb-1"
    >
      {children}
    </m.div>
  )
}

function Navegacion({ atras, siguiente, habilitado, pista }) {
  return (
    <div className="mt-7 sm:mt-8">
      <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" onClick={atras} className="self-start text-base font-semibold text-suave underline sm:self-auto">
          Volver
        </button>
        <button type="button" onClick={siguiente} disabled={!habilitado} className={`${botonPrimario} px-8 disabled:bg-borde-fuerte disabled:text-slate-700`}>
          Siguiente
        </button>
      </div>
      {!habilitado && pista && <p className="mt-2.5 text-sm text-suave sm:text-right">{pista}</p>}
    </div>
  )
}
