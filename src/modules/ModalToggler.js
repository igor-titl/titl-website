import { module } from 'modujs';

export default class extends module {
    constructor(m) {
        super(m);

        // Events

        this.onTransitionEndBind = this.onTransitionEnd.bind(this)

        // UI

            this.$el = this.el
        this.events = {
            click: {
                open: 'open'
            }
        }
    }
    
    bindEvents() {
        document.querySelector('.c-layout').addEventListener('transitionend', this.onTransitionEndBind)
    }
    unbindEvents() {
        document.querySelector('.c-layout').removeEventListener('transitionend', this.onTransitionEndBind)
    }

    open(){
        this.call('goToModal', {target: this.$el.getAttribute('data-load')}, 'Modal')
        this.call('open', null, 'Modal')   
        const intervalId = setInterval(() => {
            const cLayout = document.querySelector('.c-layout');
            if (cLayout) {
                clearInterval(intervalId);
                // console.log(clearInterval(intervalId))
                this.onTransitionEnd();
            }
        });

    }

    onTransitionEnd(){
        setTimeout(() => {
            this.call('update', null, 'ModalScroll')
        }, 800)
    }

    destroy() {
        this.unbindEvents()
        super.destroy()
    }
}
