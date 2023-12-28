

// import { module } from 'modujs';
// import modularLoad from 'modularload';
// import { html } from '../utils/environment';


// export default class extends module {
//     constructor(m) {
//         super(m);
//     }

//     init() {
//         this.load = new modularLoad({
//             enterDelay: 0,
//             exitDelay: 600,
//             transitions: {
//             }
//         });

//         this.load.on('loaded', (transition, oldContainer, newContainer) => {
//             this.call('destroy', oldContainer, 'app');
//             this.call('update', newContainer, 'app');

//                 this.call('update', null, 'Scroll');
          
//         });

//         this.load.on('loading', (transition, oldContainer) => {
//             this.call('close', null, 'Menu');

//             this.call('update', null, 'Scroll');

//             html.classList.remove('has-menu-open');
        
//         });
//     }


//     goTo(obj) {
//         this.load.goTo(obj.url, obj.transition);
//     }
// }
 

import { module } from 'modujs';
import modularLoad from 'modularload';
// import gsap from 'gsap';
import { html, body } from '../utils/environment';

export default class extends module {
    constructor(m) {
        super(m);
    }

    init() {
        gsap.delayedCall(window.readyDelay,() => {
            this.setSizes();
        });

        const load = new modularLoad({
            // enterDelay: 0,
            exitDelay: 800,
            transitions: {
                modal: {
                    // enterDelay: 0,
                    // exitDelay: 600,
                }
            }
        });

        load.on('loading', (transition, oldContainer) => {
            html.classList.remove('has-dom-ready');
            html.classList.remove('has-dom-ready-callback');
            html.classList.remove('has-dom-animated');
            html.setAttribute('data-scroll-direction', 'up')

            html.classList.add('is-preloading');

            this.call('close','Nav');

            console.log('loading');
        });

        load.on('loaded', (transition, oldContainer, newContainer) => {
            
            this.call('destroy', oldContainer, 'app');
            this.call('update', newContainer, 'app');
            html.setAttribute('data-scroll-direction', 'up')
            let url = window.location.href;

            if (typeof window._paq !== "undefined") {
                _paq.push(["setCustomUrl", url]);
                _paq.push(["setDocumentTitle", document.title]);
                _paq.push(["trackPageView"]);
            }

            gsap.delayedCall(window.readyDelay,() => {
                html.setAttribute('data-theme','');
                html.classList.remove('is-preloading');
                html.classList.add('has-dom-ready');

                this.setSizes();
                
                body.setAttribute('class',newContainer.getAttribute('class'));

               
                
            });

            gsap.delayedCall(window.readyCallbackDelay,() => {
                html.classList.add('has-dom-ready-callback');
                html.classList.add('has-dom-animated');
            });
        });
    }

    setSizes() {
        
        if (window.innerHeight - document.documentElement.clientHeight > 0) {
            body.classList.add('has-scrollbar-y');
            document.documentElement.style.setProperty('--scrollbar',`${window.innerHeight - document.documentElement.clientHeight}px`);
        } else {
            body.classList.remove('has-scrollbar-y');
        }

        // screen height
        document.documentElement.style.setProperty('--app-availheight',`${window.screen.availHeight}px`);
        document.documentElement.style.setProperty('--app-height',`${window.innerHeight}px`);
        document.documentElement.style.setProperty('--app-height-negative',`-${window.innerHeight}px`);

        window.addEventListener('resize',() => {

            if(!window.isMobile) {
                document.documentElement.style.setProperty('--app-availheight',`${window.screen.availHeight}px`);
                document.documentElement.style.setProperty('--app-height',`${window.innerHeight}px`);
                document.documentElement.style.setProperty('--app-height-negative',`-${window.innerHeight}px`);
            }
        });
    }
}
