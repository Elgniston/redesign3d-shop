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
