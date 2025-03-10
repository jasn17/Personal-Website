<?php
// B Version: store 'words.txt' outside web root or protect it via .htaccess
$filePath = __DIR__ . '/words.txt';

// Check if the file exists
if (file_exists($filePath)) {
    $words = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if (!empty($words)) {
        // Randomly select a word from the file
        $selectedWord = trim($words[array_rand($words)]);
        // Send the selected word back to the client
        echo json_encode(['word' => $selectedWord]);
    } else {
        echo json_encode(['error' => 'No words found in words.txt']);
    }
} else {
    echo json_encode(['error' => 'words.txt not found']);
}
?>