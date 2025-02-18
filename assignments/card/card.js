// function to display business cards from local storage
function displayCards() {
   // Retrieve stored business cards from local storage or create an empty array if it is empty
   let storedCards = JSON.parse(localStorage.getItem("businessCards")) || [];
   // Get the container where the cards will be displayed, targets right-box div
   let cardsContainer = document.querySelector(".right-box");
   
   // If the container does not exist, return so the function does not break
   if (!cardsContainer) return;
   
   // Clear previous content and add title
   cardsContainer.innerHTML = "<h2>Business Cards</h2>";
   
   storedCards.forEach(card => {
       let cardElement = `
           <div class="card">
               <strong>Name: </strong>${card.name}<br>
               <strong>Email: </strong>${card.email}<br>
               <strong>Address: </strong>${card.address}<br>
               <strong>Phone: </strong>${card.phone}<br>
               <strong>Birthdate: </strong><input type="date" value="${card.birthdate}" readonly><hr>
           </div>
       `;
       cardsContainer.innerHTML += cardElement;
   });
}

// Function to retrieve and display names from stored business cards
function displayNamesList() {
   let storedCards = JSON.parse(localStorage.getItem("businessCards")) || [];
   let namesListContainer = document.querySelector(".names-list");
   
   if (!namesListContainer) return;
   
   namesListContainer.innerHTML = "<h2>Names Entered:</h2><ol>";
   storedCards.forEach(card => {
       namesListContainer.innerHTML += `<li>${card.name}</li>`;
   });
   namesListContainer.innerHTML += "</ol>";
}

// Function to handle form submission
function handleFormSubmit(event) {
   event.preventDefault();
   
   let name = document.getElementById("name").value;
   let email = document.getElementById("email").value;
   let address = document.getElementById("address").value;
   let phone = document.getElementById("phone").value;
   let birthdate = document.getElementById("birthdate").value;
   
   if (!name || !email || !address || !phone || !birthdate) {
       alert("Please fill out all fields before submitting.");
       return;
   }
   
   let newCard = { name, email, address, phone, birthdate };
   
   let storedCards = JSON.parse(localStorage.getItem("businessCards")) || [];
   storedCards.push(newCard);
   localStorage.setItem("businessCards", JSON.stringify(storedCards));
   
   displayCards();
   displayNamesList();
   document.querySelector("form").reset();
}

// Run functions on window load
window.onload = function () {
   displayCards();
   displayNamesList();
   document.querySelector("form").addEventListener("submit", handleFormSubmit);
};
