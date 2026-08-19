import { WORD_DATA } from "./palabras-es.js";
import { TEXT, t } from "./texto-es.js";

const $ = (id) => document.getElementById(id);

const state = {
  players: 2,
  turnTime: 120,
  rTot: 3,
  selectedCategories: [],
  words: [],
  usedWordIds: new Set(),
  currentWord: null,
  currentRound: 0,
  currentClueRound: 0,
  currentClueRoundAttempts: 0,
  currentPlayer: 0,
  roundStarter: 0,
  roundWordsCompleted: 0,
  scores: [],
  timerId: null,
  paused: false,
  selectedGuessCategory: "",
  guessedWordParts: [],
  guessedCategory: false,
  remainingSeconds: 120,
  gameOver: false,
  playerColors: []
};

function normalize(s) {
  return String(s ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/\s+/g, " ")
    .trim();
}

// Se acepta una diferencia de una sola edición: agregar, quitar o cambiar una letra.
function editDistance(a, b) {
  a = normalize(a);
  b = normalize(b);
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(
        cur[j - 1] + 1,
        prev[j] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
    for (let j = 0; j < cur.length; j++) prev[j] = cur[j];
  }
  return prev[b.length];
}

function equivalent(a, b) {
  // Se acepta la misma palabra o una distancia de edición de exactamente
  // una operación: una letra agregada, eliminada o cambiada.
  // Así LEON admite LEONI y LUON, mientras que LUNA (3 cambios) y AGIO
  // frente a AGUA (2 cambios) no son equivalentes.
  return editDistance(a, b) <= 1;
}

function splitAnswer(word) {
  return String(word).split("&").map(x => x.trim()).filter(Boolean);
}

function isCompoundWord(word) {
  return splitAnswer(word).length > 1;
}

function stripVowels(s) {
  return String(s).replace(/[AEIOUÁÉÍÓÚÜaeiouáéíóúü]/g, "");
}

function revealVowels(s, count) {
  let shown = 0;
  return [...String(s)].map(ch => {
    if (/[AEIOUÁÉÍÓÚÜaeiouáéíóúü]/.test(ch) && shown < count) {
      shown++;
      return ch;
    }
    if (/[AEIOUÁÉÍÓÚÜaeiouáéíóúü]/.test(ch)) return "·";
    return ch;
  }).join("");
}

function flattenData() {
  const result = [];
  WORD_DATA.forEach((main, mainIndex) => {
    main.words.forEach((sub, subIndex) => {
      sub.words.forEach((word, i) => {
        result.push({
          id: `${mainIndex}-${subIndex}-${i}`,
          mainCategory: main.category,
          difficulty: main.dificultad,
          fortext: main.fortext,
          subcategory: sub.category,
          word,
          help: sub.help?.[i] ?? "",
          PN: sub.PN ?? true
        });
      });
    });
  });
  return result;
}

function init() {
  $("subtitle").textContent = TEXT.subtitle;
  $("start-title").textContent = t("startTitle");
  $("players-label").textContent = t("players");
  $("time-label").textContent = t("time");
  $("rounds-label").textContent = t("rounds");
  $("categories-title").textContent = t("categoriesTitle");
  $("random-categories").textContent = t("randomCategories");
  $("category-count").textContent = t("categoryCount");
  $("start-game").textContent = t("startGame");
  $("board-title").textContent = t("boardTitle");
  $("computer-badge").textContent = t("computer");
  $("reveal-title").textContent = t("specialRound");
  $("continue-reveal").textContent = t("continue");
  $("end-title").textContent = t("end");
  $("new-game").textContent = t("newGame");
  $("pause-time").textContent = t("pause");
  $("feedback-continue").textContent = t("continue");
  document.querySelector(".reveal-row:nth-child(1) .reveal-label").textContent = t("revealCategoryLabel");
  document.querySelector(".reveal-row:nth-child(2) .reveal-label").textContent = t("revealFortextLabel");
  document.querySelector(".reveal-row:nth-child(3) .reveal-label").textContent = t("revealWordLabel");
  document.querySelector(".reveal-row:nth-child(4) .reveal-label").textContent = t("revealHelpLabel");
  $("submit-guess").textContent = t("guess");

  for (let i = 1; i <= Math.max(1, WORD_DATA.length - 1); i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i;
    $("players").appendChild(opt);
  }
  $("players").value = Math.min(2, WORD_DATA.length - 1);

  renderPlayerColorSelection();
  renderCategorySelection();
  renderGuessInputs();

  $("players").addEventListener("change", () => {
    const maxPlayers = Math.max(1, WORD_DATA.length - 1);
    if (Number($("players").value) > maxPlayers) $("players").value = maxPlayers;
    ensurePlayerColors();
    renderPlayerColorSelection();
    renderCategorySelection();
  });
  $("random-categories").addEventListener("click", randomCategories);
  $("start-game").addEventListener("click", startGame);
  $("submit-guess").addEventListener("click", submitGuess);
  $("pause-time").addEventListener("click", togglePause);
  $("feedback-continue").addEventListener("click", continueFeedback);
  $("continue-reveal").addEventListener("click", continueAfterReveal);
  $("new-game").addEventListener("click", () => location.reload());
}

