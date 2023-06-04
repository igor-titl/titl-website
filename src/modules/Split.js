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
        whenReady(EAGER_FONTS).then((fonts) => this.onFontsLoaded(fonts))
    }

    destroy() {
        super.destroy()
    }

    ///////////////
    // Callbacks
    ///////////////
    onFontsLoaded(fonts) {
        this.split()
    }

    ///////////////
    // Methods
    ///////////////
    split() {
        Splitting({ target: this.$el, by: this.splitType })
    }
}
