"use strict";

const slides = document.querySelectorAll(".slide-container");
const btnLeft = document.querySelector(".btn--left");
const btnRight = document.querySelector(".btn--right");
const dotContainer = document.querySelector(".dots");
let currentSlide = 0;
const maxSlide = slides.length;

const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class='dot' data-slide='${i}'></button>`
    );
  });
};

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translate(${(i - slide) * 100}%)`;
  });
};

const activateDots = function (slide) {
  document.querySelectorAll(".dot").forEach((dot) => {
    dot.classList.remove("dot--active");
  });

  document
    .querySelector(`.dot[data-slide='${slide}']`)
    .classList.add("dot--active");
};

const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  goToSlide(currentSlide);
  activateDots(currentSlide);
};

const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }

  goToSlide(currentSlide);
  activateDots(currentSlide);
};

const init = function () {
  goToSlide(0);
  createDots();

  activateDots(0);
};

init();

btnRight.addEventListener("click", nextSlide);

btnLeft.addEventListener("click", prevSlide);

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dot")) {
    const slide = e.target.dataset.slide;

    slides.forEach((s, i) => {
      s.style.transform = `translate(${(i - slide) * 100}%)`;
    });

    activateDots(slide);
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") nextSlide();
  e.key === "ArrowLeft" && prevSlide();
});
