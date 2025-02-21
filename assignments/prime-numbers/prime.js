/*
Jason Lin
02/20/2025
CPSC 3750
Programming Exam 1
Grade Level Completed: C, B, A, and Bonus
*/

document.getElementById("startButton").addEventListener("click", generateLists);
document.getElementById("toggleTheme").addEventListener("click", toggleDarkMode);
document.getElementById("primeSortButton").addEventListener("click", toggleSortAll);

// default to ascending order
let isAscending = true;

// function takes in an number and returns true if it is prime, false otherwise
function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// function generates prime and non-prime lists based on user input
// primeList = list of prime numbers up to the limit
// nonPrimeList = list of non-prime numbers up to the limit
function generateLists() {
    const numInput = document.getElementById("numberInput").value;
    const limit = parseInt(numInput);

    if (isNaN(limit) || limit < 1) {
        alert("Please enter a valid positive number.");
        return;
    }

    // clear prev lists
    document.getElementById("primeList").innerHTML = "";
    document.getElementById("nonPrimeList").innerHTML = "";

    let primes = [];
    let nonPrimes = [];

    for (let i = 1; i <= limit; i++) {
        if (isPrime(i)) {
            primes.push(i);
        } else {
            nonPrimes.push(i);
        }
    }

    // Populate lists using updateList
    updateList("primeList", primes);
    updateList("nonPrimeList", nonPrimes);
}

// function updates the list with the given listId with the given numbers
// listId = id of the list to update
// numbers = list of numbers to display
function updateList(listId, numbers) {
    const listElement = document.getElementById(listId);
    // clears prev list
    listElement.innerHTML = "";

    numbers.forEach(num => {
        const li = document.createElement("li");
        li.textContent = num;
        listElement.appendChild(li);
    });

    // Store sorted lists globally so sorting works
    if (listId === "primeList") {
        window.primeNumbers = numbers;
    } else {
        window.nonPrimeNumbers = numbers;
    }
}

//
function toggleSortAll() {
    isAscending = !isAscending; // Toggle sorting order
    
    // Reverse lists
    window.primeNumbers.reverse();
    window.nonPrimeNumbers.reverse();

    // Update displayed lists
    updateList("primeList", window.primeNumbers);
    updateList("nonPrimeList", window.nonPrimeNumbers);
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Function to change list colors smoothly every 5 seconds
function changeColors() {
    const colors = ["red", "blue", "green"];
    let currColorIndex = 0;

    setInterval(() => {
        document.querySelectorAll(".list").forEach(list => {
            list.style.transition = "background-color 1s ease-in-out";
            list.style.backgroundColor = colors[currColorIndex];
        });

        // Switches to the next color every 5 seconds
        currColorIndex = (currColorIndex + 1) % colors.length;
    }, 5000);
}

changeColors();
