document.addEventListener("DOMContentLoaded", () => {
  const drawer = document.getElementById("CartDrawer");

  if (!drawer) return;

  const openButtons = document.querySelectorAll("[data-cart-open]");
  const closeButtons = document.querySelectorAll("[data-cart-close]");

  function openDrawer() {
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  openButtons.forEach((button) => {
    button.addEventListener("click", openDrawer);
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeDrawer);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDrawer();
    }
  });
});
