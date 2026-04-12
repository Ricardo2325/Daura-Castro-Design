/* ============================================================
   Daura Castro · Interiorismo — main.js
   ============================================================ */

// ── Custom cursor ──────────────────────────────────────────
const cursor     = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');

if (cursor && cursorRing) {
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function loop() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hov'); cursorRing.classList.add('hov'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hov'); cursorRing.classList.remove('hov'); });
  });
}

// ── Nav scroll ────────────────────────────────────────────
// Nav siempre visible — sin lógica de scroll necesaria

// ── Hamburger / panel lateral ─────────────────────────────
const hamburger  = document.querySelector('.hamburger');
const navOverlay = document.querySelector('.nav-overlay');
const backdrop   = document.querySelector('.nav-overlay-backdrop');
const navClose   = document.querySelector('.nav-close');

function openMenu() {
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  navOverlay.classList.add('open');
  if (backdrop) backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  navOverlay.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

if (hamburger && navOverlay) {
  // Estado inicial
  hamburger.setAttribute('aria-expanded', 'false');

  hamburger.addEventListener('click', () => {
    const isOpen = navOverlay.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Cerrar al hacer click en un link del panel
  navOverlay.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', closeMenu);
  });

  // Cerrar con el botón ×
  if (navClose) navClose.addEventListener('click', closeMenu);

  // Cerrar al hacer click en el backdrop
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  // Cerrar con Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navOverlay.classList.contains('open')) closeMenu();
  });
}

// ── Helpers ───────────────────────────────────────────────
function fromIfExists(targets, vars) {
  const els = Array.isArray(targets) ? targets : [targets];
  const found = els.filter(t => {
    if (typeof t === 'string') return document.querySelector(t);
    return t;
  });
  if (found.length === 0) return;
  if (vars.scrollTrigger && typeof vars.scrollTrigger.trigger === 'string') {
    if (!document.querySelector(vars.scrollTrigger.trigger)) return;
  }
  gsap.from(found.length === 1 ? found[0] : found, vars);
}

// ── GSAP scroll animations ────────────────────────────────
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduced && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  fromIfExists(
    ['.hero-tag', '.hero h1', '.hero-sub', '.hero-actions'],
    { y: 28, opacity: 0, duration: 1, ease: 'power2.out', stagger: 0.14, delay: 0.25 }
  );
  fromIfExists('.intro-text', {
    scrollTrigger: { trigger: '.section-intro', start: 'top 82%' },
    y: 30, opacity: 0, duration: 1, ease: 'power2.out'
  });
  fromIfExists('.service-block', {
    scrollTrigger: { trigger: '.services-three', start: 'top 80%' },
    y: 40, opacity: 0, duration: 1, ease: 'power2.out', stagger: 0.2
  });
  fromIfExists('.project-card', {
    scrollTrigger: { trigger: '.projects-grid', start: 'top 80%' },
    y: 36, opacity: 0, duration: 0.9, ease: 'power2.out', stagger: 0.12
  });
  fromIfExists(['.cta-text', '.cta-actions'], {
    scrollTrigger: { trigger: '.section-cta', start: 'top 80%' },
    y: 30, opacity: 0, duration: 1, ease: 'power2.out', stagger: 0.18
  });
}