import { module } from 'modujs';
import SplitType from 'split-type';
import gsap from 'gsap';


export default class extends module {
  constructor(m) {
    super(m);
    }


  init(e) {
    
    let elem = new SplitType( this.el, { types: 'lines' })



gsap.from(elem.lines, {
    opacity: 0,
    y: 20,
    rotate: 2,
    duration: 0.5,
    stagger: { amount: 0.3 },
    })
   }   
}
