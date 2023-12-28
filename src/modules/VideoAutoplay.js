import { module } from 'modujs';

export default class extends module {
    constructor(m) {
        super(m);
    }

    play(e) {


        if(e.obj.el != this.el) return;
const element = this.el
console.log(element)

        this.call('videoAutoplay', {target: element}, 'Video')
    }
}
