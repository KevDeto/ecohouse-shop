### Proyecto de fin de curso - ecommerce

**Consigna**

Desarrollar una página web completa, que combine todos los conocimientos adquiridos a lo largo del curso.
El proyecto consistirá en la creación de un sitio web de e-commerce dinámico e interactivo, que consuma datos de una API REST para mostrar productos, y permita a los usuarios añadir productos a un carrito de compras.

**Caracteristicas del proyecto**
+ Se utilizo Swiper para productos en descuento.
+ Se utilizo SweetAlert2 para personalizar alertas.
+ Se consumio la API [DummyJSON](https://dummyjson.com/) para renderizar dinamicamente tarjetas de productos (proximamente contara con otra api).
+ Se utilizo localStorage para guardar los productos del carrito de forma persistente.
+ Se utilizo renderizado dinamico (consultando el localStorage) para la pagina del carrito.
+ Se agregaron los botones "vaciar carrito", "eliminar" y "comprar" que eliminan (mediante removeItem) productos del localStorage.
+ Se agrego un apartado de "contacto"
+ Se agregaron categorias de productos (funcional pero no modificadas para coincidir con productos de la api DummyJSON)
+ Se agrego un apartado para ver a detalle el producto y elegir la cantidad que se agregara al carrito

**Tecnologías utilizadas**
+ HTML5
+ CSS3 (con Flexbox y Grid)
+ JavaScript
+ Swiper.js
+ SweetAlert2

**Instalación local**

No se requiere instalación especial ya que es un proyecto frontend estático:

1. Clona el repositorio:
```
git clone https://github.com/KevDeto/ecohouse-shop.git
```
2. Abre el archivo **index.html** en tu navegador.

**Despliegue**

El proyecto está desplegado en GitHub Pages:

[ecohouse-shop](https://kevdeto.github.io/ecohouse-shop/)
