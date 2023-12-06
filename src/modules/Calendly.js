import { module } from "modujs";
import { html } from "../utils/environment";

// Builds the correct URL to pass into the Advanced Embed Code
const URL = "";

export default class extends module {
  constructor(m) {
    super(m);
    this.events = {
      click: {
        open: "showCalendly",
        close: "hideCalendly",
      },
    };
  }
  init() {}

  hideCalendly() {
    document.getElementById("main-container").style.display = "none";
  }

  showCalendly() {
    // Initialize Calendly Embed
    Calendly.initInlineWidget({
      url: URL,
      prefill: {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
      },
    });
  }
}
