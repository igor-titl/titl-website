import { module } from 'modujs';
import Swiper, { Navigation } from 'swiper';

export default class extends module {
    constructor(m) {
        super(m);
    }

    init() {
        const el = this.el
        this.swiper = new Swiper(el.querySelector(".swiper"), {
           modules: [Navigation],
           speed: 600,
           spaceBetween: 0,
           slidesPerView: 'auto',
           navigation: {
            nextEl: el.querySelector('.c-cases__slider-btn'),
           }

        });
    }
}
