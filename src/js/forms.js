// forms.js
// Логика работы с формами: базовая валидация и сообщения пользователю.

(function () {
  /**
   * Показать или обновить статус для формы.
   * type: 'success' | 'error'
   */
  function showFormStatus(form, type, message) {
    if (!form) return;

    let statusEl = form.querySelector('.form-status');
    if (!statusEl) {
      statusEl = document.createElement('p');
      statusEl.className = 'form-status';
      statusEl.setAttribute('aria-live', 'polite');
      // Вставляем статус перед примечанием, если оно есть, иначе в конец формы
      const note = form.querySelector('.form-note');
      if (note && note.parentNode === form) {
        form.insertBefore(statusEl, note);
      } else {
        form.appendChild(statusEl);
      }
    }

    statusEl.textContent = message;
    statusEl.classList.remove('form-status--success', 'form-status--error');
    statusEl.classList.add(type === 'success' ? 'form-status--success' : 'form-status--error');
  }

  /**
   * Простая проверка email через HTML5 API + fallback
   */
  function isValidEmail(value) {
    if (!value) return false;
    // Используем встроенную валидацию, если есть скрытый input[type=email]
    const testInput = document.createElement('input');
    testInput.type = 'email';
    testInput.value = value;
    return testInput.checkValidity();
  }

  /**
   * Подписка на дайджест на главной (newsletter-form).
   */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const emailField = newsletterForm.querySelector('#newsletter-email');
      const roleField = newsletterForm.querySelector('#newsletter-role');

      const email = emailField ? emailField.value.trim() : '';
      const role = roleField ? roleField.value : '';

      if (!email || !isValidEmail(email)) {
        showFormStatus(newsletterForm, 'error', 'Пожалуйста, укажите корректный email.');
        if (emailField) emailField.focus();
        return;
      }

      // На данном этапе делаем имитацию успешной отправки без реального backend.
      showFormStatus(
        newsletterForm,
        'success',
        'Спасибо! Мы добавили ваш email в список для еженедельного дайджеста.'
      );
      newsletterForm.reset();
    });
  }

  /**
   * Базовый хэндлер для контактных форм (общая и консалтинг).
   */
  function attachContactHandler(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const name = (formData.get('name') || '').toString().trim();
      const email = (formData.get('email') || '').toString().trim();
      const message = (formData.get('message') || '').toString().trim();

      if (!name || !email || !message || !isValidEmail(email)) {
        const errorMessage = !isValidEmail(email)
          ? 'Пожалуйста, укажите корректный email и заполните обязательные поля.'
          : 'Пожалуйста, заполните все обязательные поля (имя, email и сообщение).';

        showFormStatus(form, 'error', errorMessage);
        // В качестве лёгкого fallback на случай, если статус не отрисовался
        if (!form.querySelector('.form-status')) {
          alert(errorMessage);
        }
        return;
      }

      // На текущем этапе не делаем реальный запрос на backend, имитируем успех.
      showFormStatus(
        form,
        'success',
        'Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в течение 24 часов (CET).'
      );
      form.reset();
    });
  }

  // Общая контактная форма и заявка на консалтинг на странице contact.html
  attachContactHandler('contact-form');
  attachContactHandler('consulting-form');
})();
