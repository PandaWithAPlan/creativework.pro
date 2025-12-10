// analytics.js
// Заготовка подключения Google Analytics 4.
// GA_MEASUREMENT_ID должен быть подставлен владельцем проекта.

(function () {
  const GA_ID = 'G-XXXXXXX'; // TODO: заменить на реальный ID

  if (!GA_ID || GA_ID === 'G-XXXXXXX') {
    console.info('[analytics] GA4 ID не настроен, скрипт инициализации пропущен');
    return;
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  script.onload = function () {
    gtag('js', new Date());
    gtag('config', GA_ID);
    console.info('[analytics] GA4 инициализирован с ID', GA_ID);
  };
})();
