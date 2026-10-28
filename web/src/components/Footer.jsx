import { site } from '../content.js'
import { contenedor } from '../lib/estilos.js'
import { medicionActiva } from '../lib/medicion.js'

// Pie: matrícula visible y aviso de urgencias (107) bien a la vista (reglas de salud).
export default function Footer() {
  const redes = Object.entries(site.redes).filter(([, url]) => url)
  const { profesional } = site

  return (
    <footer className="bg-fondo pb-32 text-suave md:pb-12">
      <div className={contenedor}>
        <div className="flex flex-col gap-6 border-t border-linea pt-9 md:flex-row md:items-start md:justify-between md:gap-12 md:pt-12">
          <div>
            <p className="flex items-center gap-2.5 font-display text-[19px] font-bold text-texto sm:gap-3 sm:text-[22px]">
              {site.logoIcono && <img src={site.logoIcono} alt="" className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />}
              {site.nombre}
            </p>
            {profesional && (
              <p className="mt-2.5 text-[15px] text-texto sm:mt-3 sm:text-base">
                {profesional.nombre} · {profesional.especialidad} · <strong className="font-semibold">{profesional.matricula}</strong>
              </p>
            )}
            <p className="mt-1 hidden text-[15px] md:block">© {new Date().getFullYear()} · Todos los derechos reservados</p>
            {redes.length > 0 && (
              <ul className="mt-4 flex gap-6 text-[15px]">
                {redes.map(([red, url]) => (
                  <li key={red}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="capitalize transition-colors duration-160 hover:text-brand">
                      {red}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <details id="privacidad" className="mt-6 border-t border-linea pt-5 text-sm leading-normal">
          <summary className="cursor-pointer font-semibold text-texto">Términos y política de privacidad</summary>
          <div className="mt-3 max-w-3xl space-y-2">
            <p>Esta página es informativa y no reemplaza la consulta profesional. Los valores de los tratamientos se informan en la consulta.</p>
            <p>
              El pedido de turno arma un mensaje con los datos que completás (motivo, nombre, edad, horario preferido) y lo abre en WhatsApp para que lo envíes vos. La
              página no guarda esos datos ni los comparte con terceros: solo llegan al consultorio si enviás el mensaje, y se usan únicamente para coordinar tu turno.
            </p>
            <p>No escribas diagnósticos ni datos médicos en el pedido: eso se conversa en la consulta.</p>
            <p>Para consultar o borrar tus datos, escribinos por WhatsApp o a {site.contacto.email}.</p>
          </div>
        </details>
        {site.aviso && <p className="mt-6 border-t border-linea pt-5 text-sm leading-normal md:mt-8">{site.aviso}</p>}
        <p className="mt-2 text-sm md:hidden">© {new Date().getFullYear()} · Todos los derechos reservados</p>
        {medicionActiva && <p className="mt-1 text-xs">Esta página usa cookies para medir las visitas.</p>}
      </div>
    </footer>
  )
}
