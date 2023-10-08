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
        this.$inputCaret = this.$('caret')[0]
    
    }

    ///////////////
    // Lifecyle
    ///////////////
    init() {
        this.$input.addEventListener('focus', this.clickField.bind(this))
        this.$input.addEventListener('blur', this.clickField.bind(this))
        this.caret()
    }

    clickField(e){
        this.$el.classList.toggle('active')
    }
    blurField(e){
        this.$el.classList.remove('active')
    }

    caret(){
      const e = this.$input
      const s = this.$inputCaret
        e.addEventListener("keyup", function copyInput(event) {
            s.textContent = e.value;
            e.setAttribute("value", e.value);
    }, false);
    }

    destroy() {
        super.destroy()
    }


}
