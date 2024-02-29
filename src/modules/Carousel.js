import { module } from 'modujs';
import {Swiper} from 'swiper';
import { Navigation } from 'swiper/modules';


export default class extends module {
    constructor(m) {
        super(m);

        
        this.$el = this.el;
        this.$swiper = this.$('swiper')[0];
        this.$prev = this.$('prev')[0];
        this.$next = this.$('next')[0];
    }

    init() {

        Swiper.use([Navigation]);

        this.swiper = new Swiper(this.$swiper, {
           speed: 600,
           spaceBetween: 0,
           slideClass: "w-embed",
           slidesPerView: 'auto',
           navigation: {
            nextEl: this.$next,
            prevEl: this.$prev,
           }

        });
    }
    destroy() {
        super.destroy();
        // this.swiper.destroy();
    }
}
