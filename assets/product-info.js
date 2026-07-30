class ProductInfo {
  constructor() {
    this.container = document.querySelector("[data-product-info]");

    if (!this.container) return;

    this.product = JSON.parse(this.container.dataset.product);

    this.quantityInput = document.querySelector("[data-quantity-input]");
    this.plus = document.querySelector("[data-quantity-plus]");
    this.minus = document.querySelector("[data-quantity-minus]");

    this.price = document.querySelector("[data-product-price]");
    this.comparePrice = document.querySelector("[data-compare-price-value]");
    this.comparePriceWrapper = document.querySelector("[data-compare-price]");
    this.saleBadge = document.querySelector("[data-sale-badge]");
    this.sku = document.querySelector("[data-product-sku]");
    this.skuContainer = document.querySelector("[data-sku-container]");
    this.stock = document.querySelector("[data-stock-value]");
    this.variantInput = document.querySelector("[data-variant-id-input]");
    this.addButton = document.querySelector("[data-add-to-cart]");
    this.addButtonText = document.querySelector("[data-add-to-cart-text]");

    this.optionInputs = document.querySelectorAll("[data-variant-option]");

    this.bindEvents();
  }

  bindEvents() {
    /* Quantity */

    this.plus?.addEventListener("click", () => {
      this.quantityInput.value = Number(this.quantityInput.value) + 1;
    });

    this.minus?.addEventListener("click", () => {
      const value = Number(this.quantityInput.value);

      if (value > 1) {
        this.quantityInput.value = value - 1;
      }
    });

    this.quantityInput?.addEventListener("change", () => {
      if (this.quantityInput.value < 1 || this.quantityInput.value === "") {
        this.quantityInput.value = 1;
      }
    });

    /* Variants */

    this.optionInputs.forEach((input) => {
      input.addEventListener("change", () => {
        this.updateVariant();
      });
    });
  }

  updateVariant() {
    const selectedOptions = [];

    document
      .querySelectorAll("[data-variant-option]:checked")
      .forEach((option) => {
        selectedOptions.push(option.value);
      });

    const variant = this.product.variants.find((variant) => {
      return (
        JSON.stringify(variant.options) === JSON.stringify(selectedOptions)
      );
    });

    if (!variant) return;

    this.variantInput.value = variant.id;

    this.price.textContent = this.formatMoney(variant.price);

    if (variant.compare_at_price && variant.compare_at_price > variant.price) {
      this.comparePrice.textContent = this.formatMoney(
        variant.compare_at_price,
      );

      this.comparePriceWrapper.classList.remove("hidden");
      this.saleBadge.classList.remove("hidden");
    } else {
      this.comparePriceWrapper.classList.add("hidden");
      this.saleBadge.classList.add("hidden");
    }

    if (variant.sku) {
      this.sku.textContent = variant.sku;
      this.skuContainer.classList.remove("hidden");
    } else {
      this.skuContainer.classList.add("hidden");
    }

    if (variant.available) {
      this.stock.innerHTML =
        '<span class="status-indicator status-indicator--in-stock">In Stock</span>';

      this.addButton.disabled = false;
      this.addButtonText.textContent = "Add to cart";
    } else {
      this.stock.innerHTML =
        '<span class="status-indicator status-indicator--out-of-stock">Sold Out</span>';

      this.addButton.disabled = true;
      this.addButtonText.textContent = "Sold Out";
    }
  }

  formatMoney(cents) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: Shopify.currency.active,
    }).format(cents / 100);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ProductInfo();
});
