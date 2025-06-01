<?php
$servername = "localhost";
$username = "root";
$password = ""; // change only if your MySQL has a password
$database = "fresh_mart"; // this must match your actual DB name

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

