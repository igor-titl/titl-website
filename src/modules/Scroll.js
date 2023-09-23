// import { module } from 'modujs';
// import { lazyLoadImage } from '../utils/image';
// import LocomotiveScroll from 'locomotive-scroll';
// import { html } from '../utils/environment';
// import gsap from 'gsap'

// const HEADER_THRESHOLD = 300

// export default class extends module {
//     constructor(m) {
//         super(m)

//         if (history.scrollRestoration) {
//             history.scrollRestoration = 'manual'

//             window.scrollTo(0,0)
//         }

//         // Binding
//         this.onResizeBind = this.onResize.bind(this)
//         this.onScrollBind = this.onScroll.bind(this)
//     }

//     ///////////////
//     // Lifecyle
//     ///////////////
//     init() {
//         // Events
//         this.bindEvents()

// console.log("lenis init")

//         // Scroll Instance
//         this.locomotiveScrollInstance = new LocomotiveScroll({
//             lenisOptions:{
//                 // duration: 0.6,
//                 // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
//                 // direction: 'vertical', // vertical, horizontal
//                 // gestureDirection: 'vertical', // vertical, horizontal, both
//                 // smooth: true,
//                 // mouseMultiplier: 1,
//                 // smoothTouch: false,
//                 // touchMultiplier: 2,
//                 lerp: 0.055,
//             },
         
//             triggerRootMargin: "-1px -5% -1px -5%",
//             scrollCallback: this.onScrollBind,
//             modularInstance: this,
//             initCustomTicker: (render) => {
//                 gsap.ticker.add(render);
//             },
//             destroyCustomTicker: (render) => {
//                 gsap.ticker.remove(render);
//             }
//         })

//         this.locomotiveScrollInstance.start()

//         this.onScrollBind

//         if(html.scrollTop > HEADER_THRESHOLD) {
//             html.classList.add('has-scrolled')
//         }
//     }

//     destroy() {
//         // Events
//         this.unbindEvents()

//         // Scroll Instance
//         this.locomotiveScrollInstance?.destroy()
//     }

//     ///////////////
//     // Events
//     ///////////////
//     bindEvents() {
//         window.addEventListener("resize", this.onResizeBind)
//     }

//     unbindEvents() {
//         window.removeEventListener("resize", this.onResizeBind)
//     }

//     ///////////////
//     // Callbacks
//     ///////////////
//     onScroll({ scroll, limit, velocity, direction, progress }) {
//         // Show / Hide fixed header
//         if(scroll > HEADER_THRESHOLD && !html.classList.contains('has-scrolled')) {
//             html.classList.add('has-scrolled')
//         } else if (scroll <= HEADER_THRESHOLD && html.classList.contains('has-scrolled')) {
//             html.classList.remove('has-scrolled')
//         }

//         // Set global velocity variable
//         // used by ScalingVisual.js
//         window.scrollVelocity = velocity
        
//         window.scrollDirection = direction
//     }

//     onResize() {
//         this.locomotiveScrollInstance?.resize()
//     }

//     /**
//      * Lazy load the related image.
//      *
//      * @see ../utils/image.js
//      *
//      * It is recommended to wrap your `<img>` into an element with the
//      * CSS class name `.c-lazy`. The CSS class name modifier `.-lazy-loaded`
//      * will be applied on both the image and the parent wrapper.
//      *
//      * ```html
//      * <div class="c-lazy o-ratio u-4:3">
//      *     <img data-scroll data-scroll-call="lazyLoad, Scroll, main" data-src="http://picsum.photos/640/480?v=1" alt="" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" />
//      * </div>
//      * ```
//      *
//      * @param {LocomotiveScroll} args - The Locomotive Scroll instance.
//      */
//     lazyLoad(args) {
//         lazyLoadImage(args.target)
//     }

//     removeScrollElements($oldContainer) {
//         this.locomotiveScrollInstance?.removeScrollElements($oldContainer)
        
//     }

//     addScrollElements($newContainer) {
//         this.locomotiveScrollInstance?.addScrollElements($newContainer)
        
        
//     }

//     stop() {
//         this.locomotiveScrollInstance?.stop()
//     }

//     start() {
//         this.locomotiveScrollInstance?.start()
//     }

//     /**
//      * ScrollTo
//      *
//      * @param {Int, NodeElement or String} target - The scrollTo a target
//      * @param {Object} options - The scrollTo options (offset, duration, easing, immediate)
//      *
//      * @see https://github.com/studio-freight/lenis#methods
//      *
//      */
//     scrollTo(params) {
//         const { target, options } = params
//         this.locomotiveScrollInstance?.lenisInstance?.scrollTo(target, options)
//     }

