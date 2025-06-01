document.getElementById("admin-login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error-msg");

  if (!username || !password) {
    errorMsg.textContent = "Please fill all fields.";
    return;
  }

  if (username === "admin" && password === "admin123") {
    // Success: Redirect to product manager
    window.location.href = "product-manager.html";
  } else {
    errorMsg.textContent = "Invalid username or password.";
  }
});
