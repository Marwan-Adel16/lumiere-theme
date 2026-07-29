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
     Filter Drawer (Placeholder)
  ============================================ */

  const filterButton = document.querySelector("[data-open-filters]");

  if (filterButton) {
    filterButton.addEventListener("click", () => {
      console.log("Open Filter Drawer");

      /*
        سيتم ربط Drawer الحقيقي
        في المرحلة القادمة
      */
    });
  }
});
