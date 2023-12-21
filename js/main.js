document.addEventListener('DOMContentLoaded', function () {


  let productos = [];
  const carrito = obtenerCarritoDesdeLocalStorage() || [];
  const listaCarrito = document.getElementById('lista-carrito');
  const totalCarritoElement = document.getElementById('total-carrito');
  const carritoContainer = document.getElementById('carrito');

  fetch("json/data.json")
    .then(response => response.json())
    .then(data => {
      productos = data;
      mostrarProductos(productos)
    })

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
    const productoSeleccionado = productos.find(producto => producto.id === idProducto);
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
    const productosPorCategoria = productos.filter(producto => producto.categoria === categoria);
    mostrarProductos(productosPorCategoria);
  };

  window.mostrarTodosLosProductos = function () {
    mostrarProductos(productos);
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
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#A8F576',
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: '¡Su compra ha sido realizada!'
    })
  };


  function obtenerCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : null;
  }

  function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }
  mostrarProductos(productos);
});

document.addEventListener("DOMContentLoaded", function () {
  var botonFlotante = document.getElementById('boton-flotante');
  var footer = document.querySelector('footer');
  window.addEventListener('scroll', function () {
    var scrollHeight = window.scrollY + window.innerHeight;
    var footerOffset = footer.offsetTop;
    if (scrollHeight > footerOffset) {
      botonFlotante.style.bottom = (scrollHeight - footerOffset + 20) + 'px';
    } else {
      botonFlotante.style.bottom = '20px';
    }
  });
});