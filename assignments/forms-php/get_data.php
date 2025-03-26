<?php
$file = "data.txt";
if (file_exists($file)) {
    $json_data = file_get_contents($file);
    // Split file contents by new lines and filter out any empty lines.
    $lines = array_filter(explode(PHP_EOL, $json_data));
    // Get the last JSON object (latest submission).
    $last_line = array_pop($lines);
    $data_array = json_decode($last_line, true);
} else {
    // Return an empty data structure if file doesn't exist.
    $data_array = array(
        'full_name'  => '',
        'age'        => '',
        'gender'     => '',
        'email'      => '',
        'phone'      => '',
        'address'    => '',
        'hobby'      => '',
        'food'       => '',
        'dream_job'  => '',
        'fun_fact'   => ''
    );
}

header('Content-Type: application/json');
echo json_encode($data_array);
?>
