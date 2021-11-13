//TODO Hide Link and timer on high scores section
//TODO Make it so a new answer can't be selected immediately after picking the first one

//* Variables
const introSection = document.querySelector("#JS-intro");
const quizSection = document.querySelector("#JS-quiz");
const formSection = document.querySelector(".form-container");
const highScoresSection = document.querySelector("#JS-high-scores");
const quizHeader = document.querySelector("#JS-quiz h1");
// We are turning our nodelist into an array
const quizAnswers = Array.from(document.querySelectorAll(".option"));

// Buttons
const startButtonEl = document.querySelector("#start-quiz");
const submitButtonEl = document.querySelector("#submit");

// Other variables
const textCorrect = document.querySelector(".choice-correct");
const textWrong = document.querySelector(".choice-wrong");

// Current question being asked
let currentQuestions = {};
// List of unique questions left
let availableQuestions = [];
// what question the player is currently on
let questionCounter = 0;
// Variable for prevent user from clicking too quickly too many times thus messing up the game
let acceptingAnswers = false;

//* Questions
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

//* Functions
// When this function is called it will hide the current section and show the next one
let sectionCounter = 0;
const nextSection = function () {
  questionCounter = 0;

  if (sectionCounter === 0) {
    introSection.classList.add("hide");
    quizSection.classList.remove("hide");
    sectionCounter++;
  } else if (sectionCounter === 1) {
    quizSection.classList.add("hide");
    formSection.classList.remove("hide");
    sectionCounter++;
  }
  // This will make availableQuestions into a full copy of the questions array
  availableQuestions = [...questions];
  // Calling function that displays our questions
  getNewQuestions();
};

function getNewQuestions() {
  if (availableQuestions.length === 0) {
    nextSection();
  }
  // questionCounter = 0;
  // Creates a variable that stores the index position of random available questions
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  // The question currently being asked will be randomized each time
  currentQuestions = availableQuestions[questionIndex];
  // Changes the question header
  quizHeader.innerText = currentQuestions.question;
  // Changes the text for the options
  quizAnswers.forEach(function (option) {
    const number = option.dataset["number"];
    option.innerText = currentQuestions["option" + number];
  });

  // Removes a repeated question so it can't be used anymore
  availableQuestions.splice(questionIndex, 1);

  // This won't let others click on an answer until everything is loaded
  acceptingAnswers = true;
}

// When answer is clicked on, right or wrong will be displayed, time from timer will be subtracted and next question will show

quizAnswers.forEach(function (option) {
  // Listens for a click event on one of the answers

  option.addEventListener("click", function (e) {
    // After someone answers they will need to wait before answering again
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    // Stores the answer that is clicked on in a variable called choice
    const choice = e.target;

    // Stores the dataset of the answer that was clicked on
    const answer = choice.dataset["number"];
    // Sets default for class that will be applied if the chosen answer is wrong or not
    // let correctOrWrong = "wrong";
    let correctOrWrong;
    if (answer != currentQuestions.answer) {
      correctOrWrong = "wrong";
      textWrong.classList.remove("hide");
    }
    // If the chosen answers dataset number loosely matches that of the answer it will change the class of correctOrWrong to "correct"
    if (answer == currentQuestions.answer) {
      correctOrWrong = "correct";
      textCorrect.classList.remove("hide");
    }
    // Once the user picks an answer, it will add the class "wrong" or "correct" to it as well as display the correct or wrong text
    choice.classList.add(correctOrWrong);
    console.log(`choice:${answer}, Answer:${currentQuestions.answer}`);
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
    }, 2000);
  });
});

//* Event Listeners
// When start button is pressed, the quiz will start
startButtonEl.addEventListener("click", nextSection);

// When submit button is pressed, high score will be submitted
submitButtonEl.addEventListener("click", function () {
  formSection.classList.add("hide");
  highScoresSection.classList.remove("hide");
});
