//^ORGANZATION
//* Variables

const introSection = document.querySelector("#JS-intro");
const quizSection = document.querySelector("#JS-quiz");
const formSection = document.querySelector(".form-container");
const highScoresSection = document.querySelector("#JS-high-scores");
const quizHeader = document.querySelector("#JS-quiz h1");
// We are turning our nodelist into an array
const quizAnswersArray = Array.from(document.querySelectorAll(".option"));
const quizAnswers = document.querySelectorAll(".option");
const quizParent = document.querySelector("#JS-option-list");
const quizbutton = document.querySelectorAll(".button-wrapper");

// Buttons
const startButtonEl = document.querySelector("#start-quiz");
const submitButtonEl = document.querySelector("#submit");
const clearScoresButtonEl = document.querySelector(".clear-scores");
const restartButtonEl = document.querySelector(".restart");

// Other variables
const textCorrect = document.querySelector(".choice-correct");
const textWrong = document.querySelector(".choice-wrong");
const timer = document.querySelector("#time-countdown");
const timeText = document.querySelector(".time-text");
const scoreText = document.querySelector("#score-text");
const scoreLink = document.querySelector("#scores-link");
const input = document.querySelector("#input-name");
const listOfScores = document.querySelector("#JS-all-scores");

// Current question being asked
let currentQuestions = {};
// List of unique questions left
let availableQuestions = [];
// Variable for prevent user from clicking too quickly too many times thus messing up the game
let acceptingAnswers = false;
// What the timer will start it and is also the score
let startTime = 60;
// Timer
let timeDown;

// Since we are getting the highscores for the first time this will initialize our empty array which the scores will be saved to
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
let currentScore = localStorage.getItem("currentScore") || [];

//* Questions List

let questions = [
  {
    question: "Commonly used data types do not include___",
    option1: "1. Boolean",
    option2: "2. Number",
    option3: "3. String",
    option4: "4. JavaType",
    answer: 4,
  },
  {
    question: "Arrays in JavaScript can be used to store___?",
    option1: "1. Number and strings",
    option2: "2. Other arrays",
    option3: "3. Booleans",
    option4: "4. All of the above",
    answer: 4,
  },
  {
    question: "The condition in an if/else statement is enclosed in an___",
    option1: "1. Quotes",
    option2: "2. Curly Brackets",
    option3: "3. Parenthesis",
    option4: "4. Square Brackets",
    answer: 3,
  },
  {
    question: "What are the primitive data types in JavaScript",
    option1: "1. String, number, bigint, boolean, undefined, symbol, and null",
    option2: "2. String, object, integer, decimal, undefined, null",
    option3: "3. String, numbers, boolean",
    option4: "4. String, number, boolean, undefined, symbol, null",
    answer: 1,
  },
  {
    question: "What is the difference between “ == “ and “ === “ operators",
    option1: "1. One operator ",
    option2: "2. String, object, integer, decimal, undefined, null",
    option3: "3. String, numbers, boolean",
    option4: "4. String, number, boolean, undefined, symbol, null",
    answer: 1,
  },
];

//* Loose code

// This will make availableQuestions into a full copy of the questions array
availableQuestions = [...questions];

//*FUNCTIONS

//^ Timers
// Function that will start counting from startTime down to 0 then stop
function countDownFunction() {
  if (startTime >= 0 && sectionCounter === 1) {
    timer.innerText = startTime;
    startTime--;
  } else if (startTime < 0 && sectionCounter < 2) {
    nextSection();
  }
}

//^ Section Counter
// When called it moves to next section and decides what happens in each section
let sectionCounter = 0;
const nextSection = function () {
  // This begins the counter
  const oneMinute = setInterval(countDownFunction, 1000);
  // If sectionCounter = 1 => first section,if... = 2 => second section, etc...
  sectionCounter++;
  if (sectionCounter === 1) {
    introSection.classList.add("hide");
    quizSection.classList.remove("hide");
    // Calls the function which gets our questions and displays them
    getNewQuestions();
  } else if (sectionCounter === 2) {
    clearInterval(oneMinute);
    quizSection.classList.add("hide");
    formSection.classList.remove("hide");
    // When the quiz is over this function will set the currentScore in localstorage and get it then display it
    finalScore();
  } else if (sectionCounter === 3) {
    scoresList();
    formSection.classList.add("hide");
    highScoresSection.classList.remove("hide");
  } else {
    sectionCounter = 0;
  }
};