const CATEGORY_COLORS = [
  "#ffd6d6", "#ffe3b3", "#fff3b0", "#d9f2d9", "#cfe6ff", "#e4d4ff", "#ffd5eb", "#d7f5f0", "#e7e7e7", "#f4d6b8"
];
const PLAYER_COLORS = [
  { name: "rojo", value: "#d62828" },
  { name: "naranja", value: "#f77f00" },
  { name: "amarillo", value: "#e9c46a" },
  { name: "verde", value: "#2a9d8f" },
  { name: "azul", value: "#277da1" },
  { name: "violeta", value: "#7b2cbf" },
  { name: "rosado", value: "#e76f9f" }
];
function categoryColor(index) {
  return CATEGORY_COLORS[index % CATEGORY_COLORS.length];
}
function ensurePlayerColors() {
  const n = Number($("players").value) || 1;
  while (state.playerColors.length < n) state.playerColors.push(null);
  state.playerColors.length = n;
  const used = new Set(state.playerColors.filter(Boolean));
  for (let i = 0; i < n; i++) {
    if (!state.playerColors[i]) {
      const available = PLAYER_COLORS.map(x => x.value).filter(c => !used.has(c));
      state.playerColors[i] = available.length ? available[0] : PLAYER_COLORS[Math.floor(Math.random() * PLAYER_COLORS.length)].value;
      used.add(state.playerColors[i]);
    }
  }
}
function renderPlayerColorSelection() {
  ensurePlayerColors();
  const box = $("player-colors");
  if (!box) return;
  const n = Number($("players").value) || 1;
  box.innerHTML = "";
  for (let i = 0; i < n; i++) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "player-color-button";
    const color = state.playerColors[i];
    btn.style.borderColor = color;
    btn.style.background = color;
    btn.textContent = `${t("player")} ${i + 1}`;
    btn.addEventListener("click", () => openPlayerColorPicker(i));
    box.appendChild(btn);
  }
}
function openPlayerColorPicker(playerIndex) {
  const box = $("player-color-options");
  if (!box) return;
  box.innerHTML = `<strong>${t("choosePlayerColor", { n: playerIndex + 1 })}</strong>`;
  PLAYER_COLORS.forEach(color => {
    const usedByOther = state.playerColors.some((v, i) => i !== playerIndex && v === color.value);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "color-option";
    btn.style.background = color.value;
    btn.textContent = color.name;
    btn.disabled = usedByOther;
    btn.addEventListener("click", () => {
      state.playerColors[playerIndex] = color.value;
      renderPlayerColorSelection();
      box.innerHTML = "";
    });
    box.appendChild(btn);
  });
}

function renderCategorySelection() {
  const n = Number($("players").value) + 1;
  const selected = new Set(state.selectedCategories);
  $("category-count").textContent = `${t("categoryCount")} (${n} necesarias)`;
  const container = $("categories");
  container.innerHTML = "";
  WORD_DATA.forEach((cat, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `category-card ${selected.has(index) ? "selected" : ""}`;
    card.style.setProperty("--category-bg", categoryColor(index));
    if (selected.has(index)) card.style.setProperty("--selected-bg", categoryColor(index));
    card.innerHTML = `<h4>${escapeHtml(cat.category)}</h4>
      <span class="badge">Dificultad ${escapeHtml(cat.dificultad)}</span>
      <p>${escapeHtml(cat.fortext)}</p>`;
    card.addEventListener("click", () => toggleCategory(index));
    container.appendChild(card);
  });
}

