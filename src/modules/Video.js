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


    // const option = {
    //   id: this.$videoId,
    // };


    this.player = new Player(this.$video);
    // this.player.unload()
    // console.log(this.player.unload());


    
    this.updateVideo()
   
  } 


  toggleVideo() {
    if (this.$el.classList.contains("has-played")) {
      this.muteVideo();
    } else {
      this.unmuteVideo();
    }
  }

  play(params){
    const {target} = params
    this.player = new Player(target);

    this.player.play()
  }


  muteVideo() {
    this.player.setVolume(0);
    this.$el.classList.remove("has-played");
  }


  unmuteVideo() {
    // this.player.setVolume(1);


    const videos = document.querySelectorAll('[data-video="toggler"]');
    
    for (let i = 0; i < videos.length; i++) {
        if (videos[i] !== this.$video) {
            const player = new Player(videos[i]);
            videos[i].classList.remove('has-played')
            player.setVolume(0);
        }
    }

    
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

  destroy() {
    super.destroy();
    this.player.destroy()
  }
}
