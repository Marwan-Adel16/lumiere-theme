document.addEventListener("DOMContentLoaded", () => {
  const quantityInputs = document.querySelectorAll(
    ".cart-item__quantity-input",
  );

  quantityInputs.forEach((input) => {
    input.addEventListener("change", async () => {
      const line = input.dataset.line;
      const quantity = input.value;

      try {
        const response = await fetch("/cart/change.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            line: line,
            quantity: quantity,
          }),
        });

        if (!response.ok) throw new Error();

        location.reload();
      } catch (e) {
        alert("Failed to update cart.");
      }
    });
  });
});
