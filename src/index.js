import modular from "modujs";
import * as modules from "./modules";
import globals from "./globals";
import { html } from "./utils/environment";
import "./style.scss";
import gsap from "gsap";

const app = new modular({
  modules: modules,
});

window.onload = (event) => {
  const $style = document.getElementById("main-css");

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
  // html.classList.add("is-loading");
  // setTimeout(() => {
  //   html.classList.add("is-first-loaded");
  // }, 4000);

  // setTimeout(() => {
  //   html.classList.add("is-loaded");
  //   html.classList.add("is-ready");
  //   html.classList.remove("is-loading");
  //   // setTimeout(() => {
  //   //   document.querySelector(".c-preloader").remove();
  //   // }, 500);
  // }, 3000);

  // html.classList.add("is-loaded");
  // html.classList.add("is-ready");
  // html.classList.add("is-loading-callback");

  html.classList.remove("is-loading");

  gsap.delayedCall(0.2, () => {
    html.classList.add("is-first-load");

    gsap.delayedCall(3.6, () => {
      html.classList.add("has-dom-ready");
      html.classList.add("is-finish-load");
      html.classList.add("is-loaded");
      html.classList.add("is-ready");
      html.classList.add("is-loading-callback");

      gsap.delayedCall(0.4, () => {
        html.classList.remove("is-loading-callback");
      });
    });
  });
}