function toggleCategory(index) {
  const n = Number($("players").value) + 1;
  const i = state.selectedCategories.indexOf(index);
  if (i >= 0) state.selectedCategories.splice(i, 1);
  else if (state.selectedCategories.length < n) state.selectedCategories.push(index);
  else return;
  renderCategorySelection();
}

function randomCategories() {
  const n = Number($("players").value) + 1;
  state.selectedCategories = [...WORD_DATA.keys()]
    .sort(() => Math.random() - 0.5)
    .slice(0, n);
  renderCategorySelection();
}

function startGame() {
  const players = Number($("players").value);
  const maxPlayers = Math.max(1, WORD_DATA.length - 1);
  const n = players + 1;
  if (players > maxPlayers) {
    $("start-error").textContent = t("tooManyPlayers", { max: maxPlayers });
    return;
  }
  if (state.selectedCategories.length !== n) {
    $("start-error").textContent = t("selectCategories", { n });
    return;
  }

  state.players = players;
  state.turnTime = Math.max(10, Number($("turn-time").value) || 120);
  state.rTot = Math.max(1, Number($("round-total").value) || 3);

  const selectedSet = new Set(state.selectedCategories);
  state.words = flattenData().filter(w => {
    const categoryIndex = WORD_DATA.findIndex(c => c.category === w.mainCategory);
    return selectedSet.has(categoryIndex);
  });

  if (state.words.length < state.players + 1) {
    $("start-error").textContent = t("noWords");
    return;
  }

  ensurePlayerColors();
  state.scores = Array(state.players).fill(0);
  state.usedWordIds.clear();
  state.currentRound = 0;
  state.currentClueRound = 0;
  state.currentClueRoundAttempts = 0;
  state.currentPlayer = 0;
  state.roundStarter = 0;
  state.roundWordsCompleted = 0;
  state.gameOver = false;
  state.paused = false;
  state.selectedGuessCategory = "";
  state.guessedWordParts = [];
  state.guessedCategory = false;
  state.wordBlockScored = false;
  state.categoryBlockScored = false;

  $("screen-start").classList.add("hidden");
  $("screen-game").classList.remove("hidden");
  renderBoard();
  nextWord();
}

function nextWord() {
  if (state.roundWordsCompleted >= state.players) {
    startComputerReveal();
    return;
  }
  const available = state.words.filter(w => !state.usedWordIds.has(w.id));
  if (!available.length) {
    endGame();
    return;
  }

  state.currentWord = available[Math.floor(Math.random() * available.length)];
  state.currentClueRound = 0;
  state.currentClueRoundAttempts = 0;
  state.selectedGuessCategory = "";
  state.guessedWordParts = [];
  state.guessedCategory = false;
  state.wordBlockScored = false;
  state.categoryBlockScored = false;
  hideFeedbackModal();
  renderGuessInputs();
  updateRoundUI();
  startTimer();
  renderClue();
}

function getAnswerParts(word) {
  // Si hay una o varias palabras escritas en MAYÚSCULAS, esas son las que
  // el jugador debe adivinar. El resto del texto ya forma parte de la pista.
  const raw = String(word ?? "");
  const parts = splitAnswer(raw);
  const explicitTargets = parts.map(part => {
    const matches = part.match(/[A-ZÁÉÍÓÚÜÑ]+(?:-[A-ZÁÉÍÓÚÜÑ]+)*/g);
    return matches ? matches.join(" ").trim() : "";
  }).filter(Boolean);

  if (explicitTargets.length) return explicitTargets;
  return parts;
}

function answerTargetText(word) {
  return getAnswerParts(word).join(" & ");
}

function renderGuessInputs() {
  const container = $("guess-words");
  if (!container) return;
  container.innerHTML = "";

  const answers = state.currentWord ? getAnswerParts(state.currentWord.word) : [""];
  for (let i = 0; i < Math.max(1, answers.length); i++) {
    const input = document.createElement("input");
    input.className = "guess-word-input";
    input.id = `guess-word-${i}`;
    input.autocomplete = "off";
    input.placeholder = answers.length > 1
      ? t("guessPartPlaceholder", { n: i + 1 })
      : t("guessPlaceholder");
    if (state.guessedWordParts[i]) {
      input.value = answers[i];
      input.disabled = true;
      input.classList.add("already-guessed");
    }
    input.addEventListener("keydown", e => { if (e.key === "Enter") submitGuess(); });
    container.appendChild(input);
  }
}

