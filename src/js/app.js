import burger from "./functions/burger.js";
import buttonsNote from "./functions/buttonsNote.js";
import carChange from "./functions/carChange.js";
import changeModaltitle from "./functions/changeModalTitle.js";
import handlerSelect from "./functions/handlerSelect.js";
import inputmask from "./functions/inputmask.js";
import map from "./functions/map.js";
import mediaAdaptive from "./functions/mediaAdaptive.js";
import reviews from "./functions/reviews.js";
import sliders from "./functions/sliders.js";
import spoller from "./functions/spoller.js";
import tab from "./functions/tab.js";

document.addEventListener("DOMContentLoaded", () => {
  burger();
  sliders();
  changeModaltitle();
  buttonsNote();
  tab();
  inputmask();
  handlerSelect();
  map();
  carChange();
  spoller();
  mediaAdaptive();
  reviews();

  Fancybox.bind("[data-fancybox]", {
    closeButton: false,
    on: {
      destroy: (instance) => {
        const id = instance.getSlide().src;

        if (id.includes("#modal")) {
          const modal = document.querySelector(id);
          const inputNote = modal.querySelector(".input-note");
          const modalTitle = modal.querySelector(".modal__title[data-text]");

          if (inputNote) inputNote.value = "";
          if (modalTitle) modalTitle.textContent = modalTitle.dataset.text;
        }
      },
    },
  });

  // Fancybox.show([{ src: "#modal-feedback", type: "inline" }]);
});
