const TEXTS = {

    // General
    title: "🎯 Adivina la Palabra",
    subtitle: "Adivina la palabra y su categoría",

    // Configuración
    setupPlayersTitle: "1. ¿Cuántos jugadores?",
    setupCategoriesTitle: "2. Elige las categorías",
    categoriesInstruction:
        "Debes seleccionar exactamente <strong>{n}</strong> categorías.",
    selected: "Seleccionadas:",
    randomCategories: "🎲 Elegir al azar",
    startGame: "▶ Comenzar juego",

    onePlayer: "1 jugador",
    manyPlayers: "{n} jugadores",
    playerDescription: "Se jugará con {n} categorías.",

    // Juego
    turnLabel: "LE TOCA A",
    round: "Ronda",
    remainingWords: "Palabras restantes",

    hiddenCategory: "Categoría oculta",

    writeWord: "Escribe la palabra...",
    categoryQuestion: "¿A qué categoría pertenece?",
    checkAnswer: "✓ Comprobar respuesta",

    showHelp: "💡 Mostrar ayuda",
    newRound: "➡ Nueva ronda",

    // Estado de la partida
    tryWordAndCategory:
        "{player}, intenta adivinar la palabra y la categoría.",

    correct:
        "🎉 <strong>{player}</strong> acertó la palabra y la categoría.",

    incorrect:
        "❌ No es correcto.",

    wordCorrectCategoryWrong:
        "❌ La palabra es correcta, pero la categoría no.",

    wordWrongCategoryCorrect:
        "❌ La categoría es correcta, pero la palabra no.",

    nextPlayer:
        "{feedback} Ahora intenta {player}.",

    newClue:
        "💡 Nueva pista. Empieza {player}.",

    help: "Ayuda:",

    subcategory:
        "Subcategoría: {category}",

    wordWas:
        "🔎 La palabra era",

    category:
        "Categoría:",

    // Palabras adivinadas
    solvedTitle: "📚 Palabras adivinadas",

    noSolvedWords:
        "Ninguna palabra adivinada todavía.",

    // Marcador
    points: "puntos",

    // Configuración durante el juego
    changeConfiguration:
        "⚙ Cambiar configuración",

    // Fin
    gameFinished:
        "🏆 ¡Juego terminado!",

    playAgain:
        "🔄 Jugar nuevamente",

    // Validaciones
    selectCategories:
        "Debes seleccionar exactamente {n} categorías.",

    writeAWord:
        "Escribe una palabra.",

    selectCategory:
        "Selecciona también una categoría."
};


function t(key, variables = {}) {

    let text = TEXTS[key];

    if (text === undefined) {
        console.warn(`Texto no encontrado: ${key}`);
        return key;
    }

    Object.entries(variables).forEach(
        ([name, value]) => {

            text = text.replaceAll(
                `{${name}}`,
                value
            );

        }
    );

    return text;
}
