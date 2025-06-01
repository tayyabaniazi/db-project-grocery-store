document.addEventListener("DOMContentLoaded", function () {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const summaryContainer = document.getElementById("order-summary");
  const totalAmount = document.getElementById("total-amount");
  const placeOrderBtn = document.querySelector(".place-order-btn");

  summaryContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    summaryContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalAmount.textContent = "$0.00";
    placeOrderBtn.disabled = true;
    return;
  }

  // ✅ Show cart summary (qty or quantity key safe)
  cart.forEach((item) => {
    const name = item.name || "Unnamed Product";
    const quantity = item.qty || item.quantity || 1;
    const price = item.price || 0;
    const itemTotal = price * quantity;
    total += itemTotal;

    const itemElement = document.createElement("p");
    itemElement.textContent = `${name} x ${quantity} - $${itemTotal.toFixed(2)}`;
    summaryContainer.appendChild(itemElement);
  });

  totalAmount.textContent = `$${total.toFixed(2)}`;

  // ✅ Place order with shipping info and backend submission
  placeOrderBtn.addEventListener("click", function () {
    const name = document.querySelector("input[placeholder='Full Name']")?.value || '';
    const address = document.querySelector("input[placeholder='Address']")?.value || '';
    const city = document.querySelector("input[placeholder='City']")?.value || '';
    const postalCode = document.querySelector("input[placeholder='Postal Code']")?.value || '';
    const country = document.querySelector("input[placeholder='Country']")?.value || '';

    if (!name || !address || !city || !postalCode || !country) {
      alert("Please fill in all shipping information.");
      return;
    }

    const shipping = { name, address, city, postalCode, country };

    // ✅ Save order locally so history.js still works
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const formattedItems = cart.map(item => ({
      name: item.name,
      qty: item.qty || item.quantity || 1,
      price: item.price
    }));

    const newOrder = {
      date: new Date().toISOString(),
      items: formattedItems,
      shipping: shipping,
      total: total
    };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    // ✅ Send order to backend via checkout.php (your file name)
    fetch("checkout.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "cart=" + encodeURIComponent(JSON.stringify(cart)) + "&total=" + total
    })
      .then((response) => response.text())
      .then((data) => {
        if (data.trim() === "success") {
          alert("✅ Order placed successfully!");
          localStorage.removeItem("cart"); // clear cart

        } else {
          alert("❌ Failed to place order: " + data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An unexpected error occurred.");
      });
  });
});

