import { module } from "modujs";

export default class extends module {
  constructor(m) {
    super(m);

    // UI
    this.$el = this.el;
    this.$video = this.$("video")[0];
    this.$bar = this.$("bar")[0];

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
  init() {}

  toggleVideo() {
    if (this.$el.classList.contains("has-played")) {
      this.pauseVideo();
    } else {
      this.playVideo();
    }
  }

  playVideo() {
    const video = document.querySelectorAll('[data-video="toggler"] video')
    
    const videoElem = document.querySelectorAll('[data-video="toggler"]')

    for(let i = 0; i < video.length; i++) {
        video[i].pause();
        videoElem[i].classList.remove('has-played')
        // this.isPlaying = false;
      }
    
    this.isPlaying = true;
    this.$el.classList.add("has-played");
    this.$video.play();
    this.updateVideo();
  }

  pauseVideo() {
    this.$el.classList.remove("has-played");
    this.$video.pause();
  }

  updateVideo() {
    this.$video.addEventListener("timeupdate", () => {
      const currentTime = this.$video.currentTime,
        duration = this.$video.duration,
        calc = currentTime / duration;
      this.$el.style.setProperty("--progress", calc);


      this.$video.addEventListener("ended", () => {
        this.pauseVideo();
        this.$video.currentTime = 0;
      });
    });
  }

  destroy() {
    super.destroy();
  }
}
