// TODO Hide Link and timer on high scores section
// TODO learn about timers!
// TODO LEARN HOW TO SORT AN ARRAY https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/

//* Variables
const introSection = document.querySelector("#JS-intro");
const quizSection = document.querySelector("#JS-quiz");
const formSection = document.querySelector("#JS-form");
const highScoresSection = document.querySelector("#JS-high-scores");

const quizHeader = document.querySelector("#JS-quiz h1");
// We are turning our nodelist into an array
const quizAnswers = Array.from(document.querySelectorAll(".option"));

const startButtonEl = document.querySelector("#start-quiz");

// Current question being asked
let currentQuestions = {};
// List of unique questions left
let availableQuestions = [];

//* Questions
let questions = [
  {
    question: "Commonly used data types do not include___",
    option1: "Boolean",
    option2: "Number",
    option3: "String",
    option4: "JavaType",
    answer: 1,
  },
  {
    question: "Arrays in JavaScript can be used to store___?",
    option1: "Number and strings",
    option2: "Other arrays",
    option3: "Booleans",
    option4: "All of the above",
    answer: 3,
  },
  {
    question: "The condition in an if/else statement is enclosed in an___",
    option1: "Quotes",
    option2: "Curly Brackets",
    option3: "Parenthesis",
    option4: "Square Brackets",
    answer: 4,
  },
];

//* Functions
// When this function is called it will hide the current section and show the next one
let counter = 0;
const nextSection = function () {
  // Each section has been given an index number
  let currentSection = [
    introSection,
    quizSection,
    formSection,
    highScoresSection,
  ];
  // When the start button is pressed the first section will hide
  currentSection[counter].classList.add("hide");
  counter++;
  // The counter will increment and cause the next section to appear
  currentSection[counter].classList.remove("hide");
  // This will make availableQuestions into a full copy of the our questions array
  availableQuestions = [...questions];
  // Calling function that displays our questions
  getNewQuestions();
};

function getNewQuestions() {
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
}

//* Event Listeners
// When start button is pressed, the quiz will start
startButtonEl.addEventListener("click", nextSection);
