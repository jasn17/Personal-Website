// Global variables
let secretWord = "";
let displayedWord = [];
let maxWrong = 6;       // up to 6 wrong guesses before losing
let wrongGuesses = 0;

const cheatModeCheckbox = document.getElementById("cheatMode");
const hangmanImage = document.getElementById("hangmanImage");
const wordToGuessDiv = document.getElementById("wordToGuess");
const lettersGrid = document.getElementById("lettersGrid");
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", startNewGame);

// On page load, optionally start a new game automatically
window.addEventListener("load", () => {
    startNewGame();
});

function startNewGame() {
    // Reset
    wrongGuesses = 0;
    hangmanImage.src = "images/hangman0.png";
    lettersGrid.innerHTML = "";
    wordToGuessDiv.textContent = "";

    // Fetch a word from server (B Version)
    fetch("getWord.php")
        .then((res) => res.json())
        .then((data) => {
        if (data.word) {
            secretWord = data.word.trim().toUpperCase();

            // D Version: If cheat mode is checked, reveal the word
            if (cheatModeCheckbox.checked) {
            alert("CHEAT MODE: The word is " + secretWord);
            }

            // Prepare displayedWord as underscores
            displayedWord = Array(secretWord.length).fill("_");

            // Show underscores in #wordToGuess
            updateDisplayedWord();

            // Build the letter grid (C Version)
            buildLetterGrid();
        } else {
            console.error("Error fetching word:", data.error);
            wordToGuessDiv.textContent = "Error fetching word from server.";
        }
        })
        .catch((err) => {
        console.error("Fetch error:", err);
        wordToGuessDiv.textContent = "Error fetching word from server.";
        });
}

function buildLetterGrid() {
    // A-Z
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    letters.forEach((letter, index) => {
        const btn = document.createElement("button");
        btn.textContent = letter;
        btn.classList.add("letterBtn");

        btn.addEventListener("click", () => handleGuess(letter, btn));
        lettersGrid.appendChild(btn);
    });
}

function handleGuess(letter, button) {
    // Disable the button after it is clicked
    button.disabled = true;

    let correctGuess = false;
    // Update displayedWord if the guessed letter is in secretWord
    for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === letter) {
        displayedWord[i] = letter;
        correctGuess = true;
        }
    }

    if (correctGuess) {
        // Update underscores
        updateDisplayedWord();

        // Check if the player has won
        if (!displayedWord.includes("_")) {
        endGame(true); // player won
        }
    } else {
        // Wrong guess
        wrongGuesses++;
        updateHangmanImage();

        // Check if the player lost
        if (wrongGuesses === maxWrong) {
        endGame(false); // player lost
        }
    }
}

function updateDisplayedWord() {
    // Display underscores or letters with spaces
    wordToGuessDiv.textContent = displayedWord.join(" ");
}

function updateHangmanImage() {
    // A Version: Update image based on how many wrong guesses
    // Make sure you have images/hangman0.png through images/hangman6.png
    hangmanImage.src = `images/hangman${wrongGuesses}.png`;
}

function endGame(playerWon) {
    // Reveal the full word
    displayedWord = secretWord.split("");
    updateDisplayedWord();

    // Disable all remaining letter buttons
    const allButtons = lettersGrid.querySelectorAll("button");
    allButtons.forEach((btn) => (btn.disabled = true));

    if (playerWon) {
        alert("Congratulations! You guessed the word: " + secretWord);
    } else {
        alert("Game Over! The word was: " + secretWord);
    }
}
