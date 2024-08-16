//Amount of round in the quiz
const MAX_ROUNDS = 3;
var currRound = 1;

//Different Types of Quizes
const QUIZTYPES = {
    Syntax: {id: 0 , name:"Syntax"},
    Principle: {id: 1, name: "Principle"}
}
//tracks the current quiz Type [Default is Syntax]
var quizType = QUIZTYPES.Syntax;

//Data used to structure questions
class QuestionData{
    constructor(q_Prompt, q_Example, a_list){
        this.prompt = q_Prompt;
        this.example = q_Example;
        this.answerList = a_list;
    }

    DisplayQuestionData(){
        console.log(`Displaying Question Data for Quiz Page`);

        //Get the Container of the prompt area.
        let promptCont = document.getElementById("QuestionPrompt");
        //get container of the example area.
        let exampleCont = document.getElementById("QuestionExample");
        //create ether a text example or an image
        var exampleBox;
        let examplePrint = "";
        examplePrint = this.example;

        //Is the Example an image?
        if(examplePrint.includes(".png")){
            //Create an image and set source
            exampleBox = document.createElement("img");
            exampleBox.src = examplePrint;
        }
        else{

            //create a header element and set the text
            exampleBox = document.createElement("h2");
            exampleBox.innerText = examplePrint;
        }

        //Append data into the content containers in HTML
        promptCont.innerText = this.prompt;
        exampleCont.appendChild(exampleBox);
    }
}

//Syntax Questions
let syn_Q1 = new QuestionData(
    "What keyword is used to declare a block-scoped variable in JavaScript?", 
    "let", 
    ["let", "var", "const", "function"]
);
let syn_Q2 = new QuestionData(
    "Which keyword is used to create a constant variable that cannot be reassigned?", 
    "const",
    ["const","let","var","function"]
);
let syn_Q3 = new QuestionData(
    "How do you write an arrow function in JavaScript?", 
    "() => {}",
    ["() => {}", "function => {}", "function() => {}", "() -> {}"]
);
let syn_Q4 = new QuestionData(
    "What is the correct syntax for a ternary operator in JavaScript?", 
    "condition ? expr1 : expr2;",
    ["condition ? expr1 : expr2;", "condition ? expr1 , expr2;" , "condition : expr1 ? expr2;" , "condition -> expr1 : expr2;"]
);
let syn_Q5 = new QuestionData(
    "Which loop will execute at least once, regardless of the condition being true or false?", 
    "do-while",
    ["do-while", "for", "while", "for-in"]
);


//Principle Questions
let pri_Q1 = new QuestionData("P_Q1", "P_QE1");
let pri_Q2 = new QuestionData("P_Q2", "P_QE2");
let pri_Q3 = new QuestionData("P_Q3", "P_QE3");
let pri_Q4 = new QuestionData("P_Q4", "P_QE4");

// Q&A for Syntax Quiz
const QuestionList_SYNTAX = [syn_Q1, syn_Q2, syn_Q3, syn_Q4];
const AnswerList_SYNTAX = ["S_A1", "S_A2", "S_A3", "S_A4", "S_A5", "S_A6"];
//Q&A for Principle Quiz
const QuestionList_PRINCIPLE = [pri_Q1, pri_Q2, pri_Q3, pri_Q4,];
const AnswerList_PRINCIPLE = ["P_A1", "P_A2", "P_A3", "P_A4", "P_A5", "P_A6"];


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
        this.UpdateQuizInfo();
        //Display Example Image
        CreateAnswerBtns(this.q_amount, GetRandomInt(this.q_amount-1)); //Display Answers
    }

    UpdateQuizInfo() {
        let questionSet = QuestionList_SYNTAX[this.id];
        questionSet.DisplayQuestionData();
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

    //Fill in Header Info
    FillHeader();

    //GAMEPLAY LOOP! {Recursive Loop, when correct answer is submitted }
    if(currRound <= MAX_ROUNDS){
        console.log(`Starting Round ${currRound} of ${MAX_ROUNDS}`);
        //Clean any previous card info
        var card = new QuizCard(currRound-1, GetRandomInt(3), 4, quizType); //Make a new Quiz Card for the round
        
        card.DisplayQuizCard();
    }
}

function FillHeader(){
    //Diplay the Correct Quiz Label
    let QuizLabel = document.getElementById("QuizLabel");
    QuizLabel.innerText = quizType.name;
    //update displays to the current round information
    updateRoundInfo();
}

function updateRoundInfo(){
    //====Update Round info====
    //current round display
    let currDisplay = document.getElementById("CurrRoundDisplay");
    currDisplay.innerText = currRound;
    //max rounds display
    let maxDiplay = document.getElementById("MaxRoundDisplay");
    maxDiplay.innerText = MAX_ROUNDS;

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
