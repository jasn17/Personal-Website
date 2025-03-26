<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect data from POST
    $data = array(
        'full_name'  => isset($_POST['full_name']) ? $_POST['full_name'] : '',
        'age'        => isset($_POST['age']) ? $_POST['age'] : '',
        'gender'     => isset($_POST['gender']) ? $_POST['gender'] : '',
        'email'      => isset($_POST['email']) ? $_POST['email'] : '',
        'phone'      => isset($_POST['phone']) ? $_POST['phone'] : '',
        'address'    => isset($_POST['address']) ? $_POST['address'] : '',
        'hobby'      => isset($_POST['hobby']) ? $_POST['hobby'] : '',
        'food'       => isset($_POST['food']) ? $_POST['food'] : '',
        'dream_job'  => isset($_POST['dream_job']) ? $_POST['dream_job'] : '',
        'fun_fact'   => isset($_POST['fun_fact']) ? $_POST['fun_fact'] : ''
    );

    // Encode the data to JSON format
    $json_data = json_encode($data);

    // Write data to the file, appending a new line for each submission.
    $file = "data.txt";
    file_put_contents($file, $json_data . PHP_EOL, FILE_APPEND);

    // Redirect back to the form.
    header("Location: form.html");
    exit();
} 
else {
    echo "Invalid request!";
}
?>
