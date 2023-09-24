import { module } from 'modujs';
import { html } from '../utils/environment'

const CLASS = {
    OPEN: `has-modal-open-agency`,
}

export default class extends module {
    constructor(m) {
        super(m);
        this.events = {
            click: {
                close: 'close'
            }
        }
    }



    open() {
        html.classList.add(CLASS.OPEN)
    }

    close() {
        html.classList.remove(CLASS.OPEN)
        // history.back()
    }


    toggle() {
        if(html.classList.contains(CLASS.OPEN)) {
            this.close();
        } else {
            this.open();
        }
    }

}
