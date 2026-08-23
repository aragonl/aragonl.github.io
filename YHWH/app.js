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

function getWordList() {
  if (currentWordModule && currentWordModule.WORD_DATA) {
    return currentWordModule.WORD_DATA;
  }
  if (window.WORD_DATA) {
    return window.WORD_DATA;
  }
  return [];
}

async function switchLanguage(lang) {
  try {
    state.lang = lang;
    currentTextModule = await import(`./text-${lang}.js`);
    
    try {
      currentWordModule = await import(`./palabras-${lang}.js`);
    } catch (e) {
      console.warn("No se pudo cargar módulo separado de palabras, buscando global...");
    }

    // Traducción de textos data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (currentTextModule && currentTextModule.t && currentTextModule.t(key)) {
        el.textContent = currentTextModule.t(key);
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (currentTextModule && currentTextModule.t && currentTextModule.t(key)) {
        el.placeholder = currentTextModule.t(key);
      }
    });

    renderCategorySelection();
    updatePlayersSetup();
  } catch (err) {
    console.error(`Error al cargar los módulos para ${lang}:`, err);
  }
}

function renderCategorySelection() {
  const container = $("categories");
  if (!container) return;
  container.innerHTML = "";

  const mainCategories = getWordList();

  if (!mainCategories || mainCategories.length === 0) {
    container.innerHTML = "<p>No se encontraron categorías disponibles.</p>";
    return;
  }

  mainCategories.forEach((catObj) => {
    const card = document.createElement("div");
    const isSelected = state.selectedCategories.includes(catObj.category);
    
    card.className = `category-card ${isSelected ? 'selected' : ''}`;
    
    if (isSelected) {
      const orderIndex = state.selectedCategories.indexOf(catObj.category);
      const assignedColor = COLOR_PALETTE[orderIndex % COLOR_PALETTE.length];
      card.style.borderColor = assignedColor;
      card.style.boxShadow = `0 0 8px ${assignedColor}66`;
    }

    card.innerHTML = `
      <h4>${catObj.category}</h4>
      ${catObj.fortext ? `<p class="fortext">${catObj.fortext}</p>` : ''}
      ${catObj.dificultad ? `<span class="badge">Dificultad: ${catObj.dificultad}</span>` : ''}
    `;

    card.addEventListener("click", () => {
      if (state.selectedCategories.includes(catObj.category)) {
        state.selectedCategories = state.selectedCategories.filter(c => c !== catObj.category);
      } else {
        state.selectedCategories.push(catObj.category);
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
    const label = (currentTextModule && currentTextModule.t && currentTextModule.t('categoryCount')) 
      ? currentTextModule.t('categoryCount') 
      : 'Categorías seleccionadas';
    el.textContent = `${label}: ${state.selectedCategories.length}`;
  }
}

function updatePlayersSetup() {
  const select = $("players-count");
  if (!select) return;

  if (select.options.length === 0) {
    for (let i = 2; i <= 8; i++) {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = `${i} Jugadores`;
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

  if (settingsBtn && settingsModal) {
    settingsBtn.onclick = () => settingsModal.classList.remove("hidden");
  }
  if (closeSettingsBtn && settingsModal) {
    closeSettingsBtn.onclick = () => settingsModal.classList.add("hidden");
  }
}

function startGame() {
  if (state.selectedCategories.length === 0) {
    alert("Por favor, selecciona al menos una categoría.");
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

  for (let i = 0; i < state.playersCount; i++) {
    const card = document.createElement("div");
    card.className = `score-card ${i === state.currentPlayerIndex ? 'active' : ''}`;
    card.style.borderLeft = `6px solid ${state.playerColors[i]}`;
    card.innerHTML = `
      <div class="player-name">Jugador ${i + 1}</div>
      <div class="player-score">${state.scores[i]} pts</div>
    `;
    container.appendChild(card);
  }
}

function selectRandomWord() {
  const availableData = getWordList().filter(cat => state.selectedCategories.includes(cat.category));
  let allWords = [];

  availableData.forEach(cat => {
    if (cat.subcategories) {
      cat.subcategories.forEach(sub => {
        sub.words.forEach(word => {
          if (!state.usedWords.has(word)) {
            allWords.push({ word, category: cat.category, subcategory: sub.name });
          }
        });
      });
    }
  });

  if (allWords.length === 0) {
    alert("Se han agotado las palabras de las categorías seleccionadas.");
    return null;
  }

  const selected = allWords[Math.floor(Math.random() * allWords.length)];
  state.usedWords.add(selected.word);
  return selected;
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
  if ($("current-player")) {
    $("current-player").textContent = `Jugador ${state.currentPlayerIndex + 1}`;
    $("current-player").style.color = state.playerColors[state.currentPlayerIndex];
  }
  if ($("current-round")) {
    const label = (currentTextModule && currentTextModule.t && currentTextModule.t('roundText')) ? currentTextModule.t('roundText') : 'Ronda';
    $("current-round").textContent = `${label} ${state.currentRound}/${state.maxRounds}`;
  }
  if ($("clue-text")) {
    $("clue-text").textContent = `Categoría: ${state.currentWordObj.category} (${state.currentWordObj.subcategory}) - Longitud: ${state.currentWord.length} letras`;
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
        alert("¡Tiempo agotado!");
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
    alert(`¡Correcto! El Jugador ${state.currentPlayerIndex + 1} gana puntos.`);
    state.scores[state.currentPlayerIndex] += 10;
    input.value = "";
    advanceTurn();
  } else {
    alert("Incorrecto. Intenta de nuevo.");
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
    alert("¡Juego terminado!");
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
