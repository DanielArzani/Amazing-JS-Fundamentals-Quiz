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

// Buttons
const startButtonEl = document.querySelector("#start-quiz");
const submitButtonEl = document.querySelector("#submit");

// Other variables
const textCorrect = document.querySelector(".choice-correct");
const textWrong = document.querySelector(".choice-wrong");
const timer = document.querySelector("#time-countdown");
const timeText = document.querySelector(".time-text");
const scoreText = document.querySelector("#score-text");
const scoreLink = document.querySelector("#scores-link");
const input = document.querySelector("#input-name");

// Current question being asked
let currentQuestions = {};
// List of unique questions left
let availableQuestions = [];
// what question the player is currently on
let questionCounter = 0;
// Variable for prevent user from clicking too quickly too many times thus messing up the game
let acceptingAnswers = false;
// What the timer will start it and is also the score
let startTime = 6;
// Timer
let timeDown;

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
];

// This makes availableQuestions a full copy of our questions array
availableQuestions = [...questions];

//*FUNCTIONS

// Function that will start counting from startTime down to 0 then stop
function countDownFunction() {
  if (startTime >= 0 && sectionCounter === 1) {
    timer.innerText = startTime;
    startTime--;
    console.log(startTime);
  } else if (startTime < 0) {
    nextSection();
  }
}

// When called it moves to next section and decides what happens in each section
let sectionCounter = 0;
const nextSection = function () {
  questionCounter = 0;
  // This begins the counter
  const oneMinute = setInterval(countDownFunction, 1000);
  // If sectionCounter = 1 => first section,if... = 2 => second section, etc...
  sectionCounter++;
  if (sectionCounter === 1) {
    introSection.classList.add("hide");
    quizSection.classList.remove("hide");
    // Calls the function which gets our questions and displays them
    getNewQuestions();
  } else if (sectionCounter === 2 || startTime < 0) {
    quizSection.classList.add("hide");
    formSection.classList.remove("hide");
  } else if (sectionCounter === 3) {
    formSection.classList.add("hide");
    highScoresSection.classList.remove("hide");
  }
};

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
  if (answer != currentQuestions.answer) {
    correctOrWrong = "wrong";
    // This will display wrong if the chosen answer is incorrect
    textWrong.classList.remove("hide");
  } else if (answer == currentQuestions.answer) {
    correctOrWrong = "correct";
    // This will display correct if the chosen answer is incorrect
    textCorrect.classList.remove("hide");
  }
  // Adds 'correct' or 'wrong' class
  choice.classList.add(correctOrWrong);
  console.log(choice);

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

function saveScore(e) {
  e.preventDefault();
}

//*EVENT LISTENERS

// When start button is pressed, the quiz will start
startButtonEl.addEventListener("click", nextSection);

// When answer is selected it will be matched to a correct or incorrect response
quizParent.addEventListener("click", validateAnswer);

// When submit button is pressed, score will be saved and will move onto high score will be submitted
submitButtonEl.addEventListener("click", saveScore);
