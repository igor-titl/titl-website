import { html } from "./utils/environment";

export default function () {
  // ==========================================================================
  // vh
  // ==========================================================================

  let viewportWidth = window.innerWidth;
  // console.log(window.innerHeight);
  html.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);

  window.addEventListener("resize", () => {
    // if(window.innerWidth > 1024 && window.matchMedia("(hover: hover)"))

    if (
      window.innerWidth != viewportWidth &&
      window.matchMedia("(hover: none)" || window.innerWidth < 1024)
    ) {
      viewportWidth = window.innerWidth;
      html.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    }
  });
}
