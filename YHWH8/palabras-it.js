// Dati del gioco. Ogni categoria principale dovrebbe avere 7 parole.
export const WORD_DATA = [
  {
    category: "Sacramenti",
    dificultad: 1,
    fortext: "Segni efficaci della grazia",
    words: [
      {
        category: "Iniziazione",
        words: ["BATTESIMO", "EUCARESTIA", "CONFERMAZIONE"],
        help: ["porta della fede", "corpo di Cristo", "sigillo dello Spirito"]
      },
      {
        category: "Guarigione e comunione",
        words: ["ORDINE sacerdotale", "UNZIONE degli infermi", "MATRIMONIO", "RICONCILIAZIONE"],
        help: ["consacrazione", "sollievo corporale e spirituale", "unione coniugale", "perdono dei peccati"]
      }
    ]
  },
  {
    category: "Genesi in 7 giorni",
    dificultad: 1,
    fortext: "Il racconto della Creazione",
    words: [
      {
        category: "Creazione dello spazio-tempo",
        words: ["GIORNO & NOTTE", "CIELO & TERRA", "TERRA & MARE"],
        help: ["ciclo del tempo", "firmamento", "superficie e acque"]
      },
      {
        category: "Creazione del contenuto",
        words: ["SOLE & LUNA", "UCELLI & MOSTRI", "RETTILI & UMANI", "RIPOSO & SANTIFICAZIONE"],
        help: ["luminari", "cielo e mare", "terra ferma", "settimo giorno"]
      }
    ]
  },
  {
    category: "Ministeri",
    dificultad: 2,
    fortext: "Chiamate e professioni",
    words: [
      {
        category: "Battesimali",
        words: ["SACERDOTE", "PROFETA", "RE"],
        help: ["mediatore", "annuncia la parola", "serve e governa"]
      },
      {
        category: "Professionali",
        words: ["AGRICOLTORE", "MEDICO", "MAESTRO", "MILITARE"],
        help: ["lavora la terra", "cura i malati", "insegna", "difende"]
      }
    ]
  },
  {
    category: "Consigli",
    dificultad: 2,
    fortext: "Vie di perfezione cristiana",
    words: [
      {
        category: "Evangelici",
        words: ["CASTITÀ", "POVERTÀ", "OBBEDIENZA"],
        help: ["amore puro", "distacco", "ascolto della volontà"]
      },
      {
        category: "Quaresimali",
        words: ["ELEMOSINA", "PREGHIERA", "DIGIUNO", "CONVERSIONE"],
        help: ["condividere i beni", "dialogo con Dio", "privazione", "cambiamento di vita"]
      }
    ]
  },
  {
    category: "Doni",
    dificultad: 2,
    fortext: "Regali",
    words: [
      {
        category: "Della Trinità",
        words: ["SANTIFICAZIONE", "SALVEZZA", "CREAZIONE"],
        help: ["opera dello Spirito Santo", "opera del Figlio", "opera del Padre"]
      },
      {
        category: "Dello Spirito Santo",
        words: ["SAPIENZA", "PIETÀ", "FORTEZZA", "TIMORE"],
        help: ["gusto per il divino", "affetto filiale", "forza nella prova", "rispetto per Dio"]
      }
    ]
  },
  {
    category: "Virtù",
    dificultad: 1,
    fortext: "Capacità apprendibili che ci avvicinano a Dio",
    words: [
      {
        category: "Teologali",
        words: ["FEDE", "SPERANZA", "CARITÀ"],
        help: ["credere in Dio", "confidare nelle promesse", "donare la vita"]
      },
      {
        category: "Cardinali",
        words: ["PRUDENZA", "GIUSTIZIA", "TEMPERANZA", "FORTEZZA"],
        help: ["discernimento", "dare a ciascuno il suo", "autocontrollo", "forza interiore"]
      }
    ]
  },
  {
    category: "Opere di cuore spirituali",
    dificultad: 2,
    fortext: "Misericordia nell'azione",
    words: [
      {
        category: "Invisibili",
        words: ["INTERCEDERE", "CONSOLARE", "TOLLERARE"],
        help: ["pregare per gli altri", "donare conforto", "sopportare con pazienza"]
      },
      {
        category: "Concrete",
        words: ["INSEGNARE", "PERDONARE", "CONSIGLIARE", "CORREGGERE"],
        help: ["dare istruzione", "concedere l'indulgenza", "orientare", "correggere con amore"]
      }
    ]
  },
  {
    category: "Peccati",
    dificultad: 2,
    fortext: "Azioni e intenzioni che ci allontanano da Dio",
    words: [
      {
        category: "Religiosi",
        words: ["IDOLATRIA", "PROFANAZIONE", "BESTEMMIA"],
        help: ["adorare il creato", "trattare impropriamente il sacro", "parola ingiuriosa"]
      },
      {
        category: "Capitali",
        words: ["GOLA & AVARIZIA", "INVIDIA & IRA", "PIGRIZIA & LUSSURIA", "EGOCENTRISMO"],
        help: ["sregolatezza nel cibo e nel possesso", "tristezza per il bene altrui e furia", "svogliatezza e sregolatezza sensuale", "eccesso di sé"]
      }
    ]
  },
  {
    category: "Io Sono",
    dificultad: 1,
    fortext: "Gesù si è autodefinito con questi simboli.",
    words: [
      {
        category: "",
        words: ["RISURREZIONE", "LUCE", "PASTORE"],
        help: ["gloriosa", "del mondo", "il buon ..."]
      },
      {
        category: "Via, Verità e Vita",
        words: ["PANE", "VITE", "VIA & VERITÀ & VITA", "PORTA"],
        help: ["di vita", "vera", "", "del recinto"]
      }
    ]
  },
  {
    category: "Maria",
    dificultad: 3,
    fortext: "Titoli e virtù",
    words: [
      {
        category: "Dogmi",
        words: ["MADRE & VERGINE", "FIGLIA & IMMACOLATA", "SPOSA & REGINA"],
        help: ["...di Dio Figlio & ...castissima", "...di Dio Padre & ...concezione", "...dello Spirito Santo & ...della creazione"]
      },
      {
        category: "Litanie",
        words: ["SPECCHIO & SEDE", "ARCA & CASA", "RIFUGIO & PORTA", "ROSA & STELLA"],
        help: ["...di giustizia & ...della sapienza", "...dell'alleanza & ...d'oro", "...dei peccatori & ...del cielo", "...mistica & ...del mattino"]
      }
    ]
  },
  {
    category: "Apostoli",
    dificultad: 2,
    fortext: "I dodici inviati",
    words: [
      {
        category: "I primi e gli ultimi Chiamati",
        words: ["PIETRO & ANDREA", "GIACOMO & GIOVANNI", "PAOLO & MATTIA"],
        help: ["pescatori di uomini", "figli del tuono", "apostolo dei gentili ed eletto a sorte"]
      },
      {
        category: "Compagni di Missione",
        words: ["FILIPPO & BARTOLOMEO", "TOMMASO & MATTEO", "GIACOMO & TADDEO", "SIMONE & GIUDA"],
        help: ["vieni e vedi", "l'incredulo e il pubblicano", "il minore e Giuda", "il cananeo e il traditore"]
      }
    ]
  },
  {
    category: "Comandamenti",
    dificultad: 1,
    fortext: "Leggi dell'Alleanza",
    words: [
      {
        category: "In positivo",
        words: ["AMARE Dio", "SANTIFICARE", "RISPETTARE"],
        help: ["primo comandamento", "le feste", "padre e madre"]
      },
      {
        category: "Proibito",
        words: ["proibito UCCIDERE", "prohibito RUBARE", "prohibito ADULTERARE", "prohibito MENTIRE"],
        help: ["attentare alla vita", "prendere ciò che è altrui", "rompere l'alleanza matrimoniale", "dire falsa testimonianza"]
      }
    ]
  },
  {
    category: "Amore",
    dificultad: 1,
    fortext: "Il comandamento principale e le sue manifestazioni",
    words: [
      {
        category: "Comandamenti",
        words: ["amare DIO", "amare il PROSSIMO", "amore PROPRIO"],
        help: ["con tutto il cuore", "come te stesso", "autostima e cura di sé"]
      },
      {
        category: "Misericordia",
        words: ["CARITÀ", "PERDONO", "COMPASSIONE", "PIETÀ"],
        help: ["amore in azione", "cancellare i debiti", "soffrire con l'altro", "devozione del cuore"]
      }
    ]
  },
  {
    category: "Tempo Liturgico",
    dificultad: 1,
    fortext: "Il calendario della Chiesa",
    words: [
      {
        category: "Feste",
        words: ["NATALE", "PASQUA", "PENTECOSTE"],
        help: ["nascita di Gesù", "risurrezione del Signore", "venuta dello Spirito Santo"]
      },
      {
        category: "Preparazione",
        words: ["ORDINARIO", "AVVENTO", "QUERESIMA", "SETTIMANA Santa"],
        help: ["tempo comune", "attesa della venuta", "quaranta giorni di preparazione", "passione, morte e risurrezione"]
      }
    ]
  },
  {
    category: "Beatitudini",
    dificultad: 1,
    fortext: "Beati quelli che (hanno) …",
    words: [
      {
        category: "Cuore",
        words: ["cuore PURO", "cuore POVERO", "cuore MITE"],
        help: ["perché vedranno Dio", "perché di essi è il Regno dei Cieli", "perché erediteranno la terra"]
      },
      {
        category: "Giustizia",
        words: ["FAME di giustizia", "PERDONANO ingiustizie", "LAVORANO per la giustizia", "SOFFRONO ingiustizie"],
        help: ["e sete", "misericordiosi", "e la pace", "a causa del mio nome"]
      }
    ]
  },
  {
    category: "Natura",
    dificultad: 1,
    fortext: "Simboli di Dio",
    words: [
      {
        category: "Animali",
        words: ["COLOMBA", "LEONE", "AGNELLO"],
        help: ["della pace", "di Giuda", "che toglie il peccato del mondo"]
      },
      {
        category: "Elementi",
        words: ["LUCE", "ACQUA", "ARIA", "FUOCO"],
        help: ["illumina", "idrata", "ossigena", "trasforma"],
        PN: false
      }
    ]
  },
  {
    category: "Giudizio",
    dificultad: 3,
    fortext: "Variabili da cui dipende il giudizio",
    words: [
      {
        category: "Punibilità",
        words: ["COSCIENZA", "GRAVITÀ", "CONSENSO"],
        help: ["intelletto", "veniale o mortale", "intenzione"]
      },
      {
        category: "Aggravamento o Aiuto",
        words: ["CONTESTO", "CONTRIZIONE", "CONDOTTA", "CONVERSIONE"],
        help: ["circostanza", "pentimento", "premio", "trasformazione"]
      }
    ]
  },
  {
    category: "Gravidanze Miracolose",
    dificultad: 3,
    fortext: "Nomi di madri e/o figli",
    words: [
      {
        category: "Nuovo Testamento",
        words: ["ELISABETTA & GIOVANNI", "MARIA & GESÙ"],
        help: ["Famiglia di Zaccaria", "Famiglia di Giuseppe"]
      },
      {
        category: "Vecchio Testamento",
        words: ["ANNA & SAMUELE", "SARA & ISACCO"],
        help: ["Consacrato al tempio", "Famiglia di Abramo"]
      }
    ]
  }
];
