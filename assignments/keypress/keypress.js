function displayKey(e) {
    var keycode = e.keyCode || e.which;
    var character = String.fromCharCode(keycode);
    
    if ("aeiou".includes(character)) {
      character = character.toUpperCase();
    }
    
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
        // For any other key, no background change.
        break;
    }
    
    // Append the character to the 'keys' div
    var keysDiv = document.getElementById('keys');
    keysDiv.innerHTML += character;
  }
  
  // Attach the keypress event listener to the document
  document.addEventListener('keypress', displayKey);
  