export const EMOJI_MAP = {
  "heart": "❤️",
  "prohibited": "🚫",
  "forbidden": "🚫",
  "love": "❤️",
  "mercy":"❤️"
};

export const TEXT = {
  lang: "en",
  subtitle: "Guess the word by adding vowels.",
  startTitle: "Game Setup",
  players: "Number of players",
  playerColorsTitle: "Player colors",
  choosePlayerColor: "Choose color for Player {n}",
  time: "Maximum turn time (seconds)",
  rounds: "Clue rounds before reveal",
  categoriesTitle: "Categories",
  randomCategories: "Pick randomly",
  categoryCount: "Select the categories that will enter the game.",
  startGame: "Start Game",
  selectCategories: "You must select exactly {n} categories.",
  round: "Round",
  turn: "Turn of",
  seconds: "sec",
  boardTitle: "Discovered words",
  guessedWordTitle: "Word Guessed!",
  guessPlaceholder: "Type the word",
  guessPartPlaceholder: "Type word {n}",
  categoryPlaceholder: "Choose a category",
  guess: "GUESS",
  pause: "Pause",
  resume: "Resume time",
  correct: "Correct! Word and category.",
  wordOnly: "You guessed the word, but not the category.",
  categoryOnly: "You guessed the category, but not the word.",
  wordOnlyPoints: "You guessed the word. +{points} points.",
  categoryOnlyPoints: "You guessed the category. +{points} points.",
  compoundOneOnly: "You guessed one of two words. +half points.",
  compoundWordsButCategory: "You guessed both words, but not category. +{points} points.",
  partialPoints: "Partial success. +{points} points.",
  incorrect: "Incorrect. Next player's turn.",
  incorrectWordCorrectCategory: "Incorrect word, correct category.",
  timeout: "Time is up! Next player's turn.",
  hintHelp: "Clue: {help}",
  hintSubcategory: "Subcategory: {category}",
  hintVowel: "Clue: a vowel appears.",
  revealed: "The word was:",
  computer: "COMPUTER",
  continue: "Continue",
  end: "End of game",
  newGame: "New Game",
  points: "points",
  noPoints: "no points",
  player: "Player",
  category: "Category",
  fortext: "Comment",
  won: "Winner",
  tie: "Tie",
  categoryAlready: "This category is already selected.",
  noWords: "Not enough valid words in selected categories.",
  specialRound: "The computer reveals a word.",
  remaining: "remaining",
  revealedWord: "Revealed word",
  revealedWordContinue: "Word revealed. Press CONTINUE to proceed.",
  revealedUnansweredTitle: "Unanswered word",
  revealCategoryLabel: "Category",
  revealFortextLabel: "",
  revealWordLabel: "Word",
  revealHelpLabel: "Help / synonym",
  wordBlockCorrect: "You guessed the word.",
  wordPartialCorrect: "You guessed part of the word.",
  categoryCorrect: "You guessed the category.",
    revealClue:"REVEAL CLUE (-1 pt)",
  rulesTitle: "Game Rules",
  closeRules: "Close",
  rulesBody: `
      <p>1. Add vowels to guess the word.</p>
      <p>2. If time runs out, the turn passes to the next player. Clues and vowels are revealed as rounds progress.</p>
      <p>3. You can use the "REVEAL CLUE" button to get an immediate clue in exchange for 1 point.</p>
      <p>4. Once the word is revealed, guess its category.</p>
      <p>5. Connectors and lowercase words are visible; you only need to guess the words written in UPPERCASE.</p>
  `
};

export function t(key, vars = {}) {
  let s = TEXT[key] ?? key;
  return s.replace(/\{([a-zA-Z0-9_]+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}