function populateCategorySelect() {
  const container = $("guess-categories");
  if (!container) return;
  const current = state.selectedGuessCategory || "";
  container.innerHTML = "";

  state.selectedCategories.forEach(index => {
    const cat = WORD_DATA[index];
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `category-choice ${state.guessedCategory ? (normalize(state.currentWord.mainCategory) === normalize(cat.category) ? "selected" : "") : (normalize(current) === normalize(cat.category) ? "selected" : "")}`;
    btn.textContent = cat.category;
    if (state.guessedCategory) btn.disabled = true;
    btn.addEventListener("click", () => {
      state.selectedGuessCategory = normalize(current) === normalize(cat.category) ? "" : cat.category;
      populateCategorySelect();
    });
    container.appendChild(btn);
  });
}

function updateRoundUI() {
  $("round-label").textContent = `${t("round")}: ${state.currentClueRound + 1}/${state.rTot}`;
  $("turn-label").textContent = `${t("turn")} ${t("player")} ${state.currentPlayer + 1}`;
  renderScoreboard();
}

function renderScoreboard() {
  const el = $("scoreboard");
  el.innerHTML = "";
  state.scores.forEach((score, i) => {
    const d = document.createElement("div");
    d.className = `score ${i === state.currentPlayer ? "active" : ""}`;
    d.style.setProperty("--player-color", state.playerColors[i] || PLAYER_COLORS[i % PLAYER_COLORS.length].value);
    d.innerHTML = `<strong>${t("player")} ${i + 1}</strong><span>${score} ${t("points")}</span>`;
    el.appendChild(d);
  });
}

function renderClue() {
  const w = state.currentWord;
  const r = state.currentClueRound;
  const raw = String(w.word);
  const parts = splitAnswer(raw);

  // Las partes en MAYÚSCULAS son las palabras que realmente hay que adivinar.
  // Todo lo demás se muestra como pista, conservando sus vocales.
  let vowelCount = r >= 3 ? r - 2 : 0;
  let vowelBudget = vowelCount;
  const displayedParts = parts.map(part => {
    const targetMatches = part.match(/[A-ZÁÉÍÓÚÜÑ]+(?:-[A-ZÁÉÍÓÚÜÑ]+)*/g);
    if (!targetMatches) return part;

    let remaining = part;
    targetMatches.forEach(target => {
      const shown = vowelCount > 0 ? revealVowels(target, vowelBudget) : stripVowels(target);
      vowelBudget = Math.max(0, vowelBudget - (target.match(/[AEIOUÁÉÍÓÚÜaeiouáéíóúü]/g) || []).length);
      remaining = remaining.replace(target, shown);
    });
    return remaining;
  });

  if (r < 3) {
    // Antes de comenzar a revelar vocales, las palabras objetivo muestran
    // solamente consonantes; el texto auxiliar permanece visible.
    for (let i = 0; i < displayedParts.length; i++) {
      const part = parts[i];
      if (/[A-ZÁÉÍÓÚÜÑ]+/.test(part)) {
        displayedParts[i] = part.replace(/[A-ZÁÉÍÓÚÜÑ]+(?:-[A-ZÁÉÍÓÚÜÑ]+)*/g, m => stripVowels(m));
      }
    }
  }

  const clues = [];
  if (r >= 1 && w.help) clues.push(t("hintHelp", { help: w.help }));
  if (r >= 2) clues.push(t("hintSubcategory", { category: w.subcategory }));
  if (r >= 3) clues.push(t("hintVowel"));

  $("attempt-status").innerHTML = clues.map(escapeHtml).join(" · ");
  $("clue-stage").textContent = displayedParts.join(" & ");
  populateCategorySelect();
  updateRoundUI();
  renderTimer();
}

function getGuesses() {
  const inputs = [...document.querySelectorAll(".guess-word-input")];
  return inputs.map(input => input.value.trim());
}

function evaluateWordParts(guesses, answers) {
  if (answers.length === 1) {
    return {
      correctCount: equivalent(guesses[0] ?? "", answers[0]) ? 1 : 0,
      total: 1,
      allCorrect: equivalent(guesses[0] ?? "", answers[0])
    };
  }

  // Cada casilla corresponde a una de las palabras separadas por &.
  let correctCount = 0;
  answers.forEach((answer, i) => {
    if (equivalent(guesses[i] ?? "", answer)) correctCount++;
  });

  return {
    correctCount,
    total: answers.length,
    allCorrect: correctCount === answers.length
  };
}

