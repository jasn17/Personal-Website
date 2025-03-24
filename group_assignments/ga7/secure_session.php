<?php
// Instructs PHP to only accept session IDs generated itself
ini_set('session.use_strict_mode', 1);

// Set custom session cookie parameters
session_set_cookie_params([
    'lifetime' => 0,
    'path'     => '/',
    'domain'   => '',
    'secure'   => true,
    'httponly' => true,
    'samesite' => 'Lax'
]);

session_start();
?>