let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('#cart-count').forEach(el => el.textContent = count);
}

// ✅ Add or update cart item
function addToCart(name, price) {
  const found = cart.find(i => i.name === name);
  if (found) {
    found.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  displayCartItems();
}

// ✅ Remove item and update bill + cart
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  displayCartItems();
}

// ✅ Display cart items and total bill
function displayCartItems() {
  const cartItems = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");

  if (!cartItems || !totalPrice) return;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    totalPrice.textContent = "$0";
    return;
  }

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    const subtotal = item.price * item.qty;
    total += subtotal;

    div.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <p>Price: $${item.price} × ${item.qty} = $${subtotal.toFixed(2)}</p>
      </div>
      <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
    `;

    cartItems.appendChild(div);
  });

  totalPrice.textContent = "$" + total.toFixed(2);
}

// ✅ Dummy login functions (already in your code)
function login() {
  alert("Login function works!");
}
function signup() {
  alert("Signup function works!");
}

// ✅ On load, update everything
window.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  displayCartItems();
});



    function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cart-count").textContent = total;
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems(); // refresh
  updateCartCount();
}

function displayCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("total-price");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.textContent = "$0";
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <p>Price: $${item.price} x ${item.qty} = $${(item.price * item.qty).toFixed(2)}</p>
      </div>
      <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
    `;
    container.appendChild(div);
    total += item.price * item.qty;
  });

  totalEl.textContent = "$" + total.toFixed(2);
}

window.addEventListener("DOMContentLoaded", () => {
  displayCartItems();
  updateCartCount();
});
















































function saveOrderToHistory() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  const order = {
    date: new Date().toLocaleString(),
    items: cart.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.qty  // ✅ Make sure to save quantity
    }))
  };

  const history = JSON.parse(localStorage.getItem("orders")) || [];
  history.push(order);
  localStorage.setItem("orders", JSON.stringify(history));

  localStorage.removeItem("cart"); // Empty the cart after order
  alert("Order placed successfully!");
  location.reload(); // or redirect to another page
}












const orders = JSON.parse(localStorage.getItem("orders")) || [];
orders.push({
    date: new Date().toLocaleString(),
    items: cartItems // this must include quantity info!
});
localStorage.setItem("orders", JSON.stringify(orders));

