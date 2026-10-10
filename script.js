/* ══════════════════════════════════════════════════════════
   GODDESS SAGE — Behaviour
   ══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Scroll reveal ──────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');

  if (reveals.length) {
    if (!('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('is-visible'));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      reveals.forEach((el) => observer.observe(el));
    }
  }

  /* ── Back to top ────────────────────────────────────────── */
  const toTop = document.querySelector('.to-top');
  if (!toTop) return;

  const SHOW_AFTER_PX = 400;
  let ticking = false;

  function updateToTop() {
    if (window.scrollY > SHOW_AFTER_PX) {
      toTop.classList.add('is-visible');
    } else {
      toTop.classList.remove('is-visible');
    }
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateToTop);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  updateToTop();

  toTop.addEventListener('click', function () {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  });
})();