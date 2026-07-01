import { createScript } from "./helpFunctions.js";

export default function reviews() {
  const block = document.querySelector("#myReviews__block-widget");

  if (block) {
    const options = {
      root: null,
      rootMargin: "0px",
      scrollMargin: "0px",
      threshold: 0.01,
    };

    function callback(entries, observer) {
      entries.forEach((entry) => {
        const target = entry.target;

        if (entry.isIntersecting) {
          createScript(
            "https://myreviews.dev/widget/dist/blockWidget.js",
            "text/javascript",
          ).then(() => myReviewsInit());

          observer.unobserve(target);
        }
      });
    }

    function myReviewsInit() {
      new window.myReviews.BlockWidget({
        uuid: "f61ece72-684a-434d-be6e-2e31df4992de",
        name: "g1218745",
        additionalFrame: "none",
        lang: "ru",
        widgetId: "1",
      }).init();
    }

    const observer = new IntersectionObserver(callback, options);

    observer.observe(block);
  }
}
