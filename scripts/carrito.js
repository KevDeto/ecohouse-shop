document.addEventListener("DOMContentLoaded", iniciarCarrito);

function iniciarCarrito() {
  renderizarSeccionCarrito();
  actualizarContadorCarritoEnHeader();
}

function obtenerCarritoDesdeLocalStorage() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarritoEnLocalStorage(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function renderizarSeccionCarrito() {
  const seccionCarrito = document.getElementById("seccion-carrito");
  const carrito = obtenerCarritoDesdeLocalStorage();
  seccionCarrito.innerHTML = "";

  if (carrito.length === 0) {
    seccionCarrito.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío.</p>`;
    return;
  }

  const contenedor = document.createElement("div");
  contenedor.className = "contenedor-carrito";

  const columnaIzquierda = crearColumnaIzquierda(carrito);
  const columnaDerecha = crearColumnaDerecha(carrito);

  contenedor.appendChild(columnaIzquierda);
  contenedor.appendChild(columnaDerecha);

  const contenedorBtnVaciar = crearBotonVaciar();

  seccionCarrito.appendChild(contenedor);
  seccionCarrito.appendChild(contenedorBtnVaciar);

  configurarBotonVaciar();
}

function crearBotonVaciar() {
  const contenedor = document.createElement("div");
  contenedor.className = "contenedor-btn-vaciar";

  const btnVaciar = document.createElement("button");
  btnVaciar.textContent = "Vaciar carrito";
  btnVaciar.className = "btn-vaciar";

  contenedor.appendChild(btnVaciar);
  return contenedor;
}

function configurarBotonVaciar() {
  const btnVaciar = document.querySelector(".btn-vaciar");
  if (btnVaciar) {
    btnVaciar.addEventListener("click", vaciarCarrito);
  }
}

function crearColumnaIzquierda(carrito) {
  const contenedorIzq = document.createElement("div");
  contenedorIzq.className = "carrito-izquierda";

  carrito.forEach((producto, index) => {
    const item = document.createElement("div");
    item.className = "item-carrito";

    item.innerHTML = `
      <div class="item-detalle">
        <img src="${producto.thumbnail}" class="img-carrito" alt="${producto.title}" />
        <div class="nombre-cantidad">
          <strong>${producto.title}</strong>
          <span>Cantidad: ${producto.cantidad}</span>
        </div>
      </div>
      <div class="item-precio-eliminar">
        <p>$${producto.price}</p>      
        <button class="btn-eliminar-item" data-index="${index}">Eliminar</button>
      </div>
    `;

    contenedorIzq.appendChild(item);
  });

  return contenedorIzq;
}

function crearColumnaDerecha(carrito) {
  const contenedorDer = document.createElement("div");
  contenedorDer.className = "carrito-derecha";

  const subtotal = carrito.reduce((acumulador, item) => acumulador + item.price * item.cantidad, 0);

  const totalDescuento = carrito.reduce((acumulador, item) => {
    const descuentoUnidad = (item.price * (item.discountPercentage || 0)) / 100;
    return acumulador + descuentoUnidad * item.cantidad;
  }, 0);

  const precioFinal = subtotal - totalDescuento;

  contenedorDer.innerHTML = `
    <h2>Resumen de compra</h2>
    <h3>Subtotal: $${subtotal.toFixed(2)}</h3>
    <h3>Descuentos: -$${totalDescuento.toFixed(2)}</h3>
    <h3>Precio final: $${precioFinal.toFixed(2)}</h3>
    <button class="btn-comprar">Comprar</button>
  `;

  setTimeout(() => {
    document.querySelectorAll(".btn-eliminar-item").forEach((btn) => btn.addEventListener("click", eliminarProducto));
    document.querySelector(".btn-comprar")?.addEventListener("click", comprar);
  });

  return contenedorDer;
}

function eliminarProducto(e) {
  const index = parseInt(e.target.dataset.index);
  const carrito = obtenerCarritoDesdeLocalStorage();
  carrito.splice(index, 1);
  guardarCarritoEnLocalStorage(carrito);
  renderizarSeccionCarrito();
  actualizarContadorCarrito();
}

function vaciarCarrito() {
  Swal.fire({
    title: "¿Vaciar carrito?",
    text: "Se eliminarán todos los productos.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, vaciar",
    cancelButtonText: "Cancelar",
    customClass: {
      popup: "alerta-vaciar",
      title: "alerta-titulo",
      confirmButton: "alerta-boton",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("carrito");
      renderizarSeccionCarrito();
      actualizarContadorCarrito();
      Swal.fire("Carrito vaciado", "", "success");
    }
  });
}

function comprar() {
  Swal.fire({
    title: "¡Compra realizada!",
    text: "Gracias por tu compra. Serás redirigido al inicio.",
    icon: "success",
    confirmButtonText: "Aceptar",
    customClass: {
      popup: "alerta-comprar",
      title: "alerta-titulo",
      confirmButton: "alerta-boton",
    },
  }).then(() => {
    localStorage.removeItem("carrito");
    actualizarContadorCarrito();
    window.location.href = "../index.html";
  });
}

function actualizarContadorCarritoEnHeader() {
  const carrito = obtenerCarrito();
  const totalItems = carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0);
  const contador = document.querySelector(".cantidad-productos-carrito");
  if (contador) contador.textContent = totalItems;
}
