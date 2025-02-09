// All names will be stored here
var names = new Array();

function SortNames() {
   // Collect name and turn it into all caps, and push it to the array
   var thename = document.theform.newname.value.toUpperCase();
   if(thename == "") {
      alert("Please do not leave the field blank.");
      return;
   }
   else {
      names.push(thename);
   }

   // Sort the array
   names.sort();

   // Display the sorted names
   var displayNames = "";
   for (i=0; i<names.length; i++) {
      displayNames += (i + 1) + "." + names[i] + "\n";
   }
   document.theform.sorted.value = displayNames;

   // Clear the input field
   document.theform.newname.value = "";
}

document.addEventListener('DOMContentLoaded', function() {
   document.getElementById("addButton").addEventListener("click", SortNames);
   document.getElementById('nameInput').addEventListener('keydown', function(event) {
       if (event.key === 'Enter') {
           event.preventDefault();
           SortNames();
       }
   });
});
