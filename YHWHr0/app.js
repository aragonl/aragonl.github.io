// =============================================================================
// CARGA DINÁMICA DE IDIOMAS (ES, IT, EN, ETC.)
// =============================================================================
let TEXT = {};
let WORD_DATA = [];
let EMOJI_MAP = {};

export function t(key, vars = {}) {
  let s = TEXT[key] ?? key;
  return s.replace(/\{([a-zA-Z0-9_]+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}

async function loadLanguage(langCode) {
  try {
    const textModule = await import(`./texto-${langCode}.js`);
    const wordsModule = await import(`./palabras-${langCode}.js`);

    TEXT = textModule.TEXT;
    EMOJI_MAP = textModule.EMOJI_MAP || {};
    WORD_DATA = wordsModule.WORD_DATA;

    updateUIStaticTexts();
    renderCategories();
  } catch (err) {
    console.error(`Error al cargar el idioma ${langCode}:`, err);
  }
}

// =============================================================================
// ESTADO Y LÓGICA DEL JUEGO
// =============================================================================
let state = {
  config: {
    playersCount: 2,
    playerNames: ["Jugador 1", "Jugador 2"],
    playerColors: ["#e6194B", "#3cb44b"],
    turnTime: 120,
    rounds: 3,
    suggestedCatCount: 3
  },
  scores: [],
  selectedCategoryIndices: [],
  deck: [],
  currentWordIndex: 0,
  currentPlayerIndex: 0,
  round: 1,
  timer: null,
  timeLeft: 0,
  isPaused: false,
  discoveredCount: 0,
  hintsUsedForCurrentWord: 0, // Contador de pistas/vocales pedidas con el botón
  revealedVowels: []
};

// =============================================================================
// INICIALIZACIÓN
// =============================================================================
document.addEventListener("DOMContentLoaded", () => {
  setupLanguageSelector();
  setupEvents();
  
  const initialLang = document.getElementById("lang-scroll")?.value || "es";
  loadLanguage(initialLang);
});

function setupLanguageSelector() {
  const langSelect = document.getElementById("lang-scroll");
  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      loadLanguage(e.target.value);
    });
  }
}

function updateUIStaticTexts() {
  const setTxt = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.textContent = t(key);
  };

  setTxt("subtitle", "subtitle");
  setTxt("start-game", "startGame");
  setTxt("players-label", "players");
  setTxt("time-label", "time");
  setTxt("rounds-label", "rounds");
  setTxt("player-colors-title", "playerColorsTitle");
  setTxt("categories-title", "categoriesTitle");
  setTxt("random-categories", "randomCategories");
  setTxt("board-title-text", "boardTitle");
  setTxt("reveal-hint-btn", "revealClue");
  setTxt("submit-guess", "guess");
  setTxt("pause-time", "pause");
  setTxt("new-game", "newGame");
  setTxt("close-rules", "closeRules");

  const rulesBody = document.querySelector(".rules-content");
  if (rulesBody && TEXT.rulesBody) {
    rulesBody.innerHTML = TEXT.rulesBody;
  }
}

function setupEvents() {
  document.getElementById("config-btn")?.addEventListener("click", () => {
    document.getElementById("config-panel")?.classList.toggle("hidden");
  });

  document.getElementById("info-btn")?.addEventListener("click", () => {
    document.getElementById("rules-modal")?.classList.remove("hidden");
  });

  document.getElementById("close-rules")?.addEventListener("click", () => {
    document.getElementById("rules-modal")?.classList.add("hidden");
  });

  document.getElementById("players")?.addEventListener("change", (e) => {
    state.config.playersCount = parseInt(e.target.value, 10);
    renderPlayerColorPickers();
  });

  document.getElementById("random-categories")?.addEventListener("click", selectRandomCategories);
  document.getElementById("start-game")?.addEventListener("click", startGame);
  document.getElementById("submit-guess")?.addEventListener("click", handleGuess);
  document.getElementById("reveal-hint-btn")?.addEventListener("click", handleRevealHintButton);
  document.getElementById("pause-time")?.addEventListener("click", togglePause);
  document.getElementById("continue-reveal")?.addEventListener("click", continueAfterReveal);
  document.getElementById("feedback-continue")?.addEventListener("click", hideFeedbackModal);
  document.getElementById("new-game")?.addEventListener("click", resetGame);

  setupPlayersDropdown();
}

