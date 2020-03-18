const start = document.querySelector("#start")
const quiz = document.querySelector("#quiz")
const question = document.querySelector("#question")
const qImg = document.querySelector("#qImg")
const choiceA = document.querySelector("#A")
const choiceB = document.querySelector("#B")
const choiceC = document.querySelector("#C")
const counter = document.querySelector("#counter")
const timeGauge = document.querySelector("#timeGauge")
const scoreDiv = document.querySelector("#scoreContainer")

// create our questions
let questions = [
    {
        question: "What is your best meal",
        imgSrc: "img/5.png",
        choiceA: "veg soup",
        choiceB: "Beans",
        choiceC: "Plantain",
        correct: "B"
    },
    {
        question: "What is your best club",
        imgSrc: "img/html.png",
        choiceA: "Chelsea",
        choiceB: "Arsenal",
        choiceC: "Barcelona",
        correct: "A"
    },
    {
        question: "What is your best color",
        imgSrc: "img/css.png",
        choiceA: "Blue",
        choiceB: "Red",
        choiceC: "Pink",
        correct: "C"
    },
]

// create some variables
let lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
let questionTime = 10;
let gaugeWidth = 150;
let gaugeUnit = gaugeWidth / questionTime;
let TIMER = "";
let score = 0;

// render a question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = `<p>${q.question}</p>`;
    qImg.innerHTML = `<img src= ${q.imgSrc}>`;
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

// listening to start id
start.addEventListener("click", startQuiz);

// start Quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,  1000);
}

// render progress
function renderProgress() {
    for ( let i = 0; i <= questions.length; i++) {
        progress.innerHTML += "<div class='prog' id=" + i + "></div>";
    }

}

// render counter
function renderCounter(){
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++;
    } else {
        count = 0;
        // change progress color to red
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// check answer
function checkAnswer(answer) {
    if(answer == questions[runningQuestion].correct) {
 // answer is correct
        score++;
// change progress color to green
        answerIsCorrect();
    } else {
        answerIsWrong();
    }

}
    // count = 0;
if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
}


function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";

    // calculate the amount of question percent by the user
    const scorePercent = Math.round((100 * score) / questions. length);

    // choose the image based on the scorePercent
    let img = 
        (scorePercent >= 80)
        ? "img/5.png"
        : ( scorePercent >= 60)
        ? "img/4.png"
        : (scorePercent >= 40)
        ? "img/3.png"
        : (scorePercent >= 20)
        ? "img/2.png"
        : "img/3.png"
    
    scoreDiv.innerHTML = "<img src=" + img + ">";
    scoreDiv.innerHTML += "<p>" + scorePercent + "</p>";


}


