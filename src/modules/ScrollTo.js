import { module } from 'modujs'

export default class extends module {
    constructor(m) {
        super(m)
        this.$el = this.el
        this.$target = this.getData('href')
        this.onClickBind = this.onClick.bind(this)
    }

    init() {
        this.bindEvents()
    }

    bindEvents() {
        this.el.addEventListener("click", this.onClickBind)
    }

    unbindEvents() {
        this.el.removeEventListener("click", this.onClickBind)
    }

    onClick() {
        this.call('scrollTo', { target: this.$target }, 'Scroll')
        
    }

    destroy() {
        super.destroy()
        this.unbindEvents()
    }
}