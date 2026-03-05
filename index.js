document.addEventListener("DOMContentLoaded", () => {
  // Boot sound
  const bootSound = document.getElementById("bootSound");
  let played = false;

  function playBootSound() {
    if (played || !bootSound) return;
    played = true;
    bootSound.volume = 0.4;
    bootSound.play().catch(() => {});
  }

  window.addEventListener("click", playBootSound, { once: true });
  window.addEventListener("keydown", playBootSound, { once: true });
  window.addEventListener("scroll", playBootSound, { once: true });

  // Reveal
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("show");
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.15 });

  els.forEach(el => io.observe(el));
});
