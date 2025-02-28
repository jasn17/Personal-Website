function displayKey(e) {
    // Determine the key code form the event object
    if (e.keyCode) {
       var keycode=e.keyCode;
    }  else {
       var keycode=e.which;
    }
    character=String.fromCharCode(keycode);

    // Convert vowl to uppercase
    if("aeiou".includes(character)) {
       character=character.toUpperCase();
    }

    // Change BG color to red, green, or blue based on keys
    if(character.toUpperCase() == "R") {
       document.body.style.backgroundColor="red";
       document.body.style.color="white";
    }
    if (character.toUpperCase() == "G") {
       document.body.style.backgroundColor="green";
       document.body.style.color="white";
    }
    if (character.toUpperCase() == "B") {
         document.body.style.backgroundColor="blue";
         document.body.style.color="white";
    }


    // Find the object for the destination paragraph
    var keysParagraph = document.getElementById('keys');

    // Add the character to the paragraph
    keysParagraph.innerHTML += character;
 }