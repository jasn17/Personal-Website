var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://raw.githubusercontent.com/jasn17/Personal-Website/refs/heads/main/assignments/ajax-handlebars/textbook.json');
ourRequest.onload = function() {
    var textbooks = ourRequest.responseText;
    console.log(textbooks[0]);
};
ourRequest.send();