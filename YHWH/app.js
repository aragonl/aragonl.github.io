let currentTextModule = null;

let state = {
  lang: 'es',
  playersCount: 2,
  playerColors: ['#FF5722', '#2196F3'],
  selectedCategories: [],
  maxRounds: 3,
  turnTimeLimit: 120,
  
  currentPlayerIndex: 0,
  currentRound: 1,
  scores: [],
  timerInterval: null,
  timeLeft: 0,
  isPaused: false,
  
  currentWord: null,
  currentWordIndex: -1,
  usedWords: new Set(),
  clueStage: 1,
  attemptsInTurn: 0,
  pendingComputerReveal: false
};

const COLOR_PALETTE = [
  '#FF5722', '#2196F3', '#4CAF50', '#FFEB3B', 
  '#9C27B0', '#E91E63', '#00BCD4', '#FF9800'
];

const $ = (id) => document.getElementById(id);

function getWordList() {
  if (currentTextModule && currentTextModule.WORD_DATA) {
    return currentTextModule.WORD_DATA;
  }
  return [];
}

async function switchLanguage(lang) {
  try {
    state.lang = lang;
    currentTextModule = await import(`./text-${lang}.js`);
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (currentTextModule.t && currentTextModule.t(key)) {
        el.textContent = currentTextModule.t(key);
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (currentTextModule.t && currentTextModule.t(key)) {
        el.placeholder = currentTextModule.t(key);
      }
    });

    updatePlayersDropdown();
    renderCategorySelection();
    renderGuessInputs();

    if (state.currentWord) {
      updateRoundUI();
      renderClue();
      renderBoard();
    }
  } catch (err) {
    console.error(`Error al cargar el idioma ${lang}:`, err);
  }
}

function updatePlayersDropdown() {
  const playersSelect = $("players");
  if (!playersSelect) return;

  const words = getWordList();
  const maxPlayers = Math.max(2, words.length - 1);

  playersSelect.innerHTML = "";
  for (let i = 1; i <= maxPlayers; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i;
    playersSelect.appendChild(opt);
  }

  playersSelect.value = "2";
  ensurePlayerColors();
}

function ensurePlayerColors() {
  const count = Number($("players")?.value || 2);
  state.playersCount = count;

  while (state.playerColors.length < count) {
    const nextColor = COLOR_PALETTE[state.playerColors.length % COLOR_PALETTE.length];
    state.playerColors.push(nextColor);
  }
  if (state.playerColors.length > count) {
    state.playerColors = state.playerColors.slice(0, count);
  }
}

function renderPlayerColorSelection() {
  const container = $("player-colors");
  if (!container) return;
  container.innerHTML = "";

  state.playerColors.forEach((color, index) => {
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.gap = "8px";
    wrapper.style.margin = "4px 0";

    const label = document.createElement("span");
    label.textContent = `${currentTextModule ? currentTextModule.t('player') : 'Jugador'} ${index + 1}:`;

    const box = document.createElement("div");
    box.className = "color-box";
    box.style.backgroundColor = color;
    box.style.width = "24px";
    box.style.height = "24px";
    box.style.borderRadius = "4px";
    box.style.cursor = "pointer";

    box.addEventListener("click", () => renderColorOptions(index));

    wrapper.appendChild(label);
    wrapper.appendChild(box);
    container.appendChild(wrapper);
  });
}

function renderColorOptions(playerIndex) {
  const container = $("player-color-options");
  if (!container) return;
  container.innerHTML = "";

  COLOR_PALETTE.forEach(color => {
    const opt = document.createElement("div");
    opt.className = "color-option";
    opt.style.backgroundColor = color;
    opt.style.width = "20px";
    opt.style.height = "20px";
    opt.style.display = "inline-block";
    opt.style.margin = "2px";
    opt.style.cursor = "pointer";

    opt.addEventListener("click", () => {
      state.playerColors[playerIndex] = color;
      container.innerHTML = "";
      renderPlayerColorSelection();
    });
    container.appendChild(opt);
  });
}

function renderCategorySelection() {
  const container = $("categories");
  if (!container) return;
  container.innerHTML = "";

  const words = getWordList();
  const categories = [...new Set(words.map(w => w.category))];

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `category-btn ${state.selectedCategories.includes(cat) ? 'selected' : ''}`;
    btn.textContent = cat;

    btn.addEventListener("click", () => {
      if (state.selectedCategories.includes(cat)) {
        state.selectedCategories = state.selectedCategories.filter(c => c !== cat);
      } else {
        state.selectedCategories.push(cat);
      }
      btn.classList.toggle("selected");
      updateCategoryCount();
    });

    container.appendChild(btn);
  });
  updateCategoryCount();
}

function updateCategoryCount() {
  const el = $("category-count");
  if (el && currentTextModule) {
    el.textContent = `${currentTextModule.t('categoryCount')}: ${state.selectedCategories.length}`;
  }
}

