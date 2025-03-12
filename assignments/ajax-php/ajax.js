function showCapitols(str) {
    var resultDiv = document.getElementById("result");
    if (str.length === 0) {
      resultDiv.innerHTML = "";
      resultDiv.classList.remove("fade-in");
      return;
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        resultDiv.innerHTML = this.responseText;
        // Restart the fade-in animation for the result container
        resultDiv.classList.remove("fade-in");
        void resultDiv.offsetWidth; // Trigger reflow to restart the animation
        resultDiv.classList.add("fade-in");
      }
    };
    xmlhttp.open("GET", "search.php?q=" + encodeURIComponent(str), true);
    xmlhttp.send();
  }
  