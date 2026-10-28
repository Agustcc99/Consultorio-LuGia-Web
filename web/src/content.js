// LuGia — consultorio odontológico de la Od. Luciana Gianello.
// Fotos: Unsplash como marcador hasta tener las reales (ver docs/FOTOS.md).
// Reglas de salud: sin precios, sin promesas ("cura", "sin dolor", "garantizado"), sin promociones, sin antes y después,
// matrícula visible. Sin reseñas inventadas.

const U = (id, w, h) => `https://images.unsplash.com/${id}?w=${w}${h ? `&h=${h}` : ''}&fit=crop&auto=format&q=75`

export const site = {
  plan: 'semi',
  nombre: 'LuGia',
  logo: null,
  logoIcono: '/logo-centrado.png',

  whatsapp: { numero: '5493513938777', mensaje: 'Hola, quiero pedir un turno en LuGia.' },

  hero: {
    etiqueta: 'Odontología · Jardín Horizonte, Córdoba',
    titulo: 'Cuidamos tu sonrisa, con tiempo y cercanía.',
    subtitulo:
      'Endodoncia y odontología integral para niños y adultos. Turnos de 45 minutos a 1 hora, sin apuro.',
    cta: 'Pedir turno',
    imagen: '/fotos/sillon.webp',
    datos: [
      { label: 'Atención', valor: 'Niños y adultos' },
      { label: 'Modalidad', valor: 'Atención particular' },
      { label: 'Turnos', valor: 'Por WhatsApp' },
    ],
  },

  cinta: ['Endodoncia', 'Odontología integral', 'Coronas y prótesis', 'Implantes', 'Blanqueamientos', 'Niños y adultos'],

  servicios: {
    etiqueta: 'Tratamientos',
    titulo: 'Atención odontológica para toda la familia',
    estilo: 'tarjetas',
    items: [
      { icono: 'raiz', titulo: 'Endodoncias', descripcion: 'Tratamiento de conducto para conservar tu diente. Es el área en la que la Od. Gianello tiene más de 20 años de experiencia.' },
      { icono: 'diente', titulo: 'Odontología integral', descripcion: 'Controles, arreglos y plan de tratamiento para niños y adultos.' },
      { icono: 'corona', titulo: 'Prótesis y coronas', descripcion: 'Coronas y prótesis para recuperar la comodidad al masticar y sonreír.' },
      { icono: 'herramienta', titulo: 'Implantes', descripcion: 'Evaluamos tu caso y te explicamos las opciones para reponer dientes ausentes.' },
      { icono: 'brillo', titulo: 'Blanqueamientos y limpiezas', descripcion: 'Limpiezas de control y blanqueamiento, previa evaluación de tu boca.' },
      { icono: 'escudo', titulo: 'Placas de bruxismo', descripcion: 'Placas a medida para proteger tus dientes si apretás o rechinás durante la noche.' },
      { icono: 'estrella', titulo: 'Estética dental', descripcion: 'Tratamientos para mejorar el aspecto de tu sonrisa de forma natural.' },
    ],
  },

  profesional: {
    etiqueta: 'La profesional',
    nombre: 'Od. Luciana Gianello',
    especialidad: 'Odontóloga',
    matricula: 'MP 7700',
    imagen: '/fotos/luciana.webp',
    frase: 'Me encanta mi trabajo y sigo formándome siempre, porque quiero estar cada día mejor para mis pacientes.',
    formacion: ['Más de 20 años de experiencia en endodoncia', 'Formación universitaria', 'Capacitación continua'],
  },

  nosotros: {
    etiqueta: 'El consultorio',
    titulo: 'Un lugar tranquilo, con tiempo para vos.',
    texto:
      'En LuGia cada turno dura entre 45 minutos y 1 hora, para que puedas preguntar todo lo que quieras y entender cada paso del tratamiento.',
    imagen: '/fotos/sala-de-espera.webp',
    puntos: [
      'Turnos de 45 minutos a 1 hora',
      'Atención a niños y adultos',
    ],
  },

  galeria: null,

  pasos: {
    etiqueta: 'Cómo pedir turno',
    titulo: 'Tu turno en 3 pasos',
    items: [
      { icono: 'chat', titulo: 'Escribinos', texto: 'Completá el pedido o escribinos por WhatsApp y contanos el motivo de tu consulta.' },
      { icono: 'calendario', titulo: 'Elegí el horario', texto: 'Te pasamos los días y horarios libres y confirmamos el que te quede mejor.' },
      { icono: 'diente', titulo: 'Vení a tu consulta', texto: 'Traé tu DNI. Del resto nos ocupamos nosotros.' },
    ],
  },

  // Reseñas desactivadas en App.jsx hasta que existan reseñas reales en Google.
  resenas: { etiqueta: 'Reseñas', titulo: 'Lo que dicen los pacientes', items: [] },

  // Pre-admisión: arma el pedido de turno y lo abre en WhatsApp. No guarda nada.
  preadmision: {
    etiqueta: 'Pedir turno',
    titulo: 'Pedí tu turno en un minuto',
    texto: 'Respondé unas preguntas y te armamos el mensaje para WhatsApp. Así te contestamos más rápido.',
    motivos: ['Primera consulta', 'Control o limpieza', 'Dolor', 'Endodoncia', 'Seguir un tratamiento'],
    alarmas: [
      'Hinchazón en la cara o el cuello',
      'Fiebre',
      'Sangrado que no para',
      'Golpe fuerte en la boca o los dientes',
      'Dificultad para tragar o respirar',
    ],
    emergencias: '107',
  },

  faq: [
    {
      pregunta: '¿Trabajan con obras sociales?',
      respuesta: 'No, la atención es particular. Se puede pagar en efectivo, por transferencia o con tarjeta, y también en cuotas.',
    },
    {
      pregunta: '¿Me va a doler?',
      respuesta:
        'Es muy común sentir nervios antes de ir al dentista. Si tenés miedo o una mala experiencia anterior, contanoslo al pedir el turno: vamos a tu ritmo y te explicamos cada paso antes de empezar.',
    },
    { pregunta: '¿Atienden niños?', respuesta: 'Sí, atendemos niños y adultos.' },
    { pregunta: '¿Cuánto dura un turno?', respuesta: 'Entre 45 minutos y 1 hora.' },
    { pregunta: '¿Cuánto sale?', respuesta: 'Los valores se informan en la consulta, una vez que revisamos tu caso.' },
  ],

  ctaFinal: {
    titulo: '¿Hace cuánto no te hacés un control?',
    texto: 'Pedí tu turno en LuGia.',
    boton: 'Pedir turno por WhatsApp',
    imagen: '/fotos/equipamiento.webp',
  },

  contacto: {
    etiqueta: 'Contacto',
    titulo: 'Te esperamos en LuGia',
    texto: 'Escribinos por WhatsApp: te respondemos en el horario de atención.',
    telefono: null,
    email: 'lucygianello@gmail.com',
    direccion: 'Pública 6 N.º 3753, Barrio Jardín Horizonte, Córdoba',
    horarios: 'Lunes a viernes', // confirmado: sin horas publicadas
    mapa: 'Pública 6 3753, Jardín Horizonte, Córdoba, Argentina',
    mapsUrl: 'https://maps.app.goo.gl/ZMueKbUpoNfhBhzG8',
    mapaCoords: '-31.4569977,-64.156729',
  },

  pagos: {
    titulo: 'Atención particular',
    lista: ['Efectivo', 'Transferencia', 'Tarjetas', 'Cuotas'],
    nota: 'Los valores se informan en la consulta.',
  },

  aviso: 'Este sitio es informativo y no reemplaza la consulta profesional.',

  formspreeId: '',
  medicion: { ga4: '', metaPixel: '' },
  redes: { instagram: null, facebook: null },
}

// Salud: no hay formulario de mail (Formspree guarda los mensajes en servidores de terceros).
// El pedido de turno va por la pre-admisión, que arma el mensaje y lo abre en WhatsApp sin guardar nada.
export const tieneFormulario = false
