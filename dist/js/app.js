(() => {
    "use strict";
    function burger() {
        const burger = document.querySelector("#burger");
        if (burger) {
            const burgerOpen = document.querySelector("#burger-open");
            const burgerClose = document.querySelector("#burger-close");
            const burgerOverlay = document.querySelector("#burger-overlay");
            const burgerAnchors = burger.querySelectorAll("a[href^='/#']");
            burgerAnchors.forEach(anchor => {
                anchor.addEventListener("click", () => {
                    handleClose();
                });
            });
            burgerOverlay.addEventListener("click", handleClose);
            burgerOpen.addEventListener("click", () => {
                handleOpen();
            });
            burgerClose.addEventListener("click", () => {
                handleClose();
            });
            function updateHeightBurger() {
                burger.style.maxHeight = `${window.visualViewport.height}px`;
            }
            function handleOpen() {
                document.body.classList.add("body-hidden");
                burger.classList.add("_open");
                burgerOverlay.classList.add("_active");
                updateHeightBurger();
            }
            function handleClose() {
                document.body.classList.remove("body-hidden");
                burger.classList.remove("_open");
                burgerOverlay.classList.remove("_active");
            }
            window.visualViewport.addEventListener("resize", updateHeightBurger);
            window.visualViewport.addEventListener("scroll", updateHeightBurger);
            updateHeightBurger();
        }
    }
    function buttonsNote() {
        const butons = document.querySelectorAll("[data-btn-note]");
        if (butons.length) {
            butons.forEach(btn => {
                btn.addEventListener("click", () => {
                    const selectorTarget = btn.dataset.targetNote;
                    const target = document.querySelector(selectorTarget);
                    const value = btn.dataset.btnNote;
                    if (target) {
                        target.value = value;
                    }
                });
            });
        }
    }
    function createScript(url, type) {
        if (!url) return;
        return new Promise((resolve, reject) => {
            const script = document.querySelector(`script[src="${url}"]`);
            if (script) {
                resolve(script);
            } else {
                const htmlScript = document.createElement("script");
                htmlScript.src = url;
                if (type) {
                    htmlScript.type = type;
                }
                htmlScript.onload = () => {
                    resolve(htmlScript);
                };
                htmlScript.onerror = () => {
                    reject(new Error(`Не удалось загрузить скрипт: ${url}`));
                };
                document.head.appendChild(htmlScript);
            }
        });
    }
    function slideUp(target, duration = 500, showmore = 0) {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout(() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }, duration);
        }
    }
    function slideDown(target, duration = 500, showmore = 0) {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout(() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }, duration);
        }
    }
    function createEl(tag, classes = "") {
        const item = document.createElement(tag);
        if (classes) {
            classes.split(" ").forEach(c => {
                item.classList.add(c);
            });
        }
        return item;
    }
    function carChange() {
        const carSliders = document.querySelectorAll(".s-car__slider");
        const thumbOptions = {
            speed: 900,
            spaceBetween: 10,
            slidesPerView: 3,
            breakpoints: {
                1365: {
                    spaceBetween: 25,
                    slidesPerView: 4
                },
                992: {
                    spaceBetween: 20,
                    slidesPerView: 3
                },
                768: {
                    spaceBetween: 20,
                    slidesPerView: 4
                }
            }
        };
        if (carSliders.length) {
            carSliders.forEach(slider => {
                const gallery = slider.closest(".s-car__gallery");
                const thumbSlider = gallery.querySelector(".s-car__thumb-slider");
                const thumbSwiper = new Swiper(thumbSlider, thumbOptions);
                const swiper = new Swiper(slider, {
                    speed: 900,
                    spaceBetween: 20,
                    autoplay: {
                        delay: 6500
                    },
                    thumbs: {
                        swiper: thumbSlider
                    },
                    scrollbar: {
                        el: gallery.querySelector(".slider-scrollbar"),
                        draggable: true
                    }
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
                    delay: 6500
                },
                thumbs: {
                    swiper: thumbSlider
                },
                scrollbar: {
                    el: gallery.querySelector(".slider-scrollbar"),
                    draggable: true
                }
            });
            gallery.classList.remove("_hide");
        }
        const variationItems = document.querySelectorAll(".s-car .variation-item");
        const variationItemsColor = document.querySelectorAll(".s-car .variation-item.toggle-color");
        if (variationItems.length) {
            variationItems.forEach(varItem => {
                varItem.addEventListener("click", () => {
                    const currentVariations = varItem.closest(".variation-wrap").querySelectorAll(".variation-item");
                    const currentGallery = document.querySelector(".s-car__main [data-car-tab]._active .s-car__gallery");
                    const variationName = varItem.closest(".s-car__variation").querySelector(".variation-name");
                    variationName.textContent = varItem.dataset.name;
                    const images = varItem.dataset.gallery?.split(",");
                    currentVariations.forEach(v => v.classList.remove("_active"));
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
                    images.forEach(img => {
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
            variationItemsColor.forEach(varItem => {
                varItem.addEventListener("click", () => {
                    const parent = varItem.closest(".tabs");
                    const tabId = varItem.dataset.tabBtn;
                    const tab = parent.querySelector(`.tabs-content`).querySelector(`[data-tab="${tabId}"]`);
                    const firstVariation = tab.querySelector(".variation-item");
                    firstVariation.click();
                });
            });
        }
        const buttonsTab = document.querySelectorAll("[data-car-tab-btn]");
        if (buttonsTab.length) {
            const allTabs = document.querySelectorAll("[data-car-tab]");
            buttonsTab.forEach(btn => {
                btn.addEventListener("click", () => {
                    const id = btn.dataset.carTabBtn;
                    if (id) {
                        buttonsTab.forEach(b => b.classList.remove("_active"));
                        btn.classList.add("_active");
                        handleOpen(id);
                    }
                });
            });
            function handleOpen(id) {
                const tabs = document.querySelectorAll(`[data-car-tab="${id}"]`);
                allTabs.forEach(tab => {
                    tab.classList.remove("_show");
                    setTimeout(() => {
                        tab.classList.remove("_active");
                    }, 150);
                });
                tabs.forEach(tab => {
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
    function changeModaltitle() {
        const buttons = document.querySelectorAll("[data-fancybox][data-modal-title]");
        if (buttons.length) {
            buttons.forEach(btn => {
                btn.addEventListener("click", () => {
                    const titleValue = btn.dataset.modalTitle;
                    if (titleValue) {
                        const selector = btn.getAttribute("href") || btn.dataset.src;
                        const modalTitle = document.querySelector(selector).querySelector(".modal__title");
                        if (modalTitle) modalTitle.textContent = titleValue;
                    }
                });
            });
        }
    }
    function handlerSelect() {
        const selects = document.querySelectorAll(".select");
        if (selects.length) {
            document.body.addEventListener("click", () => {
                const openSelects = document.querySelectorAll(".select._open");
                if (openSelects.length) openSelects.forEach(s => s.classList.remove("_open"));
            });
            selects.forEach(select => {
                select.addEventListener("click", e => e.stopPropagation());
                const targetOptions = select.dataset.targetOptions;
                if (targetOptions) {
                    const selector = `data-${targetOptions}-options`;
                    const target = select.closest(`[${selector}]`);
                    if (target) {
                        const selectBody = select.querySelector(".select-body");
                        const options = target.getAttribute(selector);
                        const arrOptions = options.split(",");
                        arrOptions.forEach(option => {
                            const item = document.createElement("div");
                            item.classList.add("select-item");
                            item.textContent = option;
                            selectBody.appendChild(item);
                        });
                    }
                }
                const items = select.querySelectorAll(".select-item");
                const btn = select.querySelector(".select-btn");
                const input = select.querySelector(".select-input");
                btn.addEventListener("click", () => {
                    if (select.classList.contains("_open")) {
                        select.classList.remove("_open");
                    } else {
                        selects.forEach(s => s.classList.remove("_open"));
                        select.classList.add("_open");
                    }
                });
                items.forEach(item => {
                    item.addEventListener("click", () => {
                        handlerChange(item);
                    });
                });
                function handlerChange(item) {
                    const value = item.textContent.trim();
                    input.value = value;
                    select.classList.remove("_open");
                    items.forEach(i => i.classList.remove("_active"));
                    item.classList.add("_active");
                }
            });
        }
    }
    function inputmask() {
        const inputs = document.querySelectorAll('input[type="tel"]');
        const im = new Inputmask("+7 (999) 999-99-99");
        im.mask(inputs);
    }
    function map() {
        const maps = document.querySelectorAll(".map");
        if (maps.length) {
            maps.forEach(map => {
                const options = {
                    root: null,
                    rootMargin: "0px",
                    scrollMargin: "0px",
                    threshold: .01
                };
                function callback(entries, observer) {
                    entries.forEach(entry => {
                        const target = entry.target;
                        if (entry.isIntersecting) {
                            createScript("https://api-maps.yandex.ru/2.1/?apikey=b46e9249-4925-4460-b11c-3aaf76ad0115&lang=ru_RU", "text/javascript").then(() => handlerCreateMap(target));
                            observer.unobserve(target);
                        }
                    });
                }
                const observer = new IntersectionObserver(callback, options);
                observer.observe(map);
            });
            function handlerCreateMap(map) {
                const center = JSON.parse(map.dataset.center);
                const zoom = Number(map.dataset.zoom);
                const iconHref = map.dataset.icon;
                let iconSize = [ 82, 93 ];
                let iconPosition = [ -80, -145 ];
                let objectMark = {};
                if (iconHref) {
                    objectMark = {
                        iconLayout: "default#image",
                        iconImageHref: iconHref,
                        iconImageSize: iconSize,
                        iconImageOffset: iconPosition
                    };
                }
                function init() {
                    const htmlMap = new ymaps.Map(map, {
                        center,
                        zoom
                    });
                    const placemark = new ymaps.Placemark(center, {}, objectMark);
                    htmlMap.geoObjects.add(placemark);
                    htmlMap.controls.remove("geolocationControl");
                    htmlMap.controls.remove("searchControl");
                    htmlMap.controls.remove("trafficControl");
                    htmlMap.controls.remove("typeSelector");
                    htmlMap.controls.remove("fullscreenControl");
                    htmlMap.controls.remove("rulerControl");
                }
                ymaps.ready(init);
            }
        }
    }
    function mediaAdaptive() {
        function DynamicAdapt(type) {
            this.type = type;
        }
        DynamicAdapt.prototype.init = function() {
            const _this = this;
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = document.querySelectorAll("[data-da]");
            for (let i = 0; i < this.nodes.length; i++) {
                const node = this.nodes[i];
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(dataArray[0].trim());
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }
            this.arraySort(this.оbjects);
            this.mediaQueries = Array.prototype.map.call(this.оbjects, function(item) {
                return "(" + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
            }, this);
            this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function(item, index, self) {
                return Array.prototype.indexOf.call(self, item) === index;
            });
            for (let i = 0; i < this.mediaQueries.length; i++) {
                const media = this.mediaQueries[i];
                const mediaSplit = String.prototype.split.call(media, ",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function(item) {
                    return item.breakpoint === mediaBreakpoint;
                });
                matchMedia.addListener(function() {
                    _this.mediaHandler(matchMedia, оbjectsFilter);
                });
                this.mediaHandler(matchMedia, оbjectsFilter);
            }
        };
        DynamicAdapt.prototype.mediaHandler = function(matchMedia, оbjects) {
            if (matchMedia.matches) {
                for (let i = 0; i < оbjects.length; i++) {
                    const оbject = оbjects[i];
                    оbject.index = this.indexInParent(оbject.parent, оbject.element);
                    this.moveTo(оbject.place, оbject.element, оbject.destination);
                }
            } else {
                for (let i = 0; i < оbjects.length; i++) {
                    const оbject = оbjects[i];
                    if (оbject.element.classList.contains(this.daClassname)) {
                        this.moveBack(оbject.parent, оbject.element, оbject.index);
                    }
                }
            }
        };
        DynamicAdapt.prototype.moveTo = function(place, element, destination) {
            element.classList.add(this.daClassname);
            if (place === "last" || place >= destination.children.length) {
                destination.insertAdjacentElement("beforeend", element);
                return;
            }
            if (place === "first") {
                destination.insertAdjacentElement("afterbegin", element);
                return;
            }
            destination.children[place].insertAdjacentElement("beforebegin", element);
        };
        DynamicAdapt.prototype.moveBack = function(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index] !== undefined) {
                parent.children[index].insertAdjacentElement("beforebegin", element);
            } else {
                parent.insertAdjacentElement("beforeend", element);
            }
        };
        DynamicAdapt.prototype.indexInParent = function(parent, element) {
            const array = Array.prototype.slice.call(parent.children);
            return Array.prototype.indexOf.call(array, element);
        };
        DynamicAdapt.prototype.arraySort = function(arr) {
            if (this.type === "min") {
                Array.prototype.sort.call(arr, function(a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) {
                            return 0;
                        }
                        if (a.place === "first" || b.place === "last") {
                            return -1;
                        }
                        if (a.place === "last" || b.place === "first") {
                            return 1;
                        }
                        return a.place - b.place;
                    }
                    return a.breakpoint - b.breakpoint;
                });
            } else {
                Array.prototype.sort.call(arr, function(a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) {
                            return 0;
                        }
                        if (a.place === "first" || b.place === "last") {
                            return 1;
                        }
                        if (a.place === "last" || b.place === "first") {
                            return -1;
                        }
                        return b.place - a.place;
                    }
                    return b.breakpoint - a.breakpoint;
                });
                return;
            }
        };
        const da = new DynamicAdapt("max");
        da.init();
    }
    function reviews() {
        const block = document.querySelector("#myReviews__block-widget");
        if (block) {
            const options = {
                root: null,
                rootMargin: "0px",
                scrollMargin: "0px",
                threshold: .01
            };
            function callback(entries, observer) {
                entries.forEach(entry => {
                    const target = entry.target;
                    if (entry.isIntersecting) {
                        createScript("https://myreviews.dev/widget/dist/blockWidget.js", "text/javascript").then(() => myReviewsInit());
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
                    widgetId: "1"
                }).init();
            }
            const observer = new IntersectionObserver(callback, options);
            observer.observe(block);
        }
    }
    function sliders() {
        const introSlider = document.querySelector(".s-intro__slider");
        if (introSlider) {
            const slides = introSlider.querySelectorAll(".swiper-slide");
            function updateHeightSlider() {
                const headerHeight = document.querySelector(".header").clientHeight;
                slides.forEach(slide => slide.style.minHeight = `${window.innerHeight - headerHeight}px`);
            }
            if (window.matchMedia("min-width: 576px").matches) {
                updateHeightSlider();
            }
            const swiper = new Swiper(introSlider, {
                speed: 900,
                autoplay: {
                    delay: 7e3
                },
                pagination: {
                    el: ".s-intro .slider-pagination",
                    clickable: true
                }
            });
        }
        const catalogSliders = document.querySelectorAll(".s-catalog__slider");
        if (catalogSliders.length) {
            catalogSliders.forEach(slider => {
                const swiper = new Swiper(slider, {
                    speed: 900,
                    slidesPerView: "auto",
                    spaceBetween: 30,
                    autoplay: {
                        delay: 6500
                    },
                    scrollbar: {
                        draggable: true,
                        el: slider.closest("[data-tab]").querySelector(".slider-scrollbar")
                    },
                    breakpoints: {
                        1365: {
                            slidesPerView: 4,
                            spaceBetween: 30
                        },
                        992: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        }
                    }
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
                    delay: 7e3
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
        const aboutSlider = document.querySelector(".s-about__slider");
        if (aboutSlider) {
            const thumbAboutSldier = document.querySelector(".s-about__thumb-slider");
            const thumbSwiper = new Swiper(thumbAboutSldier, {
                speed: 900,
                slidesPerView: "auto",
                spaceBetween: 10,
                breakpoints: {
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 20
                    },
                    576: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    }
                }
            });
            const swiper = new Swiper(aboutSlider, {
                speed: 900,
                spaceBetween: 15,
                slidesPerView: 1,
                autoplay: {
                    delay: 6500
                },
                thumbs: {
                    swiper: thumbSwiper
                },
                scrollbar: {
                    el: ".s-about .slider-scrollbar",
                    draggable: true
                }
            });
        }
    }
    function spoller() {
        const spollersArray = document.querySelectorAll("[data-spollers]");
        if (spollersArray.length > 0) {
            const spollersRegular = Array.from(spollersArray).filter(function(item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            });
            if (spollersRegular.length) {
                initSpollers(spollersRegular);
            }
            let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
            if (mdQueriesArray && mdQueriesArray.length) {
                mdQueriesArray.forEach(mdQueriesItem => {
                    mdQueriesItem.matchMedia.addEventListener("change", function() {
                        initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                    });
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                });
            }
            function initSpollers(spollersArray, matchMedia = false) {
                spollersArray.forEach(spollersBlock => {
                    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spollersBlock.classList.add("_spoller-init");
                        initSpollerBody(spollersBlock);
                        spollersBlock.addEventListener("click", setSpollerAction);
                    } else {
                        spollersBlock.classList.remove("_spoller-init");
                        initSpollerBody(spollersBlock, false);
                        spollersBlock.removeEventListener("click", setSpollerAction);
                    }
                });
            }
            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                if (spollerTitles.length) {
                    spollerTitles = Array.from(spollerTitles).filter(item => item.closest("[data-spollers]") === spollersBlock);
                    spollerTitles.forEach(spollerTitle => {
                        if (hideSpollerBody) {
                            spollerTitle.removeAttribute("tabindex");
                            if (!spollerTitle.classList.contains("_spoller-active")) {
                                spollerTitle.nextElementSibling.hidden = true;
                            }
                        } else {
                            spollerTitle.setAttribute("tabindex", "-1");
                            spollerTitle.nextElementSibling.hidden = false;
                        }
                    });
                }
            }
            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest("[data-spoller]")) {
                    const spollerTitle = el.closest("[data-spoller]");
                    const spollersBlock = spollerTitle.closest("[data-spollers]");
                    const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (!spollersBlock.querySelectorAll("._slide").length) {
                        if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) {
                            hideSpollersBody(spollersBlock);
                        }
                        spollerTitle.classList.toggle("_spoller-active");
                        _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                    }
                    e.preventDefault();
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                    spollerActiveTitle.classList.remove("_spoller-active");
                    _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                }
            }
            const spollersClose = document.querySelectorAll("[data-spoller-close]");
            if (spollersClose.length) {
                document.addEventListener("click", function(e) {
                    const el = e.target;
                    if (!el.closest("[data-spollers]")) {
                        spollersClose.forEach(spollerClose => {
                            const spollersBlock = spollerClose.closest("[data-spollers]");
                            const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                            spollerClose.classList.remove("_spoller-active");
                            _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                        });
                    }
                });
            }
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter(function(item, index, self) {
                if (item.dataset[dataSetValue]) {
                    return item.dataset[dataSetValue].split(",")[0];
                }
            });
            if (media.length) {
                const breakpointsArray = [];
                media.forEach(item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                });
                let mdQueries = breakpointsArray.map(function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                });
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach(breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter(function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) {
                                return true;
                            }
                        });
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    });
                    return mdQueriesArray;
                }
            }
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout(() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }, duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout(() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }, duration);
            }
        };
        let _slideToggle = (target, duration = 500) => {
            if (target.hidden) {
                return _slideDown(target, duration);
            } else {
                return _slideUp(target, duration);
            }
        };
        function uniqArray(array) {
            return array.filter(function(item, index, self) {
                return self.indexOf(item) === index;
            });
        }
    }
    function tab() {
        const buttons = document.querySelectorAll("[data-tab-btn]");
        if (buttons.length) {
            buttons.forEach(btn => {
                btn.addEventListener("click", () => {
                    const container = btn.closest(".tabs");
                    const tabId = btn.dataset.tabBtn;
                    const allButtons = container.querySelector(".tabs-nav").querySelectorAll("[data-tab-btn]");
                    const allTabs = Array.from(container.querySelector(".tabs-content").children).filter(child => child.hasAttribute("data-tab"));
                    const currentTab = container.querySelector(`[data-tab="${tabId}"]`);
                    allTabs.forEach(t => {
                        t.classList.remove("_show");
                        t.classList.remove("_active");
                    });
                    currentTab.classList.add("_active");
                    setTimeout(() => {
                        currentTab.classList.add("_show");
                    }, 200);
                    allButtons.forEach(b => b.classList.remove("_active"));
                    btn.classList.add("_active");
                });
            });
        }
    }
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
                destroy: instance => {
                    const id = instance.getSlide().src;
                    if (id.includes("#modal")) {
                        const modal = document.querySelector(id);
                        const inputNote = modal.querySelector(".input-note");
                        const modalTitle = modal.querySelector(".modal__title[data-text]");
                        if (inputNote) inputNote.value = "";
                        if (modalTitle) modalTitle.textContent = modalTitle.dataset.text;
                    }
                }
            }
        });
    });
})();