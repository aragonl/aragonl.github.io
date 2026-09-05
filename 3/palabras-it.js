// Dati del gioco in Italiano
export const WORD_DATA = [
  {
    tags: ["Catechismo", "Sacramenti"],
    category: "Sacramenti",
    dificultad: 1,
    fortext: "Segni efficaci della grazia",
    words: [
      {
        category: "Iniziazione",
        fortext: "Fondamenti della vita cristiana",
        words: ["BATTESIMO", "EUCARISTIA", "CRESIMA"],
        help: ["porta della fede", "corpo di Cristo", "sigillo dello Spirito"]
      },
      {
        category: "Guarigione e consacrazione",
        fortext: "Guarigione dell'anima e vocazione al servizio",
        words: ["ORDINE sacerdotale", "UNZIONE", "MATRIMONIO", "RICONCILIAZIONE"],
        help: ["consacrazione sacerdotale", "...degli infermi: sollievo & fortezza", "consacrazione coniugale", "perdono dei peccati"]
      }
    ]
  },
  {
    tags: ["Bibbia", "Antico Testamento", "Fisica"],
    category: "Genesi in 7 giorni",
    dificultad: 2,
    fortext: "Il racconto della Creazione",
    words: [
      {
        category: "SPAZIO & TEMPO",
        fortext: "Ordinamento del cosmo",
        words: ["GIORNO & NOTTE", "CIELO & SUOLO", "TERRA & MARE", "RIPOSO & SANTIFICAZIONE"],
        help: ["ciclo del tempo", "firmamento sopra & sotto", "superficie & acque", "settimo giorno"]
      },
      {
        category: "CONTENUTO",
        fortext: "Creazione e creature al servizio dell'Uomo",
        words: ["ERBE & ALBERI", "SOLE & LUNA", "UCCELLI & MOSTRI", "RETTILI & UMANI"],
        help: ["...che producano semi e frutti", "luminari", "...del cielo & ...del mare", "terra ferma"]
      }
    ]
  },
  {
    tags: ["Bibbia", "Antico Testamento", "Morale"],
    category: "Il Decalogo",
    dificultad: 1,
    fortext: "Leggi della 1a Alleanza",
    words: [
      {
        category: "PRECETTI",
        fortext: "Doveri verso i nostri creatori",
        words: ["AMARE", "SANTIFICARE", "ONORARE"],
        help: ["...Dio", "...le feste", "...padre e madre"]
      },
      {
        category: "DIVIETI",
        fortext: "Limiti che proteggono la sfera privata",
        words: ["non UCCIDERE", "non RUBARE", "non COMMETTERE ADULTERIO", "non MENTIRE"],
        help: ["attentare alla vita", "prendere ciò che è altrui", "rompere l'alleanza matrimoniale", "dire falsa testimonianza"]
      }
    ]
  },
  {
    tags: ["Bibbia", "Nuovo Testamento", "Morale"],
    category: "Amore",
    dificultad: 1,
    fortext: "Il comandamento principale",
    words: [
      {
        category: "Amore Trinitario",
        fortext: "a somiglianza di Dio",
        words: ["amare DIO", "amare il PROSSIMO", "amore PROPRIO"],
        help: ["...con tutto il cuore", "...come te stesso", "autostima e cura personale"]
      },
      {
        category: "Amore Misericordioso",
        fortext: "la miseria muove il cuore",
        words: ["CARITÀ", "PERDONO", "COMPASSIONE", "PIETÀ"],
        help: ["amore in azione", "cancellare i debiti", "soffrire con/per l'altro", "clemenza"]
      }
    ]
  },
  {
    tags: ["Catechismo", "Morale"],
    category: "Opere di cuore spirituali",
    dificultad: 1,
    fortext: "Risolvere bisogni sottili",
    words: [
      {
        category: "COMPASSIONEVOLI",
        fortext: "la miseria muove il cuore",
        words: ["INTERCEDERE", "CONSOLARE", "SOPPORTARE", "PERDONARE"],
        help: ["pregare per gli altri", "dare incoraggiamento", "soffrire con pazienza", "liberare dalla colpa"]
      },
      {
        category: "COMPORTAMENTALI",
        fortext: "la miseria muove la parola",
        words: ["INSEGNARE", "CONSIGLIARE", "CORREGGERE"],
        help: ["dare istruzione", "orientare", "indicare l'errore"]
      }
    ]
  },
  {
    tags: ["Catechismo", "Morale"],
    category: "Opere di cuore corporali",
    dificultad: 1,
    fortext: "Risolvere bisogni urgenti",
    words: [
      {
        category: "ASSISTENZIALI",
        fortext: "risolvere bisogni materiali",
        words: ["NUTRIRE", "DISSETARE", "VESTIRE", "ALLOGGIARE"],
        help: ["dare cibo", "dare da bere", "dare vestiti", "dare rifugio"]
      },
      {
        category: "PRESENZIALI",
        fortext: "risolvere bisogni emotivo-spirituali",
        words: ["visitare il MALATO", "visitare il CARCERATO", "SEPPELLIRE"],
        help: ["debole di salute", "privato della libertà", "dare sepoltura"]
      }
    ]
  },
  {
    tags: ["Bibbia", "Antico Testamento", "Storia"],
    category: "Padri e Figli",
    dificultad: 2,
    fortext: "Nell'Antico Testamento",
    words: [
      {
        category: "Genesi",
        fortext: "I primi eletti di Dio",
        words: ["ADAMO & ABELE", "NOÈ & SEM", "ABRAMO & ISACCO"],
        help: ["il primo Uomo & il primo Santo", "Costruttori dell'arca", "I primi patriarchi"]
      },
      {
        category: "Israeliti",
        fortext: "Dalle 12 tribù al regno unito",
        words: ["GIACOBBE & GIUDA", "SAUL & GIONATA", "DAVIDE & SALOMONE"],
        help: ["Israele & suo figlio il Leone", "il primo Re & l'amico di Davide", "I costruttori del Tempio di Dio"]
      }
    ]
  },
  {
    tags: ["Bibbia", "Vangeli", "Nuovo Testamento", "Storia"],
    category: "Figlio di …",
    dificultad: 2,
    fortext: "Nei Vangeli",
    words: [
      {
        category: "Figli unici",
        fortext: "Vocazioni singolari",
        words: ["GIOVANNI figlio di ZACCARIA", "NATANAÈLE figlio di TIMEO", "GESÙ figlio di GIUSEPPE"],
        help: ["il più grande tra gli Uomini, figlio del sacerdote", "vero Israelita, figlio dell'onorevole", "vero Dio, figlio del falegname"]
      },
      {
        category: "Fratelli Pescatori",
        fortext: "... di uomini",
        words: ["SIMONE figlio di GIOVANNI", "ANDREA figlio di GIOVANNI", "GIOVANNI figlio di ZEBEDEO", "GIACOMO figlio di ZEBEDEO"],
        help: [
          "il discepolo principale, figlio di un pescatore il cui nome significa Dio è misericordioso",
          "fratello di Pietro, figlio di un pescatore il cui nome significa Dio è misericordioso",
          "il discepolo amato, figlio di un pescatore il cui nome significa dono di Dio",
          "fratello di Giovanni, figlio di un pescatore il cui nome significa dono di Dio"
        ]
      }
    ]
  },
  {
    tags: ["Bibbia", "Vangeli", "Nuovo Testamento", "Storia"],
    category: "Intercessione Paterna",
    dificultad: 4,
    fortext: "Pregare per un 'figlio'",
    words: [
      {
        category: "Per la VITA",
        fortext: "La supplica di fronte alla morte",
        words: ["il SACERDOTE chiede un figlio (PROFETA)", "GIAIRO chiede per la figlia MORTA", "il FUNZIONARIO chiede per il figlio MORIBONDO", "la VEDOVA chiede per il figlio MORTO"],
        help: [
          "«Zaccaria, la tua preghiera è stata esaudita» — L'angelo annuncia la nascita di Giovanni",
          "«Non temere, soltanto abbi fede» — Gesù ridona la vita alla figlia del capo della sinagoga",
          "«Tuo figlio vive» — Il padre supplica Gesù e il figlio viene guarito a distanza",
          "«Ragazzo, dico a te, alzati!» — Gesù si compassiona della madre e ridona la vita al figlio"
        ]
      },
      {
        category: "Per la SALUTE",
        fortext: "La supplica di fronte alla malattia",
        words: ["la CANANEA chiede per la figlia INDEMONIATA", "un UMILE chiede per il figlio POSSEDUTO", "il CENTURIONE chiede per il servo PARALITICO"],
        help: [
          "«Donna, grande è la tua fede!» — La madre intercede e la figlia viene liberata",
          "«Credo; aiuta la mia incredulità» — Il padre si presenta a Gesù riconoscendo la fragilità della sua fede",
          "«Non sono degno che tu entri sotto il mio tetto» — Il soldato romano intercede e il servo guarisce"
        ]
      }
    ]
  },
  {
    tags: ["Bibbia", "Vangeli", "Nuovo Testamento", "Storia"],
    category: "Comunità",
    dificultad: 4,
    fortext: "Nei Vangeli",
    words: [
      {
        category: "Ebrei",
        fortext: "Gerusalemme come città Santa",
        words: ["FARISEI & SADDUCEI", "SCRIBI & PUBBLICANI", "ZELOTI & ERODIANI", "LEVITI & SACERDOTI"],
        help: ["esistono gli angeli & la risurrezione?", "la Legge & le tasse", "gruppi politici", "discendenti di Levi"]
      },
      {
        category: "Gentili",
        fortext: "Nazioni / popoli stranieri",
        words: ["PAGANI & SAMARITANI", "ROMANI & GRECI", "CANANEI & FENICI"],
        help: ["culti diversi & popolo rivale", "impero dominatore & cultura ellenica", "antichi popoli di Canaan e della costa"]
      }
    ]
  },
  {
    tags: ["Nuovo Testamento", "Biblia", "Storia"],
    category: "Scrittori",
    dificultad: 1,
    fortext: "Del Nuovo Testamento",
    words: [
      {
        category: "Vangeli",
        fortext: "Il Verbo si fece carne e venne ad abitare in mezzo a noi",
        words: ["MATTEO", "MARCO", "LUCA", "GIOVANNI"],
        help: ["discepolo di Gesù", "discepolo di Pietro", "discepolo di Paolo", "il discepolo amato"]
      },
      {
        category: "Atti, lettere & profezie",
        fortext: "La formazione della Chiesa e spiegazione dei Vangeli",
        words: ["PAOLO & PIETRO", "GIACOMO & GIUDA", "LUCA & GIOVANNI"],
        help: ["lettere apostoliche principali", "lettere cattoliche", "Atti degli Apostoli & Apocalisse"]
      }
    ]
  },
  {
    tags: ["Catechismo", "Gesù"],
    category: "EGLI È Uomo",
    dificultad: 2,
    fortext: "Vocazioni universali e personali ad immagine di Gesù",
    words: [
      {
        category: "Ministeri Battesimali",
        fortext: "Cristo l'unto compie la sua missione divina",
        words: ["SACERDOTE", "PROFETA", "RE"],
        help: ["... altare & vittima", "annuncia la verità", "... d'Israele & del Cielo"]
      },
      {
        category: "Professioni",
        fortext: "Gesù lavora per il corpo e per l'anima degli Uomini",
        words: ["CALEGNAME & AGRICOLTORE", "AVVOCATO & GIUDICE", "MAESTRO & LEGISLATORE", "MEDICO & SOLDATO"],
        help: ["lavora il legno & semina la parola", "intercede & amministra la giustizia", "insegna & detta precetti", "... dell'anima & dello spirito"]
      }
    ]
  },
  {
    tags: ["Catechismo", "Antropologia", "Liturgia"],
    category: "Bisogni",
    dificultad: 2,
    fortext: "Dell'anima: tentazioni o benedizioni",
    words: [
      {
        category: "Cordiali",
        fortext: "Desideri di pienezza: vita orientata a Dio o al mondo",
        words: ["PIACERE", "POSSEDERE", "POTERE"],
        help: ["desiderio di benessere e gioia", "desiderio di creazione e crescita", "desiderio di autorità e libertà"]
      },
      {
        category: "Psicofisici",
        fortext: "Pentimento liturgico: cammino quotidiano sul cornicione",
        words: ["PAROLA", "PENSIERO", "OMISSIONE", "OPERA"],
        help: ["espressione sociale del linguaggio", "elaborazione di stimoli e informazioni", "non fare - lasciar correre", "muoversi e agire"]
      }
    ]
  },
  {
    tags: ["Preghiera", "Maria"],
    category: "Il Rosario",
    dificultad: 4,
    fortext: "Preghiera Mariana",
    words: [
      {
        category: "Misteri",
        fortext: "Struttura principale di meditazione",
        words: ["GAUDIOSI", "LUMINOSI", "DOLOROSI", "GLORIOSI"],
        help: ["incarnazione e infanzia", "vita pubblica di Gesù", "passione e morte", "risurrezione e gloria"]
      },
      {
        category: "Chiusura",
        fortext: "Invocazioni e preghiere finali",
        words: ["BENEDETTA SIA LA TUA PURITÀ", "SALVE REGINA", "LITANIE DELLA VERGINE"],
        help: [
          "«e benedetto sia Dio che si compiace di tanta bellezza»",
          "«Avvocata nostra»",
          "alla fine del Rosario"
        ]
      }
    ]
  },
  {
    tags: ["Preghiera", "Maria", "Gesù"],
    category: "Misteri",
    dificultad: 4,
    fortext: "Del Rosario",
    words: [
      {
        category: "Gaudiosi",
        fortext: "La nascita e l'infanzia",
        words: ["ANGELO & MARIA", "ELISABETTA & GIOVANNI", "BAMBINO & BETLEMME", "TEMPIO & SIMEONE", "GESÙ & DOTTORI"],
        help: ["«L'Annunciazione»", "«La Visitazione»", "«La Nascita di Gesù»", "«La Presentazione»", "«Il Ritrovamento al Tempio»"]
      },
      {
        category: "Luminosi",
        fortext: "La manifestazione del Regno",
        words: ["GIORDANO & BATTESIMO", "NOZZE & VINO", "REGNO & CONVERSIONE", "MONTE & tre TENDE", "PANE & CALICE"],
        help: ["«Inizio della vita pubblica»", "«Il primo miracolo»", "«L'annuncio del Regno»", "«La Trasfigurazione»", "«L'istituzione dell'Eucaristia»"]
      },
      {
        category: "Dolorosi",
        fortext: "La Passione di Cristo",
        words: ["ORTO & PREGHIERA", "FLAGELLAZIONE & COLONNA", "CORONA & SPINE", "CROCE & CAMMINO", "CROCE & MORTE"],
        help: ["«L'agonia di Gesù»", "«La flagellazione»", "«La incoronazione di spine»", "«Gesù carica la croce»", "«La crocifissione»"]
      },
      {
        category: "Gloriosi",
        fortext: "La vittoria e la gloria",
        words: ["SEPOLCRO & VITA", "CIELO & ASCENSIONE", "FUOCO & SPIRITO", "CORPO & ANIMA", "CORONA & REGINA"],
        help: ["«La Risurrezione»", "«L'Ascensione»", "«Pentecoste»", "«L'Assunzione di Maria»", "«L'Incoronazione di Maria»"]
      }
    ]
  },
  {
    tags: ["Bibbia", "Nuovo Testamento", "Vangeli", "Simbolismi", "Fisica"],
    category: "Animali",
    dificultad: 1,
    fortext: "Nei Vangeli",
    words: [
      {
        category: "Dio e i suoi amici",
        fortext: "Rappresentazioni della docilità e dell'innocenza",
        words: ["PECORA & ASINO", "AGNELLO & VERME", "GALLINA & COLOMBA"],
        help: ["docile & testardo", "innocente & insignificante", "...protettiva & ...della pace"]
      },
      {
        category: "Il nemico e i suoi amici",
        fortext: "Rappresentazioni del pericolo e dell'astuzia",
        words: ["MAIALE & CANE", "LUPO & SCORPIONE", "SERPENTE & VOLPE", "CAPRA & AVVOLTOIO"],
        help: ["impuro & vorace", "predatore & velenoso", "astuto & approfittatore", "...di montagna & carogna"]
      }
    ]
  },
  {
    tags: ["Chiesa", "Catechismo", "Hodos"],
    category: "Consigli",
    dificultad: 2,
    fortext: "Vie di perfezione cristiana",
    words: [
      {
        category: "Evangelici",
        fortext: "Voti di abnegazione, rinuncia e dono di sé",
        words: ["CASTITÀ", "POVERTÀ", "UBBIDIENZA"],
        help: ["rinuncia all'unione carnale", "rinuncia ai beni materiali", "rinuncia alla propria volontà"]
      },
      {
        category: "Quaresimali",
        fortext: "Pratiche ascetiche per predisporsi a Dio",
        words: ["ELEMOSINA", "PREGHIERA", "DIGIUNO", "CONVERSIONE"],
        help: ["condividere i beni", "dialogo con Dio", "privazione", "cambiamento di vita"]
      }
    ]
  },
  {
    tags: ["Catechismo", "Spirito Santo", "Morale"],
    category: "Doni",
    dificultad: 2,
    fortext: "Doni di Dio",
    words: [
      {
        category: "della Trinità",
        fortext: "Tappe nella storia dell'Uomo",
        words: ["SANTIFICAZIONE", "SALVEZZA", "CREAZIONE"],
        help: ["opera dello Spirito Santo", "opera del Figlio", "opera del Padre"]
      },
      {
        category: "dello Spirito Santo",
        fortext: "L'anima si riempie di Dio",
        words: ["SAPIENZA", "PIETÀ", "FORTEZZA", "TIMORE DI DIO"],
        help: ["Gusto del divino", "devozione e clemenza", "sopportare la prova", "rispetto verso Dio"]
      }
    ]
  },
  {
    tags: ["Catechismo", "Morale", "Antropologia", "Società"],
    category: "Virtù",
    dificultad: 1,
    fortext: "Capacità apprendibili che ci avvicinano a Dio",
    words: [
      {
        category: "Teologali",
        fortext: "pilastri di ogni cristiano",
        words: ["FEDE", "SPERANZA", "CARITÀ"],
        help: ["credere in Dio", "confidare nelle promesse", "donare la vita"]
      },
      {
        category: "Cardinali",
        fortext: "pilastri di ogni uomo (Sant'Ambrogio)",
        words: ["PRUDENZA", "GIUSTIZIA", "TEMPERANZA", "FORTEZZA"],
        help: ["discernimento", "dare a ciascuno il suo", "autocontrollo", "forza interiore"]
      }
    ]
  },
  {
    tags: ["Catechismo", "Morale"],
    category: "Peccati",
    dificultad: 2,
    fortext: "Azioni e intenzioni che ci allontanano da Dio",
    words: [
      {
        category: "Religiosi",
        fortext: "Offese contro la santità divina",
        words: ["IDOLATRIA", "PROFANAZIONE", "BESTEMMIA"],
        help: ["adorare il creato", "trattare impropriamente il sacro", "parola ingiuriosa"]
      },
      {
        category: "Capitali",
        fortext: "Radici delle tendenze disordinate",
        words: ["GOLA & AVARIZIA", "INVIDIA & IRA", "ACCIDIA & LUSSURIA", "EGOCENTRISMO"],
        help: ["Sregolatezza alimentare e di possesso", "tristezza per il bene altrui e furia", "pigrizia e sregolatezza sensuale", "eccesso di sé"]
      }
    ]
  },
  {
    tags: ["Bibbia", "Nuovo Testamento", "Vangeli", "Gesù", "Simbolismi"],
    category: "IO SONO",
    dificultad: 1,
    fortext: "Gesù si è autodefinito con questi simboli",
    words: [
      {
        category: "del CIELO",
        fortext: "Attributi eterni e di salvezza",
        words: ["RISURREZIONE & VITA", "LUCE", "VIA & VERITÀ"],
        help: ["...gloriosa & ...eterna", "...del mondo", "...e vita"]
      },
      {
        category: "del CAMPO",
        fortext: "Simboli quotidiani e di sostentamento",
        words: ["PANE", "VITE", "PASTORE", "PORTA"],
        help: ["...di vita", "vera...", "il buon...", "...del recinto"]
      }
    ]
  },
  {
    tags: ["Chiesa", "Maria"],
    category: "Feste Mariane",
    dificultad: 3,
    fortext: "feste nel calendario",
    words: [
      {
        category: "TITOLI",
        fortext: "Benedetta fra tutte le donne",
        words: ["MADRE", "SPOSA", "REGINA"],
        help: ["...della Chiesa", "...dello Spirito Santo", "...del Creato"]
      },
      {
        category: "DOGMI",
        fortext: "verità di fede definitive",
        words: ["MADRE", "VERGINE", "IMMACOLATA", "ASSUNTA"],
        help: ["...di Dio (Theotokos)", "perpetua...", "...concezione", "...in cielo"]
      }
    ]
  },
  {
    tags: ["Chiesa", "Preghiera", "Maria"],
    category: "Litanie Mariane",
    dificultad: 4,
    fortext: "Titoli e Virtù",
    words: [
      {
        category: "MADRE di Dio",
        fortext: "Invocazioni alla dimora del Salvatore",
        words: ["ARCA", "TABERNACOLO", "CASA & SEDE"],
        help: ["...dell'alleanza", "...della gloria eterna", "...d'oro & ...della sapienza"]
      },
      {
        category: "REGINA del Creato",
        fortext: "Invocazioni all'intercessore celeste",
        words: ["SPECCHIO", "ROSA", "STELLA", "RIFUGIO & PORTA"],
        help: ["...di giustizia", "mistica...", "...del mattino", "...dei peccatori & ...del cielo"]
      }
    ]
  },
  {
    tags: ["Vangeli", "Storia"],
    category: "Apostoli",
    dificultad: 2,
    fortext: "I 14 eletti",
    words: [
      {
        category: "I primi 6",
        fortext: "4 fratelli e 2 amici",
        words: ["PIETRO & ANDREA", "GIACOMO & GIOVANNI", "FILIPPO & BARTOLOMEO"],
        help: ["pescatori di uomini", "figli del tuono", "(Gv 1) vieni e vedrai"]
      },
      {
        category: "Il resto",
        fortext: "Diversità di carismi",
        words: ["TOMMASO & MATTEO", "GIACOMO & TADDEO", "SIMONE & GIUDA", "PAOLO & MATTIA"],
        help: ["l'incredulo & il pubblicano (ricco)", "il minore (discreto) & Giuda (riflessivo)", "lo zelota (nazionalista) & il tesoriere (traditore)", "persecutore di cristiani & l'eletto a sorte"]
      }
    ]
  },
  {
    tags: ["Chiesa", "Liturgia", "Storia", "Hodos"],
    category: "Tempo Liturgico",
    dificultad: 1,
    fortext: "Il calendario della Chiesa",
    words: [
      {
        category: "Feste",
        fortext: "Grandi solennità della salvezza",
        words: ["NATALE", "PASQUA", "PENTECOSTE"],
        help: ["nascita di Gesù", "risurrezione del Signore", "venuta dello Spirito Santo"]
      },
      {
        category: "Preparazione",
        fortext: "Tempi di attesa",
        words: ["ORDINARIO", "AVVENTO", "QUARAGESIMA", "SETTIMANA Santa"],
        help: ["tempo ordinario", "attesa della venuta", "quaranta giorni di preparazione", "passione & morte"]
      }
    ]
  },
  {
    tags: ["Bibbia", "Vangeli", "Gesù", "Morale"],
    category: "Beatitudini",
    dificultad: 1,
    fortext: "Beati quelli che (hanno) …",
    words: [
      {
        category: "Cuore",
        fortext: "Atteggiamenti interiori benedetti",
        words: ["PURI di cuore", "POVERI in spirito", "MITI di cuore"],
        help: ["perché vedranno Dio", "perché di essi è il Regno dei Cieli", "perché erediteranno la terra"]
      },
      {
        category: "Giustizia",
        fortext: "Impegno e prova per la verità",
        words: ["FAME di giustizia", "PERDONANO in-giustizie", "LAVORANO per la giustizia", "SOFFRONO in-giustizie"],
        help: ["e sete", "misericordiosi", "e la pace", "a causa del mio nome"]
      }
    ]
  },
  {
    tags: ["Catechismo", "Simbolismi", "Fisica"],
    category: "Natura",
    dificultad: 1,
    fortext: "Simboli di Dio",
    words: [
      {
        category: "Animali",
        fortext: "Creature con significato teologico",
        words: ["COLOMBA", "LEONE", "AGNELLO"],
        help: ["...della pace", "...di Giuda", "...che toglie il peccato del mondo"]
      },
      {
        category: "Elementi",
        fortext: "Forze naturali rivelatrici",
        words: ["LUCE", "ACQUA", "ARIA", "FUOCO"],
        help: ["illumina", "idrata", "ossigena", "trasforma"],
        PN: false
      }
    ]
  },
  {
    tags: ["Chiesa", "Società", "Morale"],
    category: "Giudizio Civile",
    dificultad: 3,
    fortext: "Variabili da cui dipende il giudizio",
    words: [
      {
        category: "Punibilità",
        fortext: "Condizioni di imputabilità morale",
        words: ["COSCIENZA", "GRAVITÀ", "CONSENSO"],
        help: ["comprensione", "veniale o mortale", "intenzione"]
      },
      {
        category: "Aggravamento o Aiuto",
        fortext: "Elementi modificatori della colpa",
        words: ["CONTESTO", "CONTRIZIONE", "CONDOTTA", "CONVERSIONE"],
        help: ["circostanza", "pentimento", "merito", "trasformazione"]
      }
    ]
  },
  {
    tags: ["Bibbia", "Storia"],
    category: "Gravidanze Miracolose",
    dificultad: 2,
    fortext: "Nomi di madri e/o figli",
    words: [
      {
        category: "Nuovo Testamento",
        fortext: "Nascite dell'annuncio del Regno",
        words: ["ELISABETTA & GIOVANNI", "MARIA & GESÙ"],
        help: ["Famiglia di Zaccaria", "Famiglia di Giuseppe"]
      },
      {
        category: "Antico Testamento",
        fortext: "Nascite straordinarie dell'Alleanza",
        words: ["ANNA & SAMUELE", "SARA & ISACCO", "SANSONE"],
        help: ["Consacrato al tempio", "Famiglia di Abramo", "non si possono tagliare i capelli"]
      }
    ]
  },
  {
    tags: ["Logos", "Catechismo", "Gesù"],
    category: "EGLI È Dio",
    dificultad: 2,
    fortext: "2a persona della Trinità",
    words: [
      {
        category: "LOGOS",
        fortext: "Traduzioni dell'infinito (Gv 1,1-14)",
        words: ["PRINCIPIO & FINE", "SAPIENZA", "VERBO", "PAROLA"],
        help: ["alfa & omega", "(Gv 1,3) senza di lui nulla è stato fatto di ciò che esiste", "(Gv 1,14) ...si è fatto carne e ha posto la sua dimora in mezzo a noi", "(Gv 1,9) ...era la luce vera che illumina ogni uomo"]
      },
      {
        category: "Dio & Uomo",
        fortext: "Qualcuno ha mai visto Dio? (Gv 1,17-18)",
        words: ["GESÙ CRISTO", "figlio UNIGENITO", "DIO"],
        help: ["Dio ha 1 nome e 1 volto", "unico genito che ha rivelato Dio", "nessuno l'ha mai visto"]
      }
    ]
  },
  {
    tags: ["Vangeli", "Nuovo Testamento", "Gesù"],
    category: "TU SEI",
    dificultad: 3,
    fortext: "Vero Dio & Vero Uomo",
    words: [
      {
        category: "Figlio di Dio",
        fortext: "Confessioni di FEDE",
        words: ["mio SIGNORE & mio DIO", "AGNELLO di Dio & SANTO di Dio", "SALVATORE & CRISTO"],
        help: ["confessato da Tommaso l'incredulo", "confessato da Giovanni Battista & Pietro & demòni", "confessato dai samaritani & Pietro & Andrea"]
      },
      {
        category: "Figlio dell'Uomo",
        fortext: "Riconoscimento storico",
        words: ["Figlio di MARIA & Figlio del FALEGNAME", "MAESTRO & PROFETA", "Figlio di ABRAMO & Figlio di DAVIDE", "NAZARENO & RE d'Israele"],
        help: ["detto dai Nazareni", "detto da Natanaèle & la folla", "detto da Matteo & la folla", "detto da Natanaèle & demòni"]
      }
    ]
  },
  {
    tags: ["Liturgia", "Preghiera", "Catechismo"],
    category: "Padre Nostro",
    dificultad: 1,
    fortext: "richieste per Dio o per l'Uomo",
    words: [
      {
        category: "TEOCENTRICHE",
        fortext: "Orientate alla gloria divina",
        words: ["NOME", "REGNO", "VOLONTÀ"],
        help: ["sia santificato il tuo...", "venga il tuo...", "sia fatta la tua..."]
      },
      {
        category: "ANTROPOCENTRICHE",
        fortext: "Orientate ai bisogni umani",
        words: ["PANE", "DEBITI", "TENTAZIONE", "MALE"],
        help: ["...quotidiano", "rimetti a noi i nostri...", "non abbandonarci alla...", "liberaci dal..."]
      }
    ]
  },
  {
    tags: ["Chiesa", "Catechismo"],
    category: "1 Chiesa",
    dificultad: 2,
    fortext: "Corpo mistico di Cristo (1 sposa)",
    words: [
      {
        category: "1 solo",
        fortext: "Unicità & Unità",
        words: ["SIGNORE & BATTESIMO & FEDE", "CORPO & SPIRITO", "ANIMA", "CARNE"],
        help: ["Credo lungo - Efesini 4", "la Chiesa e Dio (Efesini 4)", "...tra i credenti (Atti)", "...tra uomo e donna"]
      },
      {
        category: "diversità",
        fortext: "Varietà di doni comunitari",
        words: ["LINGUE", "CARISMI", "MINISTERI"],
        help: ["lingue", "doni spirituali", "servizi nella comunità"]
      }
    ]
  },
  {
    tags: ["Logos", "Bibbia", "Nuovo Testamento", "Vangeli"],
    category: "Greco",
    dificultad: 3,
    fortext: "La lingua dei vangeli",
    words: [
      {
        category: "DIVINO & UMANO",
        fortext: "Termini filosofici e teologici",
        words: ["LOGOS & LOGICA", "THEOS & ANTHROPOS", "OURANOS & KOSMOS", "KAIROS & CHRONOS"],
        help: ["sapienza di dio & dell'uomo", "dio & uomo", "cielo & mondo", "tempo denso & ciclico"]
      },
      {
        category: "VECCHIO & NUOVO",
        fortext: "Concetti dell'esistenza e della vita",
        words: ["SARX & SOMA", "BIOS & ZOE", "PSYCHE & PNEUMA"],
        help: ["carne & corpo", "vita corruttibile & eterna", "anima & spirito (soffio)"]
      }
    ]
  },
  {
    tags: ["Hodos", "Logos", "Catechesi"],
    category: "Theosis",
    dificultad: 3,
    fortext: "Vie di partecipazione alla natura divina",
    words: [
      {
        category: "Bibliche",
        fortext: "Tappe bibliche di rivelazione",
        words: ["GENESI", "KENOSI", "APOCALISSE"],
        help: ["nascita-origine", "svuotamento", "rivelazione"]
      },
      {
        category: "conversione",
        fortext: "Passi nel cammino spirituale",
        words: ["PRAXIS", "CATARSI", "ASCESI", "GNOSI"],
        help: ["pratica", "purificazione", "disciplina", "conoscenza"]
      }
    ]
  },
  {
    tags: ["Liturgia", "Chiesa"],
    category: "Offerte",
    dificultad: 2,
    fortext: "doni dell'Uomo a Dio",
    words: [
      {
        category: "Mangiatoia",
        fortext: "Doni dei Re Magi",
        words: ["ORO", "INCENSO", "MIRRA"],
        help: ["perché Gesù è Re", "perché Gesù è Dio e salirà al Cielo", "perché Gesù è Uomo e soffrirà la morte."]
      },
      {
        category: "Messa",
        fortext: "Offerte nell'Eucaristia",
        words: ["TEMPO & DENARO", "LAVORO & FATICA", "CORPO & SANGUE", "LODE & RINGRAZIAMENTO"],
        help: ["le cose preziose di questo mondo", "...della giornata", "...di Cristo - Memoriale del Sacrificio incruento", "frutti della gioia"]
      }
    ]
  },
  {
    tags: ["Chiesa", "Logos", "Simbolismi", "Catechesi"],
    category: "UNO",
    dificultad: 2,
    fortext: "Espressioni dell'intero",
    words: [
      {
        category: "CREATORE & CREATURA",
        fortext: "Unicità nella Creazione e nel Figlio",
        words: ["UNICO", "UNIGENITO", "UNIVERSO"],
        help: ["Dio uno e trino e...", "(1Gv 4,9) Dio ha mandato il suo Figlio…", "L'unica versione della Creazione"]
      },
      {
        category: "CHIESA",
        fortext: "Unità del popolo radunato",
        words: ["UNANIME", "UNIVERSITÀ", "UNIVERSALE", "UNITÀ"],
        help: ["(At 4,32) Erano un solo cuore e un'anima sola", "Istituzione di studi superiori", "cattolico", "... nella diversità rappresentata dal capo"]
      }
    ]
  },
  {
    tags: ["Catechismo", "Morale", "Antropologia"],
    category: "Facoltà",
    dificultad: 3,
    fortext: "e caratteristiche costitutive dell'essere umano",
    words: [
      {
        category: "Teologiche",
        fortext: "dei figli di Dio (immagine & somiglianza)",
        words: ["INTELLIGENZA", "COSCIENZA", "VOLONTÀ", "DIGNITÀ"],
        help: [
          "immagine & somiglianza dell'OMNISCIENZA di Dio",
          "immagine & somiglianza dell'OMNIPRESENZA di Dio",
          "immagine & somiglianza dell'OMNIPOTENZA di Dio",
          "immagine & somiglianza di Dio Figlio"
        ]
      },
      {
        category: "Antropologiche",
        fortext: "dei figli di Adamo (frutti del peccato)",
        words: ["DIPENDENZA", "ERRORE", "CONCUPISCENZA"],
        help: [
          "senza l'aiuto altrui non possiamo",
          "Peccatori",
          "Debolezza"
        ]
      }
    ]
  },
  {
    tags: ["Bibbia", "Antico Testamento"],
    category: "Geografia",
    dificultad: 2,
    fortext: "nella Terra Promessa",
    words: [
      {
        category: "Piacevoli",
        fortext: "Luoghi di benedizione e vita",
        words: ["GIARDINO", "BOSCO", "CAMPO", "FIUME"],
        help: ["...dell'Eden", "...del Libano", "...di grano", "...Giordano"]
      },
      {
        category: "Ostili",
        fortext: "Luoghi di prova e ritiro",
        words: ["DESERTO", "MARE", "MONTE"],
        help: ["...di Giudea", "...di Galilea (lago)", "...Tabor"]
      }
    ]
  },
  {
    tags: ["Vangeli", "Nuovo Testamento", "Gesù"],
    category: "Luoghi",
    dificultad: 2,
    fortext: "visitati da Gesù",
    words: [
      {
        category: "Terra",
        fortext: "Ambientazioni urbane, protette",
        words: ["CITTÀ", "TEMPIO", "CASA", "ORTO"],
        help: ["...fortificata", "...di Gerusalemme", "...della suocera di Pietro", "...degli ulivi"]
      },
      {
        category: "Acqua",
        fortext: "Dolce vs Salata",
        words: ["POZZO", "BARCA", "PISCINA"],
        help: ["...di Giacobbe", "...dei pescatori", "...di Betesda"]
      }
    ]
  },
  {
    tags: ["Catechismo", "Spirito Santo", "Morale"],
    category: "Frutti",
    dificultad: 4,
    fortext: "dello Spirito Santo",
    words: [
      {
        category: "Vita interiore",
        fortext: "Dio dentro di sé",
        words: ["CONTINENZA & TEMPERANZA", "MODESTIA & UMILTÀ", "MAGNANIMITÀ & LONGANIMITÀ", "PACE & GIOIA"],
        help: [
          "dominio di sé",
          "Non ostentare le proprie capacità e riconoscere i propri limiti",
          "anima grande & paziente",
          "armonia & felicità"
        ]
      },
      {
        category: "Legame fraterno",
        fortext: "riflesso divino nella relazione col prossimo",
        words: ["BONTÀ & BENEVOLENZA", "AFFABILITÀ & GENEROSITÀ", "MITEZZA & ALLEGRIA", "FEDELTÀ & PAZIENZA"],
        help: [
          "fare & volere il bene",
          "buone maniere & dono disinteressato",
          "non crea problemi & contagia un sorriso",
          "costanza & tolleranza"
        ]
      }
    ]
  },
  {
    tags: ["Società", "Storia", "Spirito Santo"],
    category: "Religioni",
    dificultad: 1,
    fortext: "e filosofie di vita",
    words: [
      {
        category: "Monoteiste",
        fortext: "Fede nel Dio di Abramo",
        words: ["CRISTIANESIMO", "GIUDAISMO", "ISLAM"],
        help: ["✝️ dio uno & trino", "✡️ popolo eletto", "☪️ servi di Dio"]
      },
      {
        category: "Pre-cristiane",
        fortext: "Antiche tradizioni e spiritualità",
        words: ["TAOISMO", "BUDDHISMO", "INDUISMO", "POLITEISMO greco"],
        help: ["☯️ parte del tutto", "☸️ nirvana", "🕉️ intimità con Dio", "🏛️ dramma mitologico"]
      }
    ]
  },
  {
    tags: ["Chiesa", "Catechismo", "Preghiera", "Spirito Santo", "Liturgia"],
    category: "Credo nello Spirito Santo",
    dificultad: 2,
    fortext: "Professione di fede",
    words: [
      {
        category: "Credo Niceno-Costantinopolitano",
        fortext: "Affermazioni della fede ecumenica",
        words: ["PROCEDE", "stessa ADORAZIONE & GLORIA", "HA PARLATO"],
        help: ["...dal Padre e dal Figlio (Filioque)", "con il Padre e il Figlio", "per mezzo dei Profeti"]
      },
      {
        category: "Credo degli Apostoli",
        fortext: "Sintesi del battesimo apostolico",
        words: ["santa CHIESA", "COMUNIONE", "PERDONO", "RISURREZIONE"],
        help: ["cattolica", "...dei SANTI", "...dei PECCATI", "...della carne"]
      }
    ]
  },
  {
    tags: ["Chiesa", "Catechismo", "Gesù", "Preghiera", "Liturgia"],
    category: "Credo in Gesù Cristo",
    dificultad: 2,
    fortext: "Professione di fede",
    words: [
      {
        category: "Credo Niceno-Costantinopolitano",
        fortext: "Dogmi sul Figlio",
        words: ["GENERATO", "SI È INCARNATO", "CONSOSTANZIALE"],
        help: ["non creato", "nel seno di Maria", "al Padre"]
      },
      {
        category: "Credo degli Apostoli",
        fortext: "Mistero pasquale e venuta finale",
        words: ["fu CROCEFISSO", "È RISUSCITATO", "SIEDO", "venire a GIUDICARE"],
        help: ["...mórtil e sepolto", "...dai morti", "...alla destra di Dio Padre", "...i vivi e i morti"]
      }
    ]
  },
  {
    tags: ["Bibbia", "Antico Testamento", "Storia"],
    category: "Ebrei eletti",
    dificultad: 2,
    fortext: "per preparare la venuta del Messia",
    words: [
      {
        category: "Antenati",
        fortext: "Dio sceglie per suo Figlio un popolo, una stirpe, una terra",
        words: ["ABRAMO", "DAVIDE", "ZOROBABELE"],
        help: [
          "da Pastore a Patriarca - 1° Altare - prefigurò il sacerdozio di Gesù",
          "da Pastore a Re - 1° Tempio - prefigurò la regalità di Gesù",
          "da esule a governatore - 2° Tempio - prefiguró la risurrezione di Gesù"
        ]
      },
      {
        category: "Profeti",
        fortext: "Dio sceglie per il suo popolo annunciatori della Sua Parola",
        words: ["MOISÈ", "ELIA", "GEREMIA", "GIOVANNI"],
        help: [
          "annunciò la liberazione d'Israele & prefigurò la Legge di Gesù",
          "annunciò il vero Dio & prefigurò l'Ascensione di Gesù",
          "annunciò la condanna di Giuda & prefigurò la sofferenza di Gesù",
          "annunciò la venuta del Messia & prefigurò la parresia di Gesù"
        ]
      }
    ]
  },
  {
    tags: ["Catechesi", "Sacramenti"],
    category: "Sviluppo Cristiano",
    dificultad: 1,
    fortext: "tappe evolutive nella vita di fede",
    words: [
      {
        category: "Sacramentale",
        fortext: "tappe con la chiesa",
        words: [
          "BATTESIMO & RICONCILIAZIONE",
          "COMUNIONE",
          "CRESIMA & UNZIONE",
          "CONSACRAZIONE"
        ],
        help: [
          "Morire sulla croce - nascere in Cristo",
          "Nutrimento della fede - Sacrificio pasquale",
          "Espressione di parole e opere - Vita pentecostale",
          "Alleanza con Dio - Vita ristretta nel mondo, aperta in cielo"
        ]
      },
      {
        category: "Personale",
        fortext: "crescita nella santità",
        words: ["CONVERSIONE", "FORMAZIONE", "MISSIONE"],
        help: [
          "cambiamenti che ci avvicinano a vivere secondo Dio",
          "contemplazione dei misteri di Dio",
          "vivere per Dio - servirlo"
        ]
      }
    ]
  },
  {
    tags: ["Antropologia", "Sacramenti"],
    category: "Sviluppo Umano",
    dificultad: 2,
    fortext: "tappe evolutive & sacramenti caratteristici",
    words: [
      {
        category: "Biologico",
        fortext: "crescita del corpo fisico",
        words: [
          "INFANZIA & BATTESIMO",
          "FANCIULLEZZA & COMUNIONE",
          "ADOLESCENZA & CRESIMA"
        ],
        help: [
          "sviluppo della motricità & ascolto & parola",
          "sviluppo della lettura & scrittura & consuetudini",
          "sviluppo della sessualità & moralità & amicizia"
        ]
      },
      {
        category: "Spirituale",
        fortext: "maturazione dell'anima",
        words: [
          "GIOVENTÙ & CONSACRAZIONE",
          "ETÀ ADULTA & RICONCILIAZIONE",
          "VECCHIAIA & UNZIONE"
        ],
        help: [
          "tappa di scelte & emancipazione",
          "tappa di lavoro & servizio",
          "tappa di riposo & riflessione"
        ]
      }
    ]
  }
];