document.addEventListener("DOMContentLoaded", function () {
  const swiperHome = new Swiper(".seccion-carrusel-home .swiper", {
    slidesPerView: 1,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});
