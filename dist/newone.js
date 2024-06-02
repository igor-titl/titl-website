textarea = document.querySelector("#autoresizing");
textarea.addEventListener('input', autoResize, false);

function autoResize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
}



      const inputForms = document.querySelectorAll('.input-form');

      inputForms.forEach(inputForm => {
        inputForm.addEventListener('focus', () => {
          inputForm.parentElement.classList.add('focused');
        });
  
        inputForm.addEventListener('blur', () => {
          inputForm.parentElement.classList.remove('focused');
        });
      });

      


            ////////////////////////////////// AGENCY FORM


 // Функция для обработки фокуса
 function handleFocus(event) {
    const inputContainer = event.target.closest('.form-box');
    if (inputContainer) {
      const button = inputContainer.querySelector('.enter-form-btn');
      if (button) {
        button.classList.add('show-btn');
      }
    }
  }

  // Функция для обработки потери фокуса
  function handleBlur(event) {
    const inputContainer = event.target.closest('.form-box');
    if (inputContainer) {
      const button = inputContainer.querySelector('.enter-form-btn');
      if (button) {
        // Используем setTimeout, чтобы дождаться завершения потери фокуса
        setTimeout(() => {
          button.classList.remove('show-btn');
        }, 100);
      }
    }
  }

  // Добавление событий фокуса и потери фокуса для всех input и textarea
  document.querySelectorAll('.input-form').forEach(element => {
    element.addEventListener('focus', handleFocus);
    element.addEventListener('blur', handleBlur);
  });

  document.querySelectorAll('.contactform').forEach(form => {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      let hasError = false;

      // Валидация email
      const emailbox = form.querySelector("#email-box");
      const email = form.querySelector('#email');
      const emailError = form.querySelector('#emailError');
      const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (email.value.trim() === '') {
        emailbox.classList.add('error');
        email.classList.add('error');
        emailError.textContent = 'Fill email';
        emailError.style.display = 'block';
        hasError = true;
      } else if (!emailPattern.test(email.value)) {
        emailbox.classList.add('error');
        email.classList.add('error');
        emailError.textContent = 'Fix email format';
        emailError.style.display = 'block';
        hasError = true;
      } else {
        emailbox.classList.remove('error');
        email.classList.remove('error');
        emailError.textContent = '';
        emailError.style.display = 'none';
      }

      // Валидация name
      const namebox = form.querySelector("#name-box");
      const name = form.querySelector('#nameinput');
      const nameError = form.querySelector('#nameError');
      if (name.value.trim() === '') {
        namebox.classList.add('error');
        name.classList.add('error');
        nameError.textContent = 'Fill name';
        nameError.style.display = 'block';
        hasError = true;
      } else {
        namebox.classList.remove('error');
        name.classList.remove('error');
        nameError.textContent = '';
        nameError.style.display = 'none';
      }

      // Валидация message
      const msgbox = form.querySelector("#msg-box");
      const msg = form.querySelector('#autoresizing');
      const msgError = form.querySelector('#msgError');
      if (msg.value.trim() === '') {
        msgbox.classList.add('error');
        msg.classList.add('error');
        msgError.textContent = 'Fill message';
        msgError.style.display = 'block';
        hasError = true;
      } else {
        msgbox.classList.remove('error');
        msg.classList.remove('error');
        msgError.textContent = '';
        msgError.style.display = 'none';
      }

      if (!hasError) {
        console.log('Form submitted successfully');
      }
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('input, textarea').forEach((element, index, elements) => {
      element.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          if (element.tagName === 'TEXTAREA') {
            if (event.shiftKey) {
              return;
            } else {
              event.preventDefault();
              element.closest('form').querySelector('.enter-form-btn').click();
            }
          } else {
            event.preventDefault();
            const nextElement = elements[index + 1];
            if (nextElement) {
              nextElement.focus();
            }
          }
        }
      });
    });
  });