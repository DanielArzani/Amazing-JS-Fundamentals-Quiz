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
// what question the player is currently on
let questionCounter = 0;
// score
// let score = 0;

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
    answer: 2,
  },
];

//* Functions
// When this function is called it will hide the current section and show the next one
let sectionCounter = 0;
const nextSection = function () {
  // Each section has been given an index number
  let currentSection = [
    introSection,
    quizSection,
    formSection,
    highScoresSection,
  ];
  // When the start button is pressed the first section will hide
  currentSection[sectionCounter].classList.add("hide");
  sectionCounter++;
  // The counter will increment and cause the next section to appear
  currentSection[sectionCounter].classList.remove("hide");
  // This will make availableQuestions into a full copy of the our questions array
  availableQuestions = [...questions];
  // Calling function that displays our questions
  getNewQuestions();
};

function getNewQuestions() {
  if (availableQuestions.length === 0) {
    alert("done");
  }
  questionCounter = 0;
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
}

//* Event Listeners
// When start button is pressed, the quiz will start
startButtonEl.addEventListener("click", nextSection);

// When answer is clicked on, right or wrong will be displayed, time from timer will be subtracted and next question will show
quizAnswers.forEach(function (option) {
  // Listens for a click event on one of the answers
  option.addEventListener("click", function (e) {
    // Stores the answer that is clicked on in a variable called choice
    const choice = e.target;
    // Stores the dataset of the answer that was clicked on
    const answer = choice.dataset["number"];
    getNewQuestions();
  });
});
