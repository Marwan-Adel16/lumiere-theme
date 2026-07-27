document.addEventListener("DOMContentLoaded", () => {
  /* ===========================
     Product Gallery
  =========================== */

  const thumbnails = document.querySelectorAll("[data-target-media-id]");
  const slides = document.querySelectorAll("[data-media-id]");

  thumbnails.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.targetMediaId;

      slides.forEach((slide) => {
        slide.classList.remove("is-active");
        slide.hidden = true;
      });

      thumbnails.forEach((thumb) => {
        thumb.classList.remove("is-active");
        thumb.setAttribute("aria-current", "false");
      });

      const activeSlide = document.querySelector(`[data-media-id="${id}"]`);

      if (activeSlide) {
        activeSlide.hidden = false;
        activeSlide.classList.add("is-active");
      }

      button.classList.add("is-active");
      button.setAttribute("aria-current", "true");
    });
  });

  /* ===========================
     Quantity Selector
  =========================== */

  const quantityInput = document.querySelector("[data-quantity-input]");
  const plus = document.querySelector("[data-quantity-plus]");
  const minus = document.querySelector("[data-quantity-minus]");

  if (plus && quantityInput) {
    plus.addEventListener("click", () => {
      quantityInput.value = Number(quantityInput.value) + 1;
    });
  }

  if (minus && quantityInput) {
    minus.addEventListener("click", () => {
      if (Number(quantityInput.value) > 1) {
        quantityInput.value = Number(quantityInput.value) - 1;
      }
    });
  }

  /* ===========================
     Variant Picker
  =========================== */

  const variantInputs = document.querySelectorAll("[data-variant-option]");

  variantInputs.forEach((input) => {
    input.addEventListener("change", () => {
      console.log("Variant Changed:", input.value);

      // سيتم تطويرها لاحقاً مع JSON الخاص بالمنتج
    });
  });

  /* ===========================
     Share Button
  =========================== */

  const shareButton = document.querySelector("[data-share-button]");

  if (shareButton) {
    shareButton.addEventListener("click", async () => {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(window.location.href);

        alert("Product link copied.");
      }
    });
  }
});
