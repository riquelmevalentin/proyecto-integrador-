// USO DE ARRAYS: Colección de datos estática que simula el catálogo real de la chacra
const catalogoProductos = [
    { nombre: "Morrón", categoria: "Vegetales", disponible: "Primavera/Verano" },
    { nombre: "Tomate", categoria: "Vegetales", disponible: "Primavera/Verano" },
    { nombre: "Ají", categoria: "Vegetales", disponible: "Verano" },
    { nombre: "Zapallito Tronco", categoria: "Vegetales", disponible: "Primavera" },
    { nombre: "Calabaza", categoria: "Vegetales", disponible: "Otoño/Invierno" },
    { nombre: "Zapallo", categoria: "Vegetales", disponible: "Otoño" },
    { nombre: "Rúcula", categoria: "Verduras", disponible: "Todo el año" },
    { nombre: "Achicoria", categoria: "Verduras", disponible: "Todo el año" },
    { nombre: "Lechuga", categoria: "Verduras", disponible: "Todo el año" },
    { nombre: "Espinaca", categoria: "Verduras", disponible: "Otoño/Invierno" },
    { nombre: "Repollo", categoria: "Verduras", disponible: "Invierno" },
    { nombre: "Aromáticas", categoria: "Verduras", disponible: "Todo el año" },
    { nombre: "Naranja", categoria: "Frutas", disponible: "Invierno" },
    { nombre: "Pomelo", categoria: "Frutas", disponible: "Invierno/Primavera" },
    { nombre: "Limón", categoria: "Frutas", disponible: "Todo el año" },
    { nombre: "Tunas", categoria: "Frutas", disponible: "Verano" },
    { nombre: "Mandarina", categoria: "Frutas", disponible: "Otoño/Invierno" },
    { nombre: "Higos", categoria: "Frutas", disponible: "Verano/Otoño" },
    { nombre: "Gallinas Ponedoras", categoria: "Aves", disponible: "Todo el año" },
    { nombre: "Pollos parrileros", categoria: "Aves", disponible: "Todo el año" },
    { nombre: "Patos", categoria: "Aves", disponible: "Primavera" },
    { nombre: "Cerdo", categoria: "Porcino", disponible: "Todo el año" }
];

// Esperamos a que todo el DOM esté completamente cargado (Buenas prácticas de ciclo de vida)
document.addEventListener("DOMContentLoaded", () => {
    // Inicializamos los componentes interactivos de la página
    inicializarBuscador();
    
    // Escuchador de Eventos para el Formulario de Contacto (Evento 1: submit)
    const formulario = document.querySelector("#Contactanos form");
    if (formulario) {
        formulario.addEventListener("submit", validarFormulario);
    }
});

/**
 USO DE FUNCIONES (Función 1)
 Crea e inyecta la interfaz del buscador dinámico dentro de la sección de Producción.
 */
