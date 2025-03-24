<?php
require_once 'secure_session.php';

// Generate CSRF token
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// Process the login form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validate CSRF token
    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        die('CSRF token validation failed.');
    }
    
    // Handling user input
    $username = htmlspecialchars(trim($_POST['username']));
    $password = $_POST['password']; // Plaintext password entered by the user

    // Hardcoded credentials with hashed password for bonus challenge
    $validUser = 'admin';

    // Hashed password for the user 'admin'
    $hashedPassword = '$2y$12$8x5SYQ2JXrtjUPcYpjk2OeK0rdyOANeghhGNXc5WCNHDEy7H4M/kW$2y$12$4HMtc5vRywjR5rG.2xxwcOg2VUSyIz5tjPfkYDyn7I5d/9FLFh4Hi';

    // Verify the username and the hashed password
    if ($username === $validUser && password_verify($password, $hashedPassword)) {
        // Regenerate session ID to prevent session fixation
        session_regenerate_id(true);
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;
        header("Location: dashboard.php");
        exit();
    } else {
        $error = "Invalid username or password.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="icon" href="img/jasnlogo.png" alt="logo" />
    <link rel="stylesheet" href="../../styles/footer.css">
    <link rel="stylesheet" href="../../styles/navbar.css">
    <link rel="stylesheet" href="login.css">
    <title>Official JL</title>
    <link rel="icon" href="../../img/jasnlogo.png" alt="logo" />
</head>
<body>
    <div id="navbar-container"></div>
    <script>
        fetch('../../navbar.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('navbar-container').innerHTML = data;
            })
            .catch(error => console.error('Error loading navbar:', error));
    </script>
        
    <div class="login-container">
        <h1>Admin Login</h1>
        <?php if (isset($error)) { echo '<div class="error">' . $error . '</div>'; } ?>
        <form method="post" action="">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            
            <!-- Include the CSRF token -->
            <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
            
            <button type="submit">Login</button>
        </form>
    </div>
    <div class="empty-container"></div>

    <div id="footer-container"></div>
    <script>
        fetch('../../footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer-container').innerHTML = data;
            })
            .catch(error => console.error('Error loading footer:', error));
    </script>
</body>
</html>
