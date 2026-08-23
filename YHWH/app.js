let currentTextModule = null;
let currentWordModule = null; // Módulo separado para las palabras/categorías

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
  // Retorna el array WORD_DATA cargado desde palabras-{lang}.js
  if (currentWordModule && currentWordModule.WORD_DATA) {
    return currentWordModule.WORD_DATA;
  }
  return [];
}

async function switchLanguage(lang) {
  try {
    state.lang = lang;
    // Carga los textos de interfaz y las palabras correspondientes
    currentTextModule = await import(`./text-${lang}.js`);
    currentWordModule = await import(`./palabras-${lang}.js`);
    
    // Actualizar atributos i18n
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

    // Reiniciar lista de categorías seleccionadas si cambia de idioma
    state.selectedCategories = [];

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

function renderCategorySelection() {
  const container = $("categories");
  if (!container) return;
  container.innerHTML = "";

  const mainCategories = getWordList();

  mainCategories.forEach((catObj, index) => {
    const card = document.createElement("div");
    const isSelected = state.selectedCategories.includes(catObj.category);
    
    card.className = `category-card ${isSelected ? 'selected' : ''}`;
    
    // Asigna dinámicamente un color según el orden de selección
    if (isSelected) {
      const orderIndex = state.selectedCategories.indexOf(catObj.category);
      const assignedColor = COLOR_PALETTE[orderIndex % COLOR_PALETTE.length];
      card.style.borderColor = assignedColor;
      card.style.boxShadow = `0 0 0 2px ${assignedColor}`;
    }

    card.innerHTML = `
      <h4>${catObj.category}</h4>
      ${catObj.fortext ? `<p class="fortext">${catObj.fortext}</p>` : ''}
      <span class="badge">Dificultad: ${catObj.dificultad || 1}</span>
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
  if (el && currentTextModule) {
    el.textContent = `${currentTextModule.t('categoryCount') || 'Categorías seleccionadas'}: ${state.selectedCategories.length}`;
  }
}
