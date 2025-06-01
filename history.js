document.addEventListener("DOMContentLoaded", () => {
    const historyList = document.getElementById("history-list");
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {
        historyList.innerHTML = "<p>No order history available.</p>";
        return;
    }

    orders.forEach((order, index) => {
        const orderDiv = document.createElement("div");
        orderDiv.className = "order";

        let total = 0;

        // 🧠 Group items by name
        const groupedItems = {};
        order.items.forEach(item => {
            const key = item.name;
            const quantity = item.quantity || item.qty || 1;

            if (groupedItems[key]) {
                groupedItems[key].quantity += quantity;
            } else {
                groupedItems[key] = { ...item, quantity };
            }
        });

        // 🧾 Build item HTML and calculate total
        const itemsHTML = Object.values(groupedItems).map(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;
            return `<li>${item.name} - Qty: ${item.quantity} - Price: Rs ${item.price} x ${item.quantity} = Rs ${subtotal.toFixed(2)}</li>`;
        }).join("");

        // ✅ Shipping info block (if available)
        let shippingHTML = '';
        if (order.shipping) {
            const s = order.shipping;
            shippingHTML = `
                <p><strong>Shipping Information:</strong><br>
                Name: ${s.name}<br>
                Address: ${s.address}, ${s.city}<br>
                Postal Code: ${s.postalCode}<br>
                Country: ${s.country}</p>
            `;
        }

        orderDiv.innerHTML = `
            <h3>Order #${index + 1} - ${new Date(order.date || Date.now()).toLocaleString()}</h3>
            ${shippingHTML}
            <ul>${itemsHTML}</ul>
            <strong>Total: Rs ${total.toFixed(2)}</strong><br><br>
            <button class="edit-btn" onclick="editOrder(${index})">✏️ Edit</button>
            <button class="delete-btn" onclick="deleteOrder(${index})">🗑️ Delete</button>
        `;

        historyList.appendChild(orderDiv);
    });
});

// 🗑️ Delete function
function deleteOrder(index) {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    if (confirm("Are you sure you want to delete this order?")) {
        orders.splice(index, 1);
        localStorage.setItem("orders", JSON.stringify(orders));
        location.reload();
    }
}

// ✏️ Placeholder for editing
function editOrder(index) {
    alert("Edit feature coming soon for Order #" + (index + 1));
}

