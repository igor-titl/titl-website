import { module } from 'modujs';



export default class extends module {
    constructor(m) {
        super(m);
        this.events = {
            click: {
                link: 'handleClick'
            }
        }

        // this.el. = bind('click', this.closeModal.bind(this))
        // this.el.addEventListener('click', this.closeModal.bind(this));



     
    }

    // init(){

       
      
    // }

    handleClick(e) {
        // e.stopPropagation()
        e.preventDefault()
        console.log('handleClick', e)

        const el = e.curTarget;
        const url = el.href;
        const transition = 'home';

        // this.setActive(el);

        this.call('goTo', { url, transition }, 'Load');
    }



    // closeModal(el) {
    //     let link = 'https://titl.webflow.io/'
    //     let transition = 'home'
    //     console.log(el)
    //     // history.back();
    //     this.call('goTo', { link, transition}, 'Load')


    // }
}
