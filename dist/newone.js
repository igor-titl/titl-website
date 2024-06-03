
const navHideElements = document.querySelectorAll('.c-header .c-header--home');
window.addEventListener('scroll', () => {
if (window.scrollY > 50) { // Выбираем подходящий порог для активации
    navHideElements.classList.add('move-to-hide');
} else {
   navHideElements.classList.remove('move-to-hide');
}
});

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

  document.getElementById("contactform").addEventListener("submit", function (event) {
event.preventDefault();

let hasError = false;

  // Валидация email
  const emailbox = document.getElementById("email-box");
   const enteremail = document.getElementById("enter-email");
  const email = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  const emailPattern =   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  // Правильное регулярное выражение
  if (email.value.trim() === '') {
      emailbox.classList.add('error');
      email.classList.add('error');
      emailError.textContent = 'Fill email';
      enteremail.style.display = "none";
      emailError.style.display = 'block';
      hasError = true;
  } else if (!emailPattern.test(email.value)) {
      emailbox.classList.add('error');
      email.classList.add('error');
      emailError.textContent = 'Fix email';
       enteremail.style.display = "none";
      emailError.style.display = 'block';
      hasError = true;
  } else {
      emailbox.classList.remove('error');
      email.classList.remove('error');
      emailError.textContent = '';
      emailError.style.display = 'none';
  }
      if (!hasError) {
          console.log('Server is running on port 3000');
  }

  email.onclick = function() {
    emailbox.classList.remove('error');
    email.classList.remove('error');
    emailError.textContent = '';
    emailError.style.display = 'none';
};

});

      document.addEventListener('DOMContentLoaded', function() {
          const formElements = document.querySelectorAll('input, textarea');
          const formButton = document.getElementById('form-button');

          formElements.forEach((element, index) => {
              element.addEventListener('keydown', function(event) {
                  if (event.key === 'Enter') {
                      if (element.tagName === 'TEXTAREA') {
                          if (event.shiftKey) {
                              // Если нажаты Shift+Enter, позволяем переход на новую строку
                              return;
                          } else {
                              // Если просто Enter, имитируем клик по кнопке
                              event.preventDefault();
                              formButton.click();
                          }
                      } else {
                          event.preventDefault();
                          const nextElement = formElements[index + 1];
                          if (nextElement) {
                              nextElement.focus();
                          }
                      }
                  }
              });
          });
      });