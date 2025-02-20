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
    document.getElementById("primeList").value = "";
    document.getElementById("nonPrimeList").value = "";

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

function generatePrimeList(limit) {

}

function generateNonPrimeList(limit) {

}

function calculateSum(list) {

}