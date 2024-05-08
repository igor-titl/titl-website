textarea = document.querySelector("#autoresizing");
textarea.addEventListener('input', autoResize, false);

function autoResize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
}

//carret func ----------------

document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('autoresizing');
  
    // Создаем дублирующий элемент
    const mirroredEle = document.createElement('div');
    mirroredEle.classList.add('container__mirror'); // Добавляем класс для стилей
    mirroredEle.textContent = textarea.value; // Устанавливаем начальный текст
  
    // Копируем основные стили из textarea
    const textareaStyles = window.getComputedStyle(textarea);
    const styleProperties = [
      'fontFamily', 'fontSize', 'fontWeight', 'letterSpacing', 
      'lineHeight', 'padding', 'textDecoration', 'textIndent', 
      'textTransform', 'whiteSpace', 'wordSpacing', 'wordWrap',
    ];
    
    styleProperties.forEach((property) => {
      mirroredEle.style[property] = textareaStyles[property];
    });
  
    // Добавляем элемент в DOM
    textarea.parentNode.insertBefore(mirroredEle, textarea);
  
    // Обновляем mirroredEle при вводе в textarea
    textarea.addEventListener('input', () => {
      mirroredEle.textContent = textarea.value; // Обновляем текст
    });
  
    // Слушатель события `selectionchange` для отображения позиции курсора
    const updateCaret = () => {
      if (document.activeElement !== textarea) return;
  
      const cursorPos = textarea.selectionStart;
      const textBefore = textarea.value.substring(0, cursorPos);
      const textAfter = textarea.value.substring(cursorPos);
  
      mirroredEle.innerHTML = '';
      mirroredEle.appendChild(document.createTextNode(textBefore));
  
      const caretEle = document.createElement('span'); // Элемент для каретки
      caretEle.classList.add('container__cursor');
      caretEle.innerHTML = '&nbsp;'; // Визуальный маркер
      mirroredEle.appendChild(caretEle);
  
      mirroredEle.appendChild(document.createTextNode(textAfter));
    };
  
    document.addEventListener('selectionchange', updateCaret); // Обновляем позицию каретки
  });
  