import modular from "modujs";
import * as modules from "./modules";
import globals from "./globals";
import { html } from "./utils/environment";
import gsap from "gsap";
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

window.isMobile =
  /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

if (window.isMobile) {
  html.classList.add("is-mobile");
} else {
  html.classList.add("is-desktop");
}
if (window.isMobile) {
  if (window.innerWidth > 1000) {
    window.isTablet = true;
  }
}

window.isWindows = navigator.platform.indexOf("Win") > -1;

if (window.isWindows) {
  html.classList.add("is-windows");
}

window.isIos =
  /iPad|iPhone|iPod/.test(navigator.platform) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
if (window.isIos) {
  html.classList.add("is-ios");
}

window.firstHit = true;
window.readyDelay = 0.6;
window.modalDelay = 0.8;
window.readyCallbackDelay = 0;

function init() {
  app.init(app);

  const text = " This site was created by nickxsy ";
  const comment = document.createComment(text);
  document.insertBefore(comment, document.documentElement);

  globals();

  html.classList.remove("is-loading");

  html.classList.add("is-first-load");

  gsap.delayedCall(3.6, () => {
    html.classList.add("is-finish-load");
  });
  gsap.delayedCall(1, () => {
    html.classList.add("has-dom-ready");
    html.classList.add("is-loaded");
    html.classList.add("is-ready");
  });
}

// Bind window resize event with default vars
const resizeEndEvent = new CustomEvent(CUSTOM_EVENT.RESIZE_END);
function onResize() {
  $html.style.setProperty(
    "--vw",
    `${document.documentElement.clientWidth * 0.01}px`
  );
  $html.style.setProperty(
    "--vh",
    `${document.documentElement.clientHeight * 0.01}px`
  );
  window.dispatchEvent(resizeEndEvent);
}
window.addEventListener("resize", debounce(onResize, 200));
onResize();
