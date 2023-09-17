import { module } from 'modujs';
import modularLoad from 'modularload';
import { html } from '../utils/environment'

export default class extends module {
    constructor(m) {
        super(m);
    }

    init() {
        this.load = new modularLoad({
            enterDelay: 600,
            transitions: {
                agency: {
                    enterDelay: 300
                }
            }
        })
        
        // this.load.on('loading', (transition, oldContainer) => {
        //     console.log("destroy")
        //     html.classList.remove("is-text-animation");

        //     setTimeout(()=>{
        //         html.classList.add("is-text-animation");
        //     }, 0)
            
        //     Webflow.destroy()
        // })

        this.load.on('loaded', (transition, oldContainer, newContainer) => {
            this.call('destroy', oldContainer, 'app');
            this.call('update', newContainer, 'app');
            
         
        })
        // this.load.on('loaded', (transition, oldContainer, newContainer) => {
        //     Webflow.ready()
        //     Webflow.require('ix2').init()
        //     // setTimeout(()=>{
        //     //     html.classList.remove("is-text-animation");
        //     // }, 600)
        // })


        this.load.on('loading', (transition, oldContainer) => {
            // this.call('close', null, 'Menu');

            if(transition == 'agency') {
                console.log("click")
                
                this.call('toggle', null, 'Modal');
                
                // this.call('destroy', null, 'Scroll')
            }
        });
    }
}