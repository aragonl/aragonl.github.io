/* ==========================================================================
   APP.JS - LÓGICA PRINCIPAL DEL JUEGO DE PALABRAS
   ========================================================================== */

// --- ESTADO GLOBAL DE LA APLICACIÓN ---
let idiomaActual = 'es';
let categoriasSeleccionadas = [];
let palabrasPartida = [];
let indicePalabraActual = 0;
let puntos = 0;
let tiempoRestante = 60;
let temporizadorInterval = null;

// --- INICIALIZACIÓN DE LA APLICACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    inicializarJuego();
});

function inicializarJuego() {
    cargarCategoriasIniciales();
    configurarEventosUI();
}

// --- LÓGICA DE VALIDACIÓN Y FILTRADO DE CATEGORÍAS ---

/**
 * Verifica si una categoría cumple estrictamente la regla:
 * - Tener al menos 2 hijos (subcategorías de primer nivel).
 * - Que cada uno de esos 2 hijos tenga al menos 3 hijos/elementos (nietos / palabras).
 */
function esCategoriaValidaParaSeleccion(nodoCategoria) {
    if (!nodoCategoria || typeof nodoCategoria !== 'object') return false;

    // Obtener las claves de los hijos de primer nivel
    const hijosKeys = Object.keys(nodoCategoria);
    
    // Debe tener al menos 2 hijos
    if (hijosKeys.length < 2) return false;

    // Verificar que CADA hijo tenga al menos 3 nietos/elementos
    for (const claveHijo of hijosKeys) {
        const hijo = nodoCategoria[claveHijo];

        if (Array.isArray(hijo)) {
            // Si el hijo es una lista directa de palabras
            if (hijo.length < 3) return false;
        } else if (typeof hijo === 'object' && hijo !== null) {
            // Si el hijo es un objeto/subcategoría
            const nietosKeys = Object.keys(hijo);
            if (nietosKeys.length < 3) return false;
        } else {
            return false;
        }
    }

    return true;
}

/**
 * Muestra en la pantalla inicial únicamente las categorías
 * que cumplen con el criterio de 2 hijos y 3 nietos por hijo.
 */
function cargarCategoriasIniciales() {
    const contenedor = document.getElementById('categorias-container');
    if (!contenedor) return;

    contenedor.innerHTML = '';

    // WORD_DATA proviene del archivo de datos cargado (ej. palabras-es.js)
    if (typeof WORD_DATA === 'undefined') return;

    let categoriasValidasEncontradas = 0;

    Object.keys(WORD_DATA).forEach(nombreCategoria => {
        const nodo = WORD_DATA[nombreCategoria];

        if (esCategoriaValidaParaSeleccion(nodo)) {
            categoriasValidasEncontradas++;

            const label = document.createElement('label');
            label.className = 'categoria-option';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'categoria';
            checkbox.value = nombreCategoria;
            checkbox.checked = true;

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(` ${nombreCategoria}`));
            contenedor.appendChild(label);
        }
    });

    if (categoriasValidasEncontradas === 0) {
        contenedor.innerHTML = '<p>No se encontraron categorías válidas con la estructura requerida.</p>';
    }
}

/**
 * Aplatana recursivamente el árbol de categorías seleccionadas 
 * para extraer todas las palabras hojas disponibles.
 */
function obtenerPalabrasDeCategorias(listaCategorias) {
    let palabrasEncontradas = [];

    function aplanarNodo(nodo) {
        if (!nodo) return;

        if (typeof nodo === 'string') {
            palabrasEncontradas.push(nodo);
        } else if (Array.isArray(nodo)) {
            nodo.forEach(item => aplanarNodo(item));
        } else if (typeof nodo === 'object') {
            Object.values(nodo).forEach(subNodo => aplanarNodo(subNodo));
        }
    }

    listaCategorias.forEach(nombreCat => {
        if (WORD_DATA && WORD_DATA[nombreCat]) {
            aplanarNodo(WORD_DATA[nombreCat]);
        }
    });

    // Eliminar duplicados y espacios vacíos
    return Array.from(new Set(palabrasEncontradas)).filter(p => typeof p === 'string' && p.trim().length > 0);
}

// --- FLUJO Y LOGICA DEL JUEGO ---

function configurarEventosUI() {
    const btnComenzar = document.getElementById('btn-comenzar');
    if (btnComenzar) {
        btnComenzar.addEventListener('click', iniciarPartida);
    }

    const selectIdioma = document.getElementById('select-idioma');
    if (selectIdioma) {
        selectIdioma.addEventListener('change', (e) => {
            idiomaActual = e.target.value;
            cargarCategoriasIniciales();
        });
    }
}

function iniciarPartida() {
    const checkboxes = document.querySelectorAll('input[name="categoria"]:checked');
    categoriasSeleccionadas = Array.from(checkboxes).map(cb => cb.value);

    if (categoriasSeleccionadas.length === 0) {
        alert("Por favor, selecciona al menos una categoría.");
        return;
    }

    palabrasPartida = obtenerPalabrasDeCategorias(categoriasSeleccionadas);

    if (palabrasPartida.length === 0) {
        alert("No hay suficientes palabras válidas en las categorías seleccionadas.");
        return;
    }

    // Mezclar las palabras de forma aleatoria
    palabrasPartida.sort(() => Math.random() - 0.5);

    indicePalabraActual = 0;
    puntos = 0;
    tiempoRestante = 60;

    prepararPantallaJuego();
    iniciarTemporizador();
    mostrarPalabraActual();
}

function prepararPantallaJuego() {
    const pantallaInicio = document.getElementById('pantalla-inicio');
    const pantallaJuego = document.getElementById('pantalla-juego');

    if (pantallaInicio) pantallaInicio.style.display = 'none';
    if (pantallaJuego) pantallaJuego.style.display = 'block';
}

function mostrarPalabraActual() {
    const contenedorPalabra = document.getElementById('palabra-actual');
    if (!contenedorPalabra) return;

    if (indicePalabraActual < palabrasPartida.length) {
        contenedorPalabra.textContent = palabrasPartida[indicePalabraActual];
    } else {
        finalizarPartida();
    }
}

function iniciarTemporizador() {
    clearInterval(temporizadorInterval);
    const elementoTiempo = document.getElementById('tiempo-restante');

    temporizadorInterval = setInterval(() => {
        tiempoRestante--;
        if (elementoTiempo) elementoTiempo.textContent = tiempoRestante;

        if (tiempoRestante <= 0) {
            clearInterval(temporizadorInterval);
            finalizarPartida();
        }
    }, 1000);
}

function acertarPalabra() {
    puntos++;
    indicePalabraActual++;
    actualizarPuntaje();
    mostrarPalabraActual();
}

function saltarPalabra() {
    indicePalabraActual++;
    mostrarPalabraActual();
}

function actualizarPuntaje() {
    const elementoPuntos = document.getElementById('puntos-actuales');
    if (elementoPuntos) elementoPuntos.textContent = puntos;
}

function finalizarPartida() {
    clearInterval(temporizadorInterval);
    alert(`¡Juego terminado! Tu puntuación final es: ${puntos}`);

    const pantallaInicio = document.getElementById('pantalla-inicio');
    const pantallaJuego = document.getElementById('pantalla-juego');

    if (pantallaInicio) pantallaInicio.style.display = 'block';
    if (pantallaJuego) pantallaJuego.style.display = 'none';
}
