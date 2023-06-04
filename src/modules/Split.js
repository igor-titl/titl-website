import { module } from 'modujs'
import Splitting from 'splitting'

export default class extends module {
    constructor(m) {
        super(m)

        // UI
        this.$el = this.el
        
        // Data
        this.splitType = this.getData('type') ? this.getData('type') : 'chars'
    }

    ///////////////
    // Lifecyle
    ///////////////
    init() {
      this.split()
    }

    destroy() {
        super.destroy()
    }


    ///////////////
    // Methods
    ///////////////
    split() {
        Splitting({ target: this.$el, by: this.splitType })
    }
}
