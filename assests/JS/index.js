const options = document.querySelectorAll(".options-wrap");
const player = document.getElementById("player");
const computer = document.getElementById("computer");
const triangle = document.querySelector(".triangle-options");
const result = document.querySelector("#result");
const resultPlayer = document.querySelector(".result-player");
const resultComputer = document.querySelector(".result-computer");
const circleFlexChildren = computer.querySelectorAll(".circle-flex");
const playerFlexChildren = player.querySelectorAll(".circle-flex");
const playAgainButton = document.getElementById("play-button");
const resultHeading = document.querySelector(".result-heading");
const computerScoreElement = document.querySelector("#computer-score");
const playerScoreElement = document.querySelector("#player-score");
const rulesButton = document.querySelector("#rules-button");
const nextButton = document.querySelector("#next-button");
const resetButton = document.querySelector("#go-back");
const congrats = document.querySelector(".congrats");
const wrap = document.querySelector(".wrap");
const rules = document.querySelector("#rules");
const rulesClose = document.querySelector(".rules-close");
const PlayerImg = document.querySelector(".player-img");
const ComputerImg = document.querySelector(".computer-img");

const COLORS = {
  paper: "#FFA943",
  rock: "#0074B6",
  scissors: "#BD00FF",
};

let playerscore = localStorage.getItem("playerScore")
  ? JSON.parse(localStorage.getItem("playerScore"))
  : 0;
playerScoreElement.innerHTML = playerscore;
let computerscore = localStorage.getItem("computerScore")
  ? JSON.parse(localStorage.getItem("computerScore"))
  : 0;
computerScoreElement.innerHTML = computerscore;

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();
  if (playerSelection === computerSelection) {
    return null;
  } else if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "scissors" && computerSelection === "paper") ||
    (playerSelection === "paper" && computerSelection === "rock")
  ) {
    return true;
  } else {
    return false;
  }
}

function toggleVisibility(elementId) {
  const element = document.getElementById(elementId);
  if (
    element.style.display === "none" ||
    getComputedStyle(element).display === "none"
  ) {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}

function computerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const k = choices.length - 0.5;
  const randomIndex = Math.round(Math.random() * k);
  return choices[randomIndex];
}

options.forEach((option) => {
  option.addEventListener("click", function () {
    const value = this.getAttribute("data-value");
    PlayerImg.setAttribute("src", `./assests/images/${value}.svg`);
    resultPlayer.style.borderColor = COLORS[value];
    const computer_choice = computerChoice();
    ComputerImg.setAttribute("src", `./assests/images/${computer_choice}.svg`);
    resultComputer.style.borderColor = COLORS[computer_choice];
    const resultCopy = playRound(value, computer_choice);
    triangle.style.display = "none";
    result.style.display = "flex";
    rules.style.display = "none";
    if (resultCopy == null) {
      resultHeading.innerHTML = "TIE";
      return;
    }
    if (!resultCopy) {
      circleFlexChildren.forEach((child) => {
        child.classList.add("active");
      });
      resultHeading.innerHTML = "YOU LOST";
      computerscore += 1;
      computerScoreElement.innerHTML = computerscore;
      localStorage.setItem("computerScore", computerscore);
    } else {
      playerFlexChildren.forEach((child) => {
        child.classList.add("active");
      });
      resultHeading.innerHTML = "YOU WIN";
      playerscore += 1;
      playerScoreElement.innerHTML = playerscore;
      localStorage.setItem("playerScore", playerscore);
      toggleVisibility("next-button");
    }
  });
});

playAgainButton.addEventListener("click", function () {
  triangle.style.display = "flex";
  result.style.display = "none";
  circleFlexChildren.forEach((child) => {
    child.classList.remove("active");
  });
  playerFlexChildren.forEach((child) => {
    child.classList.remove("active");
  });
  nextButton.style.display = "none";
  rules.style.display = "none";
});

rulesButton.addEventListener("click", function () {
  toggleVisibility("rules");
});

rulesClose.addEventListener("click", function () {
  toggleVisibility("rules");
});

nextButton.addEventListener("click", function () {
  triangle.style.display = "none";
  result.style.display = "none";
  wrap.style.display = "none";
  congrats.style.display = "flex";
  nextButton.style.display = "none";
  rules.style.display = "none";
});

resetButton.addEventListener("click", function () {
  triangle.style.display = "flex";
  wrap.style.display = "flex";
  congrats.style.display = "none";
  nextButton.style.display = "none";
  rules.style.display = "none";
  circleFlexChildren.forEach((child) => {
    child.classList.remove("active");
  });
  playerFlexChildren.forEach((child) => {
    child.classList.remove("active");
  });
});
