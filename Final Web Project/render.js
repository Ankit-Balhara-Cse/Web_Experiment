function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  const full = "★".repeat(fullStars);
  const half = hasHalf ? "½" : "";
  const empty = "☆".repeat(emptyStars);

  return `<span class="stars">${full}${half}${empty}</span><span class="rating-value">${rating}</span>`;
}

function createCardHTML(product) {
  return `
    <article class="product-card" data-id="${product.id}" data-category="${product.category}">
      <div class="card-image-wrapper">
        <img
          src="${product.image}"
          alt="${product.name}"
          class="card-image"
          loading="lazy"
        />
        <span class="card-category-badge">${product.category}</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${product.name}</h3>
        <p class="card-description">${product.description}</p>
        <div class="card-rating">
          ${generateStars(product.rating)}
        </div>
        <div class="card-footer">
          <span class="card-price">$${product.price.toFixed(2)}</span>
          <button
            class="btn-add-to-cart"
            data-id="${product.id}"
            data-name="${product.name}"
            data-price="${product.price}"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderProducts(productArray) {
  const grid = document.querySelector(".product_grid");

  if (!grid) {
    console.error("Pixel Store: .product_grid container not found in the DOM.");
    return;
  }

  if (!productArray || productArray.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <p>No products found.</p>
      </div>
    `;
    return;
  }

  const cardsHTML = productArray.map(createCardHTML).join("");
  grid.innerHTML = cardsHTML;
}

document.addEventListener("DOMContentLoaded", function () {
  renderProducts(products);

  document.querySelector(".product_grid").addEventListener("click", function (e) {
    const button = e.target.closest(".btn-add-to-cart");
    if (!button) return;

    const id = button.dataset.id;
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);

    console.log("Cart event →", { id, name, price });
  });
});
