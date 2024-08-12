var syntaxQuestionList = ["S_Q1", "S_Q2","S_Q3", "S_Q4",];
var syntaxAnswerList = ["S_A1", "S_A2", "S_A3", "S_A4", "S_A5", "S_A6"];
var PrincipleQuestionList = ["P_Q1", "P_Q2","P_Q3", "P_Q4",];
var PrincipleAnswerList = ["P_A1", "P_A2", "P_A3", "P_A4", "P_A5", "P_A6"];

const MAX_ROUNDS = 3;
var currRound = 1;

const QUIZTYPES = {
    Syntax: {id: 0 , name:"Syntax"},
    Principle: {id: 1, name: "Principle"}
}



var quizType = QUIZTYPES.Syntax;

function StartQuiz(quizType_str){
    switch (quizType){
        case "Sytnax":
            quizType = QUIZTYPES.Syntax;
            currentQuestionList = syntaxQuestionList;
            break;
        case "Principle":
            quizType = QUIZTYPES.Principle;
            currentQuestionList = PrincipleQuestionList;
            break;
    }

    //GAMEPLAY LOOP!
    for(var i = 0; i < MAX_ROUNDS
    DisplayQuestion
}

function DisplayQuestion(questionID, questionList){
    CreateAnswerBtns(4);
}

//Do  Create different Buttons in the Answer Choice Sections
function CreateAnswerBtns(amount)
{
    var currentAnswerList;  //Tracks the amount of Answers have been used already generated

    //Decide what answer pool we are using based on the Quiz Type
    switch (quizType){
        //Syntax
        case QUIZTYPES.Syntax:
            currentAnswerList = syntaxAnswerList;
            break;
        //Principles
        case QUIZTYPES.Principle:
            currentAnswerList = PrincipleAnswerList;
            break;
    }

    //Where the Answers will be generated
    var a_box = document.getElementById("AnswerBtnsContainer"); 
 
    //add elements to the answerBox for each answer needing displayed
    for (i = 0; i < amount ; i++){
        var a_btn = document.createElement("button");
        var a_btn_txt = document.createElement("p");

        var randomID = Math.floor((Math.random()*currentAnswerList.length));

        //Write the random answer in the button
        a_btn_txt.innerText = currentAnswerList[randomID]
        //Remove that random answer from the list of answers that can be printed
        currentAnswerList.splice(randomID, 1);
        
        a_box.appendChild()
    }

}