function setupPlayersDropdown() {
  const select = document.getElementById("players");
  if (!select) return;
  select.innerHTML = "";
  for (let i = 1; i <= 6; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i;
    select.appendChild(opt);
  }
  select.value = "2";
  renderPlayerColorPickers();
}

// =============================================================================
// CONFIGURACIÓN DE JUGADORES Y COLORES (ESTÉTIKA ORIGINAL)
// =============================================================================
const COLOR_PALETTE = ["#e6194B", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4"];

function renderPlayerColorPickers() {
  const container = document.getElementById("player-colors");
  if (!container) return;
  container.innerHTML = "";

  state.config.playerNames = [];
  state.config.playerColors = [];

  for (let i = 0; i < state.config.playersCount; i++) {
    const item = document.createElement("div");
    item.className = "player-color-item";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = `${t("player")} ${i + 1}`;
    
    const colorPicker = document.createElement("div");
    colorPicker.className = "player-color-picker";

    const defaultColor = COLOR_PALETTE[i % COLOR_PALETTE.length];
    state.config.playerNames.push(nameInput.value);
    state.config.playerColors.push(defaultColor);

    COLOR_PALETTE.forEach((color) => {
      const opt = document.createElement("div");
      opt.className = `color-option ${color === defaultColor ? "selected" : ""}`;
      opt.style.backgroundColor = color;
      opt.addEventListener("click", () => {
        colorPicker.querySelectorAll(".color-option").forEach(c => c.classList.remove("selected"));
        opt.classList.add("selected");
        state.config.playerColors[i] = color;
      });
      colorPicker.appendChild(opt);
    });

    nameInput.addEventListener("input", (e) => {
      state.config.playerNames[i] = e.target.value;
    });

    item.appendChild(nameInput);
    item.appendChild(colorPicker);
    container.appendChild(item);
  }
}

// =============================================================================
// CATEGORÍAS EN INICIO (ORIGINAL CON TAGS Y ESTILOS)
// =============================================================================
function renderCategories() {
  const grid = document.getElementById("categories");
  if (!grid) return;
  grid.innerHTML = "";

  WORD_DATA.forEach((catObj, index) => {
    const card = document.createElement("div");
    card.className = "category-card";
    if (state.selectedCategoryIndices.includes(index)) {
      card.classList.add("selected");
    }

    let tagsHTML = "";
    if (catObj.tags && catObj.tags.length > 0) {
      tagsHTML = catObj.tags.map(tag => `<span class="badge">${tag}</span>`).join(" ");
    }

    card.innerHTML = `
      ${tagsHTML}
      <h4>${catObj.category}</h4>
      <p>${catObj.fortext || ""}</p>
    `;

    card.addEventListener("click", () => {
      if (state.selectedCategoryIndices.includes(index)) {
        state.selectedCategoryIndices = state.selectedCategoryIndices.filter(i => i !== index);
        card.classList.remove("selected");
      } else {
        state.selectedCategoryIndices.push(index);
        card.classList.add("selected");
      }
      updateCategoryCountLabel();
    });

    grid.appendChild(card);
  });

  updateCategoryCountLabel();
}

function updateCategoryCountLabel() {
  const countLabel = document.getElementById("category-count");
  const suggestedCount = parseInt(document.getElementById("config-cat-count")?.value || "3", 10);
  if (countLabel) {
    countLabel.textContent = `${t("categoryCount")} (${state.selectedCategoryIndices.length} / ${suggestedCount})`;
  }
}

function selectRandomCategories() {
  const targetCount = parseInt(document.getElementById("config-cat-count")?.value || "3", 10);
  const indices = WORD_DATA.map((_, i) => i).sort(() => 0.5 - Math.random());
  state.selectedCategoryIndices = indices.slice(0, Math.min(targetCount, WORD_DATA.length));
  renderCategories();
}

// =============================================================================
// INICIO Y BARAJADO DE PARTIDA
// =============================================================================
function startGame() {
  const errorEl = document.getElementById("start-error");
  if (state.selectedCategoryIndices.length === 0) {
    if (errorEl) errorEl.textContent = t("selectCategories", { n: 1 });
    return;
  }
  if (errorEl) errorEl.textContent = "";

  state.config.turnTime = parseInt(document.getElementById("turn-time")?.value || "120", 10);
  state.config.rounds = parseInt(document.getElementById("round-total")?.value || "3", 10);

  state.scores = state.config.playerNames.map(() => 0);
  state.currentPlayerIndex = 0;
  state.round = 1;
  state.discoveredCount = 0;

  // Construir el mazo de palabras
  state.deck = [];
  state.selectedCategoryIndices.forEach(catIdx => {
    const catGroup = WORD_DATA[catIdx];
    catGroup.words.forEach(sub => {
      sub.words.forEach((wordString, wIdx) => {
        state.deck.push({
          parentCategoryObj: catGroup,
          parentCategory: catGroup.category,
          subCategory: sub.category,
          originalWord: wordString,
          help: sub.help ? sub.help[wIdx] : "",
          guessed: false
        });
      });
    });
  });

  state.deck.sort(() => 0.5 - Math.random());
  state.currentWordIndex = 0;

  document.getElementById("screen-start")?.classList.add("hidden");
  document.getElementById("screen-game")?.classList.remove("hidden");

  renderScoreboard();
  renderBoard();
  loadTurn();
}

// =============================================================================
// LÓGICA DE TURNO Y PANTALLA DE JUEGO
// =============================================================================
function getCurrentWord() {
  return state.deck[state.currentWordIndex];
}

function loadTurn() {
  const wordObj = getCurrentWord();
  if (!wordObj) {
    endGame();
    return;
  }

  state.hintsUsedForCurrentWord = 0;
  state.revealedVowels = [];

  updateTurnUI();
  renderClueStage(wordObj);
  setupWordInputFields(wordObj);
  setupSubcategoryChoices(wordObj);
  startTimer();
}

function updateTurnUI() {
  const roundLabel = document.getElementById("round-label");
  if (roundLabel) roundLabel.textContent = `${t("round")} ${state.round} / ${state.config.rounds}`;

  const turnLabel = document.getElementById("turn-label");
  if (turnLabel) turnLabel.textContent = `${t("turn")} ${state.config.playerNames[state.currentPlayerIndex]}`;

  renderScoreboard();
}

function renderScoreboard() {
  const container = document.getElementById("scoreboard");
  if (!container) return;
  container.innerHTML = "";

  state.config.playerNames.forEach((name, idx) => {
    const card = document.createElement("div");
    card.className = `score ${idx === state.currentPlayerIndex ? "active" : ""}`;
    card.style.setProperty("--player-color", state.config.playerColors[idx]);

    card.innerHTML = `
      <div class="score-name">${name}</div>
      <div class="score-pts">${state.scores[idx]} ${t("points")}</div>
    `;
    container.appendChild(card);
  });
}

// Conserva la lógica de visibilidad de consonantes y reemplazo de emojis
function renderClueStage(wordObj) {
  const clueStage = document.getElementById("clue-stage");
  if (!clueStage) return;

  const VOWELS = "AEIOUÁÉÍÓÚ";
  let displayed = "";

  for (let char of wordObj.originalWord) {
    const upperChar = char.toUpperCase();
    if (VOWELS.includes(upperChar)) {
      if (state.revealedVowels.includes(upperChar)) {
        displayed += char;
      } else {
        displayed += "_";
      }
    } else {
      displayed += char; // Las consonantes, espacios y conectores se mantienen visibles
    }
  }

  // Mapeo de Emojis
  Object.keys(EMOJI_MAP).forEach(key => {
    const reg = new RegExp(key, "gi");
    displayed = displayed.replace(reg, EMOJI_MAP[key]);
  });

  clueStage.textContent = displayed;
}

function setupWordInputFields(wordObj) {
  const container = document.getElementById("guess-words");
  if (!container) return;
  container.innerHTML = "";

  const parts = wordObj.originalWord.split(" ");
  parts.forEach((part, idx) => {
    if (part === part.toUpperCase() && part.length > 1) {
      const input = document.createElement("input");
      input.type = "text";
      input.className = "guess-word-input";
      input.placeholder = parts.length > 1 ? t("guessPartPlaceholder", { n: idx + 1 }) : t("guessPlaceholder");
      input.dataset.index = idx;
      container.appendChild(input);
    }
  });
}

// CAMBIO SOLICITADO: Muestra las SUBCATEGORÍAS de la categoría correspondiente
function setupSubcategoryChoices(wordObj) {
  const container = document.getElementById("guess-categories");
  if (!container) return;
  container.innerHTML = "";

  // Obtener todas las subcategorías que pertenecen a la categoría actual
  const parentCat = wordObj.parentCategoryObj;
  const subcategories = parentCat.words.map(sub => sub.category);

  subcategories.forEach(subName => {
    const btn = document.createElement("button");
    btn.className = "category-choice";
    btn.textContent = subName;
    btn.addEventListener("click", () => {
      container.querySelectorAll(".category-choice").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
    container.appendChild(btn);
  });
}

// =============================================================================
// REVELAR PISTA: HINT Y VOCALES (NUNCA REVELA LA SUBCATEGORÍA)
// =============================================================================
function handleRevealHintButton() {
  if (state.scores[state.currentPlayerIndex] > 0) {
    state.scores[state.currentPlayerIndex] -= 1;
  }
  renderScoreboard();

  const currentWordObj = getCurrentWord();
  if (!currentWordObj) return;

  // Paso 1: Revela la pista (help) en el primer clic
  if (state.hintsUsedForCurrentWord === 0 && currentWordObj.help) {
    state.hintsUsedForCurrentWord++;
    showFeedbackModal(t("hintHelp", { help: currentWordObj.help }));
    return;
  }

  // Paso 2: Revela una vocal nueva no descubierta en los siguientes clics
  const VOWELS = ["A", "E", "I", "O", "U", "Á", "É", "Í", "Ó", "Ú"];
  const unrevealedInWord = [];

  for (let char of currentWordObj.originalWord.toUpperCase()) {
    if (VOWELS.includes(char) && !state.revealedVowels.includes(char)) {
      if (!unrevealedInWord.includes(char)) {
        unrevealedInWord.push(char);
      }
    }
  }

  if (unrevealedInWord.length > 0) {
    const randomVowel = unrevealedInWord[Math.floor(Math.random() * unrevealedInWord.length)];
    state.revealedVowels.push(randomVowel);
    state.hintsUsedForCurrentWord++;
    renderClueStage(currentWordObj);
    showFeedbackModal(t("hintVowel") + ` (${randomVowel})`);
  } else {
    showFeedbackModal(currentWordObj.help ? t("hintHelp", { help: currentWordObj.help }) : "No hay más pistas.");
  }
}

// =============================================================================
// VALIDACIÓN DE RESPUESTAS Y SUBCATEGORÍA
// =============================================================================
function handleGuess() {
  const wordObj = getCurrentWord();
  if (!wordObj) return;

  const inputs = document.querySelectorAll(".guess-word-input");
  const userWords = Array.from(inputs).map(i => i.value.trim().toUpperCase());

  const selectedSubBtn = document.querySelector(".category-choice.selected");
  const userSubcategory = selectedSubBtn ? selectedSubBtn.textContent : "";

  const uppercaseTargetParts = wordObj.originalWord
    .split(" ")
    .filter(p => p === p.toUpperCase() && p.length > 1);

  const isWordCorrect = uppercaseTargetParts.every((part, i) => part === userWords[i]);
  const isSubcategoryCorrect = userSubcategory === wordObj.subCategory;

  if (isWordCorrect && isSubcategoryCorrect) {
    state.scores[state.currentPlayerIndex] += 3;
    wordObj.guessed = true;
    state.discoveredCount++;
    updateDiscoveredCounter();
    renderBoard();
    showFeedbackModal(`${t("correct")} +3 ${t("points")}`);
    clearInterval(state.timer);
    nextTurn(true);
  } else if (isWordCorrect && !isSubcategoryCorrect) {
    state.scores[state.currentPlayerIndex] += 2;
    showFeedbackModal(t("wordOnlyPoints", { points: 2 }));
    nextTurn(false);
  } else if (!isWordCorrect && isSubcategoryCorrect) {
    state.scores[state.currentPlayerIndex] += 1;
    showFeedbackModal(t("categoryOnlyPoints", { points: 1 }));
    nextTurn(false);
  } else {
    showFeedbackModal(t("incorrect"));
    nextTurn(false);
  }
}

function nextTurn(advanceWord = false) {
  if (advanceWord) {
    state.currentWordIndex++;
  }
  state.currentPlayerIndex = (state.currentPlayerIndex + 1) % state.config.playersCount;

  if (state.currentPlayerIndex === 0) {
    state.round++;
  }

  if (state.round > state.config.rounds || state.currentWordIndex >= state.deck.length) {
    endGame();
  } else {
    loadTurn();
  }
}

// =============================================================================
// TEMPORIZADOR Y CONTROLES
// =============================================================================
function startTimer() {
  clearInterval(state.timer);
  state.timeLeft = state.config.turnTime;
  state.isPaused = false;
  updateTimerDisplay();

  state.timer = setInterval(() => {
    if (!state.isPaused) {
      state.timeLeft--;
      updateTimerDisplay();
      if (state.timeLeft <= 0) {
        clearInterval(state.timer);
        showFeedbackModal(t("timeout"));
        nextTurn(false);
      }
    }
  }, 1000);
}

function updateTimerDisplay() {
  const timerEl = document.getElementById("timer");
  if (!timerEl) return;
  const mins = Math.floor(state.timeLeft / 60).toString().padStart(2, "0");
  const secs = (state.timeLeft % 60).toString().padStart(2, "0");
  timerEl.textContent = `${mins}:${secs}`;
  if (state.timeLeft <= 10) {
    timerEl.classList.add("warning");
  } else {
    timerEl.classList.remove("warning");
  }
}

function togglePause() {
  const btn = document.getElementById("pause-time");
  state.isPaused = !state.isPaused;
  if (btn) btn.textContent = state.isPaused ? t("resume") : t("pause");
}

function renderBoard() {
  const container = document.getElementById("board-categories");
  if (!container) return;
  container.innerHTML = "";

  state.selectedCategoryIndices.forEach(catIdx => {
    const catObj = WORD_DATA[catIdx];
    const catBlock = document.createElement("div");
    catBlock.className = "board-category";

    const header = document.createElement("div");
    header.className = "board-category-header";
    header.innerHTML = `<h3>${catObj.category}</h3><span class="fortext">${catObj.fortext || ""}</span>`;

    const wordList = document.createElement("div");
    wordList.className = "word-list";

    state.deck
      .filter(w => w.parentCategory === catObj.category && w.guessed)
      .forEach(w => {
        const chip = document.createElement("div");
        chip.className = "word-chip";
        chip.innerHTML = `<strong>${w.originalWord}</strong><small>${w.subCategory}</small>`;
        wordList.appendChild(chip);
      });

    catBlock.appendChild(header);
    catBlock.appendChild(wordList);
    container.appendChild(catBlock);
  });
}

function updateDiscoveredCounter() {
  const counter = document.getElementById("discovered-count");
  if (counter) counter.textContent = state.discoveredCount;
}

function showFeedbackModal(msg) {
  const modal = document.getElementById("feedback-modal");
  const msgEl = document.getElementById("feedback-message");
  if (modal && msgEl) {
    msgEl.textContent = msg;
    modal.classList.remove("hidden");
  }
}

function hideFeedbackModal() {
  document.getElementById("feedback-modal")?.classList.add("hidden");
}

function continueAfterReveal() {
  document.getElementById("reveal-in-column")?.classList.add("hidden");
  document.getElementById("game-active-panel")?.classList.remove("hidden");
  nextTurn(true);
}

function endGame() {
  clearInterval(state.timer);
  document.getElementById("screen-game")?.classList.add("hidden");
  document.getElementById("screen-end")?.classList.remove("hidden");

  const title = document.getElementById("end-title");
  if (title) title.textContent = t("end");

  const container = document.getElementById("final-scores");
  if (!container) return;
  container.innerHTML = "";

  state.config.playerNames.forEach((name, idx) => {
    const row = document.createElement("div");
    row.className = "final-score";
    row.innerHTML = `<strong>${name}</strong><span>${state.scores[idx]} ${t("points")}</span>`;
    container.appendChild(row);
  });
}

function resetGame() {
  document.getElementById("screen-end")?.classList.add("hidden");
  document.getElementById("screen-start")?.classList.remove("hidden");
}
