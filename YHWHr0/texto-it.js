export const EMOJI_MAP = {
  "cuore": "❤️",
  "proibito": "🚫",
  "amore": "❤️",
  "amare": "❤️"
};

export const TEXT = {
  lang: "it",
  subtitle: "Indovina la parola aggiungendo le vocali.",
  startTitle: "Configura partita",
  players: "Numero di giocatori",
  playerColorsTitle: "Colori dei giocatori",
  choosePlayerColor: "Scegli il colore per il Giocatore {n}",
  time: "Tempo massimo per turno (secondi)",
  rounds: "Round di indizi prima di rivelare",
  categoriesTitle: "Categorie",
  randomCategories: "Scegli a caso",
  categoryCount: "Seleziona le categorie che entreranno in gioco.",
  startGame: "Inizia partita",
  selectCategories: "Devi selezionare esattamente {n} categorie.",
  round: "Round",
  turn: "Turno di",
  seconds: "sec",
  boardTitle: "Parole scoperte",
  guessedWordTitle: "Parola Corretta!",
  guessPlaceholder: "Scrivi la parola",
  guessPartPlaceholder: "Scrivi la parola {n}",
  categoryPlaceholder: "Scegli una categoria",
  guess: "RISPONDI",
  pause: "Pausa",
  resume: "Riprendi tempo",
  correct: "Corretto! Parola e categoria.",
  wordOnly: "Hai indovinato la parola, ma non la categoria.",
  categoryOnly: "Hai indovinato la categoria, ma non la parola.",
  wordOnlyPoints: "Hai indovinato la parola. +{points} punti.",
  categoryOnlyPoints: "Hai indovinato la categoria. +{points} punti.",
  compoundOneOnly: "Hai indovinato una delle due parole. +metà del punteggio.",
  compoundWordsButCategory: "Hai indovinato entrambe le parole, ma non la categoria. +{points} punti.",
  partialPoints: "Risposta parzialmente corretta. +{points} punti.",
  incorrect: "Non è corretto. Passa al giocatore successivo.",
  incorrectWordCorrectCategory: "Parola errata, categoria corretta.",
  timeout: "Tempo scaduto. Passa al giocatore successivo.",
  hintHelp: "Indizio: {help}",
  hintSubcategory: "Sottocategoria: {category}",
  hintVowel: "Indizio: appare una vocale.",
  revealed: "La parola era:",
  computer: "COMPUTER",
  continue: "Continua",
  end: "Fine della partita",
  newGame: "Nuova partita",
  points: "punti",
  noPoints: "senza punti",
  player: "Giocatore",
  category: "Categoria",
  fortext: "Commento",
  won: "Vincitore",
  tie: "Pareggio",
  categoryAlready: "Questa categoria è già stata selezionata.",
  noWords: "Non ci sono abbastanza parole valide nelle categorie selezionate.",
  specialRound: "Il computer rivela una parola.",
  remaining: "mancano",
  revealedWord: "Parola rivelata",
  revealedWordContinue: "La parola è stata rivelata. Premi CONTINUA per proseguire.",
  revealedUnansweredTitle: "Parola non indovinata",
  revealCategoryLabel: "Categoria",
  revealFortextLabel: "",
  revealWordLabel: "Parola",
  revealHelpLabel: "Aiuto / sinonimo",
  wordBlockCorrect: "Hai indovinato la parola.",
  wordPartialCorrect: "Hai indovinato parte della parola.",
  categoryCorrect: "Hai indovinato la categoria.",
  revealClue:"SVELA INDIZIO (-1pt)",
  rulesTitle: "Regole del gioco",
  closeRules: "Chiudi",
  rulesBody: `
      <p>1. Aggiungi le vocali per indovinare la parola.</p>
      <p>2. Se il tempo scade, il turno passa al giocatore successivo. Indizi e vocali vengono svelati man mano che i round procedono.</p>
      <p>3. Puoi usare il pulsante "SVELA INDIZIO" per ottenere un indizio immediato in cambio di 1 punto.</p>
      <p>4. Una volta svelata la parola, indovina la sua categoria.</p>
      <p>5. I connettori e le parole in minuscolo sono visibili; devi indovinare solo le parole scritte in MAIUSCOLO.</p>
  `
};

export function t(key, vars = {}) {
  let s = TEXT[key] ?? key;
  return s.replace(/\{([a-zA-Z0-9_]+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}
