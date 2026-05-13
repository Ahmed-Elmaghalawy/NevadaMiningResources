export function initMotion() {
  addThemeTransitions();
  initSmoothAnchors();
  initScrollReveal();
}

function addThemeTransitions() {
  document.querySelectorAll("body, body *").forEach((node) => {
    node.classList.add("transition-colors", "duration-500", "ease-out");
  });
}

function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", targetId);
    });
  });
}

function initScrollReveal() {
  const targets = document.querySelectorAll("main, section");

  targets.forEach((target) => {
    target.classList.add("opacity-0", "translate-y-6", "transition-all", "duration-700", "ease-out");
  });

  const reveal = (target) => {
    target.classList.remove("opacity-0", "translate-y-6");
    target.classList.add("opacity-100", "translate-y-0");
  };

  if (!("IntersectionObserver" in window)) {
    targets.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      reveal(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  targets.forEach((target) => observer.observe(target));
}
