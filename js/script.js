/* ===== Menu mobile ===== */
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

function setMenu(open) {
  menu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
}
burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

/* ===== Scroll reveal ===== */
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(el => io.observe(el));
} else {
  items.forEach(el => el.classList.add('in')); // fallback sem suporte
}

/* ===== Filtro de projetos ===== */
const buttons = document.querySelectorAll('.filters button');
const projects = document.querySelectorAll('.proj');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.toggle('on', b === btn));
    const f = btn.dataset.f;
    projects.forEach(p => p.classList.toggle('hide', f !== 'all' && p.dataset.c !== f));
  });
});

/* ===== Antigravity (fundo do Hero) ===== */
(function () {
  const el = document.getElementById('hero-antigravity');
  if (!el || !window.Antigravity) return;
  // Menos partículas em telas pequenas ou aparelhos mais modestos
  const light = window.innerWidth < 700 || (navigator.hardwareConcurrency || 8) <= 4;
  window.Antigravity.mount(el, {
    colors: ['#5227FF', '#4B9BFF', '#B497CF'],
    count: light ? 800 : 1500,
    magnetRadius: 9, ringRadius: 7, particleSize: light ? 0.5 : 0.9,
    autoAnimate: true, colorMode: 'conic', colorSpeed: 0.05,
    particleShape: 'capsule', particleVariance: 1, fieldStrength: 10,
    waveAmplitude: 1, waveCount: 3, waveSpeed: 0.4, rotationSpeed: 0,
    pulseSpeed: 3, depthFactor: 1, ambient: 0.25, lerpSpeed: 0.05,
    interactive: true, clickBurst: true, intro: true, lightMode: false
  });
})();
