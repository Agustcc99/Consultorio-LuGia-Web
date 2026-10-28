import { site } from './content.js'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Servicios from './components/Servicios.jsx'
import Profesional from './components/Profesional.jsx'
import Nosotros from './components/Nosotros.jsx'
import Galeria from './components/Galeria.jsx'
import Pasos from './components/Pasos.jsx'
import PreAdmision from './components/PreAdmision.jsx'
// import Resenas from './components/Resenas.jsx'
import Faq from './components/Faq.jsx'
import CtaFinal from './components/CtaFinal.jsx'
import Contacto from './components/Contacto.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'
import BarraMovil from './components/BarraMovil.jsx'
import ProgresoScroll from './components/ProgresoScroll.jsx'
import Lunares from './components/Lunares.jsx'

export default function App() {
  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-fondo font-sans text-texto antialiased selection:bg-brand selection:text-sobre-brand">
      <Lunares />
      <ProgresoScroll />
      <Navbar />
      <main>
        <Hero />
        <Servicios />
        {site.profesional && <Profesional />}
        {site.nosotros && <Nosotros />}
        {site.galeria?.imagenes.length > 0 && <Galeria />}
        {site.pasos && <Pasos />}
        {site.preadmision && <PreAdmision />}
        {/* Reseñas desactivadas por ahora: para volver a mostrarlas, descomentar esta línea y el import de arriba. */}
        {/* {site.resenas && <Resenas />} */}
        {site.ctaFinal && <CtaFinal />}
        <Contacto />
        {site.faq.length > 0 && <Faq />}
      </main>
      <Footer />
      <WhatsAppFloat />
      <BarraMovil />
    </div>
  )
}
