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
        this.id = quizID;
        this.a_id = correctAnswerID;
        this.q_amount = numOfQuestions;
        this.type = quizType;
        console.log("NEW QUIZ CARD CONSTRUCTED!");
    }

    DisplayQuizCard() {
        var currentQuestionList; //used to save the question list this scope uses

        //Get What List of questions we are using
        switch (this.quizType){
            //SYNTAX
            case QUIZTYPES.Syntax.name:
                this.quizType = QUIZTYPES.Syntax;
                this.currentQuestionList = QuestionList_SYNTAX;
                break;
            //PRINCIPLE
            case QUIZTYPES.Principle.name:
                this.quizType = QUIZTYPES.Principle;
                this.currentQuestionList = QuestionList_PRINCIPLE;
                break;
        }
        
        //DISPLAY QUIZ INFO
        

        //Display Example Image
        
        CreateAnswerBtns(this.q_amount, GetRandomInt(this.q_amount-1)); //Display Answers
    }
}

//Function whenever a new Round Starts
function StartRound(quizType_str){
    console.log("Starting Quiz Game");
    var currentQuestionList; //used to save the question list this scope uses

    //Setting Quiz Type
    switch (quizType_str){
        //SYNTAX
        case QUIZTYPES.Syntax.name:
            quizType = QUIZTYPES.Syntax;
            currentQuestionList = QuestionList_SYNTAX;
            break;
        //PRINCIPLE
        case QUIZTYPES.Principle.name:
            quizType = QUIZTYPES.Principle;
            currentQuestionList = QuestionList_PRINCIPLE;
            break;
    }

    //GAMEPLAY LOOP! {Recursive Loop, when correct answer is submitted }
    if(currRound <= MAX_ROUNDS){
        console.log(`Starting Round ${currRound} of ${MAX_ROUNDS}`);
        //Clean any previous card info
        var card = new QuizCard(currRound, GetRandomInt(3), 4, quizType); //Make a new Quiz Card for the round
        
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

//Create different Buttons in the Answer Choice Sections
function CreateAnswerBtns(amount, correctAnswerID)
{
    console.log(`Creating answer buttons. Correct button being: ${correctAnswerID}`)
    var currentAnswerList = [];  //Tracks the amount of Answers have been used already generated

    //Decide what answer pool we are using based on the Quiz Type
    switch (quizType){
        //Syntax
        case QUIZTYPES.Syntax:
            currentAnswerList = AnswerList_SYNTAX;
            break;
        //Principles
        case QUIZTYPES.Principle:
            currentAnswerList = AnswerList_PRINCIPLE;
            break;
    }

    //Data for the Correct Answer
    var CorrectAnswerPos = GetRandomInt(amount-1)       // Button Position
    console.log(`Corret Answer Located at Position ${CorrectAnswerPos}`);

    //Empty Array meant to track what Answer IDs have been used already
    var usedIDs = [];

    //reference for the Container that will hold all of the answer buttons
    var a_box = document.getElementById("AnswerBtnsContainer"); 

    //add elements to the answerBox for each answer needing displayed
    for (i = 0; i <= amount-1 ; i++){
        //Create A New Button to hold the generated data
        var a_btn = document.createElement("button");
        var a_btn_txt = document.createElement("p");
        //For Setting the specific ID that will be used to print data
        var printID = GetRandomInt(currentAnswerList.length);

        //Set the printing ID to the id with the correct answer;
        if(i == CorrectAnswerPos) { printID = correctAnswerID; }
        else{
            //get a random unused Answer ID
            GetUniqueID();

            //Nested Function used only used to verify if the printing ID has not already been used
            function GetUniqueID(){
                //set a random ID for printing later
                printID = GetRandomInt(currentAnswerList.length);

                //check to see if the printing ID is an ID within the used IDs list or happens to land on the correct answer's ID
                if (usedIDs.includes(printID) || printID == correctAnswerID){
                    GetUniqueID();  //Recursively loop until a Unique ID is found
                }
            }
        }

        //Save the found Print ID to the used IDs list
        usedIDs.push(printID);

        //print an answer in the button
        a_btn_txt.innerText = currentAnswerList[printID];
        
        //append the created button with the data obtained
        a_box.appendChild(a_btn);
        a_btn.appendChild(a_btn_txt);
    }
}

//Getting a random intenger within a range
function GetRandomInt(max_range){
        let ranInt = Math.floor((Math.random()*max_range));
        return ranInt;
}
