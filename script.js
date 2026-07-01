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

