<?php
// Function to compute distance using the Haversine formula
function haversine_distance($lat1, $lon1, $lat2, $lon2) {
    $earth_radius = 3958.8; // Earth's radius in miles

    // Convert degrees to radians
    $lat1 = deg2rad($lat1);
    $lon1 = deg2rad($lon1);
    $lat2 = deg2rad($lat2);
    $lon2 = deg2rad($lon2);

    // Differences
    $dlat = $lat2 - $lat1;
    $dlon = $lon2 - $lon1;

    // Haversine formula
    $a = sin($dlat / 2) * sin($dlat / 2) + cos($lat1) * cos($lat2) * sin($dlon / 2) * sin($dlon / 2);
    $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

    $distance = $earth_radius * $c;
    return $distance;
}

$debug = isset($_POST['debug']) && $_POST['debug'] == '1';

if (!isset($_POST['zip1']) || !isset($_POST['zip2'])) {
    echo "Please provide two zip codes.";
    exit;
}

// Get the zip codes from the form
$zip1 = trim($_POST['zip1']);
$zip2 = trim($_POST['zip2']);

// Read zip data from the file
$data_file = '../group_assignments/ga6/zipdata.txt';
if (!file_exists($data_file)) {
    echo "Data file not found.";
    exit;
}

$zipData = array();
if (($handle = fopen($data_file, 'r')) !== false) {
    // Read header line
    $header = fgetcsv($handle, 0, ',', '"', '\\');
    while (($row = fgetcsv($handle, 0, ',', '"', '\\')) !== false) {
        if (count($row) >= 3) {
            $zip = trim($row[0]);
            $lat = trim($row[1]);
            $lng = trim($row[2]);
            $zipData[$zip] = array('lat' => $lat, 'lng' => $lng);
        }
    }
    fclose($handle);
} else {
    echo "Error opening data file.";
    exit;
}

// Validate that both zip codes exist in our data
if (!isset($zipData[$zip1])) {
    echo "Zip code $zip1 not found in data.";
    exit;
}
if (!isset($zipData[$zip2])) {
    echo "Zip code $zip2 not found in data.";
    exit;
}

$lat1 = $zipData[$zip1]['lat'];
$lng1 = $zipData[$zip1]['lng'];
$lat2 = $zipData[$zip2]['lat'];
$lng2 = $zipData[$zip2]['lng'];

// Calculate the distance
$distance = haversine_distance($lat1, $lng1, $lat2, $lng2);

// Prepare output
$output = "<h2>Distance Calculation</h2>";
$output .= "<p>Distance: " . round($distance, 2) . " miles.</p>";

// Display debug information if enabled
if ($debug) {
    $output .= "<h3>Debug Info:</h3>";
    $output .= "<ul>";
    $output .= "<li>$zip1: Latitude = $lat1, Longitude = $lng1</li>";
    $output .= "<li>$zip2: Latitude = $lat2, Longitude = $lng2</li>";
    $output .= "<li>Computed Distance = " . $distance . " miles</li>";
    $output .= "</ul>";
}

echo $output;
?>
