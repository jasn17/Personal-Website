// aj.js

// (Assuming Handlebars is loaded globally from your CDN/local file)
var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://raw.githubusercontent.com/jasn17/Personal-Website/refs/heads/main/assignments/ajax-handlebars/textbook.json');
ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
        var textbooks = JSON.parse(ourRequest.responseText);
        createHTML(textbooks);
    } else {
        console.log('We connected to the server, but it returned an error.');
    }
    console.log(textbooks[0]);
};

ourRequest.onerror = function() {
    console.log('Connection error');
}

ourRequest.send();
 
function createHTML(bookData) {
    var rawTemplate = document.getElementById("book-template").innerHTML;
    var compiledTemplate = Handlebars.compile(rawTemplate);
    var ourGeneratedHTML = compiledTemplate(bookData);

    var bookContainer = document.getElementById("book-container");
    bookContainer.innerHTML = ourGeneratedHTML;

    // Call the animation function (defined in animations.js)
    if (typeof animateBooks === 'function') {
      animateBooks();
    }
}
// animations.js

/**
 * Animates all elements with the class "book" inside the #book-container.
 * Each book will fade in and slide up slightly with a staggered delay.
 */
function animateBooks() {
    const bookElements = document.querySelectorAll('#book-container .book');
    bookElements.forEach((book, index) => {
      book.animate(
        [
          { opacity: 0, transform: 'translateY(20px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        {
          duration: 600,            // Animation lasts 600ms
          delay: index * 100,       // Stagger each item by 100ms
          easing: 'ease-out',
          fill: 'forwards'
        }
      );
    });
  }
  
  // Expose the function to the global scope so other scripts can call it.
  window.animateBooks = animateBooks;
  
  
