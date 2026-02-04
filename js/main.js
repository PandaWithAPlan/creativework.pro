// main.js
// Базовая логика навигации, sticky header и мелких UI-паттернов.

(function () {
  const header = document.getElementById('main-header');
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const navbarMenu = document.getElementById('navbar-menu');

  // Sticky header при скролле
  let isScrolled = false;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!header) return;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const offset = window.scrollY || window.pageYOffset;
        const shouldBeScrolled = offset > 16;
        if (isScrolled !== shouldBeScrolled) {
          header.classList.toggle('is-scrolled', shouldBeScrolled);
          isScrolled = shouldBeScrolled;
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // Мобильное меню
  if (mobileToggle && navbarMenu) {
    mobileToggle.setAttribute('aria-controls', 'navbar-menu');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.setAttribute('aria-label', 'Открыть главное меню');

    mobileToggle.addEventListener('click', () => {
      const isOpen = navbarMenu.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Закрытие меню при клике по ссылке
    navbarMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Плавный скролл для внутренних якорей на текущей странице
  document.addEventListener('click', (event) => {
    const target = event.target.closest('a[href="#"], a[href^="#"]');
    if (!target) return;

    const href = target.getAttribute('href');
    if (!href || href === '#') return;

    const id = href.substring(1);
    const anchorTarget = document.getElementById(id);
    if (!anchorTarget) return;

    event.preventDefault();
    anchorTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Переключатель тарифов (ежемесячно/ежегодно) на главной странице
  const pricingToggle = document.querySelector('.pricing-toggle');
  const pricingGrid = document.querySelector('.pricing-grid');

  if (pricingToggle && pricingGrid) {
    const toggleButtons = pricingToggle.querySelectorAll('.toggle-btn');
    const pricingPrices = pricingGrid.querySelectorAll('.pricing-price');

    const applyBillingMode = (mode) => {
      // Переключаем визуальное состояние кнопок
      toggleButtons.forEach((btn) => {
        const isActive = btn.getAttribute('data-billing') === mode;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });

      // Обновляем значения в карточках тарифов
      pricingPrices.forEach((priceBlock) => {
        const priceValueEl = priceBlock.querySelector('.price-value');
        const pricePeriodEl = priceBlock.querySelector('.price-period');
        const priceNoteEl = priceBlock.querySelector('.price-note');

        if (!priceValueEl || !pricePeriodEl || !priceNoteEl) return;

        const monthlyPrice = priceBlock.getAttribute('data-monthly-price');
        const monthlyPeriod = priceBlock.getAttribute('data-monthly-period');
        const monthlyNote = priceBlock.getAttribute('data-monthly-note');
        const yearlyPrice = priceBlock.getAttribute('data-yearly-price');
        const yearlyPeriod = priceBlock.getAttribute('data-yearly-period');
        const yearlyNote = priceBlock.getAttribute('data-yearly-note');

        if (mode === 'yearly') {
          if (yearlyPrice) priceValueEl.textContent = yearlyPrice;
          if (yearlyPeriod) pricePeriodEl.textContent = yearlyPeriod;
          if (yearlyNote) priceNoteEl.textContent = yearlyNote;
        } else {
          if (monthlyPrice) priceValueEl.textContent = monthlyPrice;
          if (monthlyPeriod) pricePeriodEl.textContent = monthlyPeriod;
          if (monthlyNote) priceNoteEl.textContent = monthlyNote;
        }
      });
    };

    // Обработчики клика по кнопкам переключателя
    toggleButtons.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        const mode = btn.getAttribute('data-billing');
        if (!mode) return;
        applyBillingMode(mode);
      });
    });

    // Инициализация начального состояния на основе активной кнопки
    const initialActive = pricingToggle.querySelector('.toggle-btn.is-active');
    const initialMode = (initialActive && initialActive.getAttribute('data-billing')) || 'monthly';
    applyBillingMode(initialMode);
  }
})();
