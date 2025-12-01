// forms.js
// Заготовка логики работы с формами (валидация и отправка).

(function () {
  function attachSimpleHandler(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      // TODO: заменить на реальную отправку (fetch на /api/contact или /api/consultation)
      // На этапе Фазы 1 ограничиваемся проверкой required-полей и сообщением в консоль.
      const formData = new FormData(form);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');

      if (!name || !email || !message) {
        alert('Пожалуйста, заполните все обязательные поля.');
        return;
      }

      console.info('[forms] Demo submit for', formId, { name, email, message });
      alert('Это тестовая отправка формы. Реальная интеграция будет добавлена позже.');
      form.reset();
    });
  }

  // Базовый хэндлер для основной контактной формы (будет определена на contact/index).
  attachSimpleHandler('contact-form');
})();
