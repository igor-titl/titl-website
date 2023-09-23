import { module } from 'modujs';
import { html } from '../utils/environment'

const CLASS = {
    OPEN: `has-modal-open`,
}

export default class extends module {
    constructor(m) {
        super(m);
        this.events = {
            click: {
                buttonClose: 'goToPrevious'
            }
        }
    }

    init(){
        // this.closeBind = (e) => {
        //      if (e.key === "Escape") {
        //         html.classList.remove(CLASS.OPEN)
        //         this.close();
              
        //     }
        // }

        // document.addEventListener('keyup', this.closeBind)
    }

    open() {
        html.classList.add(CLASS.OPEN)
    }

    close() {
        html.classList.remove(CLASS.OPEN)


    }

    goToPrevious() {
        history.back()
    }

    toggle() {
        if(html.classList.contains(CLASS.OPEN)) {
            this.close();
        } else {
            this.open();
        }
    }

    destroy() {
        document.removeEventListener('keyup', this.closeBind)
    }
}
