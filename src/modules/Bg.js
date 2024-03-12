import { module } from "modujs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class extends module {
  constructor(m) {
    super(m);

    // Events

    // UI

    this.$item = gsap.utils.toArray(this.$("item"));
    this.$scroller = document.querySelector(".c-scroll-wrapper_inner");
  }

  init() {
    // const options = (el) => ({
    //   trigger: el,
    //   scroller: this.$scroller,
    //   // start: 'top top',
    //   end: "bottom bottom",
    //   scrub: true,
    //   markers: true,
    // });

    const $marker = true;


    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: this.$item[0],
            scroller: this.$scroller,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            markers: true,
            id: 1
          },
    });

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: this.$item[2],
        scroller: this.$scroller,
        start: '-25% center',
        end: "25% center",
        scrub: true,
        markers: $marker,
        id: 2
      },
    });
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: this.$item[3],
        scroller: this.$scroller,
        start: '-25% center',
        end: "25% center",
        scrub: true,
        markers: $marker,
        id: 3
      },
    });
    const tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: this.$item[4],
        scroller: this.$scroller,
        start: '-25% center',
        end: "25% center",
        scrub: true,
        markers: $marker,
        id: 4
      },
    });

    // const tl = gsap.timeline()

    tl.fromTo(
      document.body,
      {
        backgroundColor: "#fff",
        // backgroundColor: '#fff',
        // duration: 1,
        // ease: 'power1.inOut'
      },
      {
        backgroundColor: "#edf2f9",
      }
    );

    tl2.fromTo(
      document.body,
      {
        backgroundColor: "#fff",
      },
      {
        backgroundColor: "#edf2f9",
      }
    );
    tl3.fromTo(
      document.body,
      {
        backgroundColor: "#edf2f9",
      },
      { backgroundColor: "#fff" }
    );
    tl4.fromTo(
      document.body,
      { backgroundColor: "#fff" },
      {
        backgroundColor: "#edf2f9",
      },
   
    );
  }
}