function submitGuess() {
  if (!state.currentWord || state.gameOver || state.paused) return;

  const guesses = getGuesses();
  const answers = getAnswerParts(state.currentWord.word);
  const guessCategory = state.selectedGuessCategory || "";

  const newlyCorrectParts = [];
  answers.forEach((answer, i) => {
    if (!state.guessedWordParts[i] && equivalent(guesses[i] ?? "", answer)) {
      newlyCorrectParts.push(i);
    }
  });
  const categoryOK = !state.guessedCategory && normalize(guessCategory) === normalize(state.currentWord.mainCategory);

  newlyCorrectParts.forEach(i => state.guessedWordParts[i] = true);
  if (categoryOK) state.guessedCategory = true;

  const basePoints = Math.max(1, 2 * (state.rTot - state.currentClueRound));
  const componentPoints = Math.max(1, Math.floor(basePoints / 2));
  const wordDone = state.guessedWordParts.every(Boolean);
  const allDone = wordDone && state.guessedCategory;

  // Cada palabra objetivo tiene una parte del bloque PALABRA.
  // En una palabra simple, el bloque vale componentPoints; en una respuesta
  // con &, cada palabra vale la mitad de ese bloque. La categoría mantiene
  // su propio bloque de componentPoints.
  let awarded = 0;
  if (newlyCorrectParts.length) {
    const wordPartValue = answers.length > 1 ? componentPoints / answers.length : componentPoints;
    awarded += wordPartValue * newlyCorrectParts.length;
  }
  if (categoryOK && !state.categoryBlockScored) {
    awarded += componentPoints;
    state.categoryBlockScored = true;
  }

  if (allDone) {
    state.scores[state.currentPlayer] += awarded;
    showFeedback(t("correct"), "good", "finish");
    return;
  }

  if (newlyCorrectParts.length || categoryOK) {
    state.scores[state.currentPlayer] += awarded;
    const parts = [];
    if (newlyCorrectParts.length) {
      if (answers.length > 1 && newlyCorrectParts.length < answers.length) {
        parts.push(t("wordPartialCorrect"));
      } else {
        parts.push(t("wordBlockCorrect"));
      }
    }
    if (categoryOK) parts.push(t("categoryCorrect"));
    showFeedback(`${parts.join(" ")} ${awarded ? `+${awarded} ${t("points")}.` : ""}`, "partial", "partial");
    return;
  }

  showFeedback(t("incorrect"), "bad", "fail");
}

function showFeedback(message, kind, action) {
  stopTimer();
  state.feedbackAction = action;
  $("feedback-message").textContent = message;
  $("feedback-message").className = `feedback ${kind}`;
  $("feedback-modal").classList.remove("hidden");
}

function hideFeedbackModal() {
  $("feedback-modal").classList.add("hidden");
  $("feedback-message").textContent = "";
}

function continueFeedback() {
  hideFeedbackModal();

  if (state.feedbackAction === "finish") {
    finishWord();
    return;
  }

  // Tanto un fallo como un acierto parcial pasan al siguiente jugador,
  // pero la palabra y todas las pistas reveladas permanecen.
  if (state.feedbackAction === "partial" || state.feedbackAction === "fail") {
    advanceFailedAttempt();
  }
  if (state.feedbackAction === "revealed") {
    if (state.roundWordsCompleted >= state.players) startComputerReveal();
    else nextWord();
  }
}
function finishWord() {
  stopTimer();
  state.usedWordIds.add(state.currentWord.id);
  state.roundWordsCompleted++;
  state.currentPlayer = (state.currentPlayer + 1) % state.players;
  renderBoard();

  setTimeout(() => {
    if (state.roundWordsCompleted >= state.players) startComputerReveal();
    else nextWord();
  }, 650);
}

function advanceFailedAttempt() {
  state.currentPlayer = (state.currentPlayer + 1) % state.players;
  state.currentClueRoundAttempts++;

  if (state.currentClueRoundAttempts >= state.players) {
    state.currentClueRoundAttempts = 0;
    state.currentClueRound++;

    if (state.currentClueRound >= state.rTot) {
      stopTimer();
      $("clue-stage").textContent = state.currentWord.word;
      $("attempt-status").textContent = t("revealedWord");
      state.usedWordIds.add(state.currentWord.id);
      state.roundWordsCompleted++;
      renderBoard();
      showFeedback(`${t("revealedWord")}: ${state.currentWord.word}`, "partial", "revealed");
      return;
    }
  }

  startTimer();
  renderClue();
}

