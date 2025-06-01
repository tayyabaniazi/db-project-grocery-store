let products = JSON.parse(localStorage.getItem("products")) || [];
let productId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;

document.getElementById("productForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value.trim();
    const idField = document.getElementById("productId");

    if (idField.value === "") {
        products.push({ id: productId++, name, price });
    } else {
        const index = products.findIndex(p => p.id == idField.value);
        if (index !== -1) {
            products[index].name = name;
            products[index].price = price;
        }
        idField.value = "";
    }

    localStorage.setItem("products", JSON.stringify(products));
    document.getElementById("productForm").reset();
    renderTable();
});

function renderTable() {
    const tbody = document.querySelector("#productTable tbody");
    tbody.innerHTML = "";

    products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
                <button class="edit" onclick="editProduct(${product.id})">Edit</button>
                <button class="delete" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        document.getElementById("productId").value = product.id;
        document.getElementById("productName").value = product.name;
        document.getElementById("productPrice").value = product.price;
    }
}

function deleteProduct(id) {
    if (confirm("Delete this product?")) {
        products = products.filter(p => p.id !== id);
        localStorage.setItem("products", JSON.stringify(products));
        renderTable();
    }
}

window.onload = renderTable;





