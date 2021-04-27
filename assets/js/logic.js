// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var timerDiv = document.getElementsByClassName("timer");
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
    alert('Wrong Answer')
    // userInforEl.textContent = "Sorry, Wrong answer please try again!"
  }
  // else
  else {
    // play "right" sound effect
    sfxRight.play();
    alert('Correct Answer')
    // flash right/wrong feedback on page for half a second
    setInterval(feedbackEl.removeAttribute('class'))
    // userInforEl.classList.add('show-info');
    // show user info
    // function hideUserInfo() {
      // userInforEl.textcontent = "correct!";
    }
    // setTimeout(hideUserInfo, 5000);
    // move to next question
    currentQuestionIndex++;
    // check if we've run out of questions
    if (currentQuestionIndex === questions.length) {
      // quizEnd
      quizEnd()
    }
    // else 
    else {
      // getQuestion
      getQuestion()

    }

}

function quizEnd() {
  // stop timer
  clearInterval(timerId)

  // show end screen
  var endScreenEl = document.getElementById('end-screen');
  endScreenEl.removeAttribute('class');
  // show final score
  var finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = time;
  // hide questions and timer section
  questionsEl.setAttribute('class', 'hide')
  timerDiv.classList.add('hide')
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
  var initials = initialsEl.value.trim();
  console.log(initials) 

  // make sure value wasn't empty
  if (initials !== "") {
    var highScores = JSON.parse(localStorage.getItem('highScores')) || []
    console.log(highScores)
    var scoreData = {
      score: time, 
      initials: initials
    }
    highScores.push(scoreData)
    localStorage.setItem('highScores', JSON.stringify(highScores))
  }
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
