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

      