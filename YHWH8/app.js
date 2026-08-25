import { categoriesData } from "./words.js";
import { textES, EMOJI_MAP_ES } from "./texto-es.js";
import { textIT, EMOJI_MAP_IT } from "./texto-it.js";
import { textEN, EMOJI_MAP_EN } from "./texto-en.js";

const MAX_TURNS_PER_ROUND = 12;
const MAX_INCORRECT = 10;
const COLOR_PALETTE = ["#8a89c0", "#729b79", "#bac7a7", "#e3b5a4", "#cda5b6"];

const state = {
  lang: "es",
  text: textES,
  emojiMap: EMOJI_MAP_ES,
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
    state.text = textIT;
    state.emojiMap = EMOJI_MAP_IT;
  } else if (lang === "en") {
    state.text = textEN;
    state.emojiMap = EMOJI_MAP_EN;
  } else {
    state.text = textES;
    state.emojiMap = EMOJI_MAP_ES;
  }
  updateUIStaticText();
  renderCategorySelection();
  renderPlayerConfig();
}

function updateUIStaticText() {
  const t = state.text;
  dom.subtitle.textContent = t.subtitle;
  dom.startGameBtn.textContent = t.startGame;
  dom.randomCategoriesBtn.textContent = t.randomCategories;
  dom.pauseTimeBtn.textContent = t.pause;
  dom.boardTitleText.textContent = t.boardTitle;
  dom.newGameBtn.textContent = t.newGame;
  dom.timeLabel.textContent = t.turnTimeLabel;
  dom.roundsLabel.textContent = t.roundsLabel;
  dom.playersLabel.textContent = t.playersLabel;
  dom.categoriesTitle.textContent = t.selectCategories;
  dom.playerColorsTitle.textContent = t.playerNamesTitle;
  dom.continueRevealBtn.textContent = t.continue;
  dom.feedbackContinue.textContent = t.continue;
}

function initPlayerSetup() {
  const numPlayers = parseInt(dom.playersSelect.value, 10) || 1;
  state.players = [];
  state.scores = [];
  state.playerColors = [];

  for (let i = 0; i < numPlayers; i++) {
    state.players.push(`${state.text.player} ${i + 1}`);
    state.scores.push(0);
    state.playerColors.push(COLOR_PALETTE[i % COLOR_PALETTE.length]);
  }
  renderPlayerConfig();
}

