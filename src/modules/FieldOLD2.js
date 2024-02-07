import { module } from "modujs";

export default class extends module {
  constructor(m) {
    super(m);

    // this.events = {
    //     focus:{
    //       input: 'clickField'
    //     }
    // }

    // UI
    this.$el = this.el
    // this.$inputCaret = this.$('caret')[0]
    
    
    
    this.$input = this.$('input')[0];
    this.$cursor = this.$('cursor')[0];

  }

  ///////////////
  // Lifecyle
  ///////////////
  init() {
    this.$cursor = $("cursor");
    this.$cursor.style.left = "0px";

    this.$input.addEventListener('onkeydown', this.moveIt.bind(this));
    this.$input.addEventListener('onkeydown', this.writeit.bind(this));
    this.$input.addEventListener('onkeyup', this.writeit.bind(this));
    this.$input.addEventListener('onkeypress', this.writeit.bind(this));

  }

  $(elid) {
    return document.getElementById(elid);
  }

  nl2br(txt) {
    return txt.replace(/\n/g, "<br />");
  }

  writeit(from, e) {
    e = e || window.event;
    var w = $("writer");
    var tw = from.value;
    w.innerHTML = nl2br(tw);
  }

  moveIt(count, e) {
    e = e || window.event;
    var keycode = e.keyCode || e.which;
    //				alert(count);
    if (keycode == 37 && parseInt( this.$cursor.style.left) >= 0 - (count - 1) * 10) {
       this.$cursor.style.left = parseInt( this.$cursor.style.left) - 10 + "px";
    } else if (keycode == 39 && parseInt( this.$cursor.style.left) + 10 <= 0) {
       this.$cursor.style.left = parseInt( this.$cursor.style.left) + 10 + "px";
    }
  }

  alert(txt) {
    console.log(txt);
  }
}
