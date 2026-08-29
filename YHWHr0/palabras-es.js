// Datos del juego. Cada categoría principal debería tener 7 palabras.
export const WORD_DATA = [
  {
    tags: ["Iglesia"],
    category: "Sacramentos",
    dificultad: 1,
    fortext: "Signos eficaces de la gracia",
    words: [
      {
        category: "Iniciación",
        words: ["BAUTISMO", "EUCARISTÍA", "CONFIRMACIÓN"],
        help: ["puerta de la fe", "cuerpo de Cristo", "sello del Espíritu"]
      },
      {
        category: "Curación y comunión",
        words: ["ORDEN sacerdotal", "RECONCILIACIÓN", "UNCIÓN de los enfermos", "MATRIMONIO"],
        help: ["consagracion", "perdón de los pecados", "alivio corporal y espiritual", "unión conyugal"]
      }
    ]
  },
  {
    tags: ["Biblia"],
    category: "Génesis en 7 días",
    dificultad: 2,
    fortext: "El relato de la Creación",
    PN: false,
    words: [
      {
        category: "Creación de espacio-tiempo",
        words: ["DÍA & NOCHE", "CIELO & SUELO", "TIERRA & MAR", "DESCANSO & SANTIFICACIÓN"],
        help: ["ciclo del tiempo", "firmamento", "superficie y aguas", "séptimo día"]
      },
      {
        category: "Creación de contenido",
        words: ["SOL & LUNA", "AVES & MONSTRUOS", "REPTILES & HUMANOS"],
        help: ["lumbreras", "cielo y mar", "tierra firme"],
      }
    ]
  },
  {
    category: "Ministerios",
    dificultad: 2,
    fortext: "Llamados y profesiones",
    words: [
      {
        category: "Bautismales",
        words: ["SACERDOTE", "PROFETA", "REY"],
        help: ["mediador", "anuncia la palabra", "sirve y gobierna"]
      },
      {
        category: "Profesionales",
        words: ["AGRICULTOR", "MÉDICO", "MAESTRO", "MILITAR"],
        help: ["trabaja la tierra", "cura, sana", "enseña", "defiende"]
      }
    ]
  },
  {
    tags: ["Iglesia"],
    category: "Consejos",
    dificultad: 2,
    fortext: "Vías de perfección cristiana",
    words: [
      {
        category: "Evangélicos",
        words: ["CASTIDAD", "POBREZA", "OBEDIENCIA"],
        help: ["pureza e intimidad", "desprendimiento y desapego", "minoridad y humildad"]
      },
      {
        category: "Cuaresmales",
        words: ["LIMOSNA", "ORACIÓN", "AYUNO", "CONVERSIÓN"],
        help: ["ayuda al prójimo", "diálogo con Dios", "privación", "cambio de vida"]
      }
    ]
  },
  {
    tags: ["Catecismo"],
    category: "Dones",
    dificultad: 2,
    fortext: "Regalos",
    words: [
      {
        category: "De la Trinidad",
        words: ["SANTIFICACIÓN", "SALVACIÓN", "CREACIÓN"],
        help: ["obra del Espíritu Santo", "obra del Hijo", "obra del Padre"]
      },
      {
        category: "Del Espíritu Santo",
        words: ["SABIDURÍA", "PIEDAD", "FORTALEZA", "TEMOR"],
        help: ["degustar lo divino", "devoción y clemencia", "soportar la prueba", "respeto a Dios"]
      }
    ]
  },
  {
    tags: ["Catecismo"],
    category: "Virtudes",
    dificultad: 1,
    fortext: "Capacidades aprendibles que nos acercan a Dios",
    words: [
      {
        category: "Teologales",
        words: ["FE", "ESPERANZA", "CARIDAD"],
        help: ["creer en Dios", "confiar en las promesas", "entregar la vida"]
      },
      {
        category: "Cardinales",
        words: ["PRUDENCIA", "JUSTICIA", "TEMPLANZA", "FORTALEZA"],
        help: ["discernimiento", "dar a cada uno lo suyo", "autocontrol", "fuerza interior"]
      }
    ]
  },
  {
    tags: ["Catecismo"],
    category: "Obras de corazón espirituales",
    dificultad: 1,
    fortext: "Misericordia en acción",
    words: [
      {
        category: "Invisibles",
        words: ["INTERCEDER", "CONSOLAR", "TOLERAR"],
        help: ["orar por otros", "dar ánimo", "sufrir con paciencia"]
      },
      {
        category: "Concretas",
        words: ["ENSEÑAR", "PERDONAR", "ACONSEJAR", "CORREGIR"],
        help: ["dar instrucción", "liberar culpa", "orientar", "señalar el error"]
      }
    ]
  },
  {
    tags: ["Catecismo"],
    category: "Pecados",
    dificultad: 2,
    fortext: "Acciones e intenciones que nos alejan de Dios",
    words: [
      {
        category: "Religiosos",
        words: ["IDOLATRÍA", "PROFANACIÓN", "BLASFEMIA"],
        help: ["adorar lo creado", "mal tratar lo sagrado", "palabras contra Dios"]
      },
      {
        category: "Capitales",
        words: ["GULA & AVARICIA", "ENVIDIA & IRA", "PEREZA & LUJURIA", "EGOCENTRISMO"],
        help: ["descontrol alimentario y de posesión", "tristeza del bien ajeno y furia", "desgane y descontrol sensual", "exceso de yo"]
      }
    ]
  },
  {
    tags: ["Biblia","Evangelios"],
    category: "Yo Soy",
    dificultad: 1,
    fortext: "Jesús se auto definió con estos símbolos.",
    words: [
      {
        category: "Entre el cielo y la tierra",
        words: ["RESURRECCIÓN & VIDA", "LUZ","VIA & VERDAD"], 
        help: ["...gloriosa & ...eterna", "...del mundo","...al Padre "]
      },
      {
        category: "En el campo",
        words: ["PAN", "VID", "PASTOR", "PUERTA"],
        help: ["...de vida", "...verdadera", "el buen ...", "...del corral"]
      }
    ]
  },
  {
    tags: ["Iglesia"],
    category: "María",
    dificultad: 3,
    fortext: "La llena de gracia",
    words: [
      {
        category: "Títulos y Dogmas",
        words: ["MADRE & VIRGEN", "HIJA & INMACULADA", "ESPOSA & REINA"],
        help: ["...de Dios Hijo & ...castísima", "...de Dios Padre & ...concepción ", "...del Espíritu Santo & ...de la creación"]
      },
      {
        category: "Letanías",
        words: ["ESPEJO & SEDE", "ARCA & CASA", "REFUGIO & PUERTA", "ROSA & ESTRELLA"],
        help: ["...de justicia & ...de la sabiduría", "...de la alianza & ...de oro", "...de los pecadores & ...del cielo", "...mística & ...de la mañana"]
      }
    ]
  },
  {
    tags: ["Iglesia"],
    category: "Apóstoles",
    dificultad: 2,
    fortext: "Columnas de la Iglesia",
    words: [
      {
        category: "Los primeros y los últimos",
        words: ["PEDRO & ANDRÉS", "FELIPE & BARTOLOMÉ", "PABLO & MATÍAS"],
        help: ["pescadores de hombres", "ven y verás", "apóstol de los gentiles y el elegido al azar"]
      },
      {
        category: "Compañeros de Misión",
        words: ["SANTIAGO & JUAN", "TOMÁS & MATEO", "SANTIAGO & TADEO", "SIMÓN & JUDAS"],
        help: ["hijos del trueno", "el incrédulo y el publicano", "el menor y Judas", "el cananeo y el traidor"]
      }
    ]
  },
  {
    tags: ["Biblia"],
    category: "Mandamientos",
    dificultad: 1,
    fortext: "Leyes de la Alianza",
    words: [
      {
        category: "En positivo",
        words: ["AMAR", "SANTIFICAR", "RESPETAR"],
        help: ["...a Dios", "...las fiestas", "...a padre y madre"]
      },
      {
        category: "Prohibido",
        words: ["prohibido MATAR", "prohibido ROBAR", "prohibido ADULTERAR", "prohibido MENTIR"],
        help: ["atentar contra la vida", "tomar lo ajeno", "romper la alianza matrimonial", "decir falso testimonio"]
      }
    ]
  },
  {
    tags: ["Biblia"],
    category: "Amor",
    dificultad: 1,
    fortext: "El mandamiento principal y sus manifestaciones",
    words: [
      {
        category: "Mandamientos",
        words: ["amar a DIOS", "amar al PRÓJIMO", "amor PROPIO"],
        help: ["con todo el corazón", "como a ti mismo", "autoestima y cuidado personal"]
      },
      {
        category: "Misericordia",
        words: ["CARIDAD", "PERDÓN", "COMPASIÓN", "PIEDAD"],
        help: ["amor en acción", "cancelar deudas", "padecer con el otro", "devoción de corazón"]
      }
    ]
  },
  {
    tags: ["Iglesia"],
    category: "Tiempo Litúrgico",
    dificultad: 1,
    fortext: "El calendario de la Iglesia",
    words: [
      {
        category: "Fiestas",
        words: ["NAVIDAD", "PASCUA", "PENTECOSTÉS"],
        help: ["nacimiento de Jesús", "resurrección del Señor", "venida del Espíritu Santo"]
      },
      {
        category: "Preparación",
        words: ["ORDINARIO", "ADVIENTO", "CUARESMA", "SEMANA Santa"],
        help: ["tiempo común", "espera de la venida", "cuarenta días de preparación", "pasión, muerte y resurrección"]
      }
    ]
  },
  {
    tags: ["Biblia","Evangelios"],
    category: "Beatitúdines",
    dificultad: 1,
    fortext: "Dichosos los que (tienen) …",
    words: [
      {
        category: "Corazón",
        words: ["corazón PURO", "corazón POBRE", "corazón MANSO"],
        help: ["porque verán a Dios", "porque a ellos les pertenece el Reino de los Cielos", "porque poseerán la tierra"]
      },
      {
        category: "Justicia",
        words: ["HAMBRE de justicia", "PERDONAN injusticias", "TRABAJAN por la justicia", "SUFREN injusticias"],
        help: ["y sed", "misericordiosos", "y la paz", "a causa de mi nombre"]
      }
    ]
  },
  {
    tags: ["Biblia"],
    category: "Naturaleza",
    dificultad: 1,
    fortext: "Símbolos de Dios",
    words: [
      {
        category: "Animales",
        words: ["PALOMA", "LEÓN", "CORDERO"],
        help: ["...de la paz", "...de Judá", "...que quita el pecado del mundo"]
      },
      {
        category: "Elementos",
        words: ["LUZ", "AGUA", "AIRE", "FUEGO"],
        help: ["ilumina", "hidrata", "oxigena", "transforma"],
      }
    ]
  },
  {
    category: "Juicio",
    dificultad: 3,
    fortext: "Variables de las que depende un juicio",
    words: [
      {
        category: "Punibilidad (culpa)",
        words: ["CONCIENCIA", "GRAVEDAD", "CONSENTIMIENTO"],
        help: ["entendimiento", "venial o mortal", "intención"]
      },
      {
        category: "Agravamiento o Mitigacion (castigo)",
        words: ["CONTEXTO", "CONTRICIÓN", "CONDUCTA", "CONVERSIÓN"],
        help: ["circunstancia", "arrepentimiento", "premio", "transformación"]
      }
    ]
  },
  {
    tags: ["Biblia"],
    category: "Embarazos Milagrosos",
    dificultad: 3,
    fortext: "Nombres de madres y/o hijos",
    words: [
      {
        category: "Nuevo Testamento",
        words: ["ISABEL & JUAN", "MARÍA & JESÚS"],
        help: ["Familia de Zacarías", "Familia de José"]
      },
      {
        category: "Antiguo Testamento",
        words: ["ANA & SAMUEL", "SARA & ISAAC","SANSON"],
        help: ["Consagrado al templo", "Familia de Abraham","varón fuerte"]
      }
    ]
  }
];
