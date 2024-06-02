textarea = document.querySelector("#autoresizing");
textarea.addEventListener('input', autoResize, false);

function autoResize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
}


        // Инициализация анимации
        var animation = lottie.loadAnimation({
          container: document.getElementById('lottieTest'), // контейнер для анимации
          renderer: 'svg', // рендерер (svg/canvas/html)
          loop: false, // будет ли анимация зацикленной
          autoplay: false, // будет ли анимация воспроизводиться автоматически
          path: 'https://uploads-ssl.webflow.com/64414ea18a1b2e622a6cce39/6653c3acf8323bfacd1cf5a5_Rocketupdate.json' // путь к JSON-файлу с анимацией
      });
      
      function playAnimation(entries, observer) {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  animation.goToAndPlay(0, true); // Запуск анимации с начала
              } else {
                  animation.stop(); // Останавливаем анимацию, когда элемент не виден
              }
          });
      }
      
              // Создание наблюдателя
      let observer = new IntersectionObserver(playAnimation, {
          threshold: 0.5 // процент видимости элемента (0.5 = 50%)
      });

    observer.observe(document.getElementById('lottieTest'));
    
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
      emailError.textContent = 'Fix email format';
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
  
  
  
      // Name test
  const namebox = document.getElementById("name-box");
   const enterename = document.getElementById("enter-name");
  const name = document.getElementById('nameinput');
  const nameError = document.getElementById('nameError');
  if (name.value.trim() === '') {
      namebox.classList.add('error');
      name.classList.add('error');
      nameError.textContent = 'Fill name';
      enterename.style.display = "none";
      nameError.style.display = 'block';
      hasError = true;
  }  else {
      namebox.classList.remove('error');
      name.classList.remove('error');
      nameError.textContent = '';
      nameError.style.display = 'none';
  }
   
  
      // Msg test
  const msgbox = document.getElementById("msg-box");
  const enteremsg = document.getElementById("enter-msg");
  const msg = document.getElementById('autoresizing');
  const msgError = document.getElementById('msgError');
  if (msg.value.trim() === '') {
      msgbox.classList.add('error');
      msg.classList.add('error');
      msgError.textContent = 'Fill message';
      enteremsg.style.display = "none";
      msgError.style.display = 'block';
      hasError = true;
  } else {
      msgbox.classList.remove('error');
      msg.classList.remove('error');
      msgError.textContent = '';
      msgError.style.display = 'none';
  }

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

      const inputForm = document.querySelector('.input-form');
      const formBox = document.querySelector('.form-box');
  
      inputForm.addEventListener('focus', () => {
        formBox.classList.add('focused');
      });
  
      inputForm.addEventListener('blur', () => {
        formBox.classList.remove('focused');
      });