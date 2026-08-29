// =============================================================================
// ESTADO GLOBAL DE LA APLICACIÓN Y VARIABLES DE IDIOMA DINO
// =============================================================================
let currentTEXT = {};
let currentWORD_DATA = [];
let currentEMOJI_MAP = {};

let currentGame = {
  players: [],
  currentPlayerIndex: 0,
  roundTotal: 3,
  currentRound: 1,
  turnTime: 120,
  selectedCategories: [],
  wordsToGuess: [],
  currentWordIndex: 0,
  timerInterval: null,
  timeLeft: 0,
  isPaused: false,
  discoveredCount: 0
};

// Función helper de traducción (reemplaza las llaves {var} por sus valores)
export function t(key, vars = {}) {
  let s = currentTEXT[key] ?? key;
  return s.replace(/\{([a-zA-Z0-9_]+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}

// =============================================================================
// CARGA DINÁMICA DE IDIOMAS (ES, IT, EN, ETC.)
// =============================================================================
async function loadLanguage(langCode) {
  try {
    // Importa dinámicamente según el código seleccionado
    const textModule = await import(`./texto-${langCode}.js`);
    const wordsModule = await import(`./palabras-${langCode}.js`);

    currentTEXT = textModule.TEXT;
    currentEMOJI_MAP = textModule.EMOJI_MAP || {};
    currentWORD_DATA = wordsModule.WORD_DATA;

    updateUIStaticTexts();
    renderCategorySelection();
  } catch (err) {
    console.error(`Error al cargar los archivos para el idioma "${langCode}":`, err);
  }
}

// Actualiza las etiquetas de la interfaz según el idioma cargado
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
  if (rulesBody && currentTEXT.rulesBody) {
    rulesBody.innerHTML = currentTEXT.rulesBody;
  }
}

// =============================================================================
// INICIALIZACIÓN Y EVENTOS
// =============================================================================
document.addEventListener("DOMContentLoaded", () => {
  setupPlayersDropdown();
  setupLanguageSelector();
  setupEventListeners();

  // Carga inicial (por defecto el idioma seleccionado en el HTML o 'es')
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

function setupPlayersDropdown() {
  const playersSelect = document.getElementById("players");
  if (!playersSelect) return;
  playersSelect.innerHTML = "";
  for (let i = 1; i <= 6; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${i}`;
    playersSelect.appendChild(opt);
  }
  playersSelect.value = "2";
  renderPlayerColorPickers(2);
}

function setupEventListeners() {
  // Toggle del panel de configuración
  document.getElementById("config-btn")?.addEventListener("click", () => {
    document.getElementById("config-panel")?.classList.toggle("hidden");
  });

  // Modal de reglas
  document.getElementById("info-btn")?.addEventListener("click", () => {
    document.getElementById("rules-modal")?.classList.remove("hidden");
  });
  document.getElementById("close-rules")?.addEventListener("click", () => {
    document.getElementById("rules-modal")?.classList.add("hidden");
  });

  // Cambio de cantidad de jugadores
  document.getElementById("players")?.addEventListener("change", (e) => {
    renderPlayerColorPickers(parseInt(e.target.value, 10));
  });

  // Selección aleatoria de categorías
  document.getElementById("random-categories")?.addEventListener("click", selectRandomCategories);

  // Botón iniciar juego
  document.getElementById("start-game")?.addEventListener("click", startGame);

  // Botones de juego
  document.getElementById("submit-guess")?.addEventListener("click", handleGuessSubmit);
  document.getElementById("reveal-hint-btn")?.addEventListener("click", handleRevealHint);
  document.getElementById("pause-time")?.addEventListener("click", togglePauseTimer);
  document.getElementById("continue-reveal")?.addEventListener("click", handleContinueAfterReveal);
  document.getElementById("feedback-continue")?.addEventListener("click", hideFeedbackModal);
  document.getElementById("new-game")?.addEventListener("click", resetToStartScreen);
}

// =============================================================================
// CONFIGURACIÓN DE JUGADORES Y COLORES
// =============================================================================
const COLOR_PALETTE = ["#e6194B", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4"];

function renderPlayerColorPickers(count) {
  const container = document.getElementById("player-colors");
  if (!container) return;
  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const item = document.createElement("div");
    item.className = "player-color-item";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = `${t("player")} ${i + 1}`;
    nameInput.dataset.playerIndex = i;

    const picker = document.createElement("div");
    picker.className = "color-picker";

    COLOR_PALETTE.forEach((color, colorIdx) => {
      const opt = document.createElement("div");
      opt.className = `color-option ${colorIdx === i % COLOR_PALETTE.length ? "selected" : ""}`;
      opt.style.backgroundColor = color;
      opt.addEventListener("click", () => {
        picker.querySelectorAll(".color-option").forEach(el => el.classList.remove("selected"));
        opt.classList.add("selected");
      });
      picker.appendChild(opt);
    });

    item.appendChild(nameInput);
    item.appendChild(picker);
    container.appendChild(item);
  }
}

// =============================================================================
// RENDERING Y SELECCIÓN DE CATEGORÍAS
// =============================================================================
function renderCategorySelection() {
  const grid = document.getElementById("categories");
  if (!grid) return;
  grid.innerHTML = "";

  currentWORD_DATA.forEach((catObj, index) => {
    const card = document.createElement("div");
    card.className = "category-card";
    card.dataset.index = index;

    const title = document.createElement("h4");
    title.textContent = catObj.category;

    const fortext = document.createElement("p");
    fortext.textContent = catObj.fortext || "";

    if (catObj.tags && catObj.tags.length > 0) {
      catObj.tags.forEach(tag => {
        const badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = tag;
        card.appendChild(badge);
      });
    }

    card.appendChild(title);
    card.appendChild(fortext);

    card.addEventListener("click", () => {
      card.classList.toggle("selected");
      updateCategoryCountLabel();
    });

    grid.appendChild(card);
  });

  updateCategoryCountLabel();
}

function updateCategoryCountLabel() {
  const selectedCards = document.querySelectorAll(".category-card.selected");
  const countLabel = document.getElementById("category-count");
  const suggestedCount = parseInt(document.getElementById("config-cat-count")?.value || "3", 10);
  if (countLabel) {
    countLabel.textContent = `${t("categoryCount")} (${selectedCards.length} / ${suggestedCount})`;
  }
}

function selectRandomCategories() {
  const cards = Array.from(document.querySelectorAll(".category-card"));
  cards.forEach(c => c.classList.remove("selected"));

  const targetCount = parseInt(document.getElementById("config-cat-count")?.value || "3", 10);
  const shuffled = cards.sort(() => 0.5 - Math.random());
  
  shuffled.slice(0, Math.min(targetCount, cards.length)).forEach(c => {
    c.classList.add("selected");
  });

  updateCategoryCountLabel();
}

// =============================================================================
// LÓGICA DE INICIO DEL JUEGO
// =============================================================================
function startGame() {
  const selectedCards = document.querySelectorAll(".category-card.selected");
  const errorEl = document.getElementById("start-error");

  if (selectedCards.length === 0) {
    if (errorEl) errorEl.textContent = t("selectCategories", { n: 1 });
    return;
  }
  if (errorEl) errorEl.textContent = "";

  // Guardar configuración de jugadores
  const playerItems = document.querySelectorAll(".player-color-item");
  currentGame.players = Array.from(playerItems).map((item, idx) => {
    const name = item.querySelector("input[type='text']")?.value || `${t("player")} ${idx + 1}`;
    const selectedColorEl = item.querySelector(".color-option.selected");
    const color = selectedColorEl ? selectedColorEl.style.backgroundColor : COLOR_PALETTE[idx % COLOR_PALETTE.length];
    return { name, color, score: 0 };
  });

  currentGame.turnTime = parseInt(document.getElementById("turn-time")?.value || "120", 10);
  currentGame.roundTotal = parseInt(document.getElementById("round-total")?.value || "3", 10);
  currentGame.currentRound = 1;
  currentGame.currentPlayerIndex = 0;
  currentGame.discoveredCount = 0;

  // Extraer categorías y palabras seleccionadas
  currentGame.selectedCategories = Array.from(selectedCards).map(card => {
    const idx = parseInt(card.dataset.index, 10);
    return currentWORD_DATA[idx];
  });

  // Preparar lista de palabras a adivinar
  currentGame.wordsToGuess = [];
  currentGame.selectedCategories.forEach(catGroup => {
    catGroup.words.forEach(sub => {
      sub.words.forEach((wordString, wIdx) => {
        currentGame.wordsToGuess.push({
          parentCategory: catGroup.category,
          subCategory: sub.category,
          originalWord: wordString,
          help: sub.help ? sub.help[wIdx] : "",
          guessed: false
        });
      });
    });
  });

  // Cambiar pantallas
  document.getElementById("screen-start")?.classList.add("hidden");
  document.getElementById("screen-game")?.classList.remove("hidden");

  renderScoreboard();
  renderBoard();
  loadCurrentWordTurn();
}

// =============================================================================
// GESTIÓN DE TURNOS Y TIMERS
// =============================================================================
function loadCurrentWordTurn() {
  const currentWordObj = getCurrentWord();
  if (!currentWordObj) {
    endGame();
    return;
  }

  updateTurnUI();
  setupWordInputFields(currentWordObj);
  setupCategoryChoices();
  startTimer();
}

function getCurrentWord() {
  return currentGame.wordsToGuess.find(w => !w.guessed);
}

function updateTurnUI() {
  const activePlayer = currentGame.players[currentGame.currentPlayerIndex];
  
  const roundLabel = document.getElementById("round-label");
  if (roundLabel) roundLabel.textContent = `${t("round")} ${currentGame.currentRound} / ${currentGame.roundTotal}`;

  const turnLabel = document.getElementById("turn-label");
  if (turnLabel) turnLabel.textContent = `${t("turn")} ${activePlayer.name}`;

  renderScoreboard();
}

function renderScoreboard() {
  const container = document.getElementById("scoreboard");
  if (!container) return;
  container.innerHTML = "";

  currentGame.players.forEach((p, idx) => {
    const card = document.createElement("div");
    card.className = `score ${idx === currentGame.currentPlayerIndex ? "active" : ""}`;
    card.style.setProperty("--player-color", p.color);

    const nameEl = document.createElement("div");
    nameEl.className = "score-name";
    nameEl.textContent = p.name;

    const ptsEl = document.createElement("div");
    ptsEl.className = "score-pts";
    ptsEl.textContent = `${p.score} ${t("points")}`;

    card.appendChild(nameEl);
    card.appendChild(ptsEl);
    container.appendChild(card);
  });
}

function startTimer() {
  clearInterval(currentGame.timerInterval);
  currentGame.timeLeft = currentGame.turnTime;
  currentGame.isPaused = false;
  updateTimerDisplay();

  currentGame.timerInterval = setInterval(() => {
    if (!currentGame.isPaused) {
      currentGame.timeLeft--;
      updateTimerDisplay();
      if (currentGame.timeLeft <= 0) {
        clearInterval(currentGame.timerInterval);
        handleTimeout();
      }
    }
  }, 1000);
}

function updateTimerDisplay() {
  const timerEl = document.getElementById("timer");
  if (!timerEl) return;
  const mins = Math.floor(currentGame.timeLeft / 60).toString().padStart(2, "0");
  const secs = (currentGame.timeLeft % 60).toString().padStart(2, "0");
  timerEl.textContent = `${mins}:${secs}`;
  if (currentGame.timeLeft <= 10) {
    timerEl.classList.add("warning");
  } else {
    timerEl.classList.remove("warning");
  }
}

function togglePauseTimer() {
  const btn = document.getElementById("pause-time");
  currentGame.isPaused = !currentGame.isPaused;
  if (btn) {
    btn.textContent = currentGame.isPaused ? t("resume") : t("pause");
  }
}

function handleTimeout() {
  showFeedbackModal(t("timeout"));
  nextTurn();
}

function nextTurn() {
  currentGame.currentPlayerIndex = (currentGame.currentPlayerIndex + 1) % currentGame.players.length;
  loadCurrentWordTurn();
}

// =============================================================================
// CAMPOS DE ADIVINANZA Y CATEGORÍAS
// =============================================================================
function setupWordInputFields(wordObj) {
  const container = document.getElementById("guess-words");
  const clueStage = document.getElementById("clue-stage");
  if (!container || !clueStage) return;

  container.innerHTML = "";

  // Enmascarar consonantes/vocales según las reglas del juego
  const maskedText = maskWord(wordObj.originalWord);
  clueStage.textContent = applyEmojis(maskedText);

  // Generar inputs para palabras escritas en MAYÚSCULAS
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

function maskWord(fullWord) {
  return fullWord.replace(/[A-ZÁÉÍÓÚÑ]/g, "_");
}

function applyEmojis(text) {
  let result = text;
  Object.keys(currentEMOJI_MAP).forEach(key => {
    const reg = new RegExp(key, "gi");
    result = result.replace(reg, currentEMOJI_MAP[key]);
  });
  return result;
}

function setupCategoryChoices() {
  const container = document.getElementById("guess-categories");
  if (!container) return;
  container.innerHTML = "";

  currentGame.selectedCategories.forEach(catObj => {
    const btn = document.createElement("button");
    btn.className = "category-choice";
    btn.textContent = catObj.category;
    btn.addEventListener("click", () => {
      container.querySelectorAll(".category-choice").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
    container.appendChild(btn);
  });
}

// =============================================================================
// VERIFICACIÓN DE RESPUESTAS Y PUNTUACIÓN
// =============================================================================
function handleGuessSubmit() {
  const currentWordObj = getCurrentWord();
  if (!currentWordObj) return;

  const inputs = document.querySelectorAll(".guess-word-input");
  const userWords = Array.from(inputs).map(i => i.value.trim().toUpperCase());
  const selectedCatBtn = document.querySelector(".category-choice.selected");
  const userCategory = selectedCatBtn ? selectedCatBtn.textContent : "";

  // Evaluación de la palabra correcta
  const uppercaseTargetParts = currentWordObj.originalWord
    .split(" ")
    .filter(p => p === p.toUpperCase() && p.length > 1);

  const isWordCorrect = uppercaseTargetParts.every((part, i) => part === userWords[i]);
  const isCategoryCorrect = userCategory === currentWordObj.parentCategory;

  const activePlayer = currentGame.players[currentGame.currentPlayerIndex];

  if (isWordCorrect && isCategoryCorrect) {
    activePlayer.score += 3;
    currentWordObj.guessed = true;
    currentGame.discoveredCount++;
    updateDiscoveredCounter();
    renderBoard();
    showFeedbackModal(`${t("correct")} +3 ${t("points")}`);
    clearInterval(currentGame.timerInterval);
    nextTurn();
  } else if (isWordCorrect && !isCategoryCorrect) {
    activePlayer.score += 2;
    showFeedbackModal(t("wordOnlyPoints", { points: 2 }));
    nextTurn();
  } else if (!isWordCorrect && isCategoryCorrect) {
    activePlayer.score += 1;
    showFeedbackModal(t("categoryOnlyPoints", { points: 1 }));
    nextTurn();
  } else {
    showFeedbackModal(t("incorrect"));
    nextTurn();
  }
}

function handleRevealHint() {
  const activePlayer = currentGame.players[currentGame.currentPlayerIndex];
  if (activePlayer.score > 0) {
    activePlayer.score -= 1;
  }
  const currentWordObj = getCurrentWord();
  if (currentWordObj && currentWordObj.help) {
    showFeedbackModal(t("hintHelp", { help: currentWordObj.help }));
  } else {
    showFeedbackModal(t("hintSubcategory", { category: currentWordObj?.subCategory || "" }));
  }
  renderScoreboard();
}

// =============================================================================
// TABLERO DE PALABRAS DESCUBIERTAS
// =============================================================================
function renderBoard() {
  const container = document.getElementById("board-categories");
  if (!container) return;
  container.innerHTML = "";

  currentGame.selectedCategories.forEach(catObj => {
    const catBlock = document.createElement("div");
    catBlock.className = "board-category";

    const header = document.createElement("div");
    header.className = "board-category-header";
    header.innerHTML = `<h3>${catObj.category}</h3><span class="fortext">${catObj.fortext || ""}</span>`;

    const wordList = document.createElement("div");
    wordList.className = "word-list";

    currentGame.wordsToGuess
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
  if (counter) counter.textContent = currentGame.discoveredCount;
}

// =============================================================================
// MODALES Y PANTALLA DE FIN DE JUEGO
// =============================================================================
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

function handleContinueAfterReveal() {
  document.getElementById("reveal-in-column")?.classList.add("hidden");
  document.getElementById("game-active-panel")?.classList.remove("hidden");
  nextTurn();
}

function endGame() {
  clearInterval(currentGame.timerInterval);
  document.getElementById("screen-game")?.classList.add("hidden");
  document.getElementById("screen-end")?.classList.remove("hidden");

  const title = document.getElementById("end-title");
  if (title) title.textContent = t("end");

  const container = document.getElementById("final-scores");
  if (!container) return;
  container.innerHTML = "";

  const sortedPlayers = [...currentGame.players].sort((a, b) => b.score - a.score);

  sortedPlayers.forEach(p => {
    const row = document.createElement("div");
    row.className = "final-score";
    row.innerHTML = `<strong>${p.name}</strong><span>${p.score} ${t("points")}</span>`;
    container.appendChild(row);
  });
}

function resetToStartScreen() {
  document.getElementById("screen-end")?.classList.add("hidden");
  document.getElementById("screen-start")?.classList.remove("hidden");
}
