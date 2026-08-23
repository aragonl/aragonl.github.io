let currentTextModule = null;
let currentWordModule = null;

let state = {
  lang: 'es',
  playersCount: 2,
  playerColors: ['#FF5722', '#2196F3', '#4CAF50', '#FFEB3B', '#9C27B0', '#E91E63', '#00BCD4', '#FF9800'],
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
  currentWordObj: null,
  usedWords: new Set()
};

const COLOR_PALETTE = [
  '#FF5722', '#2196F3', '#4CAF50', '#FFEB3B', 
  '#9C27B0', '#E91E63', '#00BCD4', '#FF9800'
];

const $ = (id) => document.getElementById(id);

// Inspector universal de textos para text-es.js y text-it.js
function getText(key) {
  if (!currentTextModule) return null;

  // 1. Si existe una función t()
  if (typeof currentTextModule.t === 'function') {
    const res = currentTextModule.t(key);
    if (res && res !== key) return res;
  }

  // 2. Buscar dentro de objetos exportados (TEXTS, default o la raíz del módulo)
  const target = currentTextModule.TEXTS || currentTextModule.default || currentTextModule;
  if (target && typeof target === 'object' && target[key]) {
    return target[key];
  }

  return null;
}

// Inspector universal de lista de palabras para palabras-es.js / palabras-it.js
function getWordList() {
  if (currentWordModule) {
    if (Array.isArray(currentWordModule.WORD_DATA)) return currentWordModule.WORD_DATA;
    if (Array.isArray(currentWordModule.default)) return currentWordModule.default;
    if (Array.isArray(currentWordModule.categories)) return currentWordModule.categories;
    if (Array.isArray(currentWordModule)) return currentWordModule;
  }
  if (window.WORD_DATA && Array.isArray(window.WORD_DATA)) {
    return window.WORD_DATA;
  }
  return [];
}

async function switchLanguage(lang) {
  try {
    state.lang = lang;
    
    try {
      currentTextModule = await import(`./text-${lang}.js`);
    } catch (e) {
      console.error(`Error al importar text-${lang}.js:`, e);
    }

    try {
      currentWordModule = await import(`./palabras-${lang}.js`);
    } catch (e) {
      console.warn(`No se encontró palabras-${lang}.js separado.`);
    }

    // Traducción de elementos data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = getText(key);
      if (val) {
        el.textContent = val;
      }
    });

    // Traducción de placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = getText(key);
      if (val) {
        el.placeholder = val;
      }
    });

    state.selectedCategories = [];
    renderCategorySelection();
    updatePlayersSetup();
  } catch (err) {
    console.error(`Error general al cambiar idioma a ${lang}:`, err);
  }
}

function renderCategorySelection() {
  const container = $("categories");
  if (!container) return;
  container.innerHTML = "";

  const mainCategories = getWordList();

  if (!mainCategories || mainCategories.length === 0) {
    const noCatMsg = getText('noCategories') || "No se encontraron categorías disponibles.";
    container.innerHTML = `<p>${noCatMsg}</p>`;
    return;
  }

  mainCategories.forEach((catObj) => {
    const catName = catObj.category || catObj.name || catObj.nombre || "Sin Categoría";
    const card = document.createElement("div");
    const isSelected = state.selectedCategories.includes(catName);
    
    card.className = `category-card ${isSelected ? 'selected' : ''}`;
    
    if (isSelected) {
      const orderIndex = state.selectedCategories.indexOf(catName);
      const assignedColor = COLOR_PALETTE[orderIndex % COLOR_PALETTE.length];
      card.style.borderColor = assignedColor;
      card.style.boxShadow = `0 0 8px ${assignedColor}66`;
    }

    const diffLabel = getText('difficultyLabel') || 'Dificultad';

    card.innerHTML = `
      <h4>${catName}</h4>
      ${catObj.fortext ? `<p class="fortext">${catObj.fortext}</p>` : ''}
      ${catObj.dificultad ? `<span class="badge">${diffLabel}: ${catObj.dificultad}</span>` : ''}
    `;

    card.addEventListener("click", () => {
      if (state.selectedCategories.includes(catName)) {
        state.selectedCategories = state.selectedCategories.filter(c => c !== catName);
      } else {
        state.selectedCategories.push(catName);
      }
      renderCategorySelection();
    });

    container.appendChild(card);
  });

  updateCategoryCount();
}

