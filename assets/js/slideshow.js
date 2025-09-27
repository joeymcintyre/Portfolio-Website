// assets/js/slideshow.js
(function () {
  function initSlideshow(root) {
    const slides = Array.from(root.querySelectorAll('.slides img'));
    if (!slides.length) return;

    // Build dots dynamically
    const dotsWrap = root.querySelector('.dots');
    dotsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dotsWrap.appendChild(b);
    });

    const prevBtn = root.querySelector('.prev');
    const nextBtn = root.querySelector('.next');
    const dots = Array.from(dotsWrap.querySelectorAll('button'));

    let index = 0;
    let timer = null;
    const interval = parseInt(root.dataset.interval || '5000', 10);
    const autoplay = root.dataset.autoplay === 'true';

    function show(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach((img, k) => img.classList.toggle('active', k === index));
      dots.forEach((d, k) => d.classList.toggle('active', k === index));
    }

    function next() { show(index + 1); }
    function prev() { show(index - 1); }

    // Wire controls
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);
    dots.forEach((d, k) => d.addEventListener('click', () => show(k)));

    // Autoplay with pause on hover/focus
    function start() {
      if (!autoplay) return;
      stop();
      timer = setInterval(next, interval);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);

    // Init
    show(0);
    start();
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.slideshow').forEach(initSlideshow);
  });
})();