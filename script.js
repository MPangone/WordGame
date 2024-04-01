const inputs = document.querySelector(".inputs"),
  hintTag = document.querySelector(".hint span"),
  guessLeft = document.querySelector(".guess-left span"),
  wrongLetter = document.querySelector(".wrong-letter span"),
  resetBtn = document.querySelector(".reset-btn"),
  typingInput = document.querySelector(".typing-input"),
  darkModeBtn = document.getElementById("darkModeBtn"),
  resultBox = document.querySelector(".result-box"),
  resultBoxMessage = document.querySelector(".result-box h1"),
  resultBoxResetBtn = document.querySelector(".result-box .reset");

let word,
  maxGuesses,
  incorrectLetters = [],
  correctLetters = [];

function randomWord() {
  let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
  word = ranItem.word;
  maxGuesses = word.length >= 5 ? 8 : 6;
  correctLetters = [];
  incorrectLetters = [];
  hintTag.innerText = ranItem.hint;
  guessLeft.innerText = maxGuesses;
  wrongLetter.innerText = incorrectLetters;
  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
    inputs.innerHTML = html;
  }
}

function initGame(e) {
  let key = e.target.value.toLowerCase();
  if (
    key.match(/^[A-Za-z]+$/) &&
    !incorrectLetters.includes(` ${key}`) &&
    !correctLetters.includes(key)
  ) {
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] == key) {
          correctLetters += key;
          let inputField = inputs.querySelectorAll("input")[i];
          inputField.value = key;
          inputField.style.backgroundColor = "rgb(28, 189, 28)";
          wrongLetter.style.color = "red";
          
        }
      }
    } else {
      maxGuesses--;
      incorrectLetters.push(` ${key}`);
    }
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;
  }
  typingInput.value = "";
  setTimeout(() => {
    if (correctLetters.length === word.length) {
      resultBoxMessage.innerText = `Congrats! You found the word ${word.toUpperCase()}`;
      resultBox.style.display = "block";
    } else if (maxGuesses < 1) {
      resultBoxMessage.innerText = `Game over! You don't have remaining guesses! The word was ${word.toUpperCase()}`;
      resultBox.style.display = "block";
      for (let i = 0; i < word.length; i++) {
        inputs.querySelectorAll("input")[i].value = word[i];
      }
    }
  }, 100);
}

function darkMode() {
  const body = document.body;
  const wrapper = document.querySelector(".wrapper");

  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    wrapper.style.background = "white";
    darkModeBtn.classList.remove("clicked");
  } else {
    body.classList.add("dark-mode");
    wrapper.style.background = "black";
    darkModeBtn.classList.add("clicked");
  }
}

function resetGame() {
  resultBox.style.display = "none";
  randomWord();
}

darkModeBtn.addEventListener("click", darkMode);
resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
resultBoxResetBtn.addEventListener("click", resetGame);
