/* ============================================================
   QUIZ APP - script.js
   Shows one question at a time, checks answers,
   counts the score, and displays a final result.
   ============================================================ */

/* ====== 1. THE QUESTIONS ======
   An array of question objects. Each one has:
   - question: the text
   - options:  an array of 4 choices
   - answer:   the index (0-3) of the correct option
*/
const questions = [
  {
    question: "Which language is used to style web pages?",
    options: ["HTML", "CSS", "Python", "C++"],
    answer: 1
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language"
    ],
    answer: 0
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["<!-- -->", "//", "/* */", "#"],
    answer: 1
  },
  {
    question: "Which tag is used to link a CSS file in HTML?",
    options: ["<script>", "<style>", "<link>", "<css>"],
    answer: 2
  },
  {
    question: "What does the 'localStorage' object do?",
    options: [
      "Stores data on a server",
      "Stores data in the browser",
      "Sends emails",
      "Styles the page"
    ],
    answer: 1
  }
];

/* ====== 2. GRAB THE HTML ELEMENTS ====== */
const progress = document.getElementById("progress");
const questionText = document.getElementById("questionText");
const optionsBox = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");

const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const scoreText = document.getElementById("scoreText");
const restartBtn = document.getElementById("restartBtn");

/* ====== 3. KEEP TRACK OF PROGRESS ====== */
let currentQuestion = 0; // which question we are on
let score = 0;           // how many correct so far
let answered = false;    // stops clicking twice on one question

/* ====== 4. SHOW A QUESTION ====== */
function showQuestion() {
  answered = false;
  nextBtn.style.display = "none"; // hide Next until they answer

  const q = questions[currentQuestion];

  // Update progress text and question
  progress.textContent = "Question " + (currentQuestion + 1) + " of " + questions.length;
  questionText.textContent = q.question;

  // Clear old options
  optionsBox.innerHTML = "";

  // Create a button for each option
  q.options.forEach(function (option, index) {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.className = "option";

    // When clicked, check if it's correct
    btn.onclick = function () {
      selectAnswer(btn, index);
    };

    optionsBox.appendChild(btn);
  });
}

/* ====== 5. HANDLE AN ANSWER CLICK ====== */
function selectAnswer(button, selectedIndex) {
  // If already answered, ignore further clicks
  if (answered) return;
  answered = true;

  const correctIndex = questions[currentQuestion].answer;

  // Get all option buttons
  const allOptions = document.querySelectorAll(".option");

  // Show correct answer in green; if user was wrong, show their pick in red
  allOptions.forEach(function (opt, index) {
    if (index === correctIndex) {
      opt.classList.add("correct");
    } else if (index === selectedIndex) {
      opt.classList.add("wrong");
    }
  });

  // Add to score if correct
  if (selectedIndex === correctIndex) {
    score++;
  }

  // Show the Next button
  nextBtn.style.display = "block";
}

/* ====== 6. GO TO THE NEXT QUESTION (OR RESULTS) ====== */
nextBtn.onclick = function () {
  currentQuestion++;

  // If there are more questions, show the next one
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
};

/* ====== 7. SHOW THE FINAL RESULT ====== */
function showResult() {
  quizScreen.classList.add("hidden");    // hide the quiz
  resultScreen.classList.remove("hidden"); // show the result
  scoreText.textContent = "You scored " + score + " out of " + questions.length;
}

/* ====== 8. RESTART THE QUIZ ====== */
restartBtn.onclick = function () {
  currentQuestion = 0;
  score = 0;
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();
};

/* ====== 9. START THE QUIZ WHEN PAGE LOADS ====== */
showQuestion();
