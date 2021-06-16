const navigationSlide = document.querySelector(".navigation-slide");
const navigationBtn = document.querySelector(".navigation__menu");
const closeBtn = document.querySelector(".navigation-slide__exit-container");
const background = navigationSlide.querySelector(
    ".navigation-slide__background"
);
const wrapper = navigationSlide.querySelector(".navigation-slide__wrapper");
const navBar = document.querySelector(".navigation__nav");
const allSections = document.querySelectorAll(".section--hidden");
const allLazyImg = document.querySelectorAll(".lazy-img");

const closeSlide = () => {
    background.classList.toggle("navigation-slide__background--visible");
    wrapper.classList.toggle("navigation-slide__wrapper--visible");
    document.querySelector("body").style.overflow = "auto";
};

navigationBtn.addEventListener("click", (e) => {
    background.classList.add("navigation-slide__background--visible");
    wrapper.classList.add("navigation-slide__wrapper--visible");
    document.querySelector("body").style.overflow = "hidden";
});

wrapper.addEventListener("click", (event) => {
    if (!event.target.classList.contains("navigation-slide__link")) return;
    closeSlide();
});

closeBtn.addEventListener("click", closeSlide);
background.addEventListener("click", closeSlide);

// Nav animation
let y = 0;
let lastY = 0;
let isUp = false;
window.addEventListener("scroll", function (e) {
    y = this.scrollY;

    if (y < lastY && !isUp) {
        isUp = true;
        navBar.classList.add("navigation__sticky");
    } else if ((y > lastY && isUp) || y === 0) {
        isUp = false;
        navBar.classList.remove("navigation__sticky");
    }
    lastY = y;
});

// Reveal sections
const revealSection = function (entries, observer) {
    // Unpack object inside entries
    const [entry] = entries;
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.1,
});

// Lazy Images
const loadImg = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", function () {
        this.classList.remove("lazy-img");
    });

    observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: "-100px",
});

allLazyImg.forEach((image) => imgObserver.observe(image));

// Reveal header
window.addEventListener("load", () => {
    const headerContainer = document.querySelector(".header__container");
    headerContainer.style.transition = "0.5s transform ease-in, opacity 2.5s";
    headerContainer.classList.remove("header--hidden");
    wrapper.style.transition = "all 0.4s ease-in-out";

    allSections.forEach((section) => {
        section.classList.add("section");
        sectionObserver.observe(section);
    });
});