//     // Hide header when footer is in-view
//     hideHeader(args) {
//         if (args.way === 'enter') {
//             html.classList.add('has-header-hidden')
//         }
//         if (args.way === 'leave') {
//             html.classList.remove('has-header-hidden')
//         }
//     }
// }




import { module } from 'modujs';
import LocomotiveScroll from 'locomotive-scroll';
import { lazyLoadImage } from '../utils/image';
import { html } from '../utils/environment';

export default class extends module {
    constructor(m) {
        super(m)

        // Binding
        this.onResizeBind = this.onResize.bind(this)

        // Data
        this.isSmooth = this.getData('smooth') == 'false' ? false : true
    }

    ///////////////
    // Lifecyle
    ///////////////
    init() {
        this.initScroll()
        this.bindEvents()
    }

    destroy() {
        this.scroll.destroy();
        this.unbindEvents()
        super.destroy()
    }

    ///////////////
    // Events
    ///////////////
    bindEvents() {
        window.addEventListener('resizeEnd', this.onResizeBind)
    }

    unbindEvents() {
        window.removeEventListener('resizeEnd', this.onResizeBind)
    }

    ///////////////
    // Callbacks
    ///////////////

    onResize() {
        this.scroll?.update();
    }

    ///////////////
    // Methods
    ///////////////
    initScroll() {
        console.log(this.el)
        this.scroll = new LocomotiveScroll({
            el: this.el,
            smooth: this.isSmooth,
            mobile:{
                breakpoint:0,
                smooth: true,
                multiplier: 125,
                touchMultiplier: 3,
                class: "is-reveal",
            },
            tablet:{
                breakpoint:0,
                touchMultiplier: 3,
                smooth: true,
                multiplier: 125,
                class: "is-reveal",
            },
            // scrollbarContainer: this.el.parentNode,
            // getDirection: true,
            // multiplier: 0.5,
            // lerp: 0.06,
        });

        this.scroll.on('call', (func, way, obj, id) => {
            // Using modularJS
            this.call(func[0], { way, obj }, func[1], func[2]);
        });

        this.scroll.on('scroll', (args) => {
            window.scrollDirection = args.direction

            if(args.scroll.y > 200 && !html.classList.contains('has-scrolled')) {
                html.classList.add('has-scrolled');
            } else if (args.scroll.y < 200 && html.classList.contains('has-scrolled')) {
                html.classList.remove('has-scrolled');
            }

            // Scroll image
            if (typeof args.currentElements['scrollImage'] === 'object') {
                const progress = args.currentElements['scrollImage'].progress
                this.call('onProgress', progress, 'ScrollImage')
            }

            // Team
            if (typeof args.currentElements['team'] === 'object') {
                const progress = args.currentElements['team'].progress
                this.call('onProgress', progress, 'Team')
            }

            // Progress carousel
            if (typeof args.currentElements['progressCarousel'] === 'object') {
                const progress = args.currentElements['progressCarousel'].progress
                this.call('onProgress', progress, 'ProgressCarousel')
            }
        })
    }


    /**
     * Lazy load the related image.
     *
     * @see ../utils/image.js
     *
     * It is recommended to wrap your `<img>` into an element with the
     * CSS class name `.c-lazy`. The CSS class name modifier `.-lazy-loaded`
     * will be applied on both the image and the parent wrapper.
     *
     * ```html
     * <div class="c-lazy o-ratio u-4:3">
     *     <img data-scroll data-scroll-call="lazyLoad, Scroll, main" data-src="http://picsum.photos/640/480?v=1" alt="" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" />
     * </div>
     * ```
     *
     * @param {LocomotiveScroll} args - The Locomotive Scroll instance.
     */
    lazyLoad(args) {
        lazyLoadImage(args.obj.el, null, () => {
            //callback
        })
    }

    // toggleVideo(args) {
    //     let $target

    //     if (args.obj.target) {
    //         $target = args.obj.target
    //     } else if (args.obj.targetEl) {
    //         $target = args.obj.targetEl
    //     } else {
    //         return
    //     }

    //     const moduleID = $target.dataset.moduleVideoInview

    //     if (args.way === 'enter') {
    //         this.call('onEnter', null, 'VideoInview', moduleID)
    //     } else if (args.way === 'exit') {
    //         this.call('onLeave', null, 'VideoInview', moduleID)
    //     }
    // }

    update() {
        this.scroll?.update()
    }

    scrollToTop() {
        this.scroll?.scrollTo(0)
    }

    scrollTo(params) {
        this.scroll?.scrollTo?.(params.target, params.options);
    }   

    stop() {
        this.scroll?.stop();
    }

    start() {
        this.scroll?.start();
    }
}
