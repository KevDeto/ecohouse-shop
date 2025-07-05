let productos = [
  /*   {
    "nombre": "nombre 1",
    "precio": "precio 1",
    "cantCuotas": "cantCuotas 1",
    "precioCuotas": "precioCuotas 1",
    "imagen": [
      "https://res.cloudinary.com/dljovimrs/image/upload/v1751000640/lampara1_jodovk.webp",
      "https://res.cloudinary.com/dljovimrs/image/upload/v1751000642/lampara2_gqxjri.webp",
      "https://res.cloudinary.com/dljovimrs/image/upload/v1751000644/lampara3_u7wdal.webp",
      "https://res.cloudinary.com/dljovimrs/image/upload/v1751000647/lampara4_iqcj6m.webp"
    ],
    "categoria": "iluminacion",
    "estaEnDescuento": true,
    "descuento": "45",
    "id": "1"
  }*/
];

const categoriaUrl = new URLSearchParams(window.location.search);
const categoriaActual = categoriaUrl.get("categoria");

async function fetchProductos() {
  try {
    const nombreCache = `cacheProducto_${categoriaActual}`;
    const productosCacheados = localStorage.getItem(nombreCache);
    if (productosCacheados) {
      const jsonProductosCache = JSON.parse(productosCacheados);
      productos = jsonProductosCache.products;

      renderizarProductos(categoriaActual);
      return;
    }

    const response = await fetch(`https://dummyjson.com/products/category/${categoriaActual}`);
    const jsonProductos = await response.json();
    productos = jsonProductos.products;
    localStorage.setItem(nombreCache, JSON.stringify(jsonProductos));
    console.log(productos);

    renderizarProductos(categoriaActual);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    document.getElementById("seccion-productos").innerHTML = `
      <p class="error">No se pudieron cargar los productos. Intente recargar.</p>
    `;
  }
}

function renderizarProductos(categoria) {
  const productosFiltrados = productos.filter((producto) => producto.category === categoria);
  console.log(productosFiltrados)
  const seccion = document.getElementById("seccion-productos");

  seccion.innerHTML = "";

  const contenedor = document.createElement("div");
  contenedor.className = "contenedor-tarjetas";

  contenedor.innerHTML = productosFiltrados
    .map(
      (producto) => `
      <a href="../html/detalle.html?id=${producto.id}" class="tarjeta-producto-link">
        <div class="tarjeta-producto"> 
          <div class="contenedor-imagen">
            <img src="${producto.thumbnail}" alt="${producto.title}" class="imagen-producto">
            <span class="descuento-producto">${producto.discountPercentage}% OFF</span>
          </div>
          <div class="contenedor-informacion">
            <h3 class="titulo-producto">${producto.title}</h3>
            <p class="precio-producto">$${producto.price}</p>
            <p class="cuotas-producto">Cuotas: ${producto.cantCuotas}</p>
          </div>
        </div>
      </a>
    `
    )
    .join("");
  /* ${producto.discountPercentage ?   : ""}*/
  seccion.appendChild(contenedor);
}

document.addEventListener("DOMContentLoaded", fetchProductos);