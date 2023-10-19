<?php
// Connect to your database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "emails_store";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check if the connection was successful
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Set the Content-Type header to indicate JSON response
header('Content-Type: application/json');


// Query to fetch unread emails
$query = "SELECT * FROM email_store WHERE status = 1 ORDER BY timestamp DESC";
$result = mysqli_query($conn, $query);

$readEmails = array();
while ($row = mysqli_fetch_assoc($result)) {
    $readEmails[] = $row;
}

// Output the result as JSON
echo json_encode($readEmails);
