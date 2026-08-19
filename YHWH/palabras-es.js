// Datos del juego. Cada categoría principal debería tener 7 palabras.
export const WORD_DATA = [
  {
    category: "Beatitudes",
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
        help: ["y sed", "misericordiosas", "y la paz", "a causa de mi nombre"]
      }
    ]
  },
  {
    category: "Naturaleza",
    dificultad: 1,
    fortext: "Símbolos de Dios",
    words: [
      {
        category: "Animales",
        words: ["PALOMA", "LEÓN", "CORDERO"],
        help: ["de la paz", "de Judá", "que quita el pecado del mundo"]
      },
      {
        category: "Elementos",
        words: ["LUZ", "AGUA", "AIRE", "FUEGO"],
        help: ["ilumina", "hidrata", "oxigena", "transforma"],
        PN: false
      }
    ]
  },
  {
    category: "Juicio",
    dificultad: 3,
    fortext: "Variables de las que depende el juicio",
    words: [
      {
        category: "Punibilidad",
        words: ["CONCIENCIA", "GRAVEDAD", "CONSENTIMIENTO"],
        help: ["entendimiento", "venial o mortal", "intención"]
      },
      {
        category: "Agravamiento o Ayuda",
        words: ["CONTEXTO", "CONTRICIÓN", "CONDUCTA", "CONVERSIÓN"],
        help: ["circunstancia", "arrepentimiento", "premio", "transformación"]
      }
    ]
  },
  {
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
        words: ["ANA & SAMUEL", "SARA & ISAAC"],
        help: ["Consagrado al templo", "Familia de Abraham"]
      }
    ]
  }
];
