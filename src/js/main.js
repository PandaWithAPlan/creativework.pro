// main.js
// Базовая логика навигации, sticky header и мелких UI-паттернов.

(function () {
  const header = document.getElementById('main-header');
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const navbarMenu = document.getElementById('navbar-menu');

  // Sticky header при скролле
  window.addEventListener('scroll', () => {
    if (!header) return;
    const offset = window.scrollY || window.pageYOffset;
    header.classList.toggle('is-scrolled', offset > 16);
  });

  // Мобильное меню
  if (mobileToggle && navbarMenu) {
    mobileToggle.addEventListener('click', () => {
      navbarMenu.classList.toggle('active');
    });

    // Закрытие меню при клике по ссылке
    navbarMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
      });
    });
  }

  // Плавный скролл для внутренних якорей на текущей странице
  document.addEventListener('click', (event) => {
    const target = event.target.closest('a[href^="#"]');
    if (!target) return;

    const href = target.getAttribute('href');
    if (!href || href === '#') return;

    const id = href.substring(1);
    const anchorTarget = document.getElementById(id);
    if (!anchorTarget) return;

    event.preventDefault();
    anchorTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();