function updateCategoryCount() {
  const el = $("category-count");
  if (el) {
    const label = getText('categoryCount') || 'Categorías seleccionadas';
    el.textContent = `${label}: ${state.selectedCategories.length}`;
  }
}

function updatePlayersSetup() {
  const select = $("players-count");
  if (!select) return;

  const playerWord = getText('playerWord') || 'Jugadores';

  if (select.options.length === 0) {
    for (let i = 2; i <= 8; i++) {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = `${i} ${playerWord}`;
      select.appendChild(opt);
    }
  }

  state.playersCount = parseInt(select.value, 10) || 2;
  
  const colorsContainer = $("player-colors");
  if (!colorsContainer) return;
  colorsContainer.innerHTML = "";

  for (let i = 0; i < state.playersCount; i++) {
    const colorPicker = document.createElement("input");
    colorPicker.type = "color";
    colorPicker.value = state.playerColors[i] || COLOR_PALETTE[i % COLOR_PALETTE.length];
    colorPicker.className = "color-picker";
    colorPicker.addEventListener("change", (e) => {
      state.playerColors[i] = e.target.value;
    });
    colorsContainer.appendChild(colorPicker);
  }
}

function setupModals() {
  const infoBtn = $("info-btn");
  const infoModal = $("info-modal");
  const closeInfoBtn = $("close-info-btn");

  if (infoBtn && infoModal) {
    infoBtn.onclick = () => infoModal.classList.remove("hidden");
  }
  if (closeInfoBtn && infoModal) {
    closeInfoBtn.onclick = () => infoModal.classList.add("hidden");
  }

  const settingsBtn = $("settings-btn");
  const settingsModal = $("settings-modal");
  const closeSettingsBtn = $("close-settings-btn");
  const roundsInput = $("rounds-input");
  const timerInput = $("timer-input");

  if (settingsBtn && settingsModal) {
    settingsBtn.onclick = () => settingsModal.classList.remove("hidden");
  }
  if (closeSettingsBtn && settingsModal) {
    closeSettingsBtn.onclick = () => {
      if (roundsInput) state.maxRounds = parseInt(roundsInput.value, 10) || 3;
      if (timerInput) state.turnTimeLimit = parseInt(timerInput.value, 10) || 120;
      settingsModal.classList.add("hidden");
    };
  }
}

function selectRandomWord() {
  const rawList = getWordList();
  const availableData = rawList.filter(cat => {
    const catName = cat.category || cat.name || cat.nombre;
    return state.selectedCategories.includes(catName);
  });

  let allWords = [];

  availableData.forEach(cat => {
    const catName = cat.category || cat.name || cat.nombre;
    
    // Si la categoría tiene subcategorías
    if (Array.isArray(cat.subcategories)) {
      cat.subcategories.forEach(sub => {
        const subName = sub.name || sub.nombre || '';
        const wordArr = sub.words || sub.palabras || [];
        wordArr.forEach(w => {
          const wordString = typeof w === 'string' ? w : (w.word || w.palabra);
          if (wordString && !state.usedWords.has(wordString)) {
            allWords.push({ word: wordString, category: catName, subcategory: subName });
          }
        });
      });
    } 
    // Si la categoría tiene las palabras directamente
    else if (Array.isArray(cat.words) || Array.isArray(cat.palabras)) {
      const wordArr = cat.words || cat.palabras;
      wordArr.forEach(w => {
        const wordString = typeof w === 'string' ? w : (w.word || w.palabra);
        if (wordString && !state.usedWords.has(wordString)) {
          allWords.push({ word: wordString, category: catName, subcategory: '' });
        }
      });
    }
  });

  if (allWords.length === 0) {
    const alertWordsExhausted = getText('wordsExhaustedAlert') || "Se han agotado las palabras de las categorías seleccionadas.";
    alert(alertWordsExhausted);
    return null;
  }

  const selected = allWords[Math.floor(Math.random() * allWords.length)];
  state.usedWords.add(selected.word);
  return selected;
}

function startGame() {
  if (state.selectedCategories.length === 0) {
    const alertMsg = getText('selectCategoryAlert') || "Por favor, selecciona al menos una categoría.";
    alert(alertMsg);
    return;
  }

  state.scores = new Array(state.playersCount).fill(0);
  state.currentPlayerIndex = 0;
  state.currentRound = 1;
  state.usedWords.clear();

  $("setup-screen").classList.add("hidden");
  $("game-screen").classList.remove("hidden");

  renderScoreboard();
  nextTurn();
}

