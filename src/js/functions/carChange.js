import { createEl } from "./helpFunctions.js";

export default function carChange() {
  const carSliders = document.querySelectorAll(".s-car__slider");
  const thumbOptions = {
    speed: 900,
    spaceBetween: 10,
    slidesPerView: 3,
    breakpoints: {
      1365: {
        spaceBetween: 25,
        slidesPerView: 4,
      },
      992: {
        spaceBetween: 20,
        slidesPerView: 3,
      },
      768: {
        spaceBetween: 20,
        slidesPerView: 4,
      },
    },
  };

  if (carSliders.length) {
    carSliders.forEach((slider) => {
      const gallery = slider.closest(".s-car__gallery");
      const thumbSlider = gallery.querySelector(".s-car__thumb-slider");

      const thumbSwiper = new Swiper(thumbSlider, thumbOptions);

      const swiper = new Swiper(slider, {
        speed: 900,
        spaceBetween: 20,
        autoplay: {
          delay: 6500,
        },
        thumbs: {
          swiper: thumbSlider,
        },
        scrollbar: {
          el: gallery.querySelector(".slider-scrollbar"),
          draggable: true,
        },
      });
    });
  }

  function initSlider(gallery) {
    const slider = gallery.querySelector(".s-car__slider");
    const thumbSlider = gallery.querySelector(".s-car__thumb-slider");

    const thumbSwiper = new Swiper(thumbSlider, thumbOptions);

    const swiper = new Swiper(slider, {
      speed: 900,
      spaceBetween: 20,
      autoplay: {
        delay: 6500,
      },
      thumbs: {
        swiper: thumbSlider,
      },
      scrollbar: {
        el: gallery.querySelector(".slider-scrollbar"),
        draggable: true,
      },
    });

    gallery.classList.remove("_hide");
  }

  const variationItems = document.querySelectorAll(".s-car .variation-item");
  const variationItemsColor = document.querySelectorAll(
    ".s-car .variation-item.toggle-color",
  );

  if (variationItems.length) {
    variationItems.forEach((varItem) => {
      varItem.addEventListener("click", () => {
        const currentVariations = varItem
          .closest(".variation-wrap")
          .querySelectorAll(".variation-item");
        const currentGallery = document.querySelector(
          ".s-car__main [data-car-tab]._active .s-car__gallery",
        );
        const variationName = varItem
          .closest(".s-car__variation")
          .querySelector(".variation-name");
        variationName.textContent = varItem.dataset.name;
        const images = varItem.dataset.gallery?.split(",");

        currentVariations.forEach((v) => v.classList.remove("_active"));
        varItem.classList.add("_active");

        if (images && images.length) {
          reinitGallery(currentGallery, images);
        }
      });
    });

    function reinitGallery(gallery, images) {
      gallery.classList.add("_hide");
      setTimeout(() => {
        gallery.innerHTML = "";
        const fancyboxId = gallery.closest("[data-car-tab]").dataset.carTab;

        const carSlider = createEl("div", "swiper s-car__slider");
        const carSliderWrapper = createEl("div", "swiper-wrapper");
        const carThumbSlider = createEl("div", "swiper s-car__thumb-slider");
        const carThumbSliderWrapper = createEl("div", "swiper-wrapper");
        const sliderScrollbar = createEl("div", "slider-scrollbar");

        images.forEach((img) => {
          const slide = createEl("a", "swiper-slide s-car__slide");
          slide.setAttribute("data-fancybox", fancyboxId);
          slide.href = img;
          slide.innerHTML = `<img src="${img}" alt="image" />`;
          carSliderWrapper.appendChild(slide);

          const thumbSlide = createEl("a", "swiper-slide s-car__thumb-slide");
          thumbSlide.style = `background: url('${img}') center / cover no-repeat;`;
          carThumbSliderWrapper.appendChild(thumbSlide);
        });

        carSlider.appendChild(carSliderWrapper);
        gallery.appendChild(carSlider);

        carThumbSlider.appendChild(carThumbSliderWrapper);
        gallery.appendChild(carThumbSlider);

        gallery.appendChild(sliderScrollbar);
        initSlider(gallery);
      }, 200);
    }
  }

  if (variationItemsColor.length) {
    variationItemsColor.forEach((varItem) => {
      varItem.addEventListener("click", () => {
        const parent = varItem.closest(".tabs");
        const tabId = varItem.dataset.tabBtn;
        const tab = parent
          .querySelector(`.tabs-content`)
          .querySelector(`[data-tab="${tabId}"]`);

        const firstVariation = tab.querySelector(".variation-item");
        firstVariation.click();
      });
    });
  }

  const buttonsTab = document.querySelectorAll("[data-car-tab-btn]");

  if (buttonsTab.length) {
    const allTabs = document.querySelectorAll("[data-car-tab]");
    buttonsTab.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.carTabBtn;

        if (id) {
          buttonsTab.forEach((b) => b.classList.remove("_active"));
          btn.classList.add("_active");
          handleOpen(id);
        }
      });
    });

    function handleOpen(id) {
      const tabs = document.querySelectorAll(`[data-car-tab="${id}"]`);

      allTabs.forEach((tab) => {
        tab.classList.remove("_show");
        setTimeout(() => {
          tab.classList.remove("_active");
        }, 150);
      });

      tabs.forEach((tab) => {
        setTimeout(() => {
          tab.classList.add("_active");
          setTimeout(() => {
            tab.classList.add("_show");
          }, 150);
        }, 150);
      });
    }
  }
}
