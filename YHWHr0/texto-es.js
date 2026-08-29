export const EMOJI_MAP = {
  "corazon": "❤️",
  "corazón": "❤️",
  "prohibido": "🚫",
  "amor": "❤️",
  "amar": "❤️"
};

export const TEXT = {
  lang: "es",
  subtitle: "Adivina la palabra agregando vocales.",
  startTitle: "Configurar partida",
  players: "Cantidad de jugadores",
  playerColorsTitle: "Colores de los jugadores",
  choosePlayerColor: "Elige el color para el Jugador {n}",
  time: "Tiempo máximo por turno (segundos)",
  rounds: "Rondas de pistas antes de revelar",
  categoriesTitle: "Categorías",
  randomCategories: "Elegir al azar",
  categoryCount: "Selecciona las categorías que entrarán en juego.",
  startGame: "Comenzar partida",
  selectCategories: "Debes seleccionar exactamente {n} categorías.",
  round: "Ronda",
  turn: "Turno de",
  seconds: "seg",
  boardTitle: "Palabras descubiertas",
  guessedWordTitle: "¡Palabra Adivinada!",
  guessPlaceholder: "Escribe la palabra",
  guessPartPlaceholder: "Escribe la palabra {n}",
  categoryPlaceholder: "Elige una categoría",
  guess: "RESPONDER",
  pause: "Pausa",
  resume: "Continuar tiempo",
  correct: "¡Correcto! Palabra y categoría.",
  wordOnly: "Has acertado la palabra, pero no la categoría.",
  categoryOnly: "Has acertado la categoría, pero no la palabra.",
  wordOnlyPoints: "Has acertado la palabra. +{points} puntos.",
  categoryOnlyPoints: "Has acertado la categoría. +{points} puntos.",
  pointsForPlayer:"puntos para",
  compoundOneOnly: "Has acertado una de las dos palabras. +la mitad del puntaje.",
  compoundWordsButCategory: "Has acertado las dos palabras, pero no la categoría. +{points} puntos.",
  partialPoints: "Acierto parcial. +{points} puntos.",
  incorrect: "No es correcto. Le toca al siguiente jugador.",
  incorrectWordCorrectCategory: "Palabra incorrecta, categoría correcta.",
  timeout: "Se acabó el tiempo. Le toca al siguiente jugador.",
  hintHelp: "({help})",
  hintSubcategory: "Subcategoría: {category}",
  hintVowel: "",
  revealed: "La palabra era:",
  computer: "ORDENADOR",
  continue: "Continuar",
  end: "Fin de la partida",
  newGame: "Nueva partida",
  points: "puntos",
  noPoints: "sin puntos",
  player: "Jugador",
  category: "Categoría",
  fortext: "Comentario",
  won: "Ganador",
  tie: "Empate",
  categoryAlready: "Esta categoría ya está seleccionada.",
  noWords: "No hay suficientes palabras válidas en las categorías seleccionadas.",
  specialRound: "El ordenador revela una palabra.",
  remaining: "faltan",
  revealedWord: "Palabra revelada",
  revealedWordContinue: "Se reveló la palabra. Pulsa CONTINUAR para seguir.",
  revealedUnansweredTitle: "Palabra no adivinada",
  revealCategoryLabel: "Categoría",
  revealFortextLabel: "",
  revealWordLabel: "Palabra",
  revealHelpLabel: "Ayuda / sinónimo",
  wordBlockCorrect: "Has acertado la palabra.",
  wordPartialCorrect: "Has acertado parte de la palabra.",
  categoryCorrect: "Has acertado la categoría.",
    revealClue:"REVELAR PISTA (-1pt)",
    rulesTitle: "Reglas del Juego",
  closeRules: "Cerrar",
  rulesBody: `
      <p>1. Agregá vocales para adivinar la palabra.</p>
      <p>2. Si se termina el tiempo pasa el turno al siguiente jugador. Con el avance de las rondas se revelan pistas y vocales.</p>
      <p>3.   Puedes usar el botón "REVELAR PISTA" para forzar una pista inmediata a cambio de 1 punto.</p>
      <p>4. Una vez revelada la palabra, adiviná su categoría.</p>
      <p>5. Las conectores y palabras en minúsculas son visibles; solo debes adivinar las palabras escritas en MAYÚSCULA.</p>
  `
};

export function t(key, vars = {}) {
  let s = TEXT[key] ?? key;
  return s.replace(/\{([a-zA-Z0-9_]+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}
