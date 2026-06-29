export default function sliders() {
  const introSlider = document.querySelector(".s-intro__slider");

  if (introSlider) {
    const slides = introSlider.querySelectorAll(".swiper-slide");
    function updateHeightSlider() {
      const headerHeight = document.querySelector(".header").clientHeight;
      slides.forEach(
        (slide) =>
          (slide.style.minHeight = `${window.innerHeight - headerHeight}px`),
      );
    }
    updateHeightSlider();

    const swiper = new Swiper(introSlider, {
      speed: 900,
      autoplay: {
        delay: 7000,
      },
      pagination: {
        el: ".s-intro .slider-pagination",
        clickable: true,
      },
    });
  }

  const catalogSliders = document.querySelectorAll(".s-catalog__slider");

  if (catalogSliders.length) {
    catalogSliders.forEach((slider) => {
      const swiper = new Swiper(slider, {
        speed: 900,
        slidesPerView: "auto",
        spaceBetween: 30,
        autoplay: {
          delay: 6500,
        },
        scrollbar: {
          draggable: true,
          el: slider.closest("[data-tab]").querySelector(".slider-scrollbar"),
        },
        breakpoints: {
          1365: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      });
    });
  }

  const promoSlider = document.querySelector(".s-promo__slider");

  if (promoSlider) {
    const swiper = new Swiper(promoSlider, {
      speed: 900,
      slidesPerView: "auto",
      spaceBetween: 20,
      autoplay: {
        delay: 7000,
      },
      scrollbar: {
        draggable: true,
        el: ".s-promo .slider-scrollbar"
      },
      breakpoints: {
        768: {
          spaceBetween: 30
        }
      }
    });
  }
}
