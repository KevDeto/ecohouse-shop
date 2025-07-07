document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);

document.addEventListener("DOMContentLoaded", iniciar);

function iniciar() {
  actualizarContadorCarrito();

  const seccionDetalle = document.getElementById("seccion-producto-detalles");
  if (!seccionDetalle) return;
  const id = obtenerIdProductoDesdeURL();
  if (!id) return mostrarError("Producto no encontrado.");

  const producto = buscarProductoEnCache(id);
  if (!producto) return mostrarError("Producto no encontrado en la caché.");

  renderizarProducto(producto);
}

function obtenerIdProductoDesdeURL() {
  const urlProducto = new URLSearchParams(window.location.search);
  return urlProducto.get("id");
}

function buscarProductoEnCache(id) {
  const nombreCache = Object.keys(localStorage).filter((nombre) => nombre.startsWith("cacheProducto_"));
  for (const nombreClave of nombreCache) {
    const datosDeCache = JSON.parse(localStorage.getItem(nombreClave));
    const productoEncontrado = datosDeCache.products.find((producto) => String(producto.id) === id);
    if (productoEncontrado) return productoEncontrado;
  }
  return null;
}

function renderizarProducto(producto) {
  const seccionProducto = document.getElementById("seccion-producto-detalles");

  const imagenesHTML = producto.images
    .filter((img) => !!img)
    .slice(0, 4)
    .map((img) => `<img src="${img}" alt="${producto.title}" class="miniatura-producto">`)
    .join("");

  seccionProducto.innerHTML = `
    <div class="contenedor-detalle-producto">
      <div class="contenedor-imagenes-producto">
        <div class="imagenes-disponibles-producto">
          ${imagenesHTML}
        </div>
        <div class="detalle-imagen-producto">
          <img id="imagen-principal" src="${producto.images[0]}" alt="${producto.title}" />
        </div>
      </div>

      <div class="detalle-info-producto">
        <h2 class="titulo-producto">${producto.title}</h2>
        <p class="precio-producto">$${producto.price}</p>
        <p class="descuento-producto">${producto.discountPercentage}% de descuento</p>

        <div class="cantidad-producto">
          <div class="cantidad">
            <button id="restar" class="btn-cantidad">-</button>
            <span id="cantidad" class="valor-cantidad">1</span>
            <button id="sumar" class="btn-cantidad">+</button>
          </div>
          <div class="boton-producto">
            <button id="btnAgregarCarrito" class="btn-agregar">Agregar al carrito</button>
          </div>
        </div>
        <p class="descripcion-producto">${producto.description || "Sin descripción disponible."}</p>
      </div>
    </div>
  `;

  configurarBotonesCantidad();
  configurarBotonAgregarAlCarrito(producto);
  configurarCambioImagenPrincipal();
}

function configurarBotonesCantidad() {
  const spanCantidad = document.getElementById("cantidad");
  const btnSumar = document.getElementById("sumar");
  const btnRestar = document.getElementById("restar");

  let cantidad = 1;

  btnSumar.addEventListener("click", () => {
    cantidad++;
    spanCantidad.textContent = cantidad;
  });

  btnRestar.addEventListener("click", () => {
    if (cantidad > 1) {
      cantidad--;
      spanCantidad.textContent = cantidad;
    }
  });
}

function configurarBotonAgregarAlCarrito(producto) {
  document.getElementById("btnAgregarCarrito").addEventListener("click", () => {
    const cantidad = parseInt(document.getElementById("cantidad").textContent, 10);

    if (cantidad <= 0) return alert("Ingrese una cantidad válida.");

    agregarAlCarrito(producto, cantidad);
  });
}

function agregarAlCarrito(producto, cantidad) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const index = carrito.findIndex((item) => item.id === producto.id);
  if (index >= 0) {
    carrito[index].cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  actualizarContadorCarrito();

  alertaAgregarCarrito();
}

function alertaAgregarCarrito() {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: "Producto agregado al carrito",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    customClass: {
      popup: "alerta-agregar-carrito",
    },
  });
}

function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const totalItems = carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0);
  const contadorItems = document.querySelector(".cantidad-productos-carrito");
  if (contadorItems) contadorItems.textContent = totalItems;
}

function mostrarError(mensaje) {
  document.getElementById("seccion-producto-detalles").innerHTML = `
    <p class="error">${mensaje}</p>
  `;
}

function configurarCambioImagenPrincipal() {
  const miniaturas = document.querySelectorAll(".miniatura-producto");
  const imagenPrincipal = document.getElementById("imagen-principal");

  miniaturas.forEach((miniatura) => {
    miniatura.addEventListener("click", () => {
      imagenPrincipal.src = miniatura.src;
      imagenPrincipal.alt = miniatura.alt;
    });
  });
}
