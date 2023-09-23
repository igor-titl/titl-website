import { module } from 'modujs'

export default class extends module {
    constructor(m) {
        super(m)

        // this.events = {
        //     focus:{
        //       input: 'clickField'
        //     }
        // }

        // UI
        this.$el = this.el
        this.$input = this.$('input')[0]
    
    }

    ///////////////
    // Lifecyle
    ///////////////
    init() {
        this.$input.addEventListener('focus', this.clickField.bind(this))
        this.$input.addEventListener('blur', this.clickField.bind(this))
    }

    clickField(e){
        this.$el.classList.toggle('active')
    }
    blurField(e){
        this.$el.classList.remove('active')
    }

    destroy() {
        super.destroy()
    }


}
