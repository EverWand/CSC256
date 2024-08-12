const MAX_ROUNDS = 3;
var currRound = 1;

// Q&A for Syntax Quiz
const QuestionList_SYNTAX = ["S_Q1", "S_Q2","S_Q3", "S_Q4",];
const AnswerList_SYNTAX = ["S_A1", "S_A2", "S_A3", "S_A4", "S_A5", "S_A6"];

//Q&A for Principle Quiz
const QuestionList_PRINCIPLE = ["P_Q1", "P_Q2","P_Q3", "P_Q4",];
const AnswerList_PRINCIPLE = ["P_A1", "P_A2", "P_A3", "P_A4", "P_A5", "P_A6"];

//Different Types of Quizes
const QUIZTYPES = {
    Syntax: {id: 0 , name:"Syntax"},
    Principle: {id: 1, name: "Principle"}
}
var quizType = QUIZTYPES.Syntax; //tracks the current quiz Type [Default is Syntax]


class QuizCard{
    constructor(quizID, correctAnswerID, numOfQuestions, quizType){
        var id = quizID;
        var a_id = correctAnswerID;
        var q_amount = numOfQuestions;
        var type = quizType;
    }

    DisplayQuizCard() {
        var currentQuestionList; //used to save the question list this scope uses

        //Get What List of questions we are using
        switch (quizType){
            //SYNTAX
            case QUIZTYPES.Syntax.name:
                quizType = QUIZTYPES.Syntax;
                currentQuestionList = syntaxQuestionList;
                break;
            //PRINCIPLE
            case QUIZTYPES.Principle.name:
                quizType = QUIZTYPES.Principle;
                currentQuestionList = PrincipleQuestionList;
                break;
        }
        
        //DISPLAY QUIZ INFO
        

        //Display Example Image
        
        CreateAnswerBtns(q_amount, GetRandomInt(q_amount-1)); //Display Answers
    }
}

//Function whenever a new Round Starts
function StartRound(quizType_str){
    var currentQuestionList; //used to save the question list this scope uses

    //Setting Quiz Type
    switch (quizType_str){
        //SYNTAX
        case QUIZTYPES.Syntax.name:
            quizType = QUIZTYPES.Syntax;
            currentQuestionList = syntaxQuestionList;
            break;
        //PRINCIPLE
        case QUIZTYPES.Principle.name:
            quizType = QUIZTYPES.Principle;
            currentQuestionList = PrincipleQuestionList;
            break;
    }

    //GAMEPLAY LOOP! {Recursive Loop, when correct answer is submitted }
    if(currRound <= MAX_ROUNDS){
        //Clean any previous card info
        var card = new QuizCard(currRound, GetRandomInt(3), quizType); //Make a new Quiz Card for the round
        
        card.DisplayQuizCard();
    }
}

//Adds what round the user is on
function IncrementRound(){
    currRound++;

    //Clamps round from 0 to the set Max Rounds
    if(currRound <= 0)
        {
            currRound = 1; 
        }
    else if(currRound > MAX_ROUNDS){
        currRound = MAX_ROUNDS;
    }
}

//Do  Create different Buttons in the Answer Choice Sections
function CreateAnswerBtns(amount, answerID)
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

    ran_AnsPos = random //random position for the answer to spawn in

    //add elements to the answerBox for each answer needing displayed
    for (i = 0; i < amount ; i++){
        var a_btn = document.createElement("button");
        var a_btn_txt = document.createElement("p");

        var randomID = GetRandomInt(currentAnswerList.length)
        //Write the random answer in the button
        a_btn_txt.innerText = currentAnswerList[randomID]
        //Remove that random answer from the list of answers that can be printed
        currentAnswerList.splice(randomID, 1);
        
        a_box.appendChild(a_btn);
        a_btn.appendChild(a_btn_txt);
    }

    function GetRandomInt(max_range){
        ranInt = Math.floor((Math.random()*max_range));
        return ranInt;
    }
}