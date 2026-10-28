import { site } from '../content.js'
import Icono from '../lib/iconos.jsx'
import { contenedor } from '../lib/estilos.js'
import { medicionActiva } from '../lib/medicion.js'
import { whatsappUrl } from '../lib/whatsapp.js'

// Pie en vino, igual que la barra de arriba: logo en círculo blanco, accesos a las secciones, datos de contacto y matrícula.
const accesos = [
  { href: '#servicios', label: 'Tratamientos' },
  { href: '#profesional', label: 'La profesional', visible: Boolean(site.profesional) },
  { href: '#nosotros', label: 'El consultorio', visible: Boolean(site.nosotros) },
  { href: '#contacto', label: 'Contacto' },
  { href: '#faq', label: 'Preguntas', visible: site.faq.length > 0 },
].filter((a) => a.visible !== false)

export default function Footer() {
  const redes = Object.entries(site.redes).filter(([, url]) => url)
  const { profesional, contacto } = site
  const enlace = 'text-white/80 transition-colors duration-160 ease-tocar hover:text-white'

  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-brand-oscuro via-brand to-brand-oscuro pb-32 text-white/80 md:pb-12">
      <div aria-hidden="true" className="h-1 bg-gradient-to-r from-resalte via-[#e3b34f] to-resalte" />
      <div className={`${contenedor} pt-10 md:pt-14`}>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1.2fr] md:gap-14">
          <div>
            <p className="flex items-center gap-3 font-display text-[22px] font-bold text-white">
              {site.logoIcono && (
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_6px_16px_-6px_rgba(0,0,0,0.4)]">
                  <img src={site.logoIcono} alt="" className="h-10 w-10" />
                </span>
              )}
              {site.nombre}
            </p>
            {profesional && (
              <p className="mt-4 text-[15px] leading-relaxed sm:text-base">
                {profesional.nombre}
                <br />
                {profesional.especialidad} · <strong className="font-semibold text-white">{profesional.matricula}</strong>
              </p>
            )}
            {redes.length > 0 && (
              <ul className="mt-4 flex gap-6 text-[15px]">
                {redes.map(([red, url]) => (
                  <li key={red}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className={`capitalize ${enlace}`}>
                      {red}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Secciones">
            <p className="text-[13px] font-semibold tracking-[0.14em] text-resalte uppercase">Secciones</p>
            <ul className="mt-4 space-y-2.5 text-[16px]">
              {accesos.map((a) => (
                <li key={a.href}>
                  <a href={a.href} className={enlace}>
                    {a.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[13px] font-semibold tracking-[0.14em] text-resalte uppercase">Contacto</p>
            <ul className="mt-4 space-y-2.5 text-[16px]">
              {contacto.direccion && <li>{contacto.direccion}</li>}
              {contacto.horarios && <li>{contacto.horarios}</li>}
              {contacto.email && (
                <li>
                  <a href={`mailto:${contacto.email}`} className={enlace}>
                    {contacto.email}
                  </a>
                </li>
              )}
            </ul>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-base font-semibold text-brand transition duration-160 ease-tocar hover:bg-tinte active:scale-[0.98]"
            >
              <Icono nombre="chat" className="h-[18px] w-[18px]" />
              Escribinos por WhatsApp
            </a>
          </div>
        </div>

        <details id="privacidad" className="mt-10 border-t border-white/15 pt-5 text-sm leading-normal">
          <summary className="cursor-pointer font-semibold text-white">Términos y política de privacidad</summary>
          <div className="mt-3 max-w-3xl space-y-2">
            <p>Esta página es informativa y no reemplaza la consulta profesional. Los valores de los tratamientos se informan en la consulta.</p>
            <p>
              El pedido de turno arma un mensaje con los datos que completás (motivo, nombre, edad, horario preferido) y lo abre en WhatsApp para que lo envíes vos. La
              página no guarda esos datos ni los comparte con terceros: solo llegan al consultorio si enviás el mensaje, y se usan únicamente para coordinar tu turno.
            </p>
            <p>No escribas diagnósticos ni datos médicos en el pedido: eso se conversa en la consulta.</p>
            <p>Para consultar o borrar tus datos, escribinos por WhatsApp o a {contacto.email}.</p>
          </div>
        </details>
        {site.aviso && <p className="mt-5 border-t border-white/15 pt-5 text-sm leading-normal">{site.aviso}</p>}
        <p className="mt-5 text-sm">© {new Date().getFullYear()} · Todos los derechos reservados</p>
        {medicionActiva && <p className="mt-1 text-xs">Esta página usa cookies para medir las visitas.</p>}
      </div>
    </footer>
  )
}
