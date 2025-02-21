/*
Jason Lin
02/20/2025
CPSC 3750
Programming Exam 1
Grade Level Completed: C, B, A, and Bonus
*/
// Create the click event listener for the startButton and toggleTheme element

document.getElementById("startButton").addEventListener("click", generateLists);
document.getElementById("toggleTheme").addEventListener("click", toggleDarkMode);

document.getElementById("startButton").addEventListener("click", generateLists);
function isPrime(num) {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if(num % i === 0) return false;
    }
    return num > 1;

}
function generateLists() {
    const numInput = document.getElementById("numberInput").value;
    const limit = parseInt(numInput);

    // clear prev results
    document.getElementById("primeList").innerHTML = "";
    document.getElementById("nonPrimeList").innerHTML = "";

    // populate the list startin from 1 to the limit
    for (var i = 1; i <= limit; i++) {
        const li = document.createElement("li");
        li.textContent = i;

        // if i is a prime number then append it the the primeList string
        if (isPrime(i)) {
            document.getElementById("primeList").appendChild(li);
        }
        // otherwise append it to the nonPrimeList string
        else {
            document.getElementById("nonPrimeList").appendChild(li);
        }
    }
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
  }  

function calculateSum(list) {

}


function toggleSort(listId) {
    // get the listId element
    let listElement = document.getElementById(listId);
    // get the list of numbers
    let items = Array.from(listElement.children).map(li => parseInt(li.textContent));

    // toggle sorting order
    isAscending = !isAscending;
    items.sort((a, b) => isAscending ? a - b : b - a);

    // update the list
    updateList(listId, items);
}

// sort list
function addSortButtons(listId) {
    const list = ["primeList", "nonPrimeList"];

    lists.forEach(listId => {
        let sortBtn = document.getElementById(listId + "Sort");
        sortBtn.textContent = "Sort";
        sortBtn.classList.add(sort-btn);
        sortBtn.onclick = () => { togglesort(listId)};
        document.getElementById(listId).parentNode.appendChild(sortBtn);
    });
}

window.onload = addSortButtons;

function changeColors() {
    const colors = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff"];
    currColorIndex = 0;

    // chnages the colors of the list every 5 seconds
    setInterval(() => {
        document.querySelectorAll(".list").forEach(list => {
            list.style.transition = "background-color 1s ease-in-out";
            list.style.backgroundColor = colors[currColorIndex];
        });

        // switches to the next color every 5 secodns
        currColorIndex = (currColorIndex + 1) % colors.length;
    }, 5000);
}

changeListColors();