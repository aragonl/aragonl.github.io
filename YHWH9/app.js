function init() {
  $("info-btn")?.addEventListener("click", openRules);
  $("close-rules")?.addEventListener("click", closeRules);

  // Toggle del botón de configuración (funciona en inicio y en juego)
  document.addEventListener("click", (e) => {
    if (e.target.closest("#config-btn")) {
      const panel = $("config-panel");
      if (panel) {
        panel.classList.toggle("hidden");
      }
    }
  });

  // Botón X para cerrar la configuración
  $("close-config")?.addEventListener("click", () => {
    $("config-panel")?.classList.add("hidden");
  });

  const langScroll = $("lang-scroll");
  if (langScroll) {
    langScroll.value = currentLang;
    langScroll.addEventListener("change", async (e) => {
      currentLang = e.target.value;
      await loadLanguage(currentLang);
    });
  }

  const playersSelect = $("players");
  if (playersSelect) {
    playersSelect.addEventListener("change", () => {
      const p = Number(playersSelect.value) || 1;
      const catInput = $("config-cat-count");
      if (catInput) {
        catInput.value = p + 1;
      }
      ensurePlayerColorsAndNames();
      renderPlayerColorSelection();
      renderCategorySelection();
      updateMaxGameTimeDisplay();
    });
  }

  $("turn-time")?.addEventListener("input", applyLiveConfigChanges);
  $("round-total")?.addEventListener("input", applyLiveConfigChanges);

  $("config-cat-count")?.addEventListener("input", () => {
    renderCategorySelection();
    updateMaxGameTimeDisplay();
  });

  loadLanguage(currentLang).then(() => {
    renderPlayerColorSelection();
    renderCategorySelection();
    renderGuessInputs();
  });

  $("random-categories")?.addEventListener("click", randomCategories);
  $("start-game")?.addEventListener("click", startGame);
  $("submit-guess")?.addEventListener("click", submitGuess);
  $("reveal-hint-btn")?.addEventListener("click", revealHintManual);
  $("pause-time")?.addEventListener("click", togglePause);
  $("feedback-continue")?.addEventListener("click", continueFeedback);
  $("continue-reveal")?.addEventListener("click", continueAfterReveal);
  $("new-game")?.addEventListener("click", () => location.reload());
}

// Se elimina el traslado del panel para no romper la pantalla de inicio
function moveHeaderControlsToGame() {
  const startControls = document.querySelector("#screen-start .header-controls-right");
  const inGameTarget = $("in-game-header-controls");

  if (startControls && inGameTarget) {
    inGameTarget.appendChild(startControls);
  }
}

function startGame() {
  const players = Number($("players")?.value) || 1;

  if (state.selectedCategories.length === 0) {
    randomCategories();
  }

  state.players = players;
  state.turnTime = Math.max(10, Number($("turn-time")?.value) || 120);
  state.rTot = Math.max(1, Number($("round-total")?.value) || 3);

  const selectedSet = new Set(state.selectedCategories);
  state.words = flattenData().filter(w => {
    const categoryIndex = WORD_DATA.findIndex(c => c.category === w.mainCategory);
    return selectedSet.has(categoryIndex);
  });

  if (state.words.length === 0) {
    if ($("start-error")) $("start-error").textContent = t("noWords");
    return;
  }

  ensurePlayerColorsAndNames();
  state.scores = Array(state.players).fill(0);
  state.usedWordIds.clear();
  state.currentRound = 0;
  state.currentClueRound = 0;
  
  state.primaryPlayer = 0;
  state.currentPlayer = 0;
  
  state.roundWordsCompleted = 0;
  state.gameOver = false;
  state.paused = false;
  state.selectedGuessCategory = "";
  state.guessedWordParts = [];
  state.guessedCategory = false;
  state.revealType = "initial";

  // Ocultar siempre el panel de configuración al empezar la partida
  $("config-panel")?.classList.add("hidden");

  moveHeaderControlsToGame();
  $("screen-start")?.classList.add("hidden");
  $("screen-game")?.classList.remove("hidden");
  renderBoard();
  startComputerReveal("initial");
}
