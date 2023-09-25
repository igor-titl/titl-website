import { module } from 'modujs';


export default class extends module {
    constructor(m) {
        super(m);


        this.events = {
            click: {
                open: 'openMenu'
            }
        }
    }

    openMenu() {
        this.call('open', null, 'Menu')
    }
}
