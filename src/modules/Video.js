import { module } from "modujs";
import Player from "@vimeo/player";

export default class extends module {
  constructor(m) {
    super(m);

    // UI



    this.$el = this.el;


    // Data


    this.$video = this.$("video")[0];

    // this.$videoId = this.$video.getAttribute('id');



   

    // Events
    this.events = {
      click: {
        toggler: "toggleVideo",
      },
    };
  }

  ///////////////
  // Lifecyle
  ///////////////
  init() {

    this.player = new Player(this.$video);
    this.updateVideo()

    // this.player.play()

    // console.log(this.player)

   
  // this.player('u')


    
    // console.log(this.player.unload());
// if(this.$video.classList.contains('is-inview')){

// this.play()
// }
   

  } 



  play(el){
    // const { target } = params

    // console.log(target)

// // if(el.obj.el.classList.contains('is-inview')){
// // this.player.play()
// //   }
    // const target = el.obj.el
    // console.log(target)
// //     // // this.player
    
    
// //     // if(params.obj.el.classList.contains('is-inview')) return;
    
// //     // // console.log(params)
// //     // // this.player.()
// //     // // this.player.autoplay = 1
// // //     this.player = new Player(el.obj.el);
   
// // // console.log(el.obj.el)

// this.player = new Player(target);
// this.player.play()
// // // setTimeout(() => {
// // // }, 1000)


// //     // this.player.setVolume(0)
  }



  toggleVideo() {
    if (this.$el.classList.contains("has-played")) {
      this.muteVideo();
    } else {
      this.unmuteVideo();
    }
  }

 

  muteVideo() {
    this.player.setVolume(0);
    this.$el.classList.remove("has-played");
  }


  unmuteVideo() {
    // this.player.setVolume(1);


    // const videos = document.querySelectorAll('[data-video="toggler"]');
    
    // for (let i = 0; i < videos.length; i++) {
    //     if (videos[i] !== this.$video) {
    //         const player = new Player(videos[i]);
    //         videos[i].classList.remove('has-played')
    //         player.setVolume(0);
    //     }
    // }

    
    this.player.setVolume(1);

    // for(let i = 0; i < video.length; i++) {
    //   video[i].muted = true;
    //     videoElem[i].classList.remove('has-played')
    //     // this.isPlaying = false;
    //   }
    
    // this.isPlaying = true;
    this.$el.classList.add("has-played");
 
  }

  updateVideo() {
  
    const el = this.$el

    this.player.on("timeupdate", function (data){
        el.style.setProperty("--progress", data.percent);
    });

  }

  // destroy() {
  //   super.destroy();
  //   this.player.destroy()
  // }
}
