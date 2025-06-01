const products = [
    { id: 1, name: "Apple", price: "100" },
    { id: 2, name: "Milk", price: "200" },
    { id: 3, name: "Rice", price: "250" }
];

function loadProducts() {
    const table = document.querySelector("#productTable tbody");
    table.innerHTML = "";

    products.forEach((product, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
                <button onclick="editProduct(${index})">Edit</button>
                <button onclick="deleteProduct(${index})">Delete</button>
            </td>
        `;
        table.appendChild(row);
    });
}

function editProduct(index) {
    const newName = prompt("Enter new name", products[index].name);
    const newPrice = prompt("Enter new price", products[index].price);
    if (newName && newPrice) {
        products[index].name = newName;
        products[index].price = newPrice;
        loadProducts();
    }
}

function deleteProduct(index) {
    if (confirm("Are you sure you want to delete this product?")) {
        products.splice(index, 1);
        loadProducts();
    }
}

window.onload = loadProducts;
