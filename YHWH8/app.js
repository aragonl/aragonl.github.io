// ==========================================
// CONFIGURACIÓN E ITERACIÓN DE IDIOMAS
// ==========================================

// Idiomas soportados por la aplicación. 
// Para añadir uno nuevo, solo agrégalo a este array y crea sus archivos correspondientes.
const SUPPORTED_LANGS = ["es", "en", "it"];

// Contenedores globales donde se agrupan las traducciones y datos por idioma
export const allCategories = {};
export const allTexts = {};
export const allEmojiMaps = {};

// Estado global de la aplicación
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
  turnTime: 30,
  timer: null,
  timeLeft: 30,
  gameActive: false,
  isPaused: false,
  discoveredWords: []
};

/**
 * Carga dinámicamente los archivos de palabras y textos para todos los idiomas declarados.
 */
async function loadLanguages() {
  await Promise.all(
    SUPPORTED_LANGS.map(async (lang) => {
      try {
        const [wordsModule, textModule] = await Promise.all([
          import(`./palabras-${lang}.js`),
          import(`./texto-${lang}.js`)
        ]);

        allCategories[lang] = wordsModule.categoriesData || wordsModule.WORD_DATA || [];
        allTexts[lang] = textModule.TEXT || textModule[`text${lang.toUpperCase()}`] || {};
        allEmojiMaps[lang] = textModule.EMOJI_MAP || textModule[`EMOJI_MAP_${lang.toUpperCase()}`] || {};
      } catch (err) {
        console.warn(`No se pudieron cargar completamente los módulos para el idioma "${lang}":`, err);
      }
    })
  );
}

/**
 * Cambia el idioma activo en el estado y refresca los datos de texto y mapa de emojis.
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
  
  updateUIStaticText();
}

/**
 * Función auxiliar para obtener textos traducidos con reemplazo de variables.
 */
function t(key, vars = {}) {
  let s = state.text[key] ?? key;
  return s.replace(/\{([a-zA-Z0-9_]+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}

// ==========================================
// INTERFAZ DE USUARIO Y RENDERIZADO (UI)
// ==========================================

/**
 * Actualiza los elementos estáticos de la interfaz según el idioma seleccionado.
 */
function updateUIStaticText() {
  const subtitleEl = document.getElementById("subtitle");
  if (subtitleEl) subtitleEl.textContent = t("subtitle");

  const btnStartEl = document.getElementById("btn-start");
  if (btnStartEl) btnStartEl.textContent = t("startGame");

  const btnPauseEl = document.getElementById("btn-pause");
  if (btnPauseEl) btnPauseEl.textContent = state.isPaused ? t("resume") : t("pause");

  const boardTitleEl = document.getElementById("board-title");
  if (boardTitleEl) boardTitleEl.textContent = t("boardTitle");

  const btnNewGameEl = document.getElementById("btn-new-game");
  if (btnNewGameEl) btnNewGameEl.textContent = t("newGame");

  const randomCatLabel = document.getElementById("lbl-random-categories");
  if (randomCatLabel) randomCatLabel.textContent = t("randomCategories");
}

/**
 * Reemplaza palabras clave por emojis de forma insensible a mayúsculas/minúsculas.
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
 * Renderiza la lista de selección de categorías en el DOM.
 */
function renderCategorySelection() {
  const container = document.getElementById("category-list");
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
// LÓGICA DEL JUEGO
// ==========================================

function startGame() {
  const checkboxes = document.querySelectorAll(".cat-checkbox:checked");
  const selectedIndexes = Array.from(checkboxes).map(cb => parseInt(cb.value, 10));

  if (selectedIndexes.length === 0) {
    alert(t("selectAtLeastOne") || "Selecciona al menos una categoría");
    return;
  }

  state.selectedCategories = selectedIndexes.map(i => state.categories[i]);
  state.gameActive = true;
  state.currentRound = 1;
  state.currentPlayerIndex = 0;
  state.discoveredWords = [];

  document.getElementById("setup-screen")?.classList.add("hidden");
  document.getElementById("game-screen")?.classList.remove("hidden");

  updateTurnUI();
  startTimer();
}

function updateTurnUI() {
  const currentPlayer = state.players[state.currentPlayerIndex] || { name: `${t("player")} 1` };
  
  const turnInfoEl = document.getElementById("turn-info");
  if (turnInfoEl) {
    turnInfoEl.textContent = `${t("round")} ${state.currentRound} - ${t("turn")}: ${currentPlayer.name}`;
  }
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
  const timerEl = document.getElementById("timer-display");
  if (timerEl) {
    timerEl.textContent = `${state.timeLeft} ${t("seconds")}`;
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
  const btn = document.getElementById("btn-pause");
  if (btn) btn.textContent = state.isPaused ? t("resume") : t("pause");
}

function endGame() {
  clearInterval(state.timer);
  state.gameActive = false;
  alert(t("end"));
  document.getElementById("setup-screen")?.classList.remove("hidden");
  document.getElementById("game-screen")?.classList.add("hidden");
}

// ==========================================
// INICIALIZACIÓN
// ==========================================

async function initApp() {
  // 1. Cargar todos los módulos dinámicamente según la lista SUPPORTED_LANGS
  await loadLanguages();

  // 2. Establecer el idioma por defecto
  setLanguage("es");

  // 3. Renderizar controles iniciales
  renderCategorySelection();

  // 4. Asignar Event Listeners
  document.getElementById("btn-start")?.addEventListener("click", startGame);
  document.getElementById("btn-pause")?.addEventListener("click", togglePause);
  document.getElementById("btn-new-game")?.addEventListener("click", endGame);

  const langSelect = document.getElementById("lang-select");
  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      setLanguage(e.target.value);
      renderCategorySelection();
    });
  }
}

// Ejecutar la aplicación al cargar el DOM
document.addEventListener("DOMContentLoaded", initApp);
