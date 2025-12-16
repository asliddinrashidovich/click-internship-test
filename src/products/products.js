const productsContainer = document.querySelector(".products");

async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();
    renderProducts(products);
  } catch (error) {
    productsContainer.innerHTML = "<p>Xatolik yuz berdi</p>";
    console.error(error);
  }
}

function renderProducts(products) {
  productsContainer.innerHTML = products
    .map(
      (product) => `
        <div class="products-item">
          <div class="products-item-img">
            <img src="${product.image}" alt="${product.title}" />
          </div>
          <h2 class="product-header">${product.title}</h2>
          <p>${product.price}</p>
          <button data-id="${product.id}">Add to Cart</button>
        </div>
      `
    )
    .join("");

  window.allProducts = products;
}

productsContainer.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  const id = Number(e.target.dataset.id);

  const product = window.allProducts.find((p) => p.id === id);
  if (!product) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
});

getProducts();


