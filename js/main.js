document.addEventListener('DOMContentLoaded', function () {

  const datosProductos = [
    {
      id: 1,
      nombre: "Base jabón blanca",
      precio: 41000,
      categoria: "Base",
      imagen: "/images/base-jabón-blanca.jpg",
    },

    {
      id: 2,
      nombre: "Base jabón transparente",
      precio: 43000,
      categoria: "Base",
      imagen: "/images/base-jabón-transparente.jpg",
    },

    {
      id: 3,
      nombre: "Base acondicionador",
      precio: 56600,
      categoria: "Base",
      imagen: "/images/base-acondicionador.jpg",
    },

    {
      id: 4,
      nombre: "Base crema corporal",
      precio: 56600,
      categoria: "Base",
      imagen: "/images/base-crema-corporal.jpg",
    },

    {
      id: 5,
      nombre: "Base shampoo",
      precio: 54600,
      categoria: "Base",
      imagen: "/images/base-shampoo.jpg",
    },

    {
      id: 6,
      nombre: "Color amarillo",
      precio: 8300,
      categoria: "Pigmento",
      imagen: "/images/color-amarillo.jpg",
    },

    {
      id: 7,
      nombre: "Color azul",
      precio: 8300,
      categoria: "Pigmento",
      imagen: "/images/color-azul.jpg",
    },

    {
      id: 8,
      nombre: "Color cyan",
      precio: 8300,
      categoria: "Pigmento",
      imagen: "/images/color-cyan.jpg",
    },

    {
      id: 9,
      nombre: "Color café",
      precio: 8300,
      categoria: "Pigmento",
      imagen: "/images/color-café.jpg",
    },

    {
      id: 10,
      nombre: "Color rojo",
      precio: 8300,
      categoria: "Pigmento",
      imagen: "/images/color-rojo.jpg",
    },

    {
      id: 11,
      nombre: "Color fucsia",
      precio: 8300,
      categoria: "Pigmento",
      imagen: "/images/color-fucsia.jpg",
    },

    {
      id: 12,
      nombre: "Color negro",
      precio: 8300,
      categoria: "Pigmento",
      imagen: "/images/color-negro.jpg",
    },

    {
      id: 13,
      nombre: "Caléndula",
      precio: 4500,
      categoria: "Ingredientes",
      imagen: "/images/caléndula.jpg",
    },

    {
      id: 14,
      nombre: "Lavanda",
      precio: 4500,
      categoria: "Ingredientes",
      imagen: "/images/lavanda.jpg",
    },

    {
      id: 15,
      nombre: "Manzanilla",
      precio: 4500,
      categoria: "Ingredientes",
      imagen: "/images/manzanilla.jpg",
    },

    {
      id: 16,
      nombre: "Menta",
      precio: 4500,
      categoria: "Ingredientes",
      imagen: "/images/menta.jpg",
    },

    {
      id: 17,
      nombre: "Romero",
      precio: 4500,
      categoria: "Ingredientes",
      imagen: "/images/romero.jpg",
    },

    {
      id: 18,
      nombre: "Rosas",
      precio: 4500,
      categoria: "Ingredientes",
      imagen: "/images/rosas.jpg",
    },

    {
      id: 19,
      nombre: "Sal del Himalaya",
      precio: 4500,
      categoria: "Ingredientes",
      imagen: "/images/sal-del-himalaya.jpg",
    },
  ];

  const carrito = obtenerCarritoDesdeLocalStorage() || [];
  const listaCarrito = document.getElementById('lista-carrito');
  const totalCarritoElement = document.getElementById('total-carrito');
  const carritoContainer = document.getElementById('carrito');


  function mostrarProductos(productos) {
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = '';

    productos.forEach(producto => {
      const elementoProducto = document.createElement('div');
      elementoProducto.classList.add('producto');
      elementoProducto.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <button class="botonAgregar" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
      `;
      contenedor.appendChild(elementoProducto);
    });
  }

  function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let totalCarrito = 0;

    carrito.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `${item.nombre} - $${item.precio}
        <button class="botonAgregar" onclick="eliminarDelCarrito(${index})"> X </button>`;
      listaCarrito.appendChild(listItem);
      totalCarrito += item.precio;
      compraRojo.style.display = 'block';
    });

    totalCarritoElement.textContent = totalCarrito;
    guardarCarritoEnLocalStorage();
  }

  function mostrarCarrito() {
    carritoContainer.style.display = 'block';
  }

  function ocultarCarrito() {
    carritoContainer.style.display = 'none';
  }

  window.mostrarCarrito = mostrarCarrito;
  window.ocultarCarrito = ocultarCarrito;

  window.agregarAlCarrito = function (idProducto) {
    const productoSeleccionado = datosProductos.find(producto => producto.id === idProducto);
    carrito.push(productoSeleccionado);
    actualizarCarrito();
  };

  window.eliminarDelCarrito = function (index) {
    carrito.splice(index, 1);
    actualizarCarrito();
    if (index === (0)) {
      compraRojo.style.display = 'none';
    }
  };

  window.limpiarCarrito = function () {
    carrito.length = 0;
    compraRojo.style.display = 'none';
    actualizarCarrito();
  };

  window.mostrarProductosPorCategoria = function (categoria) {
    const productosPorCategoria = datosProductos.filter(producto => producto.categoria === categoria);
    mostrarProductos(productosPorCategoria);
  };

  window.mostrarTodosLosProductos = function () {
    mostrarProductos(datosProductos);
  };

  window.mostrarResumenCompra = function () {
    const resumenCarrito = document.getElementById('resumen-carrito');
    const totalResumenElement = document.getElementById('total-resumen');
    const modal = document.getElementById('modal');
    const modalContenido = document.querySelector('.modal-contenido');

    resumenCarrito.innerHTML = '';
    let totalResumen = 0;

    carrito.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.nombre} - $${item.precio}`;
      resumenCarrito.appendChild(listItem);
      totalResumen += item.precio;
    });

    totalResumenElement.textContent = totalResumen;

    modal.style.display = 'block';

    window.onclick = function (event) {
      if (event.target === modal) {
        cerrarModal();
      }
    };
  };

  window.cerrarModal = function () {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
  };

  window.realizarCompra = function () {
    limpiarCarrito();
    cerrarModal();
    alert('¡Su compra ha sido realizada!');
  };


  function obtenerCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : null;
  }

  function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  mostrarProductos(datosProductos);
});
