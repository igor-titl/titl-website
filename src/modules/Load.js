// import { module } from 'modujs';
// import modularLoad from 'modularload';
// import { html } from '../utils/environment'

// export default class extends module {
//     constructor(m) {
//         super(m);
//     }

//     init() {
//         this.load = new modularLoad({
//             enterDelay: 1600,
//             transitions: {
//                 // agency: {
//                 //     enterDelay: 300
//                 // }
//             }
//         })
        
//         this.load.on('loading', (transition, oldContainer) => {
//             console.log("destroy")
//             html.classList.remove("is-text-animation");

//             setTimeout(()=>{
//                 html.classList.add("is-text-animation");
//             }, 0)
            
//             Webflow.destroy()
//         })

//         this.load.on('loaded', (transition, oldContainer, newContainer) => {
//             this.call('destroy', oldContainer, 'app');
//             this.call('update', newContainer, 'app');
            
         
//         })
//         this.load.on('loaded', (transition, oldContainer, newContainer) => {
//             Webflow.ready()
//             Webflow.require('ix2').init()
//             // setTimeout(()=>{
//             //     html.classList.remove("is-text-animation");
//             // }, 600)
//         })


//         // this.load.on('loading', (transition, oldContainer) => {
//         //     // this.call('close', null, 'Menu');

//         //     if(transition == 'agency') {
//         //         console.log("click")
                
//         //         this.call('toggle', null, 'Modal');
                
//         //         // this.call('destroy', null, 'Scroll')
//         //     }
//         // });
//     }
// }

import { module } from 'modujs';
import { html } from '../utils/environment';
import modularLoad from 'modularload';
import gsap from 'gsap';

export default class extends module {
    constructor(m) {
        super(m);
    }

    init() {
        this.load = new modularLoad({
            enterDelay: 200,
            transitions: {
                // customTransition: {},
                // filter: {}
            }
        });

        this.load.on('loading', (transition, oldContainer) => {
            html.classList.remove('has-dom-ready');
            html.classList.remove('has-scrolled');
            html.classList.remove('has-nav-open');
            html.classList.remove('has-filters- stick');
            html.classList.remove('-hide');
            html.classList.remove('has-nav-open-callback');

            html.classList.add('is-loading-callback');

        });

        this.load.on('loaded', (transition, oldContainer, newContainer) => {
            this.call('destroy', oldContainer, 'app');
            this.call('update', newContainer, 'app');

            html.setAttribute('data-direction', '');
            html.setAttribute('data-theme', newContainer.getAttribute('data-theme'));

            gsap.delayedCall(0.7, () => {

                html.classList.add('has-dom-ready');

                gsap.delayedCall(0.4, () => {
                    html.classList.remove('is-loading-callback');
                });
            });
        });

        window.addEventListener('modularimages', () => {
            this.call('update', null, 'Scroll')
        })
    }

    goTo(options) {
        const { url, transition } = options;
        this.load.goTo(url, transition);
    }
}
