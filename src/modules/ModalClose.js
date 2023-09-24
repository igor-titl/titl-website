import { module } from 'modujs';



export default class extends module {
    constructor(m) {
        super(m);
        this.events = {
            click: {
                close: 'closeModal'
            }
        }
    }

    init(){

    }

    closeModal() {
        this.call('close', null, 'Modal')
        
        // this.call('goToPrevious', null, 'Modal')
    }
}
