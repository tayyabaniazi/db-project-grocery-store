<?php
session_start();
include_once __DIR__ . '/db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['cart'])) {
    $user_id = $_SESSION['user_id'] ?? 1;
    $cart = json_decode($_POST['cart'], true);
    $total = $_POST['total'];

    // ✅ Call stored procedure with OUT parameter
    $stmt = $conn->prepare("CALL place_order_simple(?, ?, @order_id)");
    $stmt->bind_param("id", $user_id, $total);
    $stmt->execute();
    $stmt->close();

    // ✅ Get the OUT value (order_id) from session variable
    $result = $conn->query("SELECT @order_id AS order_id");
    $order_row = $result->fetch_assoc();
    $order_id = $order_row['order_id'];

    if (!$order_id) {
        echo "❌ Could not retrieve order ID.";
        exit;
    }

    // ✅ Insert order details
    foreach ($cart as $item) {
        $name = mysqli_real_escape_string($conn, $item['name']);
        $qty = $item['qty'] ?? $item['quantity'] ?? 1;
        $price = $item['price'];

        $conn->query("INSERT INTO order_details (order_id, product_name, quantity, price)
                      VALUES ('$order_id', '$name', '$qty', '$price')");
    }

    echo "success";
    exit;
}
?>



<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Checkout - Fresh Mart</title>
  <link rel="stylesheet" href="checkout.css" />
</head>
<body>
  <!-- Navbar -->
  <nav class="navbar">
    <div class="logo"><h2>Fresh Mart</h2></div>
    <ul>
      <li><a href="index.html"><h3>Home</h3></a></li>
      <li><a href="about.html"><h3>About Us</h3></a></li>
      <li><a href="contact.html"><h3>Contact</h3></a></li>
      <li><a href="login.html"><h3>Login</h3></a></li>
      <li><a href="cart.html"><h3>Cart</h3></a></li>
    </ul>
  </nav>
  

  <!-- Main checkout section -->
  <main class="checkout-wrapper">
    <!-- Shipping Info -->
    <section class="customer-info">
      <h2>Shipping Information</h2>
      <form id="shipping-form">
        <input type="text" placeholder="Full Name" required />
        <input type="text" placeholder="Address" required />
        <input type="text" placeholder="City" required />
        <input type="text" placeholder="Postal Code" required />
        <input type="text" placeholder="Country" required />
      </form>
    </section>

    <!-- Payment method -->
    <section class="checkout-section">
      <h2>Payment Method</h2>
      <select id="payment">
        <option>Cash on Delivery</option>
        <option>Credit Card</option>
        <option>UPI</option>
      </select>
    </section>

    <!-- Order Summary -->
    <section class="order-summary">
      <h2>Order Summary</h2>
      <div id="order-summary" class="summary-items"></div>
      <p><strong>Total:</strong> <span id="total-amount">$0.00</span></p>
      <button id="place-order-btn" class="place-order-btn">Place Order</button>
    </section>
  </main>

  <script src="checkout.js"></script>
</body>
</html>

