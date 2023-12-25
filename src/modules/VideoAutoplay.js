import { module } from 'modujs';
import Player from "@vimeo/player";

export default class extends module {
    constructor(m) {
        super(m);
    }

    play(e) {
        if(e.obj.el != this.el) return;
        this.call('play', null, 'Video')
    }
}
