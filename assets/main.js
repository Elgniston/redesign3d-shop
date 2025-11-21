(() => {
  // Highlight the current nav link based on the filename.
  const path = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".links a");
  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path) {
      link.classList.add("active");
    }
  });
})();

// Simple carousel controller (for services page)
(() => {
  const carousel = document.querySelector(".carousel");
  if (!carousel) return;

  const track = carousel.querySelector(".carousel-track");
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const dots = Array.from(carousel.querySelectorAll(".carousel-dots button"));
  const prev = carousel.querySelector("[data-prev]");
  const next = carousel.querySelector("[data-next]");

  let index = 0;
  const total = slides.length;
  const update = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  };

  const goTo = (i) => {
    index = (i + total) % total;
    update();
  };

  prev?.addEventListener("click", () => goTo(index - 1));
  next?.addEventListener("click", () => goTo(index + 1));
  dots.forEach((d, i) => d.addEventListener("click", () => goTo(i)));

  // Autoplay
  let timer = setInterval(() => goTo(index + 1), 5000);
  const reset = () => {
    clearInterval(timer);
    timer = setInterval(() => goTo(index + 1), 5000);
  };

  carousel.addEventListener("pointerdown", reset);
  carousel.addEventListener("pointermove", reset);
  carousel.addEventListener("pointerup", reset);
  carousel.addEventListener("pointerleave", reset);

  update();
})();