//^ Get New Questions
// To generate a new question and display it along with its choices
function getNewQuestions() {
  // Creates a variable that stores the index position of random available questions
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  // The question currently being asked will be randomized each time
  currentQuestions = availableQuestions[questionIndex];
  // When this is equal to 0 it means there are no more questions left, so move on to the form section
  if (availableQuestions.length === 0) {
    nextSection();
  } else {
    // Changes the question header
    quizHeader.innerText = currentQuestions.question;
    // Changes the text for the options
    quizAnswersArray.forEach(function (option) {
      const number = option.dataset["number"];
      option.innerText = currentQuestions["option" + number];
    });
  }

  // Removes a repeated question so it can't be used anymore
  availableQuestions.splice(questionIndex, 1);

  // This won't let others click on an answer until everything is loaded
  acceptingAnswers = true;
}

//^Validate Answer
//FIXME: When I click on the button-wrapper it will move on to the next question and will be counted as a correct answer
// Function that validates answer
function validateAnswer(e) {
  // After someone answers they will need to wait before answering again
  if (!acceptingAnswers) return;
  acceptingAnswers = false;
  // Stores the answer that is clicked on in a variable called choice
  const choice = e.target;
  // Stores the dataset of the answer that was clicked on
  const answer = choice.dataset["number"];
  // correctOrWrong will be a class that gets added depending on if the users choice was right or wrong
  let correctOrWrong;
  if (
    answer != currentQuestions.answer &&
    choice.classList.contains("option")
  ) {
    correctOrWrong = "wrong";
    // When a wrong answer is chosen, the time will decrease by 10 seconds
    startTime -= 10;
    // This will display wrong if the chosen answer is incorrect
    textWrong.classList.remove("hide");
  } else if (
    answer == currentQuestions.answer &&
    choice.classList.contains("option")
  ) {
    correctOrWrong = "correct";
    // This will display correct if the chosen answer is incorrect
    textCorrect.classList.remove("hide");
  }
  // Adds 'correct' or 'wrong' class
  choice.classList.add(correctOrWrong);

  // This will remove the class after it has been picked after a certain amount of time before loading a new question
  setTimeout(function () {
    choice.classList.remove(correctOrWrong);
    // Gets new question after an answer has been selected
    getNewQuestions();
  }, 1000);

  // This will allow the wrong or correct text to stay a little bit longer before disappearing
  setTimeout(function () {
    textCorrect.classList.add("hide");
    textWrong.classList.add("hide");
  }, 1000);
}

//^ Dispaying Score
function finalScore() {
  if (startTime != null) {
    // Final score will be sent to local storage
    localStorage.setItem("currentScore", timer.innerText);
    scoreText.innerText = localStorage.getItem("currentScore");
  }
}

//^ Saving Score

function saveScore(e) {
  e.preventDefault();
  //FIXME: Disabled stays disabled
  // submitButtonEl.disabled = !input.value;
  // Creates an object with the value of the user score and inputed name
  currentScore = localStorage.getItem("currentScore");
  const score = {
    score: currentScore,
    name: input.value,
  };

  console.log(score.score);
  // Pushes that name and score into an array called highScores
  highScores.push(score);
  console.log(highScores);
  // This will sort it in order of the score value
  highScores.sort(function (a, b) {
    return b.score - a.score;
  });
  //Cuts off the rest of the highscores below 5th place
  highScores.splice(5);
  // Saves each score as an object into an array called high scores
  localStorage.setItem("highScores", JSON.stringify(highScores));
  // Moves on to the highscore section
  nextSection();
}
// The place each player got
let place = 1;
//^ Loading and displaying data from local storage
function scoresList() {
  // Adds li to ul for each score submitted
  listOfScores.innerHTML = highScores
    .map(function (score) {
      return `<li class="score-item">${place++}.${score.name.toUpperCase()}-${score.score}</li>`;
    })
    .join("");
}

//^Reset function
function reset() {
  sectionCounter = 0;
  startTime = 60;
  highScoresSection.classList.add("hide");
  introSection.classList.remove("hide");
}

//*EVENT LISTENERS

// When start button is pressed, the quiz will start
startButtonEl.addEventListener("click", nextSection);

// When answer is selected it will be matched to a correct or incorrect response
quizParent.addEventListener("click", validateAnswer);

// When submit button is pressed, score will be saved and will move onto high score will be submitted
submitButtonEl.addEventListener("click", saveScore);

// When the go back button is pressed, reset and go back to home page
// restartButtonEl.addEventListener("click", reset);

// When clear high scores button is pressed, all high scores are cleared
clearScoresButtonEl.addEventListener("click", function () {
  localStorage.clear();
  nextSection();
});
