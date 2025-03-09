var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://raw.githubusercontent.com/jasn17/Personal-Website/refs/heads/main/assignments/ajax-handlebars/textbook.json');
ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
        var textbooks = JSON.parse(ourRequest.responseText);
        createHTML(textbooks);
    }
    else {
        console.log('We connected to the server, but it returned an error.');
    }
    console.log(textbooks[0]);
};

ourRequest.onerror = function() {
    console.log('Connection error');
}

ourRequest.send();
 
function createHTML(bookData) {
    console.log('testing...');
    console.log(bookData);
}