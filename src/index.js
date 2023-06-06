import modular from "modujs";
import * as modules from "./modules";
import globals from "./globals";
import { html } from "./utils/environment";

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
  html.classList.add("is-text-animation");
  setTimeout(() => {
    html.classList.add("is-first-loaded");
  }, 300);
  setTimeout(() => {
    html.classList.add("is-loaded");
    html.classList.add("is-ready");
  }, 1260);
}