function inicializarBuscador() {
    const seccionProduccion = document.getElementById("Producción");
    if (!seccionProduccion) return;

    // MANIPULACIÓN DEL DOM (Acción A: Crear contenedor de búsqueda con estilos alineados)
    const contenedorBuscador = document.createElement("div");
    contenedorBuscador.id = "buscador-dinamico";
    contenedorBuscador.style.margin = "20px 0";
    contenedorBuscador.style.padding = "20px";
    contenedorBuscador.style.backgroundColor = "#f1f8e9"; 
    contenedorBuscador.style.borderRadius = "8px";
    contenedorBuscador.style.border = "2px solid #a5d6a7";

    // Subtítulo del recomendador interactivo
    const tituloBuscador = document.createElement("h3");
    tituloBuscador.textContent = "🔍 Buscador Inteligente de Disponibilidad Estacional";
    tituloBuscador.style.color = "#2e7d32";
    tituloBuscador.style.marginBottom = "15px";
    contenedorBuscador.appendChild(tituloBuscador);

    // Contenedor interno para los controles del formulario de filtrado
    const filaControles = document.createElement("div");
    filaControles.style.display = "flex";
    filaControles.style.gap = "15px";
    filaControles.style.flexWrap = "wrap";

    // Input de texto (Evento 2: input)
    const inputBuscar = document.createElement("input");
    inputBuscar.id = "inputBuscar";
    inputBuscar.type = "text";
    inputBuscar.placeholder = "Escribe un producto (ej: Tomate)...";
    inputBuscar.style.flex = "1";
    inputBuscar.style.minWidth = "200px";
    inputBuscar.style.padding = "10px";
    inputBuscar.style.borderRadius = "6px";
    inputBuscar.style.border = "1px solid #cccccc";
    
    // Menu desplegable de categorías (Evento 3: change)
    const selectCategoria = document.createElement("select");
    selectCategoria.id = "selectCategoria";
    selectCategoria.style.padding = "10px";
    selectCategoria.style.borderRadius = "6px";
    selectCategoria.style.border = "1px solid #cccccc";
    selectCategoria.style.backgroundColor = "white";

    const categorias = ["Todos", "Vegetales", "Verduras", "Frutas", "Aves", "Porcino"];
    categorias.forEach(cat => {
        const opcion = document.createElement("option");
        opcion.value = cat;
        opcion.textContent = cat;
        selectCategoria.appendChild(opcion);
    });

    // Contenedor exclusivo para renderizar los resultados filtrados
    const contenedorResultados = document.createElement("div");
    contenedorResultados.id = "contenedorResultados";
    contenedorResultados.style.marginTop = "20px";
    contenedorResultados.style.display = "grid";
    contenedorResultados.style.gridTemplateColumns = "repeat(auto-fit, minmax(240px, 1fr))";
    contenedorResultados.style.gap = "15px";

    // Acoplar inputs a la fila de controles
    filaControles.appendChild(inputBuscar);
    filaControles.appendChild(selectCategoria);
    contenedorBuscador.appendChild(filaControles);
    contenedorBuscador.appendChild(contenedorResultados);

    // Insertar el componente completo justo antes de la tabla estática existente
    const tablaOriginal = seccionProduccion.querySelector("table");
    seccionProduccion.insertBefore(contenedorBuscador, tablaOriginal);

    // Asignación de Escuchadores de Eventos modernos (No inline en el HTML)
    inputBuscar.addEventListener("input", renderizarProductos);
    selectCategoria.addEventListener("change", renderizarProductos);

    // Carga inicial para mostrar todo el catálogo al arrancar
    renderizarProductos();
}

/**
  USO DE FUNCIONES (Función 2)
  Filtrar el array de datos y actualizar el DOM de forma reactiva según lo que escribe/selecciona el usuario.
 */
function renderizarProductos() {
    const contenedor = document.getElementById("contenedorResultados");
    const filtroTexto = document.getElementById("inputBuscar").value.toLowerCase();
    const filtroCategoria = document.getElementById("selectCategoria").value;

    if (!contenedor) return;

    // MANIPULACIÓN DEL DOM (Acción B: Limpieza e inyección dinámica de elementos a listas/grids)
    contenedor.innerHTML = "";

    // Filtrado lógico sobre nuestro Array global
    const productosFiltrados = catalogoProductos.filter(producto => {
        const coincideTexto = producto.nombre.toLowerCase().includes(filtroTexto);
        const coincideCategoria = (filtroCategoria === "Todos") || (producto.categoria === filtroCategoria);
        return coincideTexto && coincideCategoria;
    });

    // Validacion de si la búsqueda quedó vacía para informar al usuario de inmediato
    if (productosFiltrados.length === 0) {
        const sinResultados = document.createElement("p");
        sinResultados.textContent = "No encontramos productos que coincidan con tu criterio actual.";
        sinResultados.style.color = "#bf360c";
        sinResultados.style.fontStyle = "italic";
        contenedor.appendChild(sinResultados);
        return;
    }

    // tarjetas visuales estilizadas por cada elemento coincidente
    productosFiltrados.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.style.backgroundColor = "white";
        tarjeta.style.border = "1px solid #e0e0e0";
        tarjeta.style.borderRadius = "8px";
        tarjeta.style.padding = "15px";
        tarjeta.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
        tarjeta.style.borderLeft = "4px solid #2e7d32"; // Borde verde temático representativo de la Chacra

        const nombreProd = document.createElement("h4");
        nombreProd.textContent = producto.nombre;
        nombreProd.style.color = "#2e7d32";
        nombreProd.style.margin = "0 0 5px 0";

        const detalleProd = document.createElement("p");
        detalleProd.innerHTML = `<strong>Categoría:</strong> ${producto.categoria}<br><strong>Época de producción:</strong> ${producto.disponible}`;
        detalleProd.style.fontSize = "0.9rem";
        detalleProd.style.color = "#555555";
        detalleProd.style.margin = "0";

        tarjeta.appendChild(nombreProd);
        tarjeta.appendChild(detalleProd);
        contenedor.appendChild(tarjeta);
    });
}