function renderScoreboard() {
  const container = $("scoreboard");
  if (!container) return;
  container.innerHTML = "";

  const playerLabel = getText('playerLabel') || 'Jugador';

  for (let i = 0; i < state.playersCount; i++) {
    const card = document.createElement("div");
    card.className = `score-card ${i === state.currentPlayerIndex ? 'active' : ''}`;
    card.style.borderLeft = `6px solid ${state.playerColors[i]}`;
    card.innerHTML = `
      <div class="player-name">${playerLabel} ${i + 1}</div>
      <div class="player-score">${state.scores[i]} pts</div>
    `;
    container.appendChild(card);
  }
}

function nextTurn() {
  state.currentWordObj = selectRandomWord();
  if (!state.currentWordObj) return;

  state.currentWord = state.currentWordObj.word;

  renderScoreboard();
  updateTurnUI();
  startTimer();
}

function updateTurnUI() {
  const playerLabel = getText('playerLabel') || 'Jugador';
  const turnLabel = getText('turnLabel') || 'Turno del';

  if ($("current-player")) {
    $("current-player").textContent = `${turnLabel} ${playerLabel} ${state.currentPlayerIndex + 1}`;
    $("current-player").style.color = state.playerColors[state.currentPlayerIndex];
  }
  if ($("current-round")) {
    const roundLabel = getText('roundText') || 'Ronda';
    $("current-round").textContent = `${roundLabel} ${state.currentRound}/${state.maxRounds}`;
  }
  if ($("clue-text")) {
    const catLabel = getText('categoryLabel') || 'Categoría';
    const lenLabel = getText('lengthLabel') || 'Longitud';
    const lettersLabel = getText('lettersLabel') || 'letras';
    const subText = state.currentWordObj.subcategory ? ` (${state.currentWordObj.subcategory})` : '';
    
    $("clue-text").textContent = `${catLabel}: ${state.currentWordObj.category}${subText} - ${lenLabel}: ${state.currentWord.length} ${lettersLabel}`;
  }
}

function startTimer() {
  clearInterval(state.timerInterval);
  state.timeLeft = state.turnTimeLimit;
  state.isPaused = false;
  updateTimerDisplay();

  state.timerInterval = setInterval(() => {
    if (!state.isPaused) {
      state.timeLeft--;
      updateTimerDisplay();
      if (state.timeLeft <= 0) {
        clearInterval(state.timerInterval);
        const timeUpMsg = getText('timeUpAlert') || "¡Tiempo agotado!";
        alert(timeUpMsg);
        advanceTurn();
      }
    }
  }, 1000);
}

function updateTimerDisplay() {
  if ($("timer")) {
    $("timer").textContent = `${state.timeLeft}s`;
  }
}

function submitGuess() {
  const input = $("guess-input");
  if (!input) return;

  const val = input.value.trim().toLowerCase();
  if (!val) return;

  if (val === state.currentWord.toLowerCase()) {
    const correctMsg = getText('correctGuessAlert') || "¡Correcto!";
    alert(correctMsg);
    state.scores[state.currentPlayerIndex] += 10;
    input.value = "";
    advanceTurn();
  } else {
    const wrongMsg = getText('wrongGuessAlert') || "Incorrecto. Intenta de nuevo.";
    alert(wrongMsg);
    input.value = "";
  }
}

function advanceTurn() {
  clearInterval(state.timerInterval);
  state.currentPlayerIndex++;
  if (state.currentPlayerIndex >= state.playersCount) {
    state.currentPlayerIndex = 0;
    state.currentRound++;
  }

  if (state.currentRound > state.maxRounds) {
    const gameOverMsg = getText('gameOverAlert') || "¡Juego terminado!";
    alert(gameOverMsg);
    $("game-screen").classList.add("hidden");
    $("setup-screen").classList.remove("hidden");
  } else {
    nextTurn();
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await switchLanguage('es');

  updatePlayersSetup();
  setupModals();

  if ($("players-count")) {
    $("players-count").addEventListener("change", updatePlayersSetup);
  }
  if ($("start-btn")) {
    $("start-btn").addEventListener("click", startGame);
  }
  if ($("submit-guess-btn")) {
    $("submit-guess-btn").addEventListener("click", submitGuess);
  }
  if ($("pass-turn-btn")) {
    $("pass-turn-btn").addEventListener("click", advanceTurn);
  }
  if ($("lang-select")) {
    $("lang-select").addEventListener("change", (e) => switchLanguage(e.target.value));
  }
});
