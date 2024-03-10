
import { module } from 'modujs';
import { lazyLoadImage } from '../utils/image'
// import { lazyLoadVideo } from '../utils/video'
import LocomotiveScroll from 'locomotive-scroll';
import { html } from "../utils/environment";





export default class extends module {
    constructor(m) {
        super(m);


        if (history.scrollRestoration) {
            history.scrollRestoration = "manual";
      
            window.scrollTo(0, 0);
          }

        // this.onScrollBind = this.onScroll.bind(this);
        // this.onDragStartBind = this.onDragStart.bind(this);
        // this.onDragMoveBind = this.onDragMove.bind(this);
        // this.onDragEndBind = this.onDragEnd.bind(this);


        this.onResizeBind = this.onResize.bind(this)

        // this.$scrollbarThumb = document.getElementById("thumb");




        this.$el = this.el
        this.$name = this.el.closest("[data-scroll-parent]");

        this.$wrapper = typeof this.getData('wrapper') == 'string' ? document.querySelector(this.getData('wrapper')) : window;


        // this.dragging = false;
        // this.startY = 0;
        // this.startScrollY = 0;
        // this.$progressTime = 0;
        
    //    this.height = 0
    }

    init(scroll) {
      
       

      const link = document.querySelectorAll('[data-scroll-to]');


      link.forEach((item) => {
        const href = item.getAttribute('href')
        item.addEventListener('click', (e)=>{
           e.preventDefault();
            e.stopImmediatePropagation();
            e.stopPropagation();
            this.scrollTo({target: href})
        })
      })


      // console.log(this.el.getAttribute('data-modul   e-scroll'))
      // console.log(this.$name)
        // if(this.$name === null) return

        this.scrollInit();
  
    

        // this.scrollWrap.clientHeight * container.clientHeight / container.scrollHeight +'px';

        

        // this.scrollBar()
       this.bindEvents()

        

        // Add event listeners for drag
        // this.$scrollbarThumb.addEventListener('mousedown', this.onDragStartBind);
        // document.addEventListener('mousemove', this.onDragMoveBind);
        // document.addEventListener('mouseup', this.onDragEndBind);
    }

    scrollInit(el){
    //   let  { name } = el
    // //   console.log(name.parentNode().querySelector("[data-modal]"))
    //   console.log(this.$el.closest("[data-modal]"))

      this.locomotiveScroll = new LocomotiveScroll({
        // lenisOptions: {
        //   duration: 0.5,
        // },
        triggerRootMargin: "-1px -5% -1px -5%",
         
          modularInstance: this,
          scrollCallback: this.onScrollBind,
          lenisOptions: {
            smoothWheel: window.isReducedMotion ? false : true,
            wrapper: this.$el.parentNode,
            content: this.$el,
           }
      });
    
    }



    

    // scrollBar(){
    //     this.height =  document.documentElement.clientHeight * document.documentElement.clientHeight / this.el.scrollHeight
    //     this.$scrollbarThumb.style.height = `${this.height}px`;
    // }

    ///////////////
    // Callbacks
    ///////////////
    onResize() {
         this.locomotiveScroll?.resize();
        // this.height =  document.documentElement.clientHeight * document.documentElement.clientHeight / this.el.scrollHeight
        // this.$scrollbarThumb.style.height = `${this.height}px`;
    }



    onScroll({ scroll, limit, velocity, direction, progress }) {
        window.locomotiveScrollData = { scroll, limit, velocity, direction, progress };

        // this.$progressTime = { progress };

        // Update thumb position during regular scrolling
        // this.$scrollbarThumb.style.transform = `translate3d(0,${progress * (window.innerHeight - this.height)}px,0)`;

        if(scroll > 100){
          html.classList.add('has-scrolled');
        }
        if (scroll < 100){
          html.classList.remove('has-scrolled');
        }
    }

    // onDragStart(event) {
    //     document.documentElement.classList.add('has-scroll-dragging')
    //     this.dragging = true;
    //     this.startY = event.clientY;
    //     this.startScrollY = this.locomotiveScroll.lenisInstance.targetScroll ;
    // }

    // onDragMove(event) {
       
    //     if (this.dragging) {
    //         const deltaY = event.clientY - this.startY;
    //         const scrollDelta = deltaY * (this.locomotiveScroll.lenisInstance.limit / window.innerHeight);
    //         this.locomotiveScroll.scrollTo(this.startScrollY + scrollDelta);
    //     }
    // }

    // onDragEnd() {
    //     document.documentElement.classList.remove('has-scroll-dragging')
    //     this.dragging = false;
    // }

      ///////////////
      // Events
      ///////////////
      bindEvents() {
        window.addEventListener("resize", this.onResizeBind);
      }
    
      unbindEvents() {
        window.removeEventListener("resize", this.onResizeBind);
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
        lazyLoadImage(args.target);
      }
    
      removeScrollElements($oldContainer) {
        console.log($oldContainer)
        this.locomotiveScroll?.removeScrollElements($oldContainer);
      }
    
      addScrollElements($newContainer) {
        this.locomotiveScroll?.addScrollElements($newContainer);
      }
    
      stop() {
        this.locomotiveScroll?.stop();
      }
    
      start() {
        this.locomotiveScroll?.start();
      }
      update() {
        // console.log(progress)
        this.locomotiveScroll?.resize();
        // this.onScroll({progress});
      }
    
      /**
       * ScrollTo
       *
       * @param {Int, NodeElement or String} target - The scrollTo a target
       * @param {Object} options - The scrollTo options (offset, duration, easing, immediate)
       *
       * @see https://github.com/studio-freight/lenis#methods
       *
       */
      scrollTo(params) {
        const { target, options } = params;

        this.locomotiveScroll?.scrollTo(target, options);
    
      }

    destroy() {
        super.destroy();
        this.locomotiveScroll?.destroy();

          // Events
          this.unbindEvents();

        // // Remove event listeners on destroy
        // this.$scrollbarThumb.removeEventListener('mousedown', this.onDragStartBind);
        // this.$scrollbarThumb.removeEventListener('touchstart', this.onDragStartBind);

        // this.$scrollbarThumb.removeEventListener('mousemove', this.onDragMoveBind);
        // this.$scrollbarThumb.removeEventListener('touchmove', this.onDragMoveBind);

        // document.removeEventListener('mousemove', this.onDragMoveBind);
        // document.removeEventListener('mouseup', this.onDragEndBind);
    }
}
