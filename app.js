const wordsList = [
  "Dark",
  "Smoke",
  "Zombie",
  "Duck",
  "Cake",
  "Song",
  "Paradise",
  'Zasya'
];

const secretWord = chooseRandomWord(wordsList);
const playerGuessed = new Array(secretWord.length).fill("_");
const keyWordContainer = document.querySelector("#keysContainer");
const triesCountElement = document.querySelector("#tries");
const secretWordContainer = document.querySelector("#secretWordContainer");
let life = 10;

document.addEventListener("DOMContentLoaded", function (event) {
  if (!localStorage.getItem("word")) {
    localStorage.setItem("word", "");
  }
  renderHiddenWord(secretWord);
  renderKeys();
  triesCountElement.textContent = life;
});

keyWordContainer.addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("btn")) {
    const keyValue = target.dataset.keyValue;
    const res = letterExist(keyValue, secretWord);

    if (res.length) {
      // Replacing Underscores(_) with clicked Letter!
      res.forEach((index) => {
        document.querySelector(`#secret-${index}`).textContent =
          secretWord[index];
        playerGuessed[index] = keyValue;
      });
      // Removing the clicked button itself!
      keyWordContainer.removeChild(target);
    } else {
      life -= 1;
      triesCountElement.textContent = life;
    }
    gameOver();
  }
});

function gameOver() {
  const isEqual =
    playerGuessed.join("").toLowerCase() === secretWord.toLowerCase();
  if (isEqual) {
    document.querySelector("#label").innerHTML = `
            <span >Boom! You've Won! Awesome! <a href="/">Play again?</a></span> 
        `;
    renderHiddenWord(secretWord, true, "success");
    keyWordContainer.classList.add("d-none");
  }
  if (life < 1) {
    document.querySelector("#label").innerHTML = `
            <span>You couldn't guessed it <a href="/">Try Again?</a></span> 
        `;
    renderHiddenWord(secretWord, true, "danger");
    keyWordContainer.classList.add("d-none");
  }
}

function letterExist(letter, searchFrom) {
  const lowerCasedWord = searchFrom.toLowerCase();
  const result = [];
  lowerCasedWord.split("").forEach(function (ltr, index) {
    if (letter.toLowerCase() === ltr) {
      result.push(index);
    }
  });

  return result;
}

function renderHiddenWord(word, reset, customClass = "dark") {
  const wordSplit = word.split("");
  let markup = "";
  wordSplit.forEach(function (elem, index) {
    markup += `
            <span id="secret-${index}" class="fs-3 mx-1 font-monospace text-${customClass} text-uppercase">${
      reset ? elem : "_"
    }</span> 
        `;
  });

  secretWordContainer.innerHTML = markup;
}

function renderKeys() {
  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  let markup = "";
  alphabet.forEach(function (elem, index) {
    markup += `
    <button class="btn btn-primary" data-key-value="${elem.toLowerCase()}" id="key-${index}">${elem}</button>
        `;
  });
  keyWordContainer.innerHTML = markup;
}

function chooseRandomWord(wordList) {
    if(!Array.isArray(wordList)) throw Error('Invalid');
  let prevWord = localStorage.getItem("word");
  let word = "";
  do {
    word =
      wordList[Math.floor(Math.random() * (wordList.length - 1 - 0 + 1)) + 0];
  } while (prevWord === word);
  localStorage.setItem("word", word);
  return word;
}
