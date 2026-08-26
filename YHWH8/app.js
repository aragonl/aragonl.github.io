import { categoriesData as categoriesES } from "./palabras-es.js";
import { categoriesData as categoriesEN } from "./palabras-en.js";
import { categoriesData as categoriesIT } from "./palabras-it.js";

// Agruparlos en un objeto para acceder por código de idioma
const allCategories = {
  es: categoriesES,
  en: categoriesEN,
  it: categoriesIT
};

import { TEXT as textES, EMOJI_MAP as EMOJI_MAP_ES } from "./texto-es.js";
import { TEXT as textIT, EMOJI_MAP as EMOJI_MAP_IT } from "./texto-it.js";
import { TEXT as textEN, EMOJI_MAP as EMOJI_MAP_EN } from "./texto-en.js";

const MAX_TURNS_PER_ROUND = 12;
const MAX_INCORRECT = 10;
const COLOR_PALETTE = ["#8a89c0", "#729b79", "#bac7a7", "#e3b5a4", "#cda5b6"];

const state = {
  lang: "es",
  text: textES || {},
  emojiMap: EMOJI_MAP_ES || {},
  selectedCategoryIds: new Set(),
  activeCategories: [],
  targetCount: 3,
  gameCategories: [],

  roundCount: 3,
  turnTimeLimit: 120,

  players: [],
  scores: [],
  playerColors: [],
  currentPlayerIndex: 0,
  currentRound: 1,

  deck: [],
  currentCard: null,
  attemptsInRound: 0,
  incorrectAttempts: 0,

  selectedCategory: null,
  guessedWordsByPart: [],
  wordRevealedByPlayer: false,
  wordGuessedCorrectly: false,
  partAttempts: [],

  discoveredWords: [],
  discoveredWordsCount: 0,

  timerId: null,
  timeLeft: 120,
  isPaused: false,
  revealForCurrentCardShown: false,
  usedHints: 0
};

const dom = {
  subtitle: document.getElementById("subtitle"),
  langScroll: document.getElementById("lang-scroll"),
  infoBtn: document.getElementById("info-btn"),
  rulesModal: document.getElementById("rules-modal"),
  closeRules: document.getElementById("close-rules"),
  configBtn: document.getElementById("config-btn"),
  configPanel: document.getElementById("config-panel"),
  screenStart: document.getElementById("screen-start"),
  screenGame: document.getElementById("screen-game"),
  screenEnd: document.getElementById("screen-end"),
  startGameBtn: document.getElementById("start-game"),
  playersSelect: document.getElementById("players"),
  turnTimeInput: document.getElementById("turn-time"),
  roundTotalInput: document.getElementById("round-total"),
  categoriesTitle: document.getElementById("categories-title"),
  categoryCount: document.getElementById("category-count"),
  categoriesContainer: document.getElementById("categories"),
  randomCategoriesBtn: document.getElementById("random-categories"),
  startError: document.getElementById("start-error"),
  scoreboard: document.getElementById("scoreboard"),
  roundLabel: document.getElementById("round-label"),
  turnLabel: document.getElementById("turn-label"),
  timer: document.getElementById("timer"),
  pauseTimeBtn: document.getElementById("pause-time"),
  clueStage: document.getElementById("clue-stage"),
  attemptStatus: document.getElementById("attempt-status"),
  guessWords: document.getElementById("guess-words"),
  guessCategories: document.getElementById("guess-categories"),
  revealHintBtn: document.getElementById("reveal-hint-btn"),
  submitGuessBtn: document.getElementById("submit-guess"),
  feedback: document.getElementById("feedback"),
  feedbackModal: document.getElementById("feedback-modal"),
  feedbackMessage: document.getElementById("feedback-message"),
  feedbackContinue: document.getElementById("feedback-continue"),
  gameActivePanel: document.getElementById("game-active-panel"),
  revealInColumn: document.getElementById("reveal-in-column"),
  computerBadge: document.getElementById("computer-badge"),
  revealTitle: document.getElementById("reveal-title"),
  revealedCategory: document.getElementById("revealed-category"),
  revealFortext: document.getElementById("reveal-fortext"),
  revealedWord: document.getElementById("revealed-word"),
  revealHelp: document.getElementById("reveal-help"),
  continueRevealBtn: document.getElementById("continue-reveal"),
  boardTitleText: document.getElementById("board-title-text"),
  discoveredCount: document.getElementById("discovered-count"),
  boardCategories: document.getElementById("board-categories"),
  endTitle: document.getElementById("end-title"),
  finalScores: document.getElementById("final-scores"),
  newGameBtn: document.getElementById("new-game"),
  timeLabel: document.getElementById("time-label"),
  roundsLabel: document.getElementById("rounds-label"),
  playersLabel: document.getElementById("players-label"),
  playerColorsTitle: document.getElementById("player-colors-title"),
  playerColorsContainer: document.getElementById("player-colors"),
  playerColorOptions: document.getElementById("player-color-options"),
  inGameHeaderControls: document.getElementById("in-game-header-controls"),
  configCatCount: document.getElementById("config-cat-count")
};

