textarea = document.querySelector("#autoresizing");
textarea.addEventListener('input', autoResize, false);

function autoResize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
}

//carret func ----------------

const pre = document.createTextNode(textBeforeCursor);
const post = document.createTextNode(textAfterCursor);
const caretEle = document.createElement('span');
caretEle.classList.add('container__cursor');
caretEle.innerHTML = '&nbsp;';

mirroredEle.innerHTML = '';
mirroredEle.append(pre, caretEle, post);