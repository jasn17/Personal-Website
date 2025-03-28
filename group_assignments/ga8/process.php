<?php
// process.php

echo "<!DOCTYPE html>";
echo "<html lang='en'>";
echo "<head>";
echo "  <meta charset='UTF-8'>";
echo "  <title>Form Processing</title>";
echo "</head>";
echo "<body>";
echo "<h1>Form Data Received</h1>";

// Retrieve and display Text Input
if (isset($_POST['textInput'])) {
    echo "<p><strong>Text Input:</strong> " . htmlspecialchars($_POST['textInput']) . "</p>";
}

// Retrieve and display Textarea Input
if (isset($_POST['textareaInput'])) {
    echo "<p><strong>Textarea Input:</strong> " . nl2br(htmlspecialchars($_POST['textareaInput'])) . "</p>";
}

// Retrieve and display Hidden Data
if (isset($_POST['hiddenData'])) {
    echo "<p><strong>Hidden Data:</strong> " . htmlspecialchars($_POST['hiddenData']) . "</p>";
}

// Retrieve and display Password Input
if (isset($_POST['passwordInput'])) {
    echo "<p><strong>Password:</strong> " . htmlspecialchars($_POST['passwordInput']) . "</p>";
}

// Retrieve and display Checkbox selections
if (isset($_POST['checkboxes'])) {
    echo "<p><strong>Checkbox Selections:</strong> ";
    echo implode(", ", array_map('htmlspecialchars', $_POST['checkboxes']));
    echo "</p>";
} else {
    echo "<p><strong>Checkbox Selections:</strong> None</p>";
}

// Retrieve and display Radio Button selection
if (isset($_POST['radioOption'])) {
    echo "<p><strong>Radio Button Selection:</strong> " . htmlspecialchars($_POST['radioOption']) . "</p>";
}

// Retrieve and display Selection List choice
if (isset($_POST['selectInput'])) {
    echo "<p><strong>Selection List:</strong> " . htmlspecialchars($_POST['selectInput']) . "</p>";
}

// Retrieve and display URL Input
if (isset($_POST['urlInput'])) {
    echo "<p><strong>URL Input:</strong> " . htmlspecialchars($_POST['urlInput']) . "</p>";
}

// Process File Upload and display file details
if (isset($_FILES['fileInput']) && $_FILES['fileInput']['error'] == UPLOAD_ERR_OK) {
    echo "<p><strong>File Upload:</strong></p>";
    echo "<ul>";
    echo "<li>File Name: " . htmlspecialchars($_FILES['fileInput']['name']) . "</li>";
    echo "<li>File Type: " . htmlspecialchars($_FILES['fileInput']['type']) . "</li>";
    echo "<li>File Size: " . htmlspecialchars($_FILES['fileInput']['size']) . " bytes</li>";
    echo "</ul>";
} else {
    echo "<p><strong>File Upload:</strong> No file uploaded or an error occurred.</p>";
}

echo "</body>";
echo "</html>";
?>