function normalize(str) {
  return (str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim();
}

function stripVowels(str) {
  return str.replace(/[AEIOUÁÉÍÓÚÜaeiouáéíóúü]/g, "");
}

function revealVowels(target, budget) {
  let remainingBudget = budget;
  return target.replace(/[AEIOUÁÉÍÓÚÜaeiouáéíóúü]/g, match => {
    if (remainingBudget > 0) {
      remainingBudget--;
      return match;
    }
    return "";
  });
}

function formatMinToEmoji(text, emojiMap) {
  if (!text) return "";
  return text.replace(/[a-záéíóúüñ]+/g, match => {
    const norm = normalize(match);
    if (emojiMap && emojiMap[norm]) {
      return emojiMap[norm];
    }
    return match;
  });
}

function renderClue(word, r, emojiMap) {
  const parts = word.split(/\s*&\s*/);
  let vowelCount = r >= 3 ? r - 2 : 0;
  let vowelBudget = vowelCount;

  const displayedParts = parts.map(part => {
    let remaining = formatMinToEmoji(part, emojiMap);

    const targetMatches = remaining.match(/[A-ZÁÉÍÓÚÜÑ]+(?:-[A-ZÁÉÍÓÚÜÑ]+)*/g);
    if (targetMatches) {
      targetMatches.forEach(target => {
        const shown = vowelCount > 0 ? revealVowels(target, vowelBudget) : stripVowels(target);
        vowelBudget = Math.max(0, vowelBudget - (target.match(/[AEIOUÁÉÍÓÚÜaeiouáéíóúü]/g) || []).length);
        remaining = remaining.replace(target, shown);
      });
    }

    return remaining;
  });

  return displayedParts.join(" & ");
}

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function loadLanguage(lang) {
  state.lang = lang;
  if (lang === "it") {
    state.text = textIT || {};
    state.emojiMap = EMOJI_MAP_IT || {};
  } else if (lang === "en") {
    state.text = textEN || {};
    state.emojiMap = EMOJI_MAP_EN || {};
  } else {
    state.text = textES || {};
    state.emojiMap = EMOJI_MAP_ES || {};
  }
  updateUIStaticText();
  renderCategorySelection();
  renderPlayerConfig();
}

function updateUIStaticText() {
  const t = state.text;
  if (dom.subtitle) dom.subtitle.textContent = t.subtitle || "Juego de palabras";
  if (dom.startGameBtn) dom.startGameBtn.textContent = t.startGame || "INICIAR JUEGO";
  if (dom.randomCategoriesBtn) dom.randomCategoriesBtn.textContent = t.randomCategories || "Categorías aleatorias";
  if (dom.pauseTimeBtn) dom.pauseTimeBtn.textContent = t.pause || "Pausar";
  if (dom.boardTitleText) dom.boardTitleText.textContent = t.boardTitle || "Palabras descubiertas";
  if (dom.newGameBtn) dom.newGameBtn.textContent = t.newGame || "Nuevo Juego";
  if (dom.timeLabel) dom.timeLabel.textContent = t.turnTimeLabel || "Tiempo por turno (seg):";
  if (dom.roundsLabel) dom.roundsLabel.textContent = t.roundsLabel || "Número de rondas:";
  if (dom.playersLabel) dom.playersLabel.textContent = t.playersLabel || "Jugadores:";
  if (dom.categoriesTitle) dom.categoriesTitle.textContent = t.selectCategories || "Selecciona las categorías";
  if (dom.playerColorsTitle) dom.playerColorsTitle.textContent = t.playerNamesTitle || "Nombres y colores de los jugadores";
  if (dom.continueRevealBtn) dom.continueRevealBtn.textContent = t.continue || "Continuar";
  if (dom.feedbackContinue) dom.feedbackContinue.textContent = t.continue || "Continuar";
}

function initPlayerSetup() {
  const numPlayers = parseInt(dom.playersSelect.value, 10) || 1;
  state.players = [];
  state.scores = [];
  state.playerColors = [];

  const defaultPlayerName = state.text.player || "Jugador";
  for (let i = 0; i < numPlayers; i++) {
    state.players.push(`${defaultPlayerName} ${i + 1}`);
    state.scores.push(0);
    state.playerColors.push(COLOR_PALETTE[i % COLOR_PALETTE.length]);
  }
  renderPlayerConfig();
}

function renderPlayerConfig() {
  if (!dom.playerColorsContainer) return;
  dom.playerColorsContainer.innerHTML = "";
  const defaultPlayerName = state.text.player || "Jugador";

  state.players.forEach((name, idx) => {
    const item = document.createElement("div");
    item.className = "player-color-item";

    const input = document.createElement("input");
    input.type = "text";
    input.value = name;
    input.onchange = (e) => {
      state.players[idx] = e.target.value.trim() || `${defaultPlayerName} ${idx + 1}`;
    };

    const colorPicker = document.createElement("div");
    colorPicker.className = "color-picker";
    COLOR_PALETTE.forEach(color => {
      const opt = document.createElement("div");
      opt.className = `color-option ${state.playerColors[idx] === color ? "selected" : ""}`;
      opt.style.backgroundColor = color;
      opt.onclick = () => {
        state.playerColors[idx] = color;
        renderPlayerConfig();
      };
      colorPicker.appendChild(opt);
    });

    item.appendChild(input);
    item.appendChild(colorPicker);
    dom.playerColorsContainer.appendChild(item);
  });
}

function renderCategorySelection() {
  // Busca en el objeto global según el idioma actual, o cae a 'es' si no existe
  const cats = allCategories[state.lang] || allCategories.es || [];
  if (!dom.categoriesContainer) return;
  dom.categoriesContainer.innerHTML = "";
  
  cats.forEach(cat => {
    const card = document.createElement("div");
    card.className = `category-card ${state.selectedCategoryIds.has(cat.id) ? "selected" : ""}`;
    card.style.setProperty("--selected-bg", cat.color || "#eee7f4");
    
    const wordsBadgeText = state.text.wordsBadge || "palabras";
    card.innerHTML = `
      <h4>${cat.name}</h4>
      <p>${cat.description || ""}</p>
      <span class="badge">${cat.words ? cat.words.length : 0} ${wordsBadgeText}</span>
    `;
    card.onclick = () => {
      if (state.selectedCategoryIds.has(cat.id)) {
        state.selectedCategoryIds.delete(cat.id);
      } else {
        state.selectedCategoryIds.add(cat.id);
      }
      renderCategorySelection();
    };
    dom.categoriesContainer.appendChild(card);
  });
  updateCategoryCount();
}

function updateCategoryCount() {
  if (!dom.categoryCount) return;
  const labelText = state.text.categoriesSelected || "categorías seleccionadas";
  dom.categoryCount.textContent = `${state.selectedCategoryIds.size} ${labelText}`;
}

function selectRandomCategories() {
  // Busca en el objeto global según el idioma actual, o cae a 'es' si no existe
  const cats = allCategories[state.lang] || allCategories.es || [];
  const count = parseInt(dom.configCatCount.value, 10) || state.targetCount;
  const shuffled = shuffle(cats);
  state.selectedCategoryIds.clear();
  shuffled.slice(0, count).forEach(c => state.selectedCategoryIds.add(c.id));
  renderCategorySelection();
}

function setupPlayersSelect() {
  if (!dom.playersSelect) return;
  dom.playersSelect.innerHTML = "";
  const singleLabel = state.text.player || "Jugador";
  const multiLabel = state.text.players || "Jugadores";

  for (let i = 1; i <= 5; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${i} ${i === 1 ? singleLabel : multiLabel}`;
    dom.playersSelect.appendChild(opt);
  }
  dom.playersSelect.value = 1;
}

function startGame() {
  if (state.selectedCategoryIds.size === 0) {
    if (dom.startError) dom.startError.textContent = state.text.selectAtLeastOne || "Selecciona al menos una categoría";
    return;
  }
  if (dom.startError) dom.startError.textContent = "";

  // Busca en el objeto global según el idioma actual, o cae a 'es' si no existe
  const cats = allCategories[state.lang] || allCategories.es || [];
  state.activeCategories = cats.filter(c => state.selectedCategoryIds.has(c.id));
  state.roundCount = parseInt(dom.roundTotalInput.value, 10) || 3;
  state.turnTimeLimit = parseInt(dom.turnTimeInput.value, 10) || 120;

  state.deck = [];
  state.activeCategories.forEach(cat => {
    if (cat.words) {
      cat.words.forEach(w => {
        state.deck.push({
          ...w,
          categoryId: cat.id,
          categoryName: cat.name
        });
      });
    }
  });

  state.deck = shuffle(state.deck);
  state.currentRound = 1;
  state.currentPlayerIndex = 0;
  state.discoveredWords = [];
  state.discoveredWordsCount = 0;

  dom.screenStart.classList.add("hidden");
  dom.screenGame.classList.remove("hidden");
  
  if (dom.inGameHeaderControls) {
    const headerRight = document.querySelector(".header-controls-right");
    if (headerRight) {
      dom.inGameHeaderControls.appendChild(headerRight);
    }
  }

  renderBoard();
  nextTurn(true);
}

function renderBoard() {
  if (!dom.boardCategories) return;
  dom.boardCategories.innerHTML = "";
  if (dom.discoveredCount) dom.discoveredCount.textContent = state.discoveredWordsCount;

  state.activeCategories.forEach(cat => {
    const catEl = document.createElement("div");
    catEl.className = "board-category";
    catEl.style.setProperty("--category-bg", cat.color || "#f0f0f0");

    const header = document.createElement("div");
    header.className = "board-category-header";
    header.innerHTML = `<h3>${cat.name}</h3><p class="fortext">${cat.description || ""}</p>`;
    catEl.appendChild(header);

    const wordList = document.createElement("div");
    wordList.className = "word-list";

    const found = state.discoveredWords.filter(w => w.categoryId === cat.id);
    found.forEach(item => {
      const chip = document.createElement("div");
      chip.className = "word-chip";
      
      const fullWordMinEmoji = formatMinToEmoji(item.word, state.emojiMap);
      
      chip.innerHTML = `<strong>${fullWordMinEmoji}</strong><small>${item.discoveredBy}</small>`;
      wordList.appendChild(chip);
    });

    catEl.appendChild(wordList);
    dom.boardCategories.appendChild(catEl);
  });
}

function nextTurn(isNewRound = false) {
  stopTimer();

  if (state.deck.length === 0) {
    endGame();
    return;
  }

  if (isNewRound) {
    state.attemptsInRound = 0;
    state.incorrectAttempts = 0;
    state.currentCard = state.deck.pop();
    state.usedHints = 0;
  }

  state.selectedCategory = null;
  state.revealForCurrentCardShown = false;

  const parts = state.currentCard.word.split(/\s*&\s*/);
  state.guessedWordsByPart = parts.map(p => {
    const matches = p.match(/[A-ZÁÉÍÓÚÜÑ]+/g);
    return matches ? matches.map(() => false) : [];
  });
  
  state.partAttempts = parts.map(p => {
    const matches = p.match(/[A-ZÁÉÍÓÚÜÑ]+/g);
    return matches ? matches.map(() => false) : [];
  });

  state.wordRevealedByPlayer = false;
  state.wordGuessedCorrectly = false;

  renderTurnUI();
  startTimer();
}

function renderTurnUI() {
  dom.gameActivePanel.classList.remove("hidden");
  dom.revealInColumn.classList.add("hidden");
  dom.feedbackModal.classList.add("hidden");

  renderScoreboard();
  
  const roundText = state.text.round || "Ronda";
  const turnText = state.text.turnOf || "Turno de";
  const roundAttemptsText = state.text.roundAttempts || "Intentos en ronda";
  const incorrectText = state.text.incorrect || "Incorrectos";

  dom.roundLabel.textContent = `${roundText} ${state.currentRound} / ${state.roundCount}`;
  dom.turnLabel.textContent = `${turnText}: ${state.players[state.currentPlayerIndex]}`;

  dom.clueStage.textContent = renderClue(state.currentCard.word, state.currentRound, state.emojiMap);
  dom.attemptStatus.textContent = `${roundAttemptsText}: ${state.attemptsInRound} (${incorrectText}: ${state.incorrectAttempts}/${MAX_INCORRECT})`;

  renderGuessInputs();
  renderCategoryChoices();

  dom.feedback.textContent = "";
  dom.feedback.className = "feedback";
}

function renderScoreboard() {
  if (!dom.scoreboard) return;
  dom.scoreboard.innerHTML = "";
  const maxScore = Math.max(...state.scores, 10);

  state.players.forEach((p, idx) => {
    const card = document.createElement("div");
    card.className = `score ${idx === state.currentPlayerIndex ? "active" : ""}`;
    const fillPercent = Math.min(100, (state.scores[idx] / maxScore) * 100);
    card.style.setProperty("--score-fill", `${fillPercent}%`);
    card.style.setProperty("--player-color", state.playerColors[idx] || "#8a89c0");

    card.innerHTML = `
      <div class="score-name">${p}</div>
      <div class="score-pts">${state.scores[idx]} pts</div>
    `;
    dom.scoreboard.appendChild(card);
  });
}

function renderGuessInputs() {
  if (!dom.guessWords) return;
  dom.guessWords.innerHTML = "";
  const parts = state.currentCard.word.split(/\s*&\s*/);
  const wordLabelText = state.text.word || "Palabra";

  parts.forEach((part, partIdx) => {
    const matches = part.match(/[A-ZÁÉÍÓÚÜÑ]+/g) || [];
    const minEmojiPart = formatMinToEmoji(part, state.emojiMap);

    const partContainer = document.createElement("div");
    partContainer.className = "guess-part-container";

    const label = document.createElement("div");
    label.style.fontSize = "0.85rem";
    label.style.color = "var(--muted)";
    label.style.marginBottom = "4px";
    label.textContent = minEmojiPart.replace(/[A-ZÁÉÍÓÚÜÑ]+/g, "___");
    partContainer.appendChild(label);

    matches.forEach((target, wordIdx) => {
      const isGuessed = state.guessedWordsByPart[partIdx]?.[wordIdx];
      const input = document.createElement("input");
      input.type = "text";
      input.className = `guess-word-input ${isGuessed ? "already-guessed" : ""}`;
      input.placeholder = isGuessed ? target : `${wordLabelText} ${wordIdx + 1}`;
      input.value = isGuessed ? target : "";
      input.disabled = isGuessed;
      input.dataset.partIdx = partIdx;
      input.dataset.wordIdx = wordIdx;
      partContainer.appendChild(input);
    });

    dom.guessWords.appendChild(partContainer);
  });
}

function renderCategoryChoices() {
  if (!dom.guessCategories) return;
  dom.guessCategories.innerHTML = "";
  state.activeCategories.forEach(cat => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `category-choice ${state.selectedCategory === cat.id ? "selected" : ""}`;
    btn.textContent = cat.name;

    if (state.wordRevealedByPlayer) {
      btn.disabled = true;
    } else {
      btn.onclick = () => {
        state.selectedCategory = cat.id;
        renderCategoryChoices();
      };
    }
    dom.guessCategories.appendChild(btn);
  });
}

function startTimer() {
  state.timeLeft = state.turnTimeLimit;
  state.isPaused = false;
  if (dom.pauseTimeBtn) dom.pauseTimeBtn.textContent = state.text.pause || "Pausar";
  updateTimerDisplay();

  state.timerId = setInterval(() => {
    if (!state.isPaused) {
      state.timeLeft--;
      updateTimerDisplay();
      if (state.timeLeft <= 0) {
        stopTimer();
        handleTimeOut();
      }
    }
  }, 1000);
}

function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function updateTimerDisplay() {
  if (!dom.timer) return;
  const m = Math.floor(state.timeLeft / 60).toString().padStart(2, "0");
  const s = (state.timeLeft % 60).toString().padStart(2, "0");
  dom.timer.textContent = `${m}:${s}`;
  if (state.timeLeft <= 10) {
    dom.timer.classList.add("warning");
  } else {
    dom.timer.classList.remove("warning");
  }
}

function handleTimeOut() {
  const msg = state.text.timeOut || "¡Tiempo agotado!";
  showModalFeedback(msg, "bad", () => {
    advanceTurnAfterAttempt(false);
  });
}

function showModalFeedback(msg, type, onContinue) {
  if (!dom.feedbackMessage || !dom.feedbackModal) return;
  dom.feedbackMessage.textContent = msg;
  dom.feedbackMessage.className = `feedback ${type}`;
  dom.feedbackModal.classList.remove("hidden");

  if (dom.feedbackContinue) {
    dom.feedbackContinue.onclick = () => {
      dom.feedbackModal.classList.add("hidden");
      if (onContinue) onContinue();
    };
  }
}

function checkGuess() {
  const inputs = Array.from(dom.guessWords.querySelectorAll(".guess-word-input"));
  const parts = state.currentCard.word.split(/\s*&\s*/);

  let wordCorrect = true;
  let pointsAwarded = 0;
  let partialMatch = false;

  parts.forEach((part, partIdx) => {
    const matches = part.match(/[A-ZÁÉÍÓÚÜÑ]+/g) || [];
    matches.forEach((target, wordIdx) => {
      if (state.guessedWordsByPart[partIdx][wordIdx]) {
        return;
      }

      const input = inputs.find(
        i => parseInt(i.dataset.partIdx, 10) === partIdx && parseInt(i.dataset.wordIdx, 10) === wordIdx
      );

      const val = normalize(input ? input.value : "");
      const targetNorm = normalize(target);

      if (val === targetNorm) {
        state.guessedWordsByPart[partIdx][wordIdx] = true;
        pointsAwarded += 2;
        partialMatch = true;
      } else {
        wordCorrect = false;
        if (val.length > 0) {
          state.partAttempts[partIdx][wordIdx] = true;
        }
      }
    });
  });

  const allWordsGuessed = state.guessedWordsByPart.every(p => p.every(w => w === true));

  let categoryCorrect = false;
  if (!state.wordRevealedByPlayer && state.selectedCategory) {
    if (state.selectedCategory === state.currentCard.categoryId) {
      categoryCorrect = true;
      pointsAwarded += 3;
    }
  }

  if (allWordsGuessed && categoryCorrect) {
    state.scores[state.currentPlayerIndex] += pointsAwarded;
    state.wordGuessedCorrectly = true;

    state.discoveredWords.push({
      word: state.currentCard.word,
      categoryId: state.currentCard.categoryId,
      discoveredBy: state.players[state.currentPlayerIndex]
    });
    state.discoveredWordsCount++;
    renderBoard();

    const msg = state.text.fullSuccess || "¡Acierto total!";
    showModalFeedback(`${msg} (+${pointsAwarded} pts)`, "good", () => {
      finishRoundWithComputerReveal(state.players[state.currentPlayerIndex]);
    });
    return;
  }

  if (partialMatch || categoryCorrect) {
    state.scores[state.currentPlayerIndex] += pointsAwarded;

    let msg = `${state.text.partialSuccess || "Acierto parcial"} (+${pointsAwarded} pts). `;
    if (categoryCorrect) msg += state.text.catCorrect || "Categoría correcta.";
    
    showModalFeedback(msg, "partial", () => {
      renderTurnUI();
      advanceTurnAfterAttempt(false);
    });
    return;
  }

  state.incorrectAttempts++;
  const msgBad = state.text.nothingCorrect || "Sin aciertos.";
  showModalFeedback(msgBad, "bad", () => {
    advanceTurnAfterAttempt(true);
  });
}

function handleHintReveal() {
  if (state.scores[state.currentPlayerIndex] < 1) {
    showModalFeedback("No tienes suficientes puntos para revelar una pista.", "bad");
    return;
  }

  const parts = state.currentCard.word.split(/\s*&\s*/);
  let unrevealed = [];

  parts.forEach((part, partIdx) => {
    const matches = part.match(/[A-ZÁÉÍÓÚÜÑ]+/g) || [];
    matches.forEach((target, wordIdx) => {
      if (!state.guessedWordsByPart[partIdx][wordIdx]) {
        unrevealed.push({ partIdx, wordIdx, target });
      }
    });
  });

  if (unrevealed.length === 0) return;

  state.scores[state.currentPlayerIndex] -= 1;
  state.usedHints++;

  const chosen = unrevealed[Math.floor(Math.random() * unrevealed.length)];
  state.guessedWordsByPart[chosen.partIdx][chosen.wordIdx] = true;

  const allWordsGuessed = state.guessedWordsByPart.every(p => p.every(w => w === true));

  showModalFeedback(`Pista revelada: "${chosen.target}". (-1 pt)`, "partial", () => {
    if (allWordsGuessed) {
      finishRoundWithComputerReveal(state.players[state.currentPlayerIndex]);
    } else {
      renderTurnUI();
    }
  });
}

function advanceTurnAfterAttempt(wasIncorrect) {
  state.attemptsInRound++;

  if (state.attemptsInRound >= MAX_TURNS_PER_ROUND || state.incorrectAttempts >= MAX_INCORRECT) {
    const compText = state.text.computer || "Ordenador";
    finishRoundWithComputerReveal(compText);
    return;
  }

  state.currentPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
  renderTurnUI();
  startTimer();
}

function finishRoundWithComputerReveal(winnerName) {
  stopTimer();
  state.gameActivePanel.classList.add("hidden");
  state.revealInColumn.classList.remove("hidden");

  const compText = state.text.computer || "Ordenador";
  const compBadge = state.text.computerBadge || "REVELADO";
  const wordRevTitle = state.text.wordRevealedTitle || "Palabra Revelada";

  if (dom.computerBadge) dom.computerBadge.textContent = winnerName === compText ? compBadge : winnerName;
  if (dom.revealTitle) dom.revealTitle.textContent = wordRevTitle;

  const fullWordWithEmoji = formatMinToEmoji(state.currentCard.word, state.emojiMap);

  if (dom.revealedCategory) dom.revealedCategory.textContent = `${state.currentCard.categoryName} / ${state.currentCard.subcategory || ""}`;
  if (dom.revealFortext) dom.revealFortext.textContent = state.currentCard.fortext || "-";
  if (dom.revealedWord) dom.revealedWord.textContent = fullWordWithEmoji;
  if (dom.revealHelp) dom.revealHelp.textContent = state.currentCard.help || "-";

  if (winnerName === compText) {
    state.discoveredWords.push({
      word: state.currentCard.word,
      categoryId: state.currentCard.categoryId,
      discoveredBy: compText
    });
    state.discoveredWordsCount++;
    renderBoard();
  }

  if (dom.continueRevealBtn) {
    dom.continueRevealBtn.onclick = () => {
      if (state.currentRound < state.roundCount && state.deck.length > 0) {
        state.currentRound++;
        state.currentPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
        nextTurn(true);
      } else {
        endGame();
      }
    };
  }
}

function endGame() {
  stopTimer();
  dom.screenGame.classList.add("hidden");
  dom.screenEnd.classList.remove("hidden");

  if (dom.endTitle) dom.endTitle.textContent = state.text.gameOver || "Juego Terminado";
  if (dom.finalScores) dom.finalScores.innerHTML = "";

  const sorted = state.players
    .map((p, i) => ({ name: p, score: state.scores[i], color: state.playerColors[i] }))
    .sort((a, b) => b.score - a.score);

  sorted.forEach(item => {
    const row = document.createElement("div");
    row.className = "final-score";
    row.style.borderLeft = `6px solid ${item.color}`;
    row.innerHTML = `<strong>${item.name}</strong><span>${item.score} pts</span>`;
    dom.finalScores.appendChild(row);
  });
}

function initEvents() {
  if (dom.langScroll) dom.langScroll.onchange = (e) => loadLanguage(e.target.value);
  if (dom.playersSelect) dom.playersSelect.onchange = () => initPlayerSetup();
  if (dom.randomCategoriesBtn) dom.randomCategoriesBtn.onclick = () => selectRandomCategories();
  if (dom.startGameBtn) dom.startGameBtn.onclick = () => startGame();
  if (dom.submitGuessBtn) dom.submitGuessBtn.onclick = () => checkGuess();
  if (dom.revealHintBtn) dom.revealHintBtn.onclick = () => handleHintReveal();
  if (dom.newGameBtn) dom.newGameBtn.onclick = () => {
    dom.screenEnd.classList.add("hidden");
    dom.screenStart.classList.remove("hidden");
  };

  if (dom.configBtn) {
    dom.configBtn.onclick = () => {
      if (dom.configPanel) dom.configPanel.classList.toggle("hidden");
    };
  }

  if (dom.infoBtn) {
    dom.infoBtn.onclick = () => {
      if (dom.rulesModal) dom.rulesModal.classList.remove("hidden");
    };
  }
  if (dom.closeRules) {
    dom.closeRules.onclick = () => {
      if (dom.rulesModal) dom.rulesModal.classList.add("hidden");
    };
  }

  if (dom.pauseTimeBtn) {
    dom.pauseTimeBtn.onclick = () => {
      state.isPaused = !state.isPaused;
      const pauseText = state.text.pause || "Pausar";
      const resumeText = state.text.resume || "Reanudar";
      dom.pauseTimeBtn.textContent = state.isPaused ? resumeText : pauseText;
    };
  }
}

function init() {
  setupPlayersSelect();
  loadLanguage("es");
  initPlayerSetup();
  initEvents();
}

init();
