// ==========================================
// CONFIGURACIÓN E ITERACIÓN DE IDIOMAS
// ==========================================

const SUPPORTED_LANGS = ["es", "en", "it"];

export const allCategories = {};
export const allTexts = {};
export const allEmojiMaps = {};

const state = {
  lang: "es",
  text: {},
  emojiMap: {},
  categories: [],
  selectedCategories: [],
  players: [],
  currentPlayerIndex: 0,
  currentRound: 1,
  totalRounds: 3,
  turnTime: 120,
  timer: null,
  timeLeft: 120,
  gameActive: false,
  isPaused: false,
  discoveredWords: []
};

/**
 * Carga dinámicamente WORD_DATA, TEXT y EMOJI_MAP para todos los idiomas
 */
async function loadLanguages() {
  await Promise.all(
    SUPPORTED_LANGS.map(async (lang) => {
      try {
        const [wordsModule, textModule] = await Promise.all([
          import(`./palabras-${lang}.js`),
          import(`./texto-${lang}.js`)
        ]);

        allCategories[lang] = wordsModule.WORD_DATA || [];
        allTexts[lang] = textModule.TEXT || {};
        allEmojiMaps[lang] = textModule.EMOJI_MAP || {};
      } catch (err) {
        console.warn(`No se pudieron cargar los módulos para el idioma "${lang}":`, err);
      }
    })
  );
}

/**
 * Función auxiliar para obtener textos traducidos con reemplazo de variables
 */
