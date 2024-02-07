import { module } from 'modujs';


const TextFlip = ['Hey you there?', 'Hello', 'Hi'];


export default class extends module {
    constructor(m) {
        super(m);
       
    }

    init(){
        for(let i = 0; i < TextFlip.length; i++){
           
            // console.log(TextFlip[i]);
        //     setInterval(() => {
        //         this.el.innerHTML = TextFlip[i];
                   
        // }, 2000);
        }
        
        

    }

   destroy(){
       super.destroy()
   }
}
