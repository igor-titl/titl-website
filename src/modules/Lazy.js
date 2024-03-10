import { module } from 'modujs';
// import { lazyLoadImage } from "../utils/image";

export default class extends module {
    constructor(m) {
        super(m);
    }

    lazy(e){
        console.log(e)
        // lazyLoadImage(args.target)
    }

}