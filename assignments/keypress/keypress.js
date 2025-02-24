function displayKey(e) {
    // Get the key code from the event (works with onkeypress)
    var keycode = e.keyCode || e.which;
    var character = String.fromCharCode(keycode);

    // Force vowels to uppercase
    if ("aeiou".includes(character)) {
        character = character.toUpperCase();
    }
    
    // Check for color change keys (R, G, or B) and update page styling
    switch (character.toUpperCase()) {
        case "R":
            document.body.style.backgroundColor = "red";
            document.body.style.color = "white";
            break;
        case "G":
            document.body.style.backgroundColor = "green";
            document.body.style.color = "white";
            break;
        case "B":
            document.body.style.backgroundColor = "blue";
            document.body.style.color = "white";
            break;
        default:
            // No color change for other keys.
            break;
    }

    // Append the character to the display box
    var keysParagraph = document.getElementById('keys');
    keysParagraph.innerHTML += character;
}
