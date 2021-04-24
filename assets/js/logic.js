// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var userInforEl = document.getElementById("user-info");

// sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

function startQuiz() {
  // hide start screen
  var startScreenEl = document.querySelector("#start-screen");
  startScreenEl.style.display = "none";
  // un-hide questions section
  var questionsEl = document.querySelector("#questions");
  questionsEl.classList.remove("hide");
  // start timer
  timerId = setInterval(clockTick, 1000)


  // show starting time
  timerEl.textContent = time;


  getQuestion();
}

function getQuestion() {
  var questionTitle = document.getElementById("question-title")
  var choiceDiv = document.getElementById("choices")
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];
  // update title with current question
  questionTitle.textContent = currentQuestion.title;
  // clear out any old question choices
  choicesEl.innerHTML = "";
  console.log(questionsEl);
  // loop over choices
  for (let i = 0; i< currentQuestion.choices.length; i++) {
    var choice = currentQuestion.choices[i]
    // create new button for each choice
    var choiceBtn = document.createElement("div");
    choiceBtn.setAttribute('data-answer', choice)
    choiceBtn.textContent = choice;
    // attach click event listener to each choice
    choiceBtn.onclick = questionClick;
    console.log(choice)

   // display on the page
   choiceDiv.append(choiceBtn)

} }

function questionClick() {
  // check if user guessed wrong
  var isCorrect = this.dataset.answer === questions[currentQuestionIndex].answer;
  if (!isCorrect) {

    // penalize time
    if (this.dataset.answer !== questions[currentQuestionIndex].answer) {
      time -= 5
    }
    // display new time on page
    
    // play "wrong" sound effect
    sfxWrong.play();
    userInforEl.textContent = "Sorry, Wrong answer please try again!"
  }
  // else
  else {
    // play "right" sound effect
    sfxRight.play();
    
    // flash right/wrong feedback on page for half a second
    userInforEl.classList.add('show-info');
    // show user info
    function hideUserInfo() {
      userInforEl.textcontent = "correct!";
    }
    setTimeout(hideUserInfo, 5000);
    // move to next question

    
    // check if we've run out of questions
  } 
    // quizEnd
    // else 
    // getQuestion
}

function quizEnd() {
  // stop timer
  clearInterval(timerId)

  // show end screen

  // show final score

  // hide questions section
}

function clockTick() {
  // update time
  time --;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }

}

function saveHighscore() {
  // get value of input box

  // make sure value wasn't empty
    // get saved scores from localstorage, or if not any, set to empty array

    // format new score object for current user

    // save to localstorage

    // redirect to next page
}

function checkForEnter(event) {
  // check if event key is enter
    // saveHighscore
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