function randomCategories() {
  const words = getWordList();
  const categories = [...new Set(words.map(w => w.category))];
  const count = Math.min(5, categories.length);
  const shuffled = [...categories].sort(() => 0.5 - Math.random());
  state.selectedCategories = shuffled.slice(0, count);
  renderCategorySelection();
}

function renderGuessInputs() {
  const wordsContainer = $("guess-words");
  const catsContainer = $("guess-categories");
  if (!wordsContainer || !catsContainer) return;

  wordsContainer.innerHTML = `<input type="text" id="input-word" placeholder="${currentTextModule ? currentTextModule.t('wordPlaceholder') : 'Palabra'}" />`;
  
  const words = getWordList();
  const categories = [...new Set(words.map(w => w.category))];
  let catOptions = `<option value="">-- ${currentTextModule ? currentTextModule.t('selectCategory') : 'Categoría'} --</option>`;
  categories.forEach(c => {
    catOptions += `<option value="${c}">${c}</option>`;
  });
  
  catsContainer.innerHTML = `<select id="input-category">${catOptions}</select>`;
}

function startGame() {
  if (state.selectedCategories.length === 0) {
    randomCategories();
  }

  state.playersCount = Number($("players").value || 2);
  state.turnTimeLimit = Number($("turn-time").value || 120);
  state.maxRounds = Number($("round-total").value || 3);
  state.scores = new Array(state.playersCount).fill(0);
  state.currentPlayerIndex = 0;
  state.currentRound = 1;
  state.usedWords.clear();

  $("screen-start")?.classList.add("hidden");
  $("screen-game")?.classList.remove("hidden");

  renderScoreboard();
  nextTurn();
}

function nextTurn() {
  clearInterval(state.timerInterval);
  state.isPaused = false;
  state.attemptsInTurn = 0;
  state.clueStage = 1;

  const words = getWordList();
  const availableIndices = words
    .map((w, index) => ({ ...w, index }))
    .filter(w => state.selectedCategories.includes(w.category) && !state.usedWords.has(w.index));

  if (availableIndices.length === 0 || state.currentRound > state.maxRounds) {
    endGame();
    return;
  }

  const randomIndex = Math.floor(Math.random() * availableIndices.length);
  const selected = availableIndices[randomIndex];
  
  state.currentWord = selected;
  state.currentWordIndex = selected.index;
  state.usedWords.add(selected.index);

  updateRoundUI();
  renderClue();
  startTimer();
}

function updateRoundUI() {
  if (!currentTextModule) return;
  $("round-label").textContent = `${currentTextModule.t('round')}: ${state.currentRound}/${state.maxRounds}`;
  $("turn-label").textContent = `${currentTextModule.t('turn')}: ${currentTextModule.t('player')} ${state.currentPlayerIndex + 1}`;
  $("turn-label").style.color = state.playerColors[state.currentPlayerIndex];
}

function renderClue() {
  const clueEl = $("clue-stage");
  if (!clueEl || !state.currentWord) return;

  if (state.clueStage === 1) {
    const consonantsOnly = state.currentWord.word.replace(/[aeiouáéíóúAEIOUÁÉÍÓÚ]/g, '_');
    clueEl.textContent = consonantsOnly.split('').join(' ');
  } else if (state.clueStage === 2) {
    clueEl.textContent = `${state.currentWord.word.replace(/[aeiouáéíóúAEIOUÁÉÍÓÚ]/g, '_')} (${state.currentWord.fortext || ''})`;
  } else {
    clueEl.textContent = `${state.currentWord.word.replace(/[aeiouáéíóúAEIOUÁÉÍÓÚ]/g, '_')} [${state.currentWord.help || ''}]`;
  }
}

function startTimer() {
  state.timeLeft = state.turnTimeLimit;
  updateTimerDisplay();

  state.timerInterval = setInterval(() => {
    if (!state.isPaused) {
      state.timeLeft--;
      updateTimerDisplay();

      if (state.timeLeft <= 0) {
        clearInterval(state.timerInterval);
        handleTimeOut();
      }
    }
  }, 1000);
}

function updateTimerDisplay() {
  const mins = String(Math.floor(state.timeLeft / 60)).padStart(2, '0');
  const secs = String(state.timeLeft % 60).padStart(2, '0');
  $("timer").textContent = `${mins}:${secs}`;
}

function togglePause() {
  state.isPaused = !state.isPaused;
  $("pause-time").textContent = state.isPaused ? 
    (currentTextModule ? currentTextModule.t('resume') : 'Reanudar') : 
    (currentTextModule ? currentTextModule.t('pause') : 'Pausa');
}