function startTimer() {
  stopTimer();
  state.remainingSeconds = state.turnTime;
  state.paused = false;
  updatePauseButton();
  renderTimer();
  state.timerId = setInterval(() => {
    if (state.paused) return;
    state.remainingSeconds--;
    renderTimer();
    if (state.remainingSeconds <= 0) {
      stopTimer();
      showFeedback(t("timeout"), "bad", "fail");
    }
  }, 1000);
}

function togglePause() {
  if (!state.currentWord || state.gameOver) return;
  state.paused = !state.paused;
  updatePauseButton();
}

function updatePauseButton() {
  const btn = $("pause-time");
  if (!btn) return;
  btn.textContent = state.paused ? t("resume") : t("pause");
  btn.setAttribute("aria-label", btn.textContent);
}
function stopTimer() {
  if (state.timerId) clearInterval(state.timerId);
  state.timerId = null;
}

function renderTimer() {
  const min = Math.floor(state.remainingSeconds / 60);
  const sec = state.remainingSeconds % 60;
  $("timer").textContent = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  $("timer").classList.toggle("warning", state.remainingSeconds <= 10);
}

function startComputerReveal() {
  stopTimer();
  $("screen-game").classList.add("hidden");
  $("screen-reveal").classList.remove("hidden");

  const available = state.words.filter(w => !state.usedWordIds.has(w.id));
  if (!available.length) {
    endGame();
    return;
  }

  state.currentWord = available[Math.floor(Math.random() * available.length)];
  state.usedWordIds.add(state.currentWord.id);

  $("revealed-category").textContent = `${state.currentWord.mainCategory} · ${state.currentWord.subcategory}`;
  $("reveal-fortext").textContent = state.currentWord.fortext || "";
  $("revealed-word").textContent = state.currentWord.word;
  $("reveal-help").textContent = state.currentWord.help || "";
}

function continueAfterReveal() {
  state.roundWordsCompleted = 0;
  state.currentRound++;

  // El jugador que inició la ronda pasa al final. El siguiente jugador inicia.
  state.roundStarter = (state.roundStarter + 1) % state.players;
  state.currentPlayer = state.roundStarter;
  state.currentClueRound = 0;
  state.currentClueRoundAttempts = 0;
  state.paused = false;

  $("screen-reveal").classList.add("hidden");
  $("screen-game").classList.remove("hidden");
  renderBoard();

  if (state.usedWordIds.size >= state.words.length) endGame();
  else nextWord();
}

function renderBoard() {
  const container = $("board-categories");
  container.innerHTML = "";
  state.selectedCategories.forEach(index => {
    const main = WORD_DATA[index];
    const block = document.createElement("section");
    block.className = "board-category";
    block.style.setProperty("--category-bg", categoryColor(index));

    const discovered = state.words.filter(w =>
      w.mainCategory === main.category && state.usedWordIds.has(w.id)
    );

    block.innerHTML = `<h3>${escapeHtml(main.category)}</h3>
      <div class="fortext">${escapeHtml(main.fortext)}</div>
      <div class="word-list"></div>`;

    const list = block.querySelector(".word-list");
    discovered.forEach(w => {
      const chip = document.createElement("div");
      chip.className = "word-chip";
      chip.innerHTML = `<strong>${escapeHtml(w.word)}</strong>
        <small>${escapeHtml(w.subcategory)}</small>`;
      list.appendChild(chip);
    });
    if (!discovered.length) list.innerHTML = `<span class="word-chip">—</span>`;
    container.appendChild(block);
  });
}

function endGame() {
  stopTimer();
  state.gameOver = true;
  $("screen-game").classList.add("hidden");
  $("screen-reveal").classList.add("hidden");
  $("screen-end").classList.remove("hidden");

  const sorted = state.scores.map((score, i) => ({ i, score })).sort((a, b) => b.score - a.score);
  const best = sorted[0]?.score ?? 0;
  $("final-scores").innerHTML = sorted.map(x =>
    `<div class="final-score"><strong>${t("player")} ${x.i + 1}</strong><span>${x.score} ${t("points")}</span></div>`
  ).join("") + `<p>${best > 0 ? `${t("won")}: ${t("player")} ${sorted[0].i + 1}` : t("tie")}</p>`;
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

init();
