const header = document.querySelector('[data-header]');
const toggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const year = document.querySelector('[data-year]');

if (year) year.textContent = new Date().getFullYear();

const onScroll = () => {
  if (header) header.classList.toggle('is-scrolled', window.scrollY > 18);

  const floating = document.querySelector('.float-on-scroll');
  if (floating) {
    const rect = floating.getBoundingClientRect();
    const windowHeight = window.innerHeight || 1;
    const progress = Math.max(-1, Math.min(1, (rect.top - windowHeight / 2) / windowHeight));
    floating.style.setProperty('--float-y', `${progress * -34}px`);
  }
};
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll, { passive: true });
onScroll();

if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('is-open'));
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('is-open'));
  });
}

const revealItems = document.querySelectorAll('.reveal, .reveal-text');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
revealItems.forEach((item) => observer.observe(item));
