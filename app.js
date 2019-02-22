let sortAnswers = [];
let questions = [];
let userAnswerList = [];
let totalGameCount = Number(localStorage.getItem('totalGameCount'));
let totalCorrectCount = Number(localStorage.getItem('totalCorrectCount'));
let totalFalseCount = Number(localStorage.getItem('totalFalseCount'));
let totalPercontage = [];


function startQuiz() {
  let oReq = new XMLHttpRequest();
  oReq.addEventListener("load", showData);
  oReq.open("GET", "https://opentdb.com/api.php?amount=2&difficulty=easy&type=multiple");
  oReq.send();
}

function showData() {
  let startButton = document.querySelector("#startButton");
  startButton.setAttribute("style", "display:none");
  questions = JSON.parse(this.responseText).results;
  console.log(questions);
  let ul = '<ul>';
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    sortAnswers = question.incorrect_answers;
    sortAnswers.push(question.correct_answer);
    sortAnswers.sort(() => Math.random() - 0.5);
    console.log(question.correct_answer);

    ul += `
     <li class="questions" id="question_${i}">
     <span class="q__head">Question ${i + 1}</span>
       <h6 class="category--name">${question.category}</h6>
       <p>${question.question}</p> 
       <ul class="answer--ul">
        <li>
           <input  class="radio__input" type="radio" name="answers_${i}" value="${sortAnswers[0]}">
           <label for="radio1" class="radio__label">${sortAnswers[0]}</label>
        </li>
       
        <li>
           <input  class="radio__input" type="radio" name="answers_${i}" value="${sortAnswers[1]}">
           <label for="radio2" class="radio__label">${sortAnswers[1]}</label>
        </li>

        <li>
           <input  class="radio__input" type="radio" name="answers_${i}" value="${sortAnswers[2]}">
           <label for="radio3" class="radio__label">${sortAnswers[2]}</label>
        </li>

        <li>
           <input  class="radio__input" type="radio" name="answers_${i}" value="${sortAnswers[3]}">
           <label for="radio4 " class="radio__label">${sortAnswers[3]}</label>
        </li>
       </ul>
     </li>
     `
  };
  ul += `</ul>`;
  $('#show--data').html(ul);
  let finishButton = document.createElement("button");
  finishButton.setAttribute("type", "button");
  finishButton.setAttribute("id", "myBtn");
  finishButton.setAttribute("onclick", "finishQuiz()");
  finishButton.textContent = "Finish";
  let showDataUl = document.querySelector("#show--data ul");
  showDataUl.appendChild(finishButton);
}

function finishQuiz() {
  $(".modal-body").html(" ");
  let modalContent = $(".modal-body");
  let questionList = $(".questions");
  for (let i = 0; i < questionList.length; i++) {
    const elementId = questionList[i].id;
    let index = parseInt(elementId.replace(/question_/g, ''));
    console.log(index);
    let selectedAnswer = $('input[name=answers_' + i + ']:checked', '#questionForm').val()
    console.log(selectedAnswer);
    if (typeof selectedAnswer === 'undefined') {
      alert("Please Select");
      userAnswerList = [];
      return false;
    }
    if (selectedAnswer === questions[i].correct_answer) {
      userAnswerList[i] = true;
      modalContent.append("<li><h5>Question- " + (i + 1) + " </h5><span>" + selectedAnswer + "</span> <span>Rätt</span></li>");

    } else {
      userAnswerList[i] = false;
      modalContent.append("<li><h5>Question- " + (i + 1) + " </h5><span>" + selectedAnswer + "</span> <span>Fel</span></li>");
    }
  }
  let modal = document.getElementById('myModal');
  let btn = document.getElementById("myBtn");
  modal.style.display = "block";
  finalizeQuizStatistics();
}

let closeModal = document.getElementsByClassName("closeModal")[0];
closeModal.onclick = function () {
  let modal = document.getElementById('myModal');
  modal.style.display = "none";
  restartQuiz();
}

function finalizeQuizStatistics() {
  localStorage.setItem('totalGameCount', (++totalGameCount));
  for (let i = 0; i < userAnswerList.length; i++) {
    if (userAnswerList[i]) {
      totalCorrectCount++;
    } else {
      totalFalseCount++;
    }
  }
  localStorage.setItem('totalCorrectCount', totalCorrectCount);
  localStorage.setItem('totalFalseCount', totalFalseCount);
  totalPercontage = Math.round(((totalCorrectCount / (totalCorrectCount + totalFalseCount)) * 100 + 0.00001) * 100) / 100;
}

function restartQuiz() {
  let startButton = document.querySelector("#startButton");
  startButton.setAttribute("style", "display:block");
  $("#show--data").html(" ");
}

function quizAbout() {
  $("#show--data").empty();
  $("#startButton").hide();
  let showData = document.querySelector("#show--data");
  let aboutSection = document.createElement("div");
  aboutSection.classList.add("about--section");
  showData.appendChild(aboutSection);
  $(".about--section").append("<h4>About this app</h4><p>Eam iriure posidonium ei, mei etiam voluptua insolens ex. At albucius eligendi sea, pro facilisis posidonium ex, magna facer ei has. Vis veri accusata id. Qualisque similique scriptorem vel id. Eos laoreet petentium eu, ad mel nemore perfecto ullamcorper.</p>");
}
function quizStats() {
  $("#show--data").empty();
  $("#startButton").hide();
  let showData = document.querySelector("#show--data");
  let statsSection = document.createElement("div");
  statsSection.classList.add("stats--section");
  showData.appendChild(statsSection);
  $(".stats--section").append("<h4>" + "GAME PLAYED" + "</h4>" + totalGameCount);
  $(".stats--section").append("<h4>" + "CORRECT ANSWERS" + "</h4>" + totalCorrectCount);
  $(".stats--section").append("<h4>" + "INCORRECT ANSWERS" + "</h4>" + totalFalseCount);
  $(".stats--section").append("<h4>" + "CORRECT PERCONTAGE" + "</h4>" + totalPercontage + " %");

}

function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
}
