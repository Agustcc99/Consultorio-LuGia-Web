// LuGia — consultorio odontológico de la Od. Luciana Gianello.
// Fotos: Unsplash como marcador hasta tener las reales (ver docs/FOTOS.md).
// Reglas de salud: sin precios, sin promesas ("cura", "sin dolor", "garantizado"), sin promociones, sin antes y después,
// matrícula visible y aviso de urgencias. Sin reseñas inventadas.

const U = (id, w, h) => `https://images.unsplash.com/${id}?w=${w}${h ? `&h=${h}` : ''}&fit=crop&auto=format&q=75`

export const site = {
  plan: 'semi',
  nombre: 'LuGia',
  logo: null,
  logoIcono: '/icono.svg',

  whatsapp: { numero: '5493513938777', mensaje: 'Hola, quiero pedir un turno en LuGia.' },

  hero: {
    etiqueta: 'Odontología · Jardín del Horizonte, Córdoba',
    titulo: 'Cuidamos tu sonrisa, con tiempo y cercanía.',
    subtitulo:
      'Endodoncia y odontología general para niños, adultos y personas con discapacidad. Turnos de 45 minutos a 1 hora, sin apuro.',
    cta: 'Pedir turno',
    imagen: U('photo-1629909613654-28e377c37b09', 1920),
    datos: [
      { label: 'Atención', valor: 'Niños y adultos' },
      { label: 'Modalidad', valor: 'Atención particular' },
      { label: 'Turnos', valor: 'Por WhatsApp' },
    ],
  },

  cinta: ['Endodoncia', 'Odontología general', 'Coronas y prótesis', 'Implantes', 'Blanqueamientos', 'Niños y adultos', 'Urgencias'],

  servicios: {
    etiqueta: 'Tratamientos',
    titulo: 'Atención odontológica para toda la familia',
    estilo: 'tarjetas',
    items: [
      { icono: 'raiz', titulo: 'Endodoncias', descripcion: 'Tratamiento de conducto para conservar tu diente. Es el área en la que la Od. Gianello tiene más de 20 años de experiencia.' },
      { icono: 'diente', titulo: 'Odontología general', descripcion: 'Controles, arreglos y plan de tratamiento para niños, adultos y personas con discapacidad.' },
      { icono: 'corona', titulo: 'Prótesis y coronas', descripcion: 'Coronas y prótesis para recuperar la comodidad al masticar y sonreír.' },
      { icono: 'herramienta', titulo: 'Implantes', descripcion: 'Evaluamos tu caso y te explicamos las opciones para reponer dientes ausentes.' },
      { icono: 'brillo', titulo: 'Blanqueamientos y limpiezas', descripcion: 'Limpiezas de control y blanqueamiento, previa evaluación de tu boca.' },
      { icono: 'escudo', titulo: 'Placas de bruxismo', descripcion: 'Placas a medida para proteger tus dientes si apretás o rechinás durante la noche.' },
      { icono: 'estrella', titulo: 'Estética dental', descripcion: 'Tratamientos para mejorar el aspecto de tu sonrisa de forma natural.' },
      { icono: 'alerta', titulo: 'Urgencias', descripcion: 'Si tenés dolor fuerte, escribinos por WhatsApp y te damos prioridad dentro del horario de atención.' },
    ],
  },

  profesional: {
    etiqueta: 'La profesional',
    nombre: 'Od. Luciana Gianello',
    especialidad: 'Odontóloga',
    matricula: 'MP 7700',
    imagen: U('photo-1643224297379-54023dacf558', 900, 1125),
    frase: 'Me encanta mi trabajo y sigo formándome siempre, porque quiero estar cada día mejor para mis pacientes.',
    formacion: ['Más de 20 años de experiencia en endodoncia', 'Formación universitaria', 'Capacitación continua'],
  },

  nosotros: {
    etiqueta: 'El consultorio',
    titulo: 'Un lugar tranquilo, con tiempo para vos.',
    texto:
      'En LuGia cada turno dura entre 45 minutos y 1 hora, para que puedas preguntar todo lo que quieras y entender cada paso del tratamiento.',
    imagen: U('photo-1704455306251-b4634215d98f', 900, 1125),
    puntos: [
      'Turnos de 45 minutos a 1 hora',
      'Atención a niños, adultos y personas con discapacidad',
      'Atención de urgencias en el horario de atención',
    ],
  },

  galeria: null,

  pasos: {
    etiqueta: 'Cómo pedir turno',
    titulo: 'Tu turno en 3 pasos',
    items: [
      { titulo: 'Escribinos', texto: 'Completá el pedido o escribinos por WhatsApp y contanos el motivo de tu consulta.' },
      { titulo: 'Elegí el horario', texto: 'Te pasamos los días y horarios libres y confirmamos el que te quede mejor.' },
      { titulo: 'Vení a tu consulta', texto: 'Traé tu DNI. Del resto nos ocupamos nosotros.' },
    ],
  },

  // Reseñas desactivadas en App.jsx hasta que existan reseñas reales en Google.
  resenas: { etiqueta: 'Reseñas', titulo: 'Lo que dicen los pacientes', items: [] },

  // Pre-admisión: arma el pedido de turno y lo abre en WhatsApp. No guarda nada.
  preadmision: {
    etiqueta: 'Pedir turno',
    titulo: 'Pedí tu turno en un minuto',
    texto: 'Respondé unas preguntas y te armamos el mensaje para WhatsApp. Así te contestamos más rápido.',
    motivos: ['Primera consulta', 'Control o limpieza', 'Dolor o urgencia', 'Endodoncia', 'Seguir un tratamiento'],
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
    {
      pregunta: '¿Atienden urgencias?',
      respuesta:
        'Sí. Escribinos por WhatsApp y te damos prioridad dentro del horario de atención. Si tenés hinchazón en la cara, fiebre o un sangrado que no para, llamá al 107 o andá a la guardia más cercana.',
    },
    { pregunta: '¿Atienden niños?', respuesta: 'Sí, atendemos niños y adultos.' },
    {
      pregunta: '¿Atienden personas con discapacidad?',
      respuesta: 'Sí. Contanos al pedir el turno qué necesitás y lo organizamos con tiempo.',
    },
    { pregunta: '¿Cuánto dura un turno?', respuesta: 'Entre 45 minutos y 1 hora.' },
    { pregunta: '¿Cuánto sale?', respuesta: 'Los valores se informan en la consulta, una vez que revisamos tu caso.' },
  ],

  ctaFinal: {
    titulo: '¿Hace cuánto no te hacés un control?',
    texto: 'Pedí tu turno en LuGia.',
    boton: 'Pedir turno por WhatsApp',
    imagen: U('photo-1489278353717-f64c6ee8a4d2', 1920, 1080),
  },

  contacto: {
    etiqueta: 'Contacto',
    titulo: 'Te esperamos en LuGia',
    texto: 'Escribinos por WhatsApp: te respondemos en el horario de atención.',
    telefono: null,
    email: 'lucygianello@gmail.com',
    direccion: 'Barrio Jardín del Horizonte, Córdoba', // falta calle y número
    horarios: 'Lunes a viernes, de 9 a 21 h', // provisorio: confirmar horas exactas
    mapa: 'Jardín del Horizonte, Córdoba, Argentina',
    mapsUrl: null,
  },

  pagos: {
    titulo: 'Atención particular',
    lista: ['Efectivo', 'Transferencia', 'Tarjetas', 'Cuotas'],
    nota: 'Los valores se informan en la consulta.',
  },

  aviso: 'Este sitio es informativo y no reemplaza la consulta profesional. Ante una urgencia, llamá al 107.',

  formspreeId: '',
  medicion: { ga4: '', metaPixel: '' },
  redes: { instagram: null, facebook: null },
}

// Salud: no hay formulario de mail (Formspree guarda los mensajes en servidores de terceros).
// El pedido de turno va por la pre-admisión, que arma el mensaje y lo abre en WhatsApp sin guardar nada.
export const tieneFormulario = false
