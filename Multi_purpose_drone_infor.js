// Scroll Reveal: โชว์แอนิเมชันเมื่อ element เข้าจอ (เล่นครั้งเดียว)
(() => {
  const els = [...document.querySelectorAll(".reveal")];

  // batch กัน spike ตอนโผล่ทีละเยอะ
  const queue = [];
  let ticking = false;

  function flushQueue(){
    ticking = false;
    const batch = queue.splice(0, 6);
    for (const el of batch) el.classList.add("show");
    if (queue.length) requestAnimationFrame(flushQueue);
  }

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        queue.push(entry.target);
        io.unobserve(entry.target);
      }
    }
    if (!ticking && queue.length){
      ticking = true;
      requestAnimationFrame(flushQueue);
    }
  }, { threshold: 0.12, rootMargin: "0px 0px -15% 0px" });

  els.forEach(el => io.observe(el));
})();

// Video: เล่นเมื่อมองเห็น / หยุดเมื่อออกจอ (ช่วยลดหน่วง)
(() => {
  const vids = document.querySelectorAll("video[data-autoplay]");
  if (!vids.length) return;

  const vio = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const v = e.target;
      if (e.isIntersecting) v.play().catch(()=>{});
      else v.pause();
    }
  }, { threshold: 0.35 });

  vids.forEach(v => vio.observe(v));
})();
