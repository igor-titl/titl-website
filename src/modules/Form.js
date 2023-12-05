import { module } from 'modujs';

export default class extends module {
    constructor(m) {
        super(m);
        

    }

    


   

    destroy() {
        document.removeEventListener('keyup', this.closeBind)
    }
}
