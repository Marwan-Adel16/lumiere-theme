document.addEventListener("DOMContentLoaded", () => {
  /* ============================================
     Collection Grid / List View
  ============================================ */

  const grid = document.querySelector("[data-product-grid]");
  const gridButton = document.querySelector("[data-grid-view]");
  const listButton = document.querySelector("[data-list-view]");

  if (grid && gridButton && listButton) {
    const savedView = localStorage.getItem("collection-view");

    if (savedView === "list") {
      enableListView();
    }

    gridButton.addEventListener("click", () => {
      enableGridView();
    });

    listButton.addEventListener("click", () => {
      enableListView();
    });

    function enableGridView() {
      grid.classList.remove("collection-grid--list");

      gridButton.classList.add("is-active");
      listButton.classList.remove("is-active");

      localStorage.setItem("collection-view", "grid");
    }

    function enableListView() {
      grid.classList.add("collection-grid--list");

      listButton.classList.add("is-active");
      gridButton.classList.remove("is-active");

      localStorage.setItem("collection-view", "list");
    }
  }

  /* ============================================
     Collection Sorting
  ============================================ */

  const sortSelect = document.querySelector("[data-sort-select]");

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      const url = new URL(window.location.href);

      url.searchParams.set("sort_by", sortSelect.value);

      window.location.href = url.toString();
    });
  }

  /* ============================================
   Filter Drawer
============================================ */

  const filterDrawer = document.querySelector("[data-filter-drawer]");

  if (filterDrawer) {
    const overlay = filterDrawer.querySelector("[data-filter-overlay]");
    const panel = filterDrawer.querySelector(".filter-drawer__panel");
    const closeButton = filterDrawer.querySelector("[data-filter-close]");
    const openButtons = document.querySelectorAll("[data-open-filters]");

    openButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterDrawer.classList.add("is-open");
        document.body.classList.add("overflow-hidden");
        panel?.focus();
      });
    });

    function closeDrawer() {
      filterDrawer.classList.remove("is-open");
      document.body.classList.remove("overflow-hidden");
    }

    closeButton?.addEventListener("click", closeDrawer);
    overlay?.addEventListener("click", closeDrawer);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeDrawer();
      }
    });
  }
});
