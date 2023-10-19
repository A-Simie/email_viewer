<?php
// Connect to your database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "emails_store";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

$data = json_decode(file_get_contents("php://input"));
$emailId = $data->emailId;

// Query to mark the email as read
$updateQuery = "UPDATE email_store SET status = 1 WHERE id = $emailId ORDER BY timestamp DESC";
$updateResult = mysqli_query($conn, $updateQuery);

// Handle success or failure (you can return a response)
if ($updateResult) {
    echo "success";
} else {
    echo "error";
}
