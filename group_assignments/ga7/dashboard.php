<?php
session_start();
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header("Location: login.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Account Dashboard</title>
    <link rel="stylesheet" href="dashboard.css">
</head>
<body>
    <div class="container">
        <h1>Admin Dashboard</h1>
        <h2>Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?>!</h2>
        
        <div class="info-box">
            <h3>Corporate Financial Overview</h3>
            <p>Total Revenue: <strong>$12,345,678</strong></p>
            <p>Net Profit: <strong>$2,345,678</strong></p>
        </div>
        
        <div class="info-box">
            <h3>Employee Records</h3>
            <p>Active Employees: <strong>350</strong></p>
            <p>HR Alerts: <strong>None</strong></p>
        </div>
        
        <div class="info-box">
            <h3>Secret Project Launch</h3>
            <p>Project Codename: <strong>Project Phoenix</strong></p>
            <p>Launch Date: <strong>2025-07-01</strong></p>
        </div>
        
        <div class="logout">
            <a href="logout.php">Logout</a>
        </div>
    </div>
</body>
</html>
