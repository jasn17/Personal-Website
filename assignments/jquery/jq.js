$(document).ready(function(){
    // Hover effect for divs: change background to yellow on mouseover, and back to white on mouseout.
    $(".hoverDiv").hover(
      function() {
        $(this).css("background-color", "yellow");
      },
      function() {
        $(this).css("background-color", "white");
      }
    );
  
    // Fade out functionality for each button
    $("#fade1").click(function(){
      $("#div1").fadeOut();
    });
  
    $("#fade2").click(function(){
      $("#div2").fadeOut();
    });
  
    $("#fade3").click(function(){
      $("#div3").fadeOut();
    });
  
    // Initialize jQuery Datepicker
    $("#datepicker").datepicker();
  
    // Initialize jQuery Accordion
    $("#accordion").accordion();
  
    // Initialize jQuery Progressbar and update it every second for 20 seconds
    var progressVal = 0;
    $("#progressbar").progressbar({
      value: progressVal
    });
  
    var interval = setInterval(function(){
      progressVal += 5; // 20 seconds, 5% per second = 100%
      $("#progressbar").progressbar("value", progressVal);
      $("#progress-text").text(progressVal + "% Complete");
      if(progressVal >= 100) {
        clearInterval(interval);
      }
    }, 1000);
  });
  