 

var paginaActual = 1;
var productosPorPagina = 10;
var productosFiltrados = [];
var categoriaSeleccionada = "todos";

// BUSCAR Y FILTRAR PRODUCTOS
function buscarProducto() {

    var texto = document.getElementById("buscar").value.toLowerCase().trim();

    var productos = document.getElementsByClassName("tarjeta");

    productosFiltrados = [];

    for (var i = 0; i < productos.length; i++) {

        var nombre = productos[i].innerText.toLowerCase();

        var categoria = productos[i].getAttribute("data-categoria").toLowerCase();

        var coincideNombre = nombre.indexOf(texto) !== -1;

        var coincideCategoria = categoriaSeleccionada === "todos" ||
                                categoria === categoriaSeleccionada;

        if (coincideNombre && coincideCategoria) {
            productosFiltrados.push(productos[i]);
        }
    }

    paginaActual = 1;
    mostrarPagina();
}


// MOSTRAR PRODUCTOS POR PAGINA
function mostrarPagina() {

    var productos = document.getElementsByClassName("tarjeta");

    for (var i = 0; i < productos.length; i++) {
        productos[i].style.display = "none";
    }

    var inicio = (paginaActual - 1) * productosPorPagina;
    var fin = inicio + productosPorPagina;

    for (var i = inicio; i < fin && i < productosFiltrados.length; i++) {
        productosFiltrados[i].style.display = "";
    }

    var totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

    var botones = document.getElementById("paginacion");

    botones.innerHTML = "";

    for (var i = 1; i <= totalPaginas; i++) {

        botones.innerHTML +=
            '<button onclick="cambiarPagina(' + i + ')">' + i + '</button>';
    }
}


// CAMBIAR DE PAGINA
function cambiarPagina(numero) {

    paginaActual = numero;
    mostrarPagina();
}


// ORDENAR PRODUCTOS ALFABETICAMENTE
function ordenarProductos() {

    var productos = document.getElementsByClassName("tarjeta");

    var lista = Array.from(productos);

    lista.sort(function(a, b) {

        var nombreA = a.querySelector("h3").innerText.toLowerCase();
        var nombreB = b.querySelector("h3").innerText.toLowerCase();

        return nombreA.localeCompare(nombreB, "es");
    });

    var contenedor = document.querySelector(".productos");

    lista.forEach(function(producto) {
        contenedor.appendChild(producto);
    });
}


// FILTRAR POR CATEGORIAS
function filtrarCategoria(categoria) {

    categoriaSeleccionada = categoria;
    buscarProducto();
}


// MOSTRAR TODOS LOS PRODUCTOS
function mostrarTodos() {

    categoriaSeleccionada = "todos";
    buscarProducto();
}


// INICIAR LA PAGINA
window.onload = function() {

    ordenarProductos();

    var productos = document.getElementsByClassName("tarjeta");

    productosFiltrados = Array.from(productos);

    mostrarPagina();
};
