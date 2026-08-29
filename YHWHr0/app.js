// app.js - Lógica actualizada con nuevas dinámicas

let config = {
  jugadores: [],
  idioma: 'es',
  tiempoPorTurno: 30
};

let estadoJuego = {
  palabraActual: null,
  jugadorActualIndex: 0,
  nivelPista: 0, // 0: Sin pista, 1: Pista de palabra, 2: Vocales
  tiempoRestante: 0,
  timerInterval: null,
  puntuaciones: {}
};

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {
  inicializarEventos();
  cargarTextoIdioma();
});

function inicializarEventos() {
  const btnRevelarPista = document.getElementById('btn-revelar-pista');
  if (btnRevelarPista) {
    btnRevelarPista.addEventListener('click', manejarRevelarPista);
  }
}

function cargarTextoIdioma() {
  // Carga los textos según config.idioma usando los archivos texto-*.js
  if (window.textos && window.textos[config.idioma]) {
    const t = window.textos[config.idioma];
    // Asignación de textos UI sin modificar estructura DOM
  }
}

function iniciarNuevaRonda() {
  estadoJuego.nivelPista = 0;
  actualizarVistaPistas();
  
  // Seleccionar palabra aleatoria según vocabulario del idioma actual
  const listaPalabras = window.palabras ? window.palabras[config.idioma] : [];
  if (!listaPalabras || listaPalabras.length === 0) return;

  const indiceAleatorio = Math.floor(Math.random() * listaPalabras.length);
  estadoJuego.palabraActual = listaPalabras[indiceAleatorio];

  // Renderizar subcategorías en lugar de categorías fijas
  renderizarOpcionesSubcategorias(estadoJuego.palabraActual);
  reiniciarTemporizador();
}

function renderizarOpcionesSubcategorias(palabraObjeto) {
  const contenedorOpciones = document.getElementById('contenedor-categorias');
  if (!contenedorOpciones) return;

  contenedorOpciones.innerHTML = '';
  
  // Obtener subcategorías disponibles en la base de datos de palabras
  const todasLasPalabras = window.palabras[config.idioma] || [];
  const subcategoriasSet = new Set();
  
  // Incluir la subcategoría correcta de la palabra actual
  subcategoriasSet.add(palabraObjeto.subcategoria);

  // Completar con otras subcategorías como distractores
  todasLasPalabras.forEach(p => {
    if (p.subcategoria) subcategoriasSet.add(p.subcategoria);
  });

  const subcategoriasArray = Array.from(subcategoriasSet);
  // Mezclar opciones
  subcategoriasArray.sort(() => Math.random() - 0.5);

  // Crear elementos visuales utilizando las mismas clases CSS existentes
  subcategoriasArray.forEach(subcat => {
    const btn = document.createElement('button');
    btn.className = 'btn-opcion-categoria'; // Mantiene clases estéticas originales
    btn.textContent = subcat;
    btn.onclick = () => verificarRespuesta(subcat);
    contenedorOpciones.appendChild(btn);
  });
}

function manejarRevelarPista() {
  if (estadoJuego.nivelPista < 2) {
    estadoJuego.nivelPista++;
    actualizarVistaPistas();
  }
}

function actualizarVistaPistas() {
  const elemPistaTexto = document.getElementById('pista-texto');
  const elemPistaVocales = document.getElementById('pista-vocales');

  if (!estadoJuego.palabraActual) {
    if (elemPistaTexto) elemPistaTexto.textContent = '';
    if (elemPistaVocales) elemPistaVocales.textContent = '';
    return;
  }

  // Nivel 0: Inicialmente no hay pista
  if (estadoJuego.nivelPista === 0) {
    if (elemPistaTexto) elemPistaTexto.textContent = '---';
    if (elemPistaVocales) elemPistaVocales.textContent = '';
  }
  // Nivel 1: Revela primero la pista de la palabra
  else if (estadoJuego.nivelPista === 1) {
    if (elemPistaTexto) {
      elemPistaTexto.textContent = estadoJuego.palabraActual.pista || '';
    }
  }
  // Nivel 2: Revela las vocales
  else if (estadoJuego.nivelPista === 2) {
    if (elemPistaVocales) {
      const vocales = obtenerVocales(estadoJuego.palabraActual.palabra);
      elemPistaVocales.textContent = `Vocales: ${vocales.join(', ')}`;
    }
  }
}

function obtenerVocales(palabra) {
  const coincidencias = palabra.match(/[aeiouáéíóú]/gi);
  return coincidencias ? [...new Set(coincidencias.map(v => v.toLowerCase()))] : [];
}

function reiniciarTemporizador() {
  clearInterval(estadoJuego.timerInterval);
  estadoJuego.tiempoRestante = config.tiempoPorTurno;
  actualizarRelojUI();

  estadoJuego.timerInterval = setInterval(() => {
    estadoJuego.tiempoRestante--;
    actualizarRelojUI();

    if (estadoJuego.tiempoRestante <= 0) {
      pasarSiguienteTurnoPorTiempo();
    }
  }, 1000);
}

function pasarSiguienteTurnoPorTiempo() {
  // Si se acaba el tiempo, revela siguiente nivel de pista y cambia de jugador
  manejarRevelarPista();
  pasarAlProximoJugador();
}

function pasarAlProximoJugador() {
  if (config.jugadores.length > 0) {
    estadoJuego.jugadorActualIndex = (estadoJuego.jugadorActualIndex + 1) % config.jugadores.length;
  }
  actualizarTurnoUI();
  reiniciarTemporizador();
}

function verificarRespuesta(subcategoriaSeleccionada) {
  if (subcategoriaSeleccionada === estadoJuego.palabraActual.subcategoria) {
    // Acierto: Sumar puntos al jugador actual e iniciar nueva ronda
    const jugadorActual = config.jugadores[estadoJuego.jugadorActualIndex];
    if (jugadorActual) {
      estadoJuego.puntuaciones[jugadorActual] = (estadoJuego.puntuaciones[jugadorActual] || 0) + 10;
    }
    iniciarNuevaRonda();
  } else {
    // Error: Pasa al siguiente jugador
    pasarAlProximoJugador();
  }
}

function actualizarRelojUI() {
  const elemTimer = document.getElementById('timer');
  if (elemTimer) {
    elemTimer.textContent = estadoJuego.tiempoRestante;
  }
}

function actualizarTurnoUI() {
  const elemJugador = document.getElementById('jugador-actual');
  if (elemJugador && config.jugadores.length > 0) {
    elemJugador.textContent = config.jugadores[estadoJuego.jugadorActualIndex];
  }
}