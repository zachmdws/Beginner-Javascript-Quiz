var timeEl = document.getElementById("time");
var mainEl = document.getElementById("main");
var startEl = document.getElementById("startButton");
var quizEl = document.getElementById("questionBox");
var quesTl = document.getElementById("question");
var optionAEl = document.getElementById("A");
var optionBEl = document.getElementById("B");
var optionCE1 = document.getElementById("C");
var hiScoreEl = document.getElementById("hiScores");
var fiScoreEl = document.getElementById("finalScore");
var submitEl = document.getElementById("submitHi");
var boardEl = document.getElementById("scoreBoard");
var nameEl = document.querySelector("#name");
var hiScoreListEl = document.getElementById("highscore-list");



getUserInfo();



var quizTime = 75;

var questions = [
  { question: "A(n) _______ is a sequence of one or more characters that may consist of letters, numbers, or symbols.",
    optionA: "Integer",
    optionB: "String",
    optionC: "Boolean",
    correct: "B"
},

{   question: "Javascript is a(n) _______ oriented language.",
    optionA: "Element",
    optionB: "Tag",
    optionC: "Object",
    correct: "C"

},

{   question: "Lines of code are supposed to end with a ____ in Javascript.",
    optionA: "Period",
    optionB: "Comma",
    optionC: "Semicolon",
    correct: "C"

},
{   question: "In Javascript, var is typcially short for...",
    optionA: "Variable",
    optionB: "Varnish",
    optionC: "Variation",
    correct: "A"

},
{   question: "Arrays can store this/these datatypes...",
    optionA: "Strings",
    optionB: "Strings and numbers",
    optionC: "Any data type",
    correct: "C"

},
{   question: " ____ loops are commonly used for iterating through arrays",
    optionA: "If",
    optionB: "Maybe",
    optionC: "For",
    correct: "C"

}
]


var finalQuest = questions.length - 1;

var currQuestIndex = 0;





startEl.addEventListener("click", function setQTime(event) { //First makes start button disappear then reveals questions
    startEl.style.display = "none";
    mainEl.style.display = "none";

    const quizInterval = setInterval(function() { //then the timer is started starting from 75 as set above
    quizTime--; //Timer incremently reduced
    timeEl.textContent = quizTime; //The time element is set equal to 75 and quizTime becomes the variable for this
    startQuest(); //Starts line of questions

    document.getElementById("questionBox").style.display = "block"; 
    document.getElementById("A").style.display = "block";
    document.getElementById("B").style.display = "block";
    document.getElementById("C").style.display = "block";





    quizEl.style.display = "block"; //displays the main quiz or "question box" as I have called it
        
        if(quizTime <= 0 ) { // if the quiz timer ever gets below or to zero, the interval will stop or be cleared
            clearInterval(quizInterval);
            timeEl.textContent = 0; //the time will be set to zero
            quizEl.style.display = "none"; //quiz questions will no longer be on screen
            hiScoreEl.style.display = "block"; //highscores shown

        }
    }, 1000);
});



function checkOption(answer){ //checks if answer is correct using answer as its argument
 
    if(questions[currQuestIndex].correct == answer){ //checking the answer at the different question indices
        ++fiScoreEl.textContent; //if the answer matches what the user input as the argument "A, B, or C" then final score is added to
        alert("Correct!"); //user is alerted as to being correct
    
    }
    else {
        quizTime -= 10; //if answer does not match what user entered time is reduced by 10 seconds
        alert("Incorrect!"); //user is alerted as to being incorrect
    }

    if(currQuestIndex < finalQuest) { //if the current questions index (0 for 1st question, 1 for 2nd question, etc. is less than the length of array's length of questions)
        currQuestIndex++; //Add to the current questions index originally 0 so after 1 question the index becomes 1 then 2, etc.
        startQuest(); //Next question is presented
    }
    else {
        quizTime = 0; //If the current question index is at the last array it will be the same as final question since an array is zero indexed
        timeEl.style.display = "none"; //quiz closes out
    }
}



function startQuest(){ //presents questions to user
    var quest = questions[currQuestIndex];
    quesTl.innerHTML = "<p>" + quest.question + "</p>";
    optionAEl.innerHTML = quest.optionA;
    optionBEl.innerHTML = quest.optionB;
    optionCE1.innerHTML = quest.optionC;
}

var usersInitials = [{name: " ", fiScoreEl: " "}]; //An array of objects using users initials input as its contents


submitEl.addEventListener("click", function addScore(event){ //When initials are entered and submit is pressed, a score adding function is also run
    event.preventDefault(); 
    hiScoreEl.style.display = "none"; //Hides end page where personal score is shown
    boardEl.style.display = "block"; //Reveals hiscore board

    var score = document.getElementById("finalScore").textContent; //set score equal to the text content of our final score
    
    
    var name = nameEl.value; //setting name equal to the value of our name element where you enter in your initials
    var li = document.createElement("li"); //setting "li" equal to a new created list item for our list of highscores
    li.id = usersInitials.length; // create a list item and set the list items' Id equal to the length of the array that will be used to hold our initials
    li.innerHTML = name + ":" + " " + fiScoreEl.textContent; //setting the list items inner html to "initials: score"
    usersInitials.push({name: " ", fiScoreEl: " "}); // pushing or adding the entered in initials and final score
    hiScoreListEl.append(li); //appending or actually attaching to the webpage the list item
    
    localStorage.setItem("name", JSON.stringify(name)); //setting the variables score and name to their local storage items, respectively
    localStorage.setItem("score", score);
})


function getUserInfo() {
    var userName = JSON.parse(localStorage.getItem("name")); //gets the users information (score and initials) and saves them to local storage
    var userScore = localStorage.getItem("score");

    if(userName !== null && userScore >= 0) {
        hiScoreListEl.textContent = userName + ": " + userScore;
        
    }
}

function goBack() {
    boardEl.style.display = "none"; //When Go Back button is presed, this function runs which essentially hides the highscore board, and goes back to just the Start button
    mainEl.style.display = "block";
    startEl.style.display = "block";
    timeEl.style.display = "block";
    quizTime = 75; //resets time, index of the question to start at the beginning otherwise it will be longer than the questions array length
    currQuestIndex = 0;
    fiScoreEl.textContent = 0; //resets score for current user so it doesn't add to the score at the end
}

function clearScores() { //Clears out the local storage so the scores aren't saved and empties the highscores text content out
    localStorage.clear();
    hiScoreListEl.textContent = " ";
    
}

function viewHiScores() { //hides start button and shows highscore board
    quizTime = 0;
    mainEl.style.display = "none";  
    startEl.style.display = "none";
    boardEl.style.display = "block";
    
}

