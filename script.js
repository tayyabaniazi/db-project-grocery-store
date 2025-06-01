let cart = [];

function addToCart(product, price) {
  const item = cart.find(i => i.product === product);
  if (item) {
    item.qty++;
  } else {
    cart.push({ product, price, qty: 1 });
  }
  updateCart();
}

function removeFromCart(product) {
  cart = cart.filter(item => item.product !== product);
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  cartList.innerHTML = '';
  cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.product} - $${item.price} x ${item.qty} `;
    const btn = document.createElement('button');
    btn.textContent = 'Remove';
    btn.onclick = () => removeFromCart(item.product);
    li.appendChild(btn);
    cartList.appendChild(li);
  });
}

function openModal(id) {
  document.getElementById(id).style.display = 'block';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

function login() {
  const email = document.getElementById('login-email').value;
  const pass = document.getElementById('login-password').value;
  alert(`Logging in: ${email}`);
  closeModal('login-modal');
}

function signup() {
  const email = document.getElementById('signup-email').value;
  const pass = document.getElementById('signup-password').value;
  alert(`Signing up: ${email}`);
  closeModal('signup-modal');
}



function addToCart(name, price) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}





















