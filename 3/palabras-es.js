// Datos del juego en Español (Archivo de Referencia)
export const WORD_DATA = [
  {
    tags: ["Catecismo","Sacramentos"],
    category: "Sacramentos",
    dificultad: 1,
    fortext: "Signos eficaces de la gracia",
    words: [
      {
        category: "Iniciación",
        fortext: "Cimientos de la vida cristiana",
        words: ["BAUTISMO", "EUCARISTÍA", "CONFIRMACIÓN"],
        help: ["puerta de la fe", "cuerpo de Cristo", "sello del Espíritu"]
      },
      {
        category: "Curación y consagración",
        fortext: "Sanación del alma y vocación de servicio",
        words: ["ORDEN sacerdotal", "UNCIÓN", "MATRIMONIO", "RECONCILIACIÓN"],
        help: ["consagración sacerdotal", "...de los enfermos: alivio & fortaleza", "consagración conyugal", "perdón de los pecados"]
      }
    ]
  },
  {
    tags: ["Biblia", "Antiguo Testamento","Fisica"],
    category: "Génesis en 7 días",
    dificultad: 2,
    fortext: "El relato de la Creación",
    words: [
      {
        category: "ESPACIO & TIEMPO",
        fortext: "Ordenamiento del cosmos",
        words: ["DÍA & NOCHE", "CIELO & SUELO", "TIERRA & MAR", "DESCANSO & SANTIFICACIÓN"],
        help: ["ciclo del tiempo", "firmamento arriba & abajo", "superficie & aguas", "séptimo día"]
      },
      {
        category: "CONTENIDO",
        fortext: "Creación y criaturas al servicio del Hombre",
        words: ["HIERBAS & ÁRBOLES", "SOL & LUNA", "AVES & MONSTRUOS", "REPTILES & HUMANOS"],
        help: ["...que produzcan semillas y frutos", "lumbreras", "...del cielo & ...del mar", "tierra firme"]
      }
    ]
  },
  {
    tags: ["Biblia", "Antiguo Testamento","Moral"],
    category: "El Decálogo",
    dificultad: 1,
    fortext: "Leyes de la 1era Alianza",
    words: [
      {
        category: "PRECEPTOS",
        fortext: "Deberes para/con nuestros creadores",
        words: ["AMAR", "SANTIFICAR", "RESPETAR"],
        help: ["...a Dios", "...las fiestas", "...a padre y madre"]
      },
      {
        category: "PROHIBICIONES",
        fortext: "Límites que protejen lo privado",
        words: ["prohibido MATAR", "prohibido ROBAR", "prohibido ADULTERAR", "prohibido MENTIR"],
        help: ["atentar contra la vida", "tomar lo ajeno", "romper la alianza matrimonial", "decir falso testimonio"]
      }
    ]
  },
  {
    tags: ["Biblia", "Nuevo Testamento", "Moral"],
    category: "Amor",
    dificultad: 1,
    fortext: "El mandamiento principal",
    words: [
      {
        category: "amor Trino",
        fortext: "a semejanza de Dios",
        words: ["amar a DIOS", "amar al PRÓJIMO", "amor PROPIO"],
        help: ["...con todo el corazón", "...como a ti mismo", "autoestima y cuidado personal"]
      },
      {
        category: "amor Misericordioso",
        fortext: "la miseria mueve al corazón",
        words: ["CARIDAD", "PERDÓN", "COMPASIÓN", "PIEDAD"],
        help: ["amor en acción", "cancelar deudas", "padecer con/por el otro", "clemencia"]
      }
    ]
  },
  {
    tags: ["Catecismo", "Moral"],
    category: "Obras de corazón espirituales",
    dificultad: 1,
    fortext: "Atender necesidades sutiles",
    words: [
      {
        category: "COMPASIVAS",
        fortext: "la miseria mueve al corazón",
        words: ["INTERCEDER", "CONSOLAR", "TOLERAR", "PERDONAR"],
        help: ["orar por otros", "dar ánimo", "sufrir con paciencia", "liberar culpa"]
      },
      {
        category: "CONDUCTUALES",
        fortext: "la miseria mueve la palabra",
        words: ["ENSEÑAR", "ACONSEJAR", "CORREGIR"],
        help: ["dar instrucción", "orientar", "señalar el error"]
      }
    ]
  },
  {
    tags: ["Catecismo", "Moral"],
    category: "Obras de corazón corporales",
    dificultad: 1,
    fortext: "Atender necesidades urgentes",
    words: [
      {
        category: "ASISTENCIALES",
        fortext: "atender necesidades materiales",
        words: ["ALIMENTAR", "HIDRATAR", "VESTIR", "ALOJAR"],
        help: ["dar comida", "dar bebida", "dar ropa", "dar techo"]
      },
      {
        category: "PRESENCIALES",
        fortext: "atender necesidades anímico-espirituales",
        words: ["visitar al ENFERMO", "visitar al PRESO", "ENTERRAR"],
        help: ["débil de salud", "privado de la libertad", "dar sepultura"]
      }
    ]
  },
  {
    tags: ["Biblia", "Antiguo Testamento","Historia"],
    category: "Padres e Hijos",
    dificultad: 2,
    fortext: "En el Antiguo Testamento",
    words: [
      {
        category: "Génesis",
        fortext: "Los primeros elegidos de Dios",
        words: ["ADÁN & ABEL", "NOÉ & SEM", "ABRAHAM & ISAAC"],
        help: ["el primer Hombre & el primer Santo", "Constructores del arca", "Los primeros patriarcas"]
      },
      {
        category: "Israelitas",
        fortext: "De las 12 tribus al reino unido",
        words: ["JACOB & JUDÁ", "SAÚL & JONATÁN", "DAVID & SALOMÓN"],
        help: ["Israel & su hijo el León", "el primer Rey & el amigo de David", "Los constructores del Templo de Dios"]
      }
    ]
  },
  {
    tags: ["Biblia","Evangelios", "Nuevo Testamento","Historia"],
    category: "Hijo de …",
    dificultad: 2,
    fortext: "En los Evangelios",
    words: [
      {
        category: "Hijos únicos",
        fortext: "Vocaciones singulares",
        words: ["JUAN hijo de ZACARÍAS", "NATANAEL hijo de TIMEO", "JESÚS hijo de JOSÉ"],
        help: ["el más grande entre los Hombres, hijo del sacerdote", "verdadero Israelita, hijo del 'honorable'", "verdadero Dios hijo del carpintero"]
      },
      {
        category: "Hermanos Pescadores",
        fortext: "... de hombres",
        words: ["SIMÓN hijo de JUAN", "ANDRÉS hijo de JUAN", "JUAN hijo de ZEBEDEO", "SANTIAGO hijo de ZEBEDEO"],
        help: [
          "el discípulo principal, hijo de un pescador cuyo nombre significa Dios es misericordioso",
          "hermano de Pedro, hijo de un pescador cuyo nombre significa Dios es misericordioso",
          "el discípulo amado, hijo de un pescador cuyo nombre significa regalo de Dios",
          "hermano de Juan, hijo de un pescador cuyo nombre significa regalo de Dios"
        ]
      }
    ]
  },
  {
    tags: ["Biblia","Evangelios", "Nuevo Testamento", "Historia"],
    category: "Intercesión Paternal",
    dificultad: 4,
    fortext: "Pedir por un 'hijo'",
    words: [
      {
        category: "Por la VIDA",
        fortext: "La súplica ante la muerte",
        words: ["el SACERDOTE pide un hijo (PROFETA)", "JAIRO pide por su hija MUERTA", "el FUNCIONARIO pide por su hijo MORIBUNDO", "la VIUDA pide por su hijo MUERTO"],
        help: [
          "«Zacarías, tu súplica ha sido escuchada» — El ángel anuncia el nacimiento de Juan",
          "«No temas; solamente ten fe» — Jesús devuelve la vida a la hija del jefe de la sinagoga",
          "«Tu hijo vive» — El padre suplica a Jesús y el hijo es curado a distancia",
          "«Joven, yo te lo mando: levántate» — Jesús se compadece de la madre y devuelve la vida a su hijo"
        ]
      },
      {
        category: "Por la SALUD",
        fortext: "La súplica ante la enfermedad",
        words: ["la CANANEA pide por su hija ENDEMONIADA", "un HUMILDE pide por su hijo POSEÍDO", "el CENTURIÓN pide por su servidor PARALÍTICO"],
        help: [
          "«¡Mujer, qué grande es tu fe!» — La madre intercede y su hija queda liberada",
          "«Creo; ayuda mi falta de fe» — El padre se presenta ante Jesús y reconoce la fragilidad de su fe",
          "«No soy digno de que entres en mi casa» — El soldado romano intercede y su servidor sana"
        ]
      }
    ]
  },
  {
    tags: ["Biblia","Evangelios", "Nuevo Testamento", "Historia"],
    category: "Comunidades",
    dificultad: 4,
    fortext: "En los Evangelios",
    words: [
      {
        category: "Judíos",
        fortext: "Jerusalén como ciudad Santa",
        words: ["FARISEOS & SADUCEOS", "ESCRIBAS & PUBLICANOS", "CELOTES & HERODIANOS", "LEVITAS & SACERDOTES"],
        help: ["¿existen los ángeles & la resurrección?", "la Ley & los impuestos", "grupos políticos", "descendientes de Leví"]
      },
      {
        category: "Gentiles",
        fortext: "Naciones / pueblos extranjeros",
        words: ["PAGANOS & SAMARITANOS", "ROMANOS & GRIEGOS", "CANANEOS & FENICIOS"],
        help: ["cultos diversos & pueblo rival", "imperio dominador & cultura helénica", "pueblos antiguos de Canaán y de la costa"]
      }
    ]
  },
  {
    tags: ["Nuevo Testamento", "Biblia","Historia"],
    category: "Escritores",
    dificultad: 1,
    fortext: "Del Nuevo Testamento",
    words: [
      {
        category: "Evangelios",
        fortext: "El Verbo se hizo carne y habitó entre nosotros",
        words: ["MATEO", "MARCOS", "LUCAS", "JUAN"],
        help: ["discípulo de Jesús", "discípulo de Pedro", "discípulo de Pablo", "el discípulo amado"]
      },
      {
        category: "Hechos, cartas & profecías",
        fortext: "La formación de la Iglesia y explicación de los Evangelios",
        words: ["PABLO & PEDRO", "SANTIAGO & JUDAS", "LUCAS & JUAN"],
        help: ["cartas apostólicas principales", "cartas universales", "Hechos de los Apóstoles & Apocalipsis"]
      }
    ]
  },
  {
    tags: ["Catecismo", "Jesús"],
    category: "EL ES Hombre",
    dificultad: 2,
    fortext: "Vocaciones universales y personales a imagen de Jesús",
    words: [
      {
        category: "Ministerios Bautismales",
        fortext: "Cristo el ungido cumple su misión divina",
        words: ["SACERDOTE", "PROFETA", "REY"],
        help: ["... altar & víctima", "anuncia la verdad", "... de Israel & del Cielo"]
      },
      {
        category: "Profesiones",
        fortext: "Jesús trabaja por el cuerpo y por el alma de los Hombres",
        words: ["CARPINTERO & AGRICULTOR", "ABOGADO & JUEZ", "MAESTRO & LEGISLADOR", "MÉDICO & MILITAR"],
        help: ["trabaja la madera & siembra la palabra", "intercede & administra la justicia", "enseña & dicta preceptos", "... del alma & del espíritu"]
      }
    ]
  },
  {
    tags: ["Catecismo", "Antropología","Liturgia"],
    category: "Necesidades",
    dificultad: 2,
    fortext: "Del alma: tentaciones o bendiciones",
    words: [
      {
        category: "Cordiales",
        fortext: "Deseos de completud: una vida orientada a Dios o al mundo",
        words: ["PLACER", "POSEER", "PODER"],
        help: ["deseo de bienestar y gozo", "deseo de creación y crecimiento", "deseo de autoridad y libertad"]
      },
      {
        category: "Psicofísicas",
        fortext: "Arrepentimiento litúrgico: camino diario por la cornisa",
        words: ["PALABRA", "PENSAMIENTO", "OMISIÓN", "OBRA"],
        help: ["expresión social del lenguaje", "procesamiento de estímulos e información", "no hacer - dejar pasar", "moverse y hacer"]
      }
    ]
  },
  {
    tags: ["Oración", "María"],
    category: "El Rosario",
    dificultad: 4,
    fortext: "Oración Mariana",
    words: [
      {
        category: "Misterios",
        fortext: "Estructura principal de meditación",
        words: ["GOZOSOS", "LUMINOSOS", "DOLOROSOS", "GLORIOSOS"],
        help: ["encarnación e infancia", "vida pública de Jesús", "pasión y muerte", "resurrección y gloria"]
      },
      {
        category: "Cierre",
        fortext: "Invocaciones y plegarias finales",
        words: ["BENDITA sea tu PUREZA", "SALVE & REGINA", "LETANÍAS de la VIRGEN"],
        help: [
          "«eternamente lo sea, pues todo un Dios se recrea en tan graciosa belleza»",
          "«Señora abogada nuestra»",
          "al final del Rosario"
        ]
      }
    ]
  },
  {
    tags: ["Oración", "María", "Jesús"],
    category: "Misterios",
    dificultad: 4,
    fortext: "Del Rosario",
    words: [
      {
        category: "Gozosos",
        fortext: "El nacimiento y la infancia",
        words: ["ÁNGEL & MARÍA", "ISABEL & JUAN", "NIÑO & BELÉN", "TEMPLO & SIMEÓN", "JESÚS & DOCTORES"],
        help: ["«La Anunciación»", "«La Visitación»", "«El Nacimiento de Jesús»", "«La Presentación»", "«El Niño perdido y hallado»"]
      },
      {
        category: "Luminosos",
        fortext: "La manifestación del Reino",
        words: ["JORDÁN & BAUTISMO", "BODAS & VINO", "REINO & CONVERSIÓN", "MONTE & tres CARPAS", "PAN & CÁLIZ"],
        help: ["«Comienzo de la vida pública de Jesús»", "«El primer milagro»", "«El anuncio del Reino»", "«La Transfiguración»", "«La institución de la Eucaristía»"]
      },
      {
        category: "Dolorosos",
        fortext: "La Pasión de Cristo",
        words: ["HUERTO & ORACIÓN", "AZOTES & COLUMNA", "ESPINAS & CORONA", "CRUZ & CAMINO", "CRUZ & MUERTE"],
        help: ["«La agonía de Jesús»", "«La flagelación»", "«La coronación de espinas»", "«Jesús carga con la cruz»", "«La crucifixión»"]
      },
      {
        category: "Gloriosos",
        fortext: "La victoria y la gloria",
        words: ["SEPULCRO & VIDA", "CIELO & ASCENSIÓN", "FUEGO & ESPÍRITU", "CUERPO & ALMA", "CORONA & REINA"],
        help: ["«La Resurrección»", "«La Ascensión»", "«Pentecostés»", "«La Asunción de María»", "«La Coronación de María»"]
      }
    ]
  },
  {
    tags: ["Biblia","Nuevo Testamento","Evangelios", "Simbolismos","Fisica"],
    category: "Animales",
    dificultad: 1,
    fortext: "En los Evangelios",
    words: [
      {
        category: "Dios y sus amigos",
        fortext: "Representaciones de la docilidad y la inocencia",
        words: ["OVEJA & ASNO", "CORDERO & GUSANO", "GALLINA & PALOMA"],
        help: ["dócil & testarudo", "inocente & insignificante", "...protectora & ...de la paz"]
      },
      {
        category: "El enemigo y sus amigos",
        fortext: "Representaciones del peligro y la astucia",
        words: ["CERDO & PERRO", "LOBO & ESCORPIÓN", "SERPIENTE & ZORRO", "CABRA & BUITRE"],
        help: ["impuro & voraz", "depredador & venenoso", "astutos & ventajero", "...de montaña & carroñero"]
      }
    ]
  },
  {
    tags: ["Iglesia","Catecismo","Hodos"],
    category: "Consejos",
    dificultad: 2,
    fortext: "Vías de perfección cristiana",
    words: [
      {
        category: "Evangélicos",
        fortext: "Votos de abnegación renuncia y entrega",
        words: ["CASTIDAD", "POBREZA", "OBEDIENCIA"],
        help: ["renuncia a la unión carnal", "renuncia a los bienes materiales", "renuncia a la propia voluntad"]
      },
      {
        category: "Cuaresmales",
        fortext: "Prácticas ascéticas para predisponerse a Dios",
        words: ["LIMOSNA", "ORACIÓN", "AYUNO", "CONVERSIÓN"],
        help: ["compartir bienes", "diálogo con Dios", "privación", "cambio de vida"]
      }
    ]
  },
  {
    tags: ["Catecismo", "Espíritu Santo","Moral"],
    category: "Dones",
    dificultad: 2,
    fortext: "Regalos de Dios",
    words: [
      {
        category: "de la Trinidad",
        fortext: "Hitos en la historia del Hombre",
        words: ["SANTIFICACIÓN", "SALVACIÓN", "CREACIÓN"],
        help: ["obra del Espíritu Santo", "obra del Hijo", "obra del Padre"]
      },
      {
        category: "del Espíritu Santo",
        fortext: "El alma se llena de Dios",
        words: ["SABIDURÍA", "PIEDAD", "FORTALEZA", "TEMOR"],
        help: ["degustar lo divino", "devoción y clemencia", "soportar la prueba", "respeto a Dios"]
      }
    ]
  },
  {
    tags: ["Catecismo", "Moral","Antropología","Sociedad"],
    category: "Virtudes",
    dificultad: 1,
    fortext: "Capacidades aprendibles que nos acercan a Dios",
    words: [
      {
        category: "Teologales",
        fortext: "ejes de todo cristiano",
        words: ["FE", "ESPERANZA", "CARIDAD"],
        help: ["creer en Dios", "confiar en las promesas", "entregar la vida"]
      },
      {
        category: "Cardinales",
        fortext: "ejes de todo hombre (San Ambrosio)",
        words: ["PRUDENCIA", "JUSTICIA", "TEMPLANZA", "FORTALEZA"],
        help: ["discernimiento", "dar a cada uno lo suyo", "autocontrol", "fuerza interior"]
      }
    ]
  },
  {
    tags: ["Catecismo", "Moral"],
    category: "Pecados",
    dificultad: 2,
    fortext: "Acciones e intenciones que nos alejan de Dios",
    words: [
      {
        category: "Religiosos",
        fortext: "Ofensas contra la santidad divina",
        words: ["IDOLATRÍA", "PROFANACIÓN", "BLASFEMIA"],
        help: ["adorar lo creado", "tratar desacertadamente lo sagrado", "palabra injuriosa"]
      },
      {
        category: "Capitales",
        fortext: "Raíces de las tendencias desordenadas",
        words: ["GULA & AVARICIA", "ENVIDIA & IRA", "PEREZA & LUJURIA", "EGOCENTRISMO"],
        help: ["descontrol alimentario y de posesión", "tristeza del bien ajeno y furia", "desgane y descontrol sensual", "exceso de yo"]
      }
    ]
  },
  {
    tags: ["Biblia","Nuevo Testamento","Evangelios", "Jesús","Simbolismos"],
    category: "YO SOY",
    dificultad: 1,
    fortext: "Jesús se auto definió con estos símbolos",
    words: [
      {
        category: "del CIELO",
        fortext: "Atributos eternos y de salvación",
        words: ["RESURRECCIÓN & VIDA", "LUZ", "VIA & VERDAD"],
        help: ["...gloriosa & ...eterna", "...del mundo", "...y vida"]
      },
      {
        category: "del CAMPO",
        fortext: "Símbolos cotidianos y de sostén",
        words: ["PAN", "VID", "PASTOR", "PUERTA"],
        help: ["...de vida", "...verdadera", "el buen...", "...del corral"]
      }
    ]
  },
  {
    tags: ["Iglesia", "María"],
    category: "Fiestas Marianas",
    dificultad: 3,
    fortext: "celebraciones en el calendario",
    words: [
      {
        category: "TÍTULOS",
        fortext: "Bendita entre todas las mujeres",
        words: ["MADRE", "ESPOSA", "REINA"],
        help: ["...de la Iglesia", "...del Espíritu Santo", "...de la Creación"]
      },
      {
        category: "DOGMAS",
        fortext: "verdades de fe definitivas",
        words: ["MADRE", "VIRGEN", "INMACULADA", "ASUNTA"],
        help: ["...de Dios (Theotokos)", "...perpetua", "...concepción", "...a los cielos"]
      }
    ]
  },
  {
    tags: ["Iglesia","Oración", "María"],
    category: "Letanías Marianas",
    dificultad: 4,
    fortext: "Títulos y Virtudes",
    words: [
      {
        category: "MADRE de Dios",
        fortext: "Invocaciones a la morada del Salvador",
        words: ["ARCA", "TABERNÁCULO", "CASA & SEDE"],
        help: ["...de la alianza", "...de la eterna gloria", "...de oro & ...de la sabiduría"]
      },
      {
        category: "REINA de la Creación",
        fortext: "Invocaciones a la intercesora celestial",
        words: ["ESPEJO", "ROSA", "ESTRELLA", "REFUGIO & PUERTA"],
        help: ["...de justicia", "...mística", "...de la mañana", "...de los pecadores & ...del cielo"]
      }
    ]
  },
  {
    tags: ["Evangelios","Historia"],
    category: "Apóstoles",
    dificultad: 2,
    fortext: "Los 14 elegidos",
    words: [
      {
        category: "Los primeros 6",
        fortext: "4 hermanos y 2 amigos",

        words: ["PEDRO & ANDRÉS", "SANTIAGO & JUAN","FELIPE & BARTOLOMÉ"],
        help: ["pescadores de hombres", "hijos del trueno","(Jn 1) ven y verás"]
      },
      {
        category: "El resto",
        fortext: "Diversidad de carismas",
        words: [ "TOMÁS & MATEO", "SANTIAGO & TADEO", "SIMÓN & JUDAS", "PABLO & MATÍAS"],
        help: [ "el incrédulo & el publicano (rico)", "el menor (discreto) & Judas (reflexivo)", "el zelote (nacionalista) & el tesorero (traidor)", "perseguidor de cristianos & el elegido al azar"]
      }
    ]
  },
  {
    tags: ["Iglesia", "Liturgia","Historia","Hodos"],
    category: "Tiempo Litúrgico",
    dificultad: 1,
    fortext: "El calendario de la Iglesia",
    words: [
      {
        category: "Fiestas",
        fortext: "Grandes solemnidades de la salvación",
        words: ["NAVIDAD", "PASCUA", "PENTECOSTÉS"],
        help: ["nacimiento de Jesús", "resurrección del Señor", "venida del Espíritu Santo"]
      },
      {
        category: "Preparación",
        fortext: "Tiempos de espera",
        words: ["ORDINARIO", "ADVIENTO", "CUARESMA", "SEMANA Santa"],
        help: ["tiempo común", "espera de la venida", "cuarenta días de preparación", "pasión & muerte"]
      }
    ]
  },
  {
    tags: ["Biblia","Evangelios", "Jesús","Moral"],
    category: "Beatitúdines",
    dificultad: 1,
    fortext: "Dichosos los que (tienen) …",
    words: [
      {
        category: "Corazón",
        fortext: "Actitudes interiores bendecidas",
        words: ["corazón PURO", "corazón POBRE", "corazón MANSO"],
        help: ["porque verán a Dios", "porque a ellos les pertenece el Reino de los Cielos", "porque poseerán la tierra"]
      },
      {
        category: "Justicia",
        fortext: "Compromiso y prueba por la verdad",
        words: ["HAMBRE de justicia", "PERDONAN in-justicias", "TRABAJAN por la justicia", "SUFREN in-justicias"],
        help: ["y sed", "misericordiosas", "y la paz", "a causa de mi nombre"]
      }
    ]
  },
  {
    tags: ["Catecismo", "Simbolismos","Fisica"],
    category: "Naturaleza",
    dificultad: 1,
    fortext: "Símbolos de Dios",
    words: [
      {
        category: "Animales",
        fortext: "Criaturas con carga teológica",
        words: ["PALOMA", "LEÓN", "CORDERO"],
        help: ["...de la paz", "...de Judá", "...que quita el pecado del mundo"]
      },
      {
        category: "Elementos",
        fortext: "Fuerzas naturales reveladoras",
        words: ["LUZ", "AGUA", "AIRE", "FUEGO"],
        help: ["ilumina", "hidrata", "oxigena", "transforma"],
        PN: false
      }
    ]
  },
  {
    tags: ["Iglesia","Sociedad", "Moral"],
    category: "juicio Civil",
    dificultad: 3,
    fortext: "Variables de las que depende el juicio",
    words: [
      {
        category: "Punibilidad",
        fortext: "Condiciones de imputabilidad moral",
        words: ["CONCIENCIA", "GRAVEDAD", "CONSENTIMIENTO"],
        help: ["entendimiento", "venial o mortal", "intención"]
      },
      {
        category: "Agravamiento o Ayuda",
        fortext: "Elementos modificadores de la falta",
        words: ["CONTEXTO", "CONTRICIÓN", "CONDUCTA", "CONVERSIÓN"],
        help: ["circunstancia", "arrepentimiento", "premio", "transformación"]
      }
    ]
  },
  {
    tags: ["Biblia", "Historia"],
    category: "Embarazos Milagrosos",
    dificultad: 2,
    fortext: "Nombres de madres y/o hijos",
    words: [
      {
        category: "Nuevo Testamento",
        fortext: "Nacimientos del anuncio del Reino",
        words: ["ISABEL & JUAN", "MARÍA & JESÚS"],
        help: ["Familia de Zacarías", "Familia de José"]
      },
      {
        category: "Antiguo Testamento",
        fortext: "Nacimientos extraordinarios de la Alianza",
        words: ["ANA & SAMUEL", "SARA & ISAAC", "SANSÓN"],
        help: ["Consagrado al templo", "Familia de Abraham", "no le pueden cortar el pelo"]
      }
    ]
  },
  {
    tags: ["Logos","Catecismo", "Jesús"],
    category: "El ES Dios",
    dificultad: 2,
    fortext: "2da persona de la Trinidad",
    words: [
      {
        category: "LOGOS",
        fortext: "Traducciones del infinito (Jn 1,1-14)",
        words: ["PRINCIPIO & FIN", "SABIDURÍA", "VERBO", "PALABRA"],
        help: ["alpha & omega", "(Jn 1,3) sin ella no se hizo nada de todo lo que existe", "(Jn 1,14) ...se hizo carne y habitó entre nosotros", "(Jn 1,9) ...era la luz verdadera que ilumina a todo hombre"]
      },
      {
        category: "Dios & Hombre",
        fortext: "Alguién vio a Dios? (Jn 1,17-18)",
        words: ["JESUCRISTO", "hijo UNIGÉNITO", "DIOS"],
        help: ["Dios tiene 1 nombre y 1 rostro", "único engendrado que reveló a Dios", "nadie le vio jamás"]
      }
    ]
  },
  {
    tags: ["Evangelios","Nuevo Testamento", "Jesús"],
    category: "TU ERES",
    dificultad: 3,
    fortext: "Verdadero Dios & Verdadero Hombre",
    words: [
      {
        category: "Hijo de Dios",
        fortext: "Confesiones de FE",
        words: ["SEÑOR mio & DIOS mio", "CORDERO de Dios & SANTO de Dios", "SALVADOR & CRISTO"],
        help: ["confesado por Tomás el incrédulo", "confesado por Juan Bautista & Pedro & los demonios", "confesado por los samaritanos & Pedro & Andrés"]
      },
      {
        category: "Hijo del Hombre",
        fortext: "Reconocimiento histórico",
        words: ["Hijo de MARÍA & Hijo del CARPINTERO", "MAESTRO & PROFETA", "Hijo de ABRAHAM & Hijo de DAVID", "NAZARENO & REY de Israel"],
        help: ["dicho por los Nazarenos", "dicho por Natanael & la multitud", "dicho por Mateo & la multitud", "dicho por Natanael & los demonios"]
      }
    ]
  },
  {
    tags: ["Liturgia", "Oración", "Catecismo"],
    category: "Padre Nuestro",
    dificultad: 1,
    fortext: "peticiones por Dios o por el Hombre",
    words: [
      {
        category: "TEOCÉNTRICAS",
        fortext: "Orientadas a la gloria divina",
        words: ["NOMBRE", "REINO", "VOLUNTAD"],
        help: ["santificado sea tu...", "venga a nosotros tu...", "hágase tu..."]
      },
      {
        category: "ANTROPOCÉNTRICAS",
        fortext: "Orientadas a las necesidades humanas",
        words: ["PAN", "OFENSAS", "TENTACIÓN", "MALIGNO"],
        help: ["...de cada día", "perdona nuestras...", "no nos dejes caer en la...", "líbranos del..."]
      }
    ]
  },
  {
    tags: ["Iglesia", "Catecismo"],
    category: "1 Iglesia",
    dificultad: 2,
    fortext: "Cuerpo místico de Cristo (1 esposa)",
    words: [
      {
        category: "1 solo",
        fortext: "Unicidad & Unidad",
        words: ["SEÑOR & BAUTISMO & FE", "CUERPO & ESPÍRITU", "ALMA", "CARNE"],
        help: ["Credo largo - Efesios 4", "la Iglesia y Dios (Efesios 4)", "...entre los creyentes (Hechos)", "...entre varón y mujer"]
      },
      {
        category: "diversidad",
        fortext: "Variedad de dones comunitarios",
        words: ["LENGUAS", "CARISMAS", "MINISTERIOS"],
        help: ["idiomas", "dones espirituales", "servicios en la comunidad"]
      }
    ]
  },
  {
    tags: ["Logos", "Biblia","Nuevo Testamento","Evangelios"],
    category: "Griego",
    dificultad: 3,
    fortext: "El idioma de los evangelios",
    words: [
      {
        category: "DIVINO & HUMANO",
        fortext: "Términos filosóficos y teológicos",
        words: ["LOGOS & LÓGICA", "THEOS & ÁNTROPOS", "URANOS & KOSMOS", "KAIROS & CRONOS"],
        help: ["sabiduría de dios & del hombre", "dios & hombre", "cielo & mundo", "tiempo denso & cíclico"]
      },
      {
        category: "VIEJO & NUEVO",
        fortext: "Conceptos de la existencia y vida",
        words: ["SARX & SOMA", "BIOS & ZOE", "PSIQUE & PNEUMA"],
        help: ["carne & cuerpo", "vida corrompible & eterna", "alma (ánima) & espíritu (soplo)"]
      }
    ]
  },
  {
    tags: [ "Hodos","Logos","Catequesis"],
    category: "Theosis",
    dificultad: 3,
    fortext: "Vías de participación de la naturaleza divina",
    words: [
      {
        category: "Bíblicas",
        fortext: "Hitos bíblicos de revelación",
        words: ["GÉNESIS", "KENOSIS", "APOCALIPSIS"],
        help: ["nacimiento-origen", "abajamiento", "revelación"]
      },
      {
        category: "conversión",
        fortext: "Pasos en el camino espiritual",
        words: ["PRAXIS", "CATARSIS", "ASCESIS", "GNOSIS"],
        help: ["práctica", "purificación", "disciplina", "conocimiento"]
      }
    ]
  },
  {
    tags: ["Liturgia", "Iglesia"],
    category: "Ofrendas",
    dificultad: 2,
    fortext: "dones del Hombre a Dios",
    words: [
      {
        category: "Pesebre",
        fortext: "Regalos de los Reyes Magos",
        words: ["ORO", "INCIENSO", "MIRRA"],
        help: ["porque Jesús es Rey", "porque Jesús es Dios y ascenderá al Cielo", "porque Jesús es Hombre y sufrirá una muerte."]
      },
      {
        category: "Misa",
        fortext: "Entregas en la Eucaristía",
        words: ["TIEMPO & DINERO", "TRABAJO & FATIGA", "CUERPO & SANGRE", "ALABANZA & AGRADECIMIENTO"],
        help: ["lo valioso de este mundo", "...de la jornada", "...de Cristo - Memorial del Sacrificio incruento", "frutos de la alegría"]
      }
    ]
  },
  {
    tags: ["Iglesia","Logos","Simbolismos","Catequesis"],
    category: "UNO",
    dificultad: 2,
    fortext: "Expresiones del entero",
    words: [
      {
        category: "CREADOR & CRIATURA",
        fortext: "Unicidad en la Creación y el Hijo",
        words: ["ÚNICO", "UNIGÉNITO", "UNIVERSO"],
        help: ["Dios trino y ...", "(1Jn 4,9) Dios ha enviado a su Hijo…", "La única versión de La Creación"]
      },
      {
        category: "IGLESIA",
        fortext: "Unidad del pueblo congregado",
        words: ["UNÁNIME", "UNIVERSIDAD", "UNIVERSAL", "UNIDAD"],
        help: ["(Hch 4,32) Eran una sola alma", "Institución de estudios superiores", "católico", "... en la diversidad representada por la cabeza"]
      }
    ]
  },
  {
    tags: ["Catecismo", "Moral","Antropología"],
    category: "Facultades",
    dificultad: 3,
    fortext: "y características constitutivas del ser humano",
    words: [
      {
        category: "Teológicas",
        fortext: "de los hijos de Dios (imagen & semejanza)",
        words: ["INTELIGENCIA", "CONCIENCIA", "VOLUNTAD", "DIGNIDAD"],
        help: [
          "imagen & semejanza de la OMNIsapiencia de Dios",
          "imagen & semejanza de la OMNIpresencia de Dios",
          "imagen & semejanza de la OMNIpotencia de Dios",
          "imagen & semejanza de Dios Hijo"
        ]
      },
      {
        category: "Antropológicas",
        fortext: "de los hijos de Adán (frutos del pecado)",
        words: ["DEPENDENCIA", "ERRANCIA", "CONCUPISCENCIA"],
        help: [
          "sin ayuda de otros no podemos",
          "Pecadores",
          "Debilidad"
        ]
      }
    ]
  },
  {
    tags: ["Biblia", "Antiguo Testamento"],
    category: "Geografía",
    dificultad: 2,
    fortext: "en la Tierra Prometida",
    words: [
      {
        category: "Agradables",
        fortext: "Lugares de bendición y vida",
        words: ["JARDÍN", "BOSQUE", "CAMPO", "RÍO"],
        help: ["...del Edén", "...del Líbano", "...de trigo", "...Jordán"]
      },
      {
        category: "Hostiles",
        fortext: "Lugares de prueba y retiro",
        words: ["DESIERTO", "MAR", "MONTE"],
        help: ["...de Judea", "...de Galilea (lago)", "...Tabor"]
      }
    ]
  },
  {
    tags: ["Evangelios", "Nuevo Testamento","Jesús"],
    category: "Lugares",
    dificultad: 2,
    fortext: "visitados por Jesús",
    words: [
      {
        category: "Tierra",
        fortext: "Escenarios urbanos, protegidos",
        words: ["CIUDAD", "TEMPLO", "CASA", "HUERTO"],
        help: ["...amurallada", "...de Jerusalén", "...de la suegra de Pedro", "...de los olivos"]
      },
      {
        category: "Agua",
        fortext: "Dulce vs Salada",
        words: ["POZO", "BARCA", "PISCINA"],
        help: ["...de Jacob", "...de los pescadores", "...de Betesda"]
      }
    ]
  },
  {
    tags: ["Catecismo", "Espíritu Santo","Moral"],
    category: "Frutos",
    dificultad: 4,
    fortext: "del Espíritu Santo",
    words: [
      {
        category: "Vida interior",
        fortext: "Dios dentro de uno",
        words: ["CONTINENCIA & TEMPLANZA", "MODESTIA & HUMILDAD", "MAGNANIMIDAD & LONGANIMIDAD", "PAZ & GOZO"],
        help: [
          "dominio de sí",
          "No agrandar las capacidades personales y reconocimiento de los propios límites",
          "alma grande & perseverante",
          "armonía & felicidad"
        ]
      },
      {
        category: "Vínculo fraterno",
        fortext: "reflejo divino en la relación con el prójimo",
        words: ["BONDAD & BENEVOLENCIA", "AFABILIDAD & GENEROSIDAD", "MANSEDUMBRE & ALEGRÍA", "FIDELIDAD & PACIENCIA"],
        help: [
          "hacer & querer el bien",
          "buen trato & entrega desinteresada",
          "no genera problemas & contagia una sonrisa",
          "permanencia & tolerancia"
        ]
      }
    ]
  },
  {
    tags: ["Sociedad", "Historia", "Espíritu Santo"],
    category: "Religiones",
    dificultad: 1,
    fortext: "y filosofías de vida",
    words: [
      {
        category: "Monoteístas",
        fortext: "Fe en el Dios de Abraham",
        words: ["CRISTIANISMO", "JUDAÍSMO", "ISLAM"],
        help: ["✝️ dios uno & trino", "✡️ pueblo elegido", "☪️ siervos de Dios"]
      },
      {
        category: "Pre-cristianas",
        fortext: "Tradiciones antiguas y espiritualidades",
        words: ["TAOÍSMO", "BUDISMO", "HINDUÍSMO", "POLITEÍSMO griego"],
        help: ["☯️ parte del todo", "☸️ nirvana", "🕉️ intimidad con Dios", "🏛️ drama mitológico"]
      }
    ]
  },
  {
    tags: ["Iglesia", "Catecismo", "Oración", "Espíritu Santo","Liturgia"],
    category: "Creo en el Espíritu Santo",
    dificultad: 2,
    fortext: "Profesión de fe",
    words: [
      {
        category: "Credo Niceno Constantinopolitano",
        fortext: "Afirmaciones de la fe ecuménica",
        words: ["PROCEDE", "misma ADORACIÓN & GLORIA", "HABLÓ"],
        help: ["...del Padre y del Hijo (Filioqué)", "que el Padre y el Hijo", "por los Profetas"]
      },
      {
        category: "Credo de los Apóstoles",
        fortext: "Síntesis del bautismo apostólico",
        words: ["santa IGLESIA", "COMUNIÓN", "PERDÓN", "RESURRECCIÓN"],
        help: ["católica", "...de los SANTOS", "...de los PECADOS", "...de la carne"]
      }
    ]
  },
  {
    tags: ["Iglesia", "Catecismo", "Jesús", "Oración","Liturgia"],
    category: "Creo en Jesucristo",
    dificultad: 2,
    fortext: "Profesión de fe",
    words: [
      {
        category: "Credo Niceno Constantinopolitano",
        fortext: "Dogmas sobre el Hijo",
        words: ["ENGENDRADO", "ENCARNÓ", "misma NATURALEZA"],
        help: ["no creado", "en el seno de María", "del Padre"]
      },
      {
        category: "Credo de los Apóstoles",
        fortext: "Misterio pascual y venida final",
        words: ["fue CRUCIFICADO", "RESUCITÓ", "está SENTADO", "venir a JUZGAR"],
        help: ["...muerto y sepultado", "...de entre los muertos", "...a la derecha de Dios Padre", "...a vivos y muertos"]
      }
    ]
  },
  {
    tags: ["Biblia", "Antiguo Testamento","Historia"],
    category: "Hebreos elegidos",
    dificultad: 2,
    fortext: "para preparar la llegada del Mesías",
    words: [
      {
        category: "Ancestros",
        fortext: "Dios elige para su Hijo un pueblo, un linaje, una tierra",
        words: ["ABRAHAM", "DAVID", "ZOROBABEL"],
        help: [
          "de Pastor a Patriarca - 1er Altar - prefiguró el sacerdocio de Jesús",
          "de Pastor a Rey - 1er Templo - prefiguró la realeza de Jesús",
          "de exiliado a gobernador - 2do Templo - prefiguró la resurrección de Jesús"
        ]
      },
      {
        category: "Profetas",
        fortext: "Dios elige para su pueblo anunciadores de Su Palabra",
        words: ["MOISÉS", "ELÍAS", "JEREMÍAS", "JUAN"],
        help: [
          "anunció la liberación de Israel & prefiguró la Ley de Jesús",
          "anunció al Dios verdadero & prefiguró la Ascensión de Jesús",
          "anunció la condenación de Judá & prefiguró el sufrimiento de Jesús",
          "anunció la llegada del Mesías & prefiguró la parresía de Jesús"
        ]
      }
    ]
  },
  {
    tags: ["Catequesis", "Sacramentos"],
    category: "Desarrollo Cristiano",
    dificultad: 1,
    fortext: "etapas evolutivas en la vida de fe",
    words: [
      {
        category: "Sacramental",
        fortext: "hitos con la iglesia",
        words: [
          "BAUTISMO & RECONCILIACIÓN",
          "COMUNIÓN",
          "CONFIRMACIÓN & UNCIÓN",
          "CONSAGRACIÓN"
        ],
        help: [
          "Morir en la cruz - nacer en Cristo",
          "Alimento de la fe - Sacrificio pascual",
          "Expresión de palabras y obras - Vida pentecostal",
          "Alianza con Dios - Vida restringida en el mundo, abierta en el cielo"
        ]
      },
      {
        category: "Personal",
        fortext: "crecimiento en santidad",
        words: ["CONVERSIÓN", "FORMACIÓN", "MISIÓN"],
        help: [
          "cambios que nos acercan a vivir según Dios",
          "contemplación de los misterios de Dios",
          "vivir para Dios - servirlo"
        ]
      }
    ]
  },
  {
    tags: ["Antropología", "Sacramentos"],
    category: "Desarrollo Humano",
    dificultad: 2,
    fortext: "etapas evolutivas & sacramentos característicos",
    words: [
      {
        category: "Biológico",
        fortext: "crecimiento del cuerpo físico",
        words: [
          "INFANCIA & BAUTISMO",
          "NIÑEZ & COMUNIÓN",
          "ADOLESCENCIA & CONFIRMACIÓN"
        ],
        help: [
          "desarrollo de la motricidad & escucha & locución",
          "desarrollo de la lectura & escritura & costumbres",
          "desarrollo de la sexualidad & moralidad & amistad"
        ]
      },
      {
        category: "Espiritual",
        fortext: "maduración del alma",
        words: [
          "JUVENTUD & CONSAGRACIÓN",
          "ADULTEZ & RECONCILIACIÓN",
          "ANCIANIDAD & UNCIÓN"
        ],
        help: [
          "etapa de elecciones & emancipación",
          "etapa de trabajo & servicio",
          "etapa de descanso & reflexión"
        ]
      }
    ]
  }
];