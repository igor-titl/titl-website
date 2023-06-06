import { module } from 'modujs';
import Swiper from 'swiper';

export default class extends module {
    constructor(m) {
        super(m);
    }

    init() {
        this.swiper = new Swiper(this.el, {
           speed: 600,
           spaceBetween: 0,
           slidesPerView: 'auto'
        });
    }
}
