import { module } from 'modujs';
import { html } from '../utils/environment'

export default class extends module {
    constructor(m) {
        super(m);
            this.$el = this.el
        this.events = {
            click: {
                open: 'hover'
            }
        }
    }

    hover(){
        this.call('goToModal', {target: this.$el.getAttribute('data-load')}, 'Modal')
        this.call('open', null, 'Modal')
        setTimeout(() => {
            this.call('update', null, 'ModalScroll')    
        }, 800)
        
    }
}
