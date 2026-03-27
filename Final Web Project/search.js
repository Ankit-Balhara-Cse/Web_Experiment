function filterProductsBySearch(query) {
  const normalised = query.trim().toLowerCase();

  if (normalised === "") {
    return products;
  }

  return products.filter(function (product) {
    return (
      product.name.toLowerCase().includes(normalised) ||
      product.description.toLowerCase().includes(normalised) ||
      product.category.toLowerCase().includes(normalised)
    );
  });
}

function handleSearch(e) {
  const query = e.target.value;
  const results = filterProductsBySearch(query);
  renderProducts(results);
}

document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.getElementById("search-bar");

  if (!searchBar) {
    console.error("Pixel Store: #search-bar element not found in the DOM.");
    return;
  }

  searchBar.addEventListener("input", handleSearch);
});
