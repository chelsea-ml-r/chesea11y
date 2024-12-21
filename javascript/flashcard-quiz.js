function Question(ask, answer, distractor1, distractor2, distractor3){
    var distractors = [distractor1, distractor2, distractor3];
    shuffleArray(distractors);
    this.ask = ask;
    this.answer = answer;
    this.distractor1 = distractors[0];
    this.distractor2 = distractors[1];
    this.distractor3 = distractors[2];
    
}

///general shuffle function from stackoverflow
function shuffleArray(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function justTheQuestionsPlease(){
    document.getElementsByClassName("no-js")[0].style.display ="block";
    hideIntro();
    document.getElementsByClassName("js-only")[0].style.display ="none";

    console.log("justTheQuestionsplease");
}
function startGamePlease() {
    document.getElementsByClassName("js-only")[0].style.display ="block";
    hideIntro();
    console.log("startGame");

}
function hideIntro(){
    document.getElementsByClassName("instructions")[0].style.display ="none";
}

//configuring site 
let showGame = document.getElementById("showgame");
let showQuestions = document.getElementById("showquestions");
showQuestions.style.display ="inline";
showQuestions.addEventListener("click", justTheQuestionsPlease);
showGame.style.display ="inline";
showGame.addEventListener("click", startGamePlease);
document.getElementsByClassName("no-js")[0].style.display ="none";



//Scraping Data from Sitev

const questionsData = document.getElementsByClassName("question");
var questions = [];

for (question of questionsData){
    var ask = "";
    var answer ="";
    var distractor1= "";
    var distractor2 = "";
    var distractor3 = "";
    for(child of question.children){
        if(child.localName == "h3"){
            ask = child.innerText;
        }
        else if(child.localName == "ul"){
            for (listElement of child.children){
                if (listElement.className == "correct"){
                    answer = listElement.innerText;
                }else if(listElement.className == "false" && distractor1 == ""){
                    distractor1 = listElement.innerText;
                }
                else if(listElement.className == "false" && distractor2 == ""){
                    distractor2 = listElement.innerText;
                }else if(listElement.className == "false" && distractor3 == ""){
                    distractor3 = listElement.innerText;
                }
            }
            let newQuestion = new Question(ask, answer, distractor1, distractor2, distractor3);
            questions.push(newQuestion);
            /*console.log(questionIndex+ask +"\nCorrect:"+answer+"\n"+distractor1+"\n"+distractor2+"\n"+distractor3);
             distractor1 = "";
             distractor2 = "";
             distractor3 = "";*/
        }
        
    }
}
function correct(){
    points = points + 1;
    console.log(questionIndex+"correct()");

    showFeedbackScreen("Correct.");
}
function incorrect(){
    console.log(questionIndex+"incorrect()");

    showFeedbackScreen("Incorrect.");
}
function showFeedbackScreen(message){
    console.log(questionIndex+"showFeedback");
    questionArea = document.getElementById("question-area").children; //get all children
    questionArea[1].style.display = "none";
    questionArea[2].style.display = "none";
    questionArea[3].style.display = "none";
    questionArea[4].style.display = "none";

    document.getElementById("proceed").style.display = "block";
    let test = document.getElementById("test");
    test.innerText = message+" The answer is:\n"+questions[questionIndex].answer;
    test.focus();

    //show the answer

}
function reset(){
    console.log(questionIndex+"reset");
    document.getElementById("proceed").style.display = "none";

    questionIndex = questionIndex+1;  //increase question index
    if (questionIndex == questions.length){
        endGame();
    }else{
        questionArea[1].style.display = "block";
        questionArea[2].style.display = "block";
        questionArea[3].style.display = "block";
        questionArea[4].style.display = "block";
        showQuestion(questionIndex);
    }
}
function endGame(){
    questionArea = document.getElementById("question-area").children; //get all children
    questionArea[1].style.display = "none";
    questionArea[2].style.display = "none";
    questionArea[3].style.display = "none";
    questionArea[4].style.display = "none";
    document.getElementById("end").style.display = "none";
    document.getElementById("test").innerText = "Your Game is Over. \nReload page to play again.";
}

function showQuestion(questionIndex){
    console.log(questionIndex+"showQuestion");

    if (questionIndex != 1){
        document.getElementById("accuracy-score").innerText = Math.round(points / (questionIndex-1)*100);
    }
    document.getElementById("ordinal").innerText = questionIndex;
    question = questions[questionIndex];
    let test = document.getElementById("test");
    test.innerText = question.ask;
    test.focus();
    let options = [question.distractor1, question.distractor2, question.distractor3,question.answer];
    buttons = document.getElementsByClassName("option");
    let incorrectOptions = document.getElementsByClassName("incorrectOption");
    let correctOption = document.getElementsByClassName("correctOption")[0];



    //attach correct answer to correct node
    
    correctOption.innerText = options[3];
    for (i=0; i<3; i++){ 
        incorrectOptions[i].innerText = options[i];
    }
    /*need to scramble buttons*/
    let randomizedIndex = Math.floor(Math.random()*(4)+1);
    randomizedIndex = randomizedIndex-1;
    if(randomizedIndex == 0){
        buttons[3].after(buttons[0]);
    }else if(randomizedIndex == 1){
        buttons[3].after(buttons[1]);
    }
    if(randomizedIndex == 2){        
        buttons[3].after(buttons[2]);
    }

}

function selectAnswer(textSelected){
    console.log(questionIndex+textSelected);
}
function initiateGame(){
    shuffleArray(questions);
    shuffleArray(questions);
    quit = false;
    points = 0;
    questionIndex = 1;
    document.getElementById("out-of").innerText = questions.length-1;
    buttons = document.getElementsByClassName("option");
    for (i=0; i<3; i++){ //applies to first three buttons
        buttons[i].addEventListener("click", function(){
            incorrect()});
    }
    buttons[3].addEventListener("click", function(){correct()});
    showQuestion(questionIndex);

}
var quit = false;
var points = 0;
var questionIndex = 0;
document.getElementById("proceed").addEventListener("click", reset);
document.getElementById("end").addEventListener("click", justTheQuestionsPlease);

initiateGame()

/* GAME/FUNCTION STRUCTURE
    initiategame sends to showQuestion which assigns eventlisteners to all buttons
    button will go to either correct() or incorrect() which will either add a point or not
    send to showFeedbackScreen()
*/





