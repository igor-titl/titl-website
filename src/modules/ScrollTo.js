import { module } from 'modujs'

export default class extends module {
    constructor(m) {
        super(m)
        this.$el = this.el
        this.$target = this.$el.getAttribute('href')
        this.onClickBind = this.onClick.bind(this)
    }

    init() {
        this.bindEvents()
    }

    destroy() {
        super.destroy()
        this.unbindEvents()
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
}