function renderPlayerConfig() {
  dom.playerColorsContainer.innerHTML = "";
  state.players.forEach((name, idx) => {
    const item = document.createElement("div");
    item.className = "player-color-item";

    const input = document.createElement("input");
    input.type = "text";
    input.value = name;
    input.onchange = (e) => {
      state.players[idx] = e.target.value.trim() || `${state.text.player} ${idx + 1}`;
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
  const cats = categoriesData[state.lang] || categoriesData.es;
  dom.categoriesContainer.innerHTML = "";
  cats.forEach(cat => {
    const card = document.createElement("div");
    card.className = `category-card ${state.selectedCategoryIds.has(cat.id) ? "selected" : ""}`;
    card.style.setProperty("--selected-bg", cat.color || "#eee7f4");
    card.innerHTML = `
      <h4>${cat.name}</h4>
      <p>${cat.description}</p>
      <span class="badge">${cat.words.length} ${state.text.wordsBadge}</span>
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
  dom.categoryCount.textContent = `${state.selectedCategoryIds.size} ${state.text.categoriesSelected}`;
}

function selectRandomCategories() {
  const cats = categoriesData[state.lang] || categoriesData.es;
  const count = parseInt(dom.configCatCount.value, 10) || state.targetCount;
  const shuffled = shuffle(cats);
  state.selectedCategoryIds.clear();
  shuffled.slice(0, count).forEach(c => state.selectedCategoryIds.add(c.id));
  renderCategorySelection();
}

function setupPlayersSelect() {
  dom.playersSelect.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${i} ${i === 1 ? state.text.player : state.text.players}`;
    dom.playersSelect.appendChild(opt);
  }
  dom.playersSelect.value = 1;
}

function startGame() {
  if (state.selectedCategoryIds.size === 0) {
    dom.startError.textContent = state.text.selectAtLeastOne;
    return;
  }
  dom.startError.textContent = "";

  const cats = categoriesData[state.lang] || categoriesData.es;
  state.activeCategories = cats.filter(c => state.selectedCategoryIds.has(c.id));
  state.roundCount = parseInt(dom.roundTotalInput.value, 10) || 3;
  state.turnTimeLimit = parseInt(dom.turnTimeInput.value, 10) || 120;

  state.deck = [];
  state.activeCategories.forEach(cat => {
    cat.words.forEach(w => {
      state.deck.push({
        ...w,
        categoryId: cat.id,
        categoryName: cat.name
      });
    });
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
  dom.boardCategories.innerHTML = "";
  dom.discoveredCount.textContent = state.discoveredWordsCount;

  state.activeCategories.forEach(cat => {
    const catEl = document.createElement("div");
    catEl.className = "board-category";
    catEl.style.setProperty("--category-bg", cat.color || "#f0f0f0");

    const header = document.createElement("div");
    header.className = "board-category-header";
    header.innerHTML = `<h3>${cat.name}</h3><p class="fortext">${cat.description}</p>`;
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
  dom.roundLabel.textContent = `${state.text.round} ${state.currentRound} / ${state.roundCount}`;
  dom.turnLabel.textContent = `${state.text.turnOf}: ${state.players[state.currentPlayerIndex]}`;

  dom.clueStage.textContent = renderClue(state.currentCard.word, state.currentRound, state.emojiMap);
  dom.attemptStatus.textContent = `${state.text.roundAttempts}: ${state.attemptsInRound} (${state.text.incorrect}: ${state.incorrectAttempts}/${MAX_INCORRECT})`;

  renderGuessInputs();
  renderCategoryChoices();

  dom.feedback.textContent = "";
  dom.feedback.className = "feedback";
}

function renderScoreboard() {
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
  dom.guessWords.innerHTML = "";
  const parts = state.currentCard.word.split(/\s*&\s*/);

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
      input.placeholder = isGuessed ? target : `${state.text.word} ${wordIdx + 1}`;
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
  dom.pauseTimeBtn.textContent = state.text.pause;
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
  showModalFeedback(state.text.timeOut, "bad", () => {
    advanceTurnAfterAttempt(false);
  });
}

function showModalFeedback(msg, type, onContinue) {
  dom.feedbackMessage.textContent = msg;
  dom.feedbackMessage.className = `feedback ${type}`;
  dom.feedbackModal.classList.remove("hidden");

  dom.feedbackContinue.onclick = () => {
    dom.feedbackModal.classList.add("hidden");
    if (onContinue) onContinue();
  };
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

    showModalFeedback(`${state.text.fullSuccess} (+${pointsAwarded} pts)`, "good", () => {
      finishRoundWithComputerReveal(state.players[state.currentPlayerIndex]);
    });
    return;
  }

  if (partialMatch || categoryCorrect) {
    state.scores[state.currentPlayerIndex] += pointsAwarded;

    let msg = `${state.text.partialSuccess} (+${pointsAwarded} pts). `;
    if (categoryCorrect) msg += state.text.catCorrect;
    
    showModalFeedback(msg, "partial", () => {
      renderTurnUI();
      advanceTurnAfterAttempt(false);
    });
    return;
  }

  state.incorrectAttempts++;
  showModalFeedback(state.text.nothingCorrect, "bad", () => {
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
    finishRoundWithComputerReveal(state.text.computer);
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

  dom.computerBadge.textContent = winnerName === state.text.computer ? state.text.computerBadge : winnerName;
  dom.revealTitle.textContent = state.text.wordRevealedTitle;

  const fullWordWithEmoji = formatMinToEmoji(state.currentCard.word, state.emojiMap);

  dom.revealedCategory.textContent = `${state.currentCard.categoryName} / ${state.currentCard.subcategory || ""}`;
  dom.revealFortext.textContent = state.currentCard.fortext || "-";
  dom.revealedWord.textContent = fullWordWithEmoji;
  dom.revealHelp.textContent = state.currentCard.help || "-";

  if (winnerName === state.text.computer) {
    state.discoveredWords.push({
      word: state.currentCard.word,
      categoryId: state.currentCard.categoryId,
      discoveredBy: state.text.computer
    });
    state.discoveredWordsCount++;
    renderBoard();
  }

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

function endGame() {
  stopTimer();
  dom.screenGame.classList.add("hidden");
  dom.screenEnd.classList.remove("hidden");

  dom.endTitle.textContent = state.text.gameOver;
  dom.finalScores.innerHTML = "";

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
  dom.langScroll.onchange = (e) => loadLanguage(e.target.value);
  dom.playersSelect.onchange = () => initPlayerSetup();
  dom.randomCategoriesBtn.onclick = () => selectRandomCategories();
  dom.startGameBtn.onclick = () => startGame();
  dom.submitGuessBtn.onclick = () => checkGuess();
  dom.revealHintBtn.onclick = () => handleHintReveal();
  dom.newGameBtn.onclick = () => {
    dom.screenEnd.classList.add("hidden");
    dom.screenStart.classList.remove("hidden");
  };

  dom.configBtn.onclick = () => {
    dom.configPanel.classList.toggle("hidden");
  };

  dom.infoBtn.onclick = () => {
    dom.rulesModal.classList.remove("hidden");
  };
  dom.closeRules.onclick = () => {
    dom.rulesModal.classList.add("hidden");
  };

  dom.pauseTimeBtn.onclick = () => {
    state.isPaused = !state.isPaused;
    dom.pauseTimeBtn.textContent = state.isPaused ? state.text.resume : state.text.pause;
  };
}

function init() {
  setupPlayersSelect();
  loadLanguage("es");
  initPlayerSetup();
  initEvents();
}

init();