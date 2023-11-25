import modular from "modujs";
import * as modules from "./modules";
import globals from "./globals";
import { html } from "./utils/environment";
import "./style.scss";

const app = new modular({
  modules: modules,
});

window.onload = (event) => {
  const $style = document.getElementById("main-css");

  // document.querySelector("#css").remove();
  // document.querySelector("#app").remove();

  if ($style) {
    if ($style.isLoaded) {
      init();
    } else {
      $style.addEventListener("load", (event) => {
        init();
      });
    }
  } else {
    console.warn('The "main-css" stylesheet not found');
  }
};

function init() {
  app.init(app);

  const text = " This site was created by nickxsy ";
  const comment = document.createComment(text);
  document.insertBefore(comment, document.documentElement);

  globals();

  html.classList.remove("is-loading");

  html.classList.add("is-first-load");

  gsap.delayedCall(1.8, () => {
    html.classList.add("is-finish-load");
  });
  gsap.delayedCall(0.2, () => {
    html.classList.add("has-dom-ready");
    html.classList.add("is-loaded");
    html.classList.add("is-ready");
  });
  // });
}
