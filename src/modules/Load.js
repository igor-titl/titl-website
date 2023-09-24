// import { module } from 'modujs';
// import { html } from '../utils/environment';
// import modularLoad from 'modularload';


// export default class extends module {
//     constructor(m) {
//         super(m);
//     }

//     init() {
//         this.load = new modularLoad({
//             enterDelay: 200,
//             transitions: {
//                 agency: {
//                     enterDelay: 0
//                 }
//             }
//         });

//         this.load.on('loading', (transition, oldContainer) => {
//             html.classList.remove('has-dom-ready');
//             html.classList.remove('has-scrolled');
//             html.classList.remove('has-nav-open');
            
//             // html.classList.remove('has-filters- stick');
//             // html.classList.remove('-hide');
//             // html.classList.remove('has-nav-open-callback');

//             html.classList.add('is-loading-callback');

//         });

//         this.load.on('loaded', (transition, oldContainer, newContainer) => {
//             this.call('destroy', oldContainer, 'app');
//             this.call('update', newContainer, 'app');

//             // html.setAttribute('data-direction', '');
//             // html.setAttribute('data-theme', newContainer.getAttribute('data-theme'));

//             gsap.delayedCall(0.2, () => {

//                 html.classList.add('has-dom-ready');

//                 // gsap.delayedCall(0.4, () => {
//                 //     html.classList.remove('is-loading-callback');
//                 // });
//             });
//         });

//         // window.addEventListener('modularimages', () => {
//         //     this.call('update', null, 'Scroll')
//         // })

//         this.load.on('loading', (transition, oldContainer) => {
//             this.call('close', null, 'Menu');

//             if(transition == 'agency') {
//                 this.call('toggle', null, 'Modal');
//             }
//         });
//     }

    

//     goTo(options) {
//         const { url, transition } = options;
//         this.load.goTo(url, transition);
//     }
// }

import { module } from 'modujs';
import modularLoad from 'modularload';
import gsap from 'gsap';


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
                },
                higlights: {
                    enterDelay: 300
                },
            }
        });

        this.load.on('loaded', (transition, oldContainer, newContainer) => {
            this.call('destroy', oldContainer, 'app');
            this.call('update', newContainer, 'app');

                this.call('update', null, 'Scroll');
            

            // gsap.delayedCall(0.6, () => {
            //     console.log('scroll')
        // });
          
        });

        this.load.on('loading', (transition, oldContainer) => {
            this.call('close', null, 'Menu');

            this.call('update', null, 'Scroll');

            
            if(transition == 'agency') {
                this.call('open', null, 'ModalAgency');
            }
            
            if(transition == 'higlights') {
                this.call('open', null, 'ModalHiglights');
            }
        });
    }


    // goTo(obj) {
    //     this.load.goTo(obj.url, obj.transition);
    // }
}
 