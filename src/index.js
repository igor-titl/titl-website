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

  globals();

  setTimeout(() => {
    html.classList.add("is-first-loaded");
  }, 50);

  setTimeout(() => {
    html.classList.add("is-loaded");
    html.classList.add("is-ready");
    html.classList.remove("is-loading");
    setTimeout(() => {
      document.querySelector(".c-preloader").remove();
    }, 500);
  }, 2700);
}
