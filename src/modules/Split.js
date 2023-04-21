import { module } from 'modujs';
import SplitType from 'split-type';
import gsap from 'gsap';


export default class extends module {
  constructor(m) {
    super(m);
    }


  init(e) {
    
    let elem = new SplitType( this.el, { types: 'words, chars' })



gsap.from(elem.words, {
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: { amount: 0.3 },
    })
   }   
}
