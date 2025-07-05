document.addEventListener("DOMContentLoaded", function () {
  const swiperHome = new Swiper(".seccion-carrusel-home .swiper", {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 4000,
    },
    pagination: {
      el: ".seccion-carrusel-home .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".seccion-carrusel-home .swiper-button-next",
      prevEl: ".seccion-carrusel-home .swiper-button-prev",
    },
  });
});

/* document.addEventListener("DOMContentLoaded", function () {
  const swiperDescuentos = new Swiper(".seccion-carrusel-descuentos .swiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".seccion-carrusel-descuentos .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".seccion-carrusel-descuentos .swiper-button-next",
      prevEl: ".seccion-carrusel-descuentos .swiper-button-prev",
    },
  });
}); */