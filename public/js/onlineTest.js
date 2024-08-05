// // Purpose: To create a quiz application that fetches questions from an API and allows users to answer them.

// const startbtn = document.querySelector(".start-Btn");
// const popupInfo = document.querySelector(".popup-info");
// const closeBtn = document.querySelector(".cancel-btn");
// const main = document.querySelector(".main");
// const continueBtn = document.querySelector(".continue-btn");
// const quizSection = document.querySelector(".quiz-section");

// const questionElement = document.querySelector("#question");
// const choices = Array.from(document.querySelectorAll(".choice-text"));
// const previousBtn = document.querySelector("#preBtn");
// const submitBtn = document.querySelector(".submit-btn");
// const correctAnswersElement = document.querySelector("#correct-answers");
// const questionNavigator = document.querySelector(".question-navigator");

// let currentQuestionIndex = 0;
// let questions = [];
// let userAnswers = [];
// let questionHistory = [];

// fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
//   .then((res) => res.json())
//   .then((loadedQuestions) => {
//     questions = loadedQuestions.results.map((loadedQuestion) => {
//       const formattedQuestion = { question: loadedQuestion.question };
//       const answerChoices = [...loadedQuestion.incorrect_answers];
//       formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
//       answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);
//       answerChoices.forEach((choice, index) => {
//         formattedQuestion["choice" + (index + 1)] = choice;
//       });
//       return formattedQuestion;
//     });
//     initQuiz();
//   })
//   .catch((err) => console.log(err));

// function initQuiz() {
//   questionHistory = [];
//   userAnswers = Array(questions.length).fill(null);
//   createNavigatorButtons();
//   renderQuestion(currentQuestionIndex);
// }

// function createNavigatorButtons() {
//   questionNavigator.innerHTML = "";
  
//   questions.forEach((_, index) => {
//     const button = document.createElement("button");
//     button.innerText = index + 1;
//     button.addEventListener("click", () => goToQuestion(index));
//     questionNavigator.appendChild(button);
//   });
// }

// function goToQuestion(index) {
//   currentQuestionIndex = index;
//   renderQuestion(index);
// }

// function renderQuestion(index) {
//   const currentQuestion = questions[index];
//   questionElement.innerText = currentQuestion.question;

//   choices.forEach((choice) => {
//     const number = choice.dataset["number"];
//     choice.innerText = currentQuestion["choice" + number];

//     const selectedAnswer = userAnswers[index];
//     choice.previousElementSibling.checked = selectedAnswer === parseInt(number, 10);
//   });

//   const buttons = questionNavigator.querySelectorAll("button");
//   buttons.forEach((btn, idx) => {
//     btn.classList.toggle("active", idx === index);
//   });

//   previousBtn.disabled = index === 0;
//   updateQuestionNumber();
// }

// function updateQuestionNumber() {
//   const questionTotalElement = document.querySelector(".question-total");
//   questionTotalElement.innerText = `${currentQuestionIndex + 1} of ${questions.length}`;
// }

// choices.forEach((choice) => {
//   choice.addEventListener("click", (e) => {
//     const selectedChoice = e.target;
//     const selectedAnswer = parseInt(selectedChoice.dataset["number"], 10);
//     userAnswers[currentQuestionIndex] = selectedAnswer;

//     choices.forEach((c) => c.classList.remove("selected"));
//     selectedChoice.classList.add("selected");
//   });
// });

// submitBtn.addEventListener("click", () => {
//   const nextIndex = currentQuestionIndex + 1;
//   if (nextIndex < questions.length) {
//     goToQuestion(nextIndex);
//   } else {
//     alert("You've completed the quiz!");
//   }
// });

// previousBtn.addEventListener("click", () => {
//   const prevIndex = currentQuestionIndex - 1;
//   if (prevIndex >= 0) {
//     goToQuestion(prevIndex);
//   }
// });

// startbtn.addEventListener("click", () => {
//   popupInfo.classList.add("active");
//   main.classList.add("active");
// });

// closeBtn.addEventListener("click", () => {
//   popupInfo.classList.remove("active");
//   main.classList.remove("active");
// });

// continueBtn.addEventListener("click", () => {
//   quizSection.classList.add("active");
//   popupInfo.classList.remove("active");
//   main.classList.remove("active");
// });

// script.js
const startbtn = document.querySelector(".start-Btn");
const popupInfo = document.querySelector(".popup-info");
const closeBtn = document.querySelector(".cancel-btn");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".continue-btn");
const quizSection = document.querySelector(".quiz-section");

const questionElement = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const previousBtn = document.querySelector("#preBtn");
const submitBtn = document.querySelector(".submit-btn");
const correctAnswersElement = document.querySelector("#correct-answers");
const questionNavigator = document.querySelector(".question-navigator");

let currentQuestionIndex = 0;
let questions = [];
let userAnswers = [];
let questionHistory = [];

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
  .then((res) => res.json())
  .then((loadedQuestions) => {
    questions = loadedQuestions.results.map((loadedQuestion) => {
      const formattedQuestion = { question: loadedQuestion.question };
      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
      answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);
      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });
      return formattedQuestion;
    });
    initQuiz();
  })
  .catch((err) => console.log(err));

function initQuiz() {
  questionHistory = [];
  userAnswers = Array(questions.length).fill(null);
  createNavigatorButtons();
  renderQuestion(currentQuestionIndex);
}

function createNavigatorButtons() {
  questionNavigator.innerHTML = "";
  
  questions.forEach((_, index) => {
    const button = document.createElement("button");
    button.innerText = index + 1;
    button.addEventListener("click", () => goToQuestion(index));
    questionNavigator.appendChild(button);
  });
}

function goToQuestion(index) {
  currentQuestionIndex = index;
  renderQuestion(index);
}

function renderQuestion(index) {
  const currentQuestion = questions[index];
  questionElement.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];

    const selectedAnswer = userAnswers[index];
    choice.previousElementSibling.checked = selectedAnswer === parseInt(number, 10);
  });

  const buttons = questionNavigator.querySelectorAll("button");
  buttons.forEach((btn, idx) => {
    btn.classList.toggle("active", idx === index);
    btn.classList.toggle("answered", userAnswers[idx] !== null);
  });

  previousBtn.disabled = index === 0;
  updateQuestionNumber();
}

function updateQuestionNumber() {
  const questionTotalElement = document.querySelector(".question-total");
  questionTotalElement.innerText = `${currentQuestionIndex + 1} of ${questions.length}`;
}

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    const selectedChoice = e.target;
    const selectedAnswer = parseInt(selectedChoice.dataset["number"], 10);
    userAnswers[currentQuestionIndex] = selectedAnswer;

    choices.forEach((c) => c.classList.remove("selected"));
    selectedChoice.classList.add("selected");

    // Change the color of the navigator button
    const navButtons = questionNavigator.querySelectorAll("button");
    navButtons[currentQuestionIndex].classList.add("answered");
  });
});

submitBtn.addEventListener("click", () => {
  const nextIndex = currentQuestionIndex + 1;
  if (nextIndex < questions.length) {
    goToQuestion(nextIndex);
  } else {
    alert("You've completed the quiz!");
  }
});

previousBtn.addEventListener("click", () => {
  const prevIndex = currentQuestionIndex - 1;
  if (prevIndex >= 0) {
    goToQuestion(prevIndex);
  }
});

startbtn.addEventListener("click", () => {
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

