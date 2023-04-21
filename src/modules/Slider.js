import { module } from 'modujs';
import Swiper from 'swiper';
import '../node_modules/swiper/dist/css/swiper.css';

export default class extends module {
    constructor(m) {
        super(m);
    }

    init() {
        this.swiper = new Swiper(this.el, {
           speed: 200,
        });
    }
}
