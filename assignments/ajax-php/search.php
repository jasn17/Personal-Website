<?php
// Retrieve the query string and convert to lowercase for case-insensitive matching
$q = isset($_GET['q']) ? strtolower($_GET['q']) : "";

// Define an associative array of states and their capitols
$states = array(
  "Alabama" => "Montgomery",
  "Alaska" => "Juneau",
  "Arizona" => "Phoenix",
  "Arkansas" => "Little Rock",
  "California" => "Sacramento",
  "Colorado" => "Denver",
  "Connecticut" => "Hartford",
  "Delaware" => "Dover",
  "Florida" => "Tallahassee",
  "Georgia" => "Atlanta",
  "Hawaii" => "Honolulu",
  "Idaho" => "Boise",
  "Illinois" => "Springfield",
  "Indiana" => "Indianapolis",
  "Iowa" => "Des Moines",
  "Kansas" => "Topeka",
  "Kentucky" => "Frankfort",
  "Louisiana" => "Baton Rouge",
  "Maine" => "Augusta",
  "Maryland" => "Annapolis",
  "Massachusetts" => "Boston",
  "Michigan" => "Lansing",
  "Minnesota" => "St. Paul",
  "Mississippi" => "Jackson",
  "Missouri" => "Jefferson City",
  "Montana" => "Helena",
  "Nebraska" => "Lincoln",
  "Nevada" => "Carson City",
  "New Hampshire" => "Concord",
  "New Jersey" => "Trenton",
  "New Mexico" => "Santa Fe",
  "New York" => "Albany",
  "North Carolina" => "Raleigh",
  "North Dakota" => "Bismarck",
  "Ohio" => "Columbus",
  "Oklahoma" => "Oklahoma City",
  "Oregon" => "Salem",
  "Pennsylvania" => "Harrisburg",
  "Rhode Island" => "Providence",
  "South Carolina" => "Columbia",
  "South Dakota" => "Pierre",
  "Tennessee" => "Nashville",
  "Texas" => "Austin",
  "Utah" => "Salt Lake City",
  "Vermont" => "Montpelier",
  "Virginia" => "Richmond",
  "Washington" => "Olympia",
  "West Virginia" => "Charleston",
  "Wisconsin" => "Madison",
  "Wyoming" => "Cheyenne"
);

$matches = array();

// Check each state to see if it starts with the query string
if ($q !== "") {
  foreach ($states as $state => $capital) {
    // Use stripos to perform a case-insensitive search at the beginning of the string
    if (stripos($state, $q) === 0) {
      $matches[] = $capital;
    }
  }
}

// Output matching capitols or a message if none were found
if (count($matches) > 0) {
  echo implode(", ", $matches);
} else {
  echo "No matching capitals found.";
}
?>
