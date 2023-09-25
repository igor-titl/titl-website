import { module } from 'modujs';
import { html } from '../utils/environment'

const CLASS = {
    OPEN: `has-menu-open`,
}

export default class extends module {
    constructor(m) {
        super(m);
        this.events = {
            click: {
                open: 'open',
                close: 'close'
            }
        }

    }

    // init(){
    //     this.closeBind = (e) => {
    //          if (e.key === "Escape") {
    //             this.close()
    //             // this.goToPrevious()
    //         }
    //     }

    //     document.addEventListener('keyup', this.closeBind)
    // }


    close() {
        html.classList.remove(CLASS.OPEN)
    }

    open() {
        html.classList.add(CLASS.OPEN)
    }

    destroy() {
        document.removeEventListener('keyup', this.closeBind)
    }
}