function t(key, vars = {}) {
  let s = state.text[key] ?? key;
  return s.replace(/\{([a-zA-Z0-9_]+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}

/**
 * Cambia el idioma activo y actualiza la interfaz
 */
function setLanguage(lang) {
  if (!allTexts[lang]) {
    console.warn(`Idioma ${lang} no encontrado. Se mantendrá el idioma por defecto.`);
    return;
  }
  state.lang = lang;
  state.text = allTexts[lang];
  state.emojiMap = allEmojiMaps[lang] || {};
  state.categories = allCategories[lang] || allCategories.es || [];
  
  updateAllTexts();
  renderCategorySelection();
}

// ==========================================
// INTERFAZ DE USUARIO Y RENDERIZADO (UI)
// ==========================================

/**
 * Actualiza los textos estáticos según los IDs reales de tu index.html
 */
function updateAllTexts() {
  const elements = [
    { id: "subtitle", key: "subtitle" },
    { id: "start-game", key: "startGame" },
    { id: "players-label", key: "players" },
    { id: "time-label", key: "time" },
    { id: "rounds-label", key: "rounds" },
    { id: "player-colors-title", key: "playerColorsTitle" },
    { id: "categories-title", key: "categoriesTitle" },
    { id: "random-categories", key: "randomCategories" },
    { id: "category-count", key: "categoryCount" },
    { id: "board-title-text", key: "boardTitle" },
    { id: "new-game", key: "newGame" }
  ];

  elements.forEach(({ id, key }) => {
    const el = document.getElementById(id);
    if (el) el.textContent = t(key);
  });

  const btnPause = document.getElementById("pause-time");
  if (btnPause) {
    btnPause.textContent = state.isPaused ? t("resume") : t("pause");
  }
}

/**
 * Mapeo de emojis para categorías
 */
function applyEmojiMapping(text) {
  if (!text || typeof text !== "string") return text;
  let result = text;
  const map = state.emojiMap || {};

  for (const [key, emoji] of Object.entries(map)) {
    const regex = new RegExp(`\\b${key}\\b`, "gi");
    result = result.replace(regex, emoji);
  }
  return result;
}

/**
 * Renderiza la lista de categorías en el contenedor id="categories" de tu HTML
 */
function renderCategorySelection() {
  const container = document.getElementById("categories");
  if (!container) return;
  container.innerHTML = "";

  const currentCats = state.categories;

  currentCats.forEach((catObj, index) => {
    const item = document.createElement("label");
    item.className = "category-item";
    
    const catName = applyEmojiMapping(catObj.category);
    
    item.innerHTML = `
      <input type="checkbox" value="${index}" class="cat-checkbox">
      <span class="cat-name">${catName}</span>
      <span class="cat-desc">(${catObj.fortext || ""})</span>
    `;
    container.appendChild(item);
  });
}

// ==========================================
// LÓGICA DEL JUEGO Y EVENTOS DE MODALES
// ==========================================

function toggleConfigPanel() {
  const panel = document.getElementById("config-panel");
  panel?.classList.toggle("hidden");
}

function toggleRulesModal() {
  const modal = document.getElementById("rules-modal");
  modal?.classList.toggle("hidden");
}

function startGame() {
  const checkboxes = document.querySelectorAll(".cat-checkbox:checked");
  const selectedIndexes = Array.from(checkboxes).map(cb => parseInt(cb.value, 10));

  if (selectedIndexes.length === 0) {
    alert(t("selectCategories", { n: 1 }));
    return;
  }

  state.selectedCategories = selectedIndexes.map(i => state.categories[i]);
  state.gameActive = true;
  state.currentRound = 1;
  state.currentPlayerIndex = 0;
  state.discoveredWords = [];

  document.getElementById("screen-start")?.classList.add("hidden");
  document.getElementById("screen-game")?.classList.remove("hidden");

  updateTurnUI();
  startTimer();
}

function updateTurnUI() {
  const currentPlayer = state.players[state.currentPlayerIndex] || { name: `${t("player")} 1` };
  
  const turnLabel = document.getElementById("turn-label");
  const roundLabel = document.getElementById("round-label");

  if (roundLabel) roundLabel.textContent = `${t("round")} ${state.currentRound}`;
  if (turnLabel) turnLabel.textContent = `${t("turn")}: ${currentPlayer.name}`;
}

function startTimer() {
  clearInterval(state.timer);
  state.timeLeft = state.turnTime;
  updateTimerUI();

  state.timer = setInterval(() => {
    if (!state.isPaused) {
      state.timeLeft--;
      updateTimerUI();

      if (state.timeLeft <= 0) {
        clearInterval(state.timer);
        handleTimeout();
      }
    }
  }, 1000);
}

function updateTimerUI() {
  const timerEl = document.getElementById("timer");
  if (timerEl) {
    const mins = Math.floor(state.timeLeft / 60).toString().padStart(2, "0");
    const secs = (state.timeLeft % 60).toString().padStart(2, "0");
    timerEl.textContent = `${mins}:${secs}`;
  }
}

function handleTimeout() {
  alert(t("timeout"));
  nextTurn();
}

function nextTurn() {
  state.currentPlayerIndex = (state.currentPlayerIndex + 1) % (state.players.length || 1);
  if (state.currentPlayerIndex === 0) {
    state.currentRound++;
  }

  if (state.currentRound > state.totalRounds) {
    endGame();
  } else {
    updateTurnUI();
    startTimer();
  }
}

function togglePause() {
  state.isPaused = !state.isPaused;
  const btn = document.getElementById("pause-time");
  if (btn) btn.textContent = state.isPaused ? t("resume") : t("pause");
}

function endGame() {
  clearInterval(state.timer);
  state.gameActive = false;
  alert(t("end"));
  document.getElementById("screen-start")?.classList.remove("hidden");
  document.getElementById("screen-game")?.classList.add("hidden");
}

// ==========================================
// INICIALIZACIÓN DE LA APLICACIÓN
// ==========================================

async function initApp() {
  // 1. Cargar módulos dinámicamente
  await loadLanguages();

  // 2. Definir idioma inicial
  setLanguage("es");

  // 3. Vincular los eventos a los botones reales del index.html
  document.getElementById("start-game")?.addEventListener("click", startGame);
  document.getElementById("pause-time")?.addEventListener("click", togglePause);
  document.getElementById("new-game")?.addEventListener("click", endGame);

  // Botones de Configuración y Reglas
  document.getElementById("config-btn")?.addEventListener("click", toggleConfigPanel);
  document.getElementById("info-btn")?.addEventListener("click", toggleRulesModal);
  document.getElementById("close-rules")?.addEventListener("click", toggleRulesModal);

  // Selector de idioma id="lang-scroll"
  const langSelect = document.getElementById("lang-scroll");
  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });
  }
}

document.addEventListener("DOMContentLoaded", initApp);
