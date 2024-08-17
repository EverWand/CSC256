//Amount of round in the quiz
const MAX_ROUNDS = 5;
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
const QuestionList_SYNTAX = [syn_Q1, syn_Q2, syn_Q3, syn_Q4, syn_Q5];

//Q&A for Principle Quiz
const QuestionList_PRINCIPLE = [pri_Q1, pri_Q2, pri_Q3, pri_Q4,];



class QuizCard{
    constructor(quizID, questionData, quizType){
        this.id = quizID;
        this.data = questionData;
        this.type = quizType;
        console.log("NEW QUIZ CARD CONSTRUCTED!");
    }

    DisplayQuizCard() {

        //DISPLAY QUIZ INFO
        this.UpdateQuizInfo();

        //Ensure there is no children within the Answer's Box
        DestroyAnswerBtns();
        //Display buttons used to answer
        CreateAnswerBtns(this.data);
    }

    UpdateQuizInfo() {
        let questionSet = QuestionList_SYNTAX[this.id];
        questionSet.DisplayQuestionData();
    }
}

//Function whenever a new Round Starts
function StartRound(quizType_str){
    console.log("Starting Quiz Game");

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
        var card = new QuizCard(currRound-1, QuestionList_SYNTAX[currRound-1], quizType); //Make a new Quiz Card for the round
        
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
function NextRound(){
    currRound++;

    //Clamps round from 0 to the set Max Rounds
    if(currRound <= 0)
        {
            currRound = 1; 
        }
    else if(currRound > MAX_ROUNDS){
        currRound = MAX_ROUNDS;
    }

    StartRound();
}
//Create different Buttons in the Answer Choice Sections
function CreateAnswerBtns(questionData)
{    
    //set the Question Data from the Data given
    let q_data = QuestionData;
    q_data = questionData;

    //Data for the Correct Answer
    var correctAnswerID = 0; //Made it to where the right answer will always be the first index
    var correctAnswerPos = GetRandomInt(q_data.answerList.length - 1)       // Button Position
    console.log(`Corret Answer Located at Position ${correctAnswerPos}`);

    //Empty Array meant to track what Answer IDs have been used already
    var usedIDs = [];

    //reference for the Container that will hold all of the answer buttons
    var a_box = document.getElementById("AnswerBtnsContainer"); 

    //add elements to the answerBox for each answer needing displayed
    for (i = 0; i <= q_data.answerList.length-1 ; i++){
        //Create A New Button to hold the generated data
        var a_btn = document.createElement("button");
        var a_btn_txt = document.createElement("p");
        //For Setting the specific ID that will be used to print data
        console.log(q_data.answerList.length)
        var printID = GetRandomInt(q_data.answerList.length-1);

        //Set the printing ID to the id with the correct answer;
        if(i == correctAnswerPos) { printID = correctAnswerID; }
        else{
            //get a random unused Answer ID
            GetUniqueID();

            //Nested Function used only used to verify if the printing ID has not already been used
            function GetUniqueID(){
                //set a random ID for printing later
                printID = GetRandomInt(q_data.answerList.length-1);

                //check to see if the printing ID is an ID within the used IDs list or happens to land on the correct answer's ID
                if (usedIDs.includes(printID) || printID == correctAnswerID){
                    GetUniqueID();  //Recursively loop until a Unique ID is found
                }
            }
        }

        //Save the found Print ID to the used IDs list
        usedIDs.push(printID);

        //print an answer in the button
        a_btn_txt.innerText = q_data.answerList[printID];
        
        //append the created button with the data obtained
        a_box.appendChild(a_btn);
        a_btn.appendChild(a_btn_txt);
    }
}

//destroys the buttons used to answer
function DestroyAnswerBtns(){
    let a_box = document.getElementById("AnswerBtnsContainer");

    a_box.replaceChildren(); //replace all of the answer box's children with nothing
}

//Getting a random intenger within a range
function GetRandomInt(max_range){
    let ranInt = Math.floor((Math.random()*max_range));
    return ranInt;
}
