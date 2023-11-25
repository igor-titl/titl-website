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
                'buttonClose': 'goToPrevious',
            }
        }

    }

    init(){
        this.closeBind = (e) => {
             if (e.key === "Escape") {
                this.close()
                this.goToPrevious()
            }
        }

        document.addEventListener('keyup', this.closeBind)
    }

    open() {
        html.classList.add(CLASS.OPEN)
        
    }

    close() {
        html.classList.remove(CLASS.OPEN)
    }

    goToPrevious() {
        html.classList.remove(CLASS.OPEN)
        

        this.el.querySelectorAll('.c-layout').forEach((el) => {
            setTimeout(() => {

            this.call('destroy', null, "ModalScroll")
                el.remove()    

            }, 800)

        })
    }


    toggle() {
        if(html.classList.contains(CLASS.OPEN)) {
            this.close();
        } else {
            this.open();
        }
    }

    goToModal(params) {
        let { target } = params;
        this.el.querySelector('[data-load-container]').setAttribute('data-load-container', target)
    }
    // goToAgency() {
    //     this.el.querySelector('[data-load-container]').setAttribute('data-load-container', 'agency')
    // }

    destroy() {
        document.removeEventListener('keyup', this.closeBind)
    }
}
