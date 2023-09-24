import { module } from 'modujs';
import { html } from '../utils/environment'

const CLASS = {
    OPENAGENCY: `has-modal-open-agency`,
    OPENHIGLIGHTS: `has-modal-open-higlights`,
}

export default class extends module {
    constructor(m) {
        super(m);

    }

    init(){
        this.closeBind = (e) => {
             if (e.key === "Escape") {
                this.close()
                // this.goToPrevious()
            }
        }

        document.addEventListener('keyup', this.closeBind)
    }


    close() {
        html.classList.remove(CLASS.OPENAGENCY)
        html.classList.remove(CLASS.OPENHIGLIGHTS)

        const state = null;
        const url = "/";
        history.pushState(state, "", url);
        // history.back()2
    }

    goToPrevious() {
        history.back()
    }


    destroy() {
        document.removeEventListener('keyup', this.closeBind)
    }
}
