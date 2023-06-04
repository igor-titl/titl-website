import { module } from 'modujs';
import modularLoad from 'modularload';

export default class extends module {
    constructor(m) {
        super(m);
    }

    init() {
        this.load = new modularLoad({
            enterDelay: 500,
            transitions: {
            }
        })
        
        this.load.on('loading', (transition, oldContainer) => {
            console.log("destroy")
            Webflow.destroy()
        })

        this.load.on('loaded', (transition, oldContainer, newContainer) => {
            console.log("new lottie")
            this.call('destroy', oldContainer, 'app');
            this.call('update', newContainer, 'app');
         
        })
        this.load.on('loaded', (transition, oldContainer, newContainer) => {
            Webflow.ready()
            Webflow.require('ix2').init()
        })
    }
}