const words = ["ПРОГРАММА", "КОМПЬЮТЕР", "ИНТЕРНЕТ", "ЯБЛОКО", "ТЕХНОЛОГИЯ", "ВИСЕЛИЦА"];

const parts = [
  "pole",     
  "head",      
  "body",     
  "arm-left",  
  "arm-right", 
  "leg-left",  
  "leg-right"  
];

let errors = 0;
let guessedLetters = [];
let currentWord = "";

const wordEl = document.getElementById("word");
const keyboardEl = document.getElementById("keyboard");

function hideAllParts() {
  parts.forEach(part => {
    const el = document.querySelector(`.${part}`);
    if(el) el.style.visibility = "hidden";
  });
}

function showPart(index) {
  if(index < parts.length) {
    const el = document.querySelector(`.${parts[index]}`);
    if(el) el.style.visibility = "visible";
  }
}

function chooseWord() {
  const idx = Math.floor(Math.random() * words.length);
  return words[idx];
}

function renderWord() {
  let display = "";
  for (const letter of currentWord) {
    if (guessedLetters.includes(letter)) {
      display += letter + " ";
    } else {
      display += "_ ";
    }
  }
  wordEl.textContent = display.trim();
}

function checkWin() {
  for (const letter of currentWord) {
    if (!guessedLetters.includes(letter)) return false;
  }
  return true;
}

function disableKeyboard() {
  const buttons = keyboardEl.querySelectorAll(".key");
  buttons.forEach(btn => {
    btn.style.pointerEvents = "none";
    btn.style.opacity = "0.5";
  });
}

function guessLetter(letter, button) {
  if (button.classList.contains("disabled")) return;

  button.classList.add("disabled");
  button.style.pointerEvents = "none";
  button.style.opacity = "0.5";

  if (currentWord.includes(letter)) {
    guessedLetters.push(letter);
    renderWord();

    if (checkWin()) {
      alert("Поздравляем! Вы выиграли!");
      disableKeyboard();
    }
  } else {
    showPart(errors);
    errors++;

    if (errors === parts.length) {
      alert(`Вы проиграли. Загаданное слово: ${currentWord}`);
      renderWord();
      disableKeyboard();
    }
  }
}

function initKeyboard() {
  const buttons = keyboardEl.querySelectorAll(".key");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => guessLetter(btn.textContent, btn));
  });
}

function initGame() {
  errors = 0;
  guessedLetters = [];
  currentWord = chooseWord();
  hideAllParts();
  renderWord();
  initKeyboard();

  const buttons = keyboardEl.querySelectorAll(".key");
  buttons.forEach(btn => {
    btn.classList.remove("disabled");
    btn.style.pointerEvents = "auto";
    btn.style.opacity = "1";
  });
}

initGame();