/**
  USO DE FUNCIONES (Función 3)
  VALIDACIÓN Y MANEJO DE ERRORES EXPLICITOS MEDIANTE TRY...CATCH
  Intercepta de envío del formulario de contacto y evalúa de manera estricta que no se envíen campos en blanco.
 */
function validarFormulario(event) {
    // Frenamos el envío y recarga automática estándar de los formularios HTML
    event.preventDefault();

    // Removemos notificaciones de error previas si existiesen
    const alertaPrevia = document.getElementById("alerta-validacion");
    if (alertaPrevia) alertaPrevia.remove();

    // Captura limpia de inputs utilizando trim() para remover espacios en blanco accidentales
    const nombre = document.getElementById("Nombre").value.trim();
    const email = document.getElementById("Email").value.trim();
    const comentarios = document.getElementById("Comentarios").value.trim();

    try {
        // Validación estricta paso a paso (Lanzamos excepciones controladas si algo falla)
        if (nombre === "") {
            throw new Error("El campo 'Nombre' es obligatorio para poder dirigirnos a vos.");
        }
        if (email === "") {
            throw new Error("El campo 'Email' es requerido para que podamos responder tu consulta.");
        }
        // Validación técnica complementaria para el formato correcto de correos
        if (!email.includes("@") || !email.includes(".")) {
            throw new Error("La estructura del correo electrónico ingresado no es válida. Debe incluir '@' y un dominio válido.");
        }
        if (comentarios === "") {
            throw new Error("Por favor, dejanos un comentario indicando qué productos te interesan.");
        }

        // Si el flujo pasa invicto el try, significa que los datos son 100% correctos
        alert(`¡Éxito! Muchas gracias ${nombre}. Recibimos tu consulta desde la Chacra. Nos comunicaremos a la brevedad.`);
        event.target.reset(); // Vaciamos los controles del formulario limpiamente

    } catch (error) {
        // Manejo controlado del error capturado: Generación visual de un banner de aviso en pantalla
        const bannerError = document.createElement("div");
        bannerError.id = "alerta-validacion";
        bannerError.textContent = `⚠ Error de Validación: ${error.message}`;
        
        // Estilización de advertencia integrada perfectamente con la estética del sitio
        bannerError.style.backgroundColor = "#ffebee";
        bannerError.style.color = "#c62828";
        bannerError.style.padding = "12px";
        bannerError.style.borderRadius = "6px";
        bannerError.style.marginBottom = "15px";
        bannerError.style.fontWeight = "600";
        bannerError.style.fontSize = "0.9rem";
        bannerError.style.border = "1px solid #ef9a9a";

        // Inyección dinámica arriba de los campos pero dentro del fieldset original
        const fieldset = event.target.querySelector("fieldset");
        const primerLabel = fieldset.querySelector("label");
        fieldset.insertBefore(bannerError, primerLabel);
    }
}