function submitGuess() {
  const wordInput = $("input-word");
  const catInput = $("input-category");

  if (!wordInput || !state.currentWord) return;

  const guessedWord = wordInput.value.trim().toLowerCase();
  const guessedCategory = catInput ? catInput.value : "";
  const correctWord = state.currentWord.word.toLowerCase();

  state.attemptsInTurn++;

  if (guessedWord === correctWord) {
    let points = 10;
    let extraCat = false;
    if (guessedCategory === state.currentWord.category) {
      points += 5;
      extraCat = true;
    }

    state.scores[state.currentPlayerIndex] += points;
    renderScoreboard();
    renderBoard();

    const msg = extraCat ? 
      `${currentTextModule.t('correctWordAndCategory')} (+${points} pts)` : 
      `${currentTextModule.t('correctWord')} (+${points} pts)`;
    
    showFeedback(msg, () => advanceTurn());
  } else {
    if (state.attemptsInTurn < 3) {
      state.clueStage++;
      renderClue();
      showFeedback(currentTextModule.t('incorrectTryAgain'));
    } else {
      showFeedback(`${currentTextModule.t('failedTurn')} ${state.currentWord.word}`, () => advanceTurn());
    }
  }

  wordInput.value = "";
}

function handleTimeOut() {
  state.pendingComputerReveal = true;
  $("revealed-category").textContent = state.currentWord.category;
  $("revealed-fortext").textContent = state.currentWord.fortext || "--";
  $("revealed-word").textContent = state.currentWord.word;
  $("reveal-help").textContent = state.currentWord.help || "--";

  $("screen-game").classList.add("hidden");
  $("screen-reveal").classList.remove("hidden");
}

function continueAfterReveal() {
  $("screen-reveal").classList.add("hidden");
  $("screen-game").classList.remove("hidden");
  state.pendingComputerReveal = false;
  advanceTurn();
}

function advanceTurn() {
  state.currentPlayerIndex = (state.currentPlayerIndex + 1) % state.playersCount;
  if (state.currentPlayerIndex === 0) {
    state.currentRound++;
  }
  nextTurn();
}

function renderScoreboard() {
  const sb = $("scoreboard");
  if (!sb) return;
  sb.innerHTML = "";

  state.scores.forEach((score, index) => {
    const card = document.createElement("div");
    card.className = `score-card ${index === state.currentPlayerIndex ? 'active' : ''}`;
    card.style.borderColor = state.playerColors[index];
    card.innerHTML = `
      <strong>${currentTextModule ? currentTextModule.t('player') : 'Jugador'} ${index + 1}</strong>
      <div>${score} pts</div>
    `;
    sb.appendChild(card);
  });
}

function renderBoard() {
  const countEl = $("discovered-count");
  if (countEl) countEl.textContent = state.usedWords.size;
}

function showFeedback(msg, onClose) {
  $("feedback-message").textContent = msg;
  $("feedback-modal").classList.remove("hidden");

  const btn = $("feedback-continue");
  const handler = () => {
    $("feedback-modal").classList.add("hidden");
    btn.removeEventListener("click", handler);
    if (onClose) onClose();
  };
  btn.addEventListener("click", handler);
}

function endGame() {
  clearInterval(state.timerInterval);
  $("screen-game").classList.add("hidden");
  $("screen-end").classList.remove("hidden");

  const container = $("final-scores");
  if (!container) return;
  container.innerHTML = "<h3>Puntuaciones finales:</h3>";

  state.scores.forEach((score, idx) => {
    const p = document.createElement("p");
    p.textContent = `${currentTextModule ? currentTextModule.t('player') : 'Jugador'} ${idx + 1}: ${score} puntos`;
    p.style.color = state.playerColors[idx];
    container.appendChild(p);
  });
}

async function init() {
  const langSelect = $("lang-select");
  const initialLang = langSelect ? langSelect.value : "es";

  await switchLanguage(initialLang);

  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      switchLanguage(e.target.value);
    });
  }

  $("info-btn")?.addEventListener("click", () => {
    $("rules-modal")?.classList.remove("hidden");
  });
  $("close-rules")?.addEventListener("click", () => {
    $("rules-modal")?.classList.add("hidden");
  });

  $("settings-btn")?.addEventListener("click", () => {
    renderPlayerColorSelection();
    $("settings-modal")?.classList.remove("hidden");
  });
  $("close-settings")?.addEventListener("click", () => {
    $("settings-modal")?.classList.add("hidden");
  });

  $("players")?.addEventListener("change", () => {
    ensurePlayerColors();
    renderPlayerColorSelection();
  });

  $("random-categories")?.addEventListener("click", randomCategories);
  $("start-game")?.addEventListener("click", startGame);
  $("submit-guess")?.addEventListener("click", submitGuess);
  $("pause-time")?.addEventListener("click", togglePause);
  $("continue-reveal")?.addEventListener("click", continueAfterReveal);
  $("new-game")?.addEventListener("click", () => location.reload());
}

document.addEventListener("DOMContentLoaded", init);
