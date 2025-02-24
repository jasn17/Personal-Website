function displayKey(e) {
    // which key was pressed?
    if (e.keyCode) {
       var keycode=e.keyCode;
    }  else {
       var keycode=e.which;
    }
    character=String.fromCharCode(keycode);

    if("aeiou".includes(character)) {
       character=character.toUpperCase();
    }
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


    // find the object for the destination paragraph
    var keysParagraph = document.getElementById('keys');

    // add the character to the paragraph
    keysParagraph.innerHTML += character;
 }