// // Qiuz test

// // const { get } = require("mongoose");

const startbtn = document.querySelector(".start-Btn");
const popupInfo = document.querySelector(".popup-info");
const closeBtn = document.querySelector(".cancel-btn");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".continue-btn");
const quizSection = document.querySelector(".quiz-section");

let countdown; 

startbtn.addEventListener("click", () => {
  // alert('Quiz Started');
  popupInfo.classList.add("active");
  main.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  popupInfo.classList.remove("active");
  main.classList.remove("active");
});

continueBtn.addEventListener("click", () => {
  quizSection.classList.add("active");
  popupInfo.classList.remove("active");
  main.classList.remove("active");
});









const questionElement = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const previousBtn = document.querySelector("#preBtn");
const submitBtn = document.querySelector(".submit-btn");
const correctAnswersElement = document.querySelector("#correct-answers");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questionHistory = []; // To track previous questions
let userAnswers = []; // To track user's answers
let correctAnswersCount = 0; // To track correct answers

let questions = [
  {
    question: "What is 2 + 2?",
    choice1: "2",
    choice2: "4",
    choice3: "21",
    choice4: "22",
    answer: 2,
  },
  {
    question: "What is 2 * 6?",
    choice1: "5",
    choice2: "12",
    choice3: "10",
    choice4: "8",
    answer: 2,
  },
  {
    question: "What is 8 / 2?",
    choice1: "10",
    choice2: "2",
    choice3: "4",
    choice4: "6",
    answer: 3,
  },
  {
    question: "What is 5 - 2?",
    choice1: "3",
    choice2: "2",
    choice3: "1",
    choice4: "4",
    answer: 1,
  },
];

const SCORE_POINTS = 10;
const MAX_QUESTIONS = questions.length;

function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  questionHistory = []; // Clear question history at the start
  userAnswers = Array(MAX_QUESTIONS).fill(null); // Initialize user answers
  correctAnswersCount = 0; // Initialize correct answers count
  getNewQuestion();
}

function getNewQuestion() {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    return window.location.assign("/result");
  }

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  questionElement.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
    // Uncheck all radio buttons and remove highlight
    choice.previousElementSibling.checked = false;
    choice.classList.remove("selected");
  });

  // Save current question to history
  questionHistory.push(currentQuestion);

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;

  // Disable previous button if at the beginning
  previousBtn.disabled = questionHistory.length <= 1;

  // Update question number display
  updateQuestionNumber();
}

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    const selectedChoice = e.target;
    const selectedAnswer = parseInt(selectedChoice.dataset["number"], 10); // Ensure it's a number
    const currentQuestionIndex = questionHistory.length - 1;

    // Remove 'selected' class from all choices and add to the selected one
    choices.forEach((c) => c.classList.remove("selected"));
    selectedChoice.classList.add("selected");

    // Handle answer selection and score adjustment
    const previousAnswer = userAnswers[currentQuestionIndex];
    userAnswers[currentQuestionIndex] = selectedAnswer; // Store user answer

    if (previousAnswer !== selectedAnswer) {
      if (selectedAnswer === currentQuestion.answer) {
        if (previousAnswer !== currentQuestion.answer) {
          console.log("Correct!");
          score += SCORE_POINTS;
          correctAnswersCount++; // Increase correct answer count
        }
      } else {
        if (previousAnswer === currentQuestion.answer) {
          console.log("Changed to Incorrect.");
          score -= SCORE_POINTS;
          correctAnswersCount--; // Decrease correct answer count
        }
      }
    }

    updateCorrectAnswersDisplay();
    acceptingAnswers = true; // Allow re-selection
  });
});

submitBtn.addEventListener("click", () => {
  getNewQuestion();
});

previousBtn.addEventListener("click", () => {
  if (questionHistory.length <= 1) return; // No previous question available

  // Restore the current question back to availableQuestions
  availableQuestions.push(questionHistory.pop());
  userAnswers.pop(); // Remove current question's answer from user answers

  // Get the previous question
  currentQuestion = questionHistory[questionHistory.length - 1];

  questionElement.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
    // Restore the previous answer selection
    const selectedAnswer = userAnswers[questionHistory.length - 1];
    if (selectedAnswer === parseInt(choice.dataset["number"], 10)) {
      choice.previousElementSibling.checked = true;
      choice.classList.add("selected"); // Add highlight to previously selected answer
    } else {
      choice.previousElementSibling.checked = false;
      choice.classList.remove("selected");
    }
    choice.previousElementSibling.disabled = false; // Enable radio buttons
  });

  acceptingAnswers = true;

  // Disable previous button if at the start
  previousBtn.disabled = questionHistory.length <= 1;

  // Update question number display
  updateQuestionNumber();
});

function updateQuestionNumber() {
  const questionTotalElement = document.querySelector(".question-total");
  questionTotalElement.innerText = `${questionHistory.length} of ${MAX_QUESTIONS}`;
}

function updateCorrectAnswersDisplay() {
  correctAnswersElement.innerText = `Correct Answers: ${correctAnswersCount}`;
}

// Initialize the quiz game
startGame();
