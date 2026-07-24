// assets/global.js

document.documentElement.className = document.documentElement.className.replace(
  "no-js",
  "js",
);

if (Shopify.designMode) {
  document.documentElement.classList.add("shopify-design-mode");
}

/**
 * Focus trapping utility for accessibility
 */
const focusableElements =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function trapFocus(container, elementToFocus = container) {
  const elements = Array.from(container.querySelectorAll(focusableElements));
  const first = elements[0];
  const last = elements[elements.length - 1];

  container.addEventListener("keydown", (e) => {
    if (e.code.toUpperCase() !== "TAB") return;

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  elementToFocus.focus();
}

function removeTrapFocus(elementToFocus = null) {
  document.removeEventListener("focusin", trapFocus);
  if (elementToFocus) elementToFocus.focus();
}

/**
 * Base custom element class
 */
class LumiereElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if (this.hasAttribute("data-initialized")) return;
    this.setAttribute("data-initialized", "true");
    this.init();
  }

  init() {
    // Override in subclass
  }

  emitEvent(eventName, detail = {}) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: true,
        cancelable: true,
        detail,
      }),
    );
  }
}

window.LumiereElement = LumiereElement;

// Prevent form submission on enter for basic inputs
document.addEventListener("keydown", (event) => {
  if (
    event.code === "Enter" &&
    event.target.tagName === "INPUT" &&
    event.target.type !== "submit"
  ) {
    const form = event.target.closest("form");
    if (form && !form.hasAttribute("data-submit-on-enter")) {
      event.preventDefault();
    }
  }
});
