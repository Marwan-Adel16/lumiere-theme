class CollectionController {
  constructor() {
    this.drawer = document.querySelector("[data-filter-drawer]");
    this.overlay = document.querySelector("[data-filter-overlay]");
    this.openButtons = document.querySelectorAll("[data-open-filters]");
    this.closeButtons = document.querySelectorAll("[data-close-filters]");

    if (!this.drawer) return;

    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.openButtons.forEach((button) => {
      button.addEventListener("click", () => this.openDrawer());
    });

    this.closeButtons.forEach((button) => {
      button.addEventListener("click", () => this.closeDrawer());
    });

    if (this.overlay) {
      this.overlay.addEventListener("click", () => this.closeDrawer());
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.closeDrawer();
      }
    });
  }

  openDrawer() {
    this.drawer.classList.add("is-open");

    if (this.overlay) {
      this.overlay.classList.add("is-visible");
    }

    document.body.classList.add("overflow-hidden");
  }

  closeDrawer() {
    this.drawer.classList.remove("is-open");

    if (this.overlay) {
      this.overlay.classList.remove("is-visible");
    }

    document.body.classList.remove("overflow-hidden");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new CollectionController();
});
