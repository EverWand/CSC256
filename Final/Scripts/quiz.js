//Amount of round in the quiz
const MAX_ROUNDS = 5;
var currRound = 1;

//Data used to structure questions
class QuestionData{
    constructor(q_Prompt, a_list){
        this.prompt = q_Prompt;
        this.answerList = a_list;
    }

    //Displays the data from the Question Class
    DisplayQuestionData(){
        console.log(`Displaying Question Data for Quiz Page`);

        //Get the Container of the prompt area.
        let promptCont = document.getElementById("QuestionPrompt");
        //get container of the example area.
        let exampleCont = document.getElementById("QuestionExample");
        //create ether a text example or an image
        var exampleBox;
        let examplePrint = "";

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

//Syntax Questions - JavaScript
//--Q1
let syn_Q1 = new QuestionData(
    "What keyword is used to declare a block-scoped variable in JavaScript?", 
    ["let", "var", "const", "function"]
);
//--Q2
let syn_Q2 = new QuestionData(
    "Which keyword is used to create a constant variable that cannot be reassigned?", 
    ["const","let","var","function"]
);
//--Q3
let syn_Q3 = new QuestionData(
    "How do you write an arrow function in JavaScript?", 
    ["() => {}", "function => {}", "function() => {}", "() -> {}"]
);
//--Q4
let syn_Q4 = new QuestionData(
    "What is the correct syntax for a ternary operator in JavaScript?", 
    ["condition ? expr1 : expr2;", "condition ? expr1 , expr2;" , "condition : expr1 ? expr2;" , "condition -> expr1 : expr2;"]
);
//--Q5
let syn_Q5 = new QuestionData(
    "Which loop will execute at least once, regardless of the condition being true or false?", 
    ["do-while", "for", "while", "for-in"]
);

// Q&A for Syntax Quiz
const QuestionList_SYNTAX = [syn_Q1, syn_Q2, syn_Q3, syn_Q4, syn_Q5];

class QuizCard{
    constructor(quizID, questionData){
        this.id = quizID;
        this.data = questionData;
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
        const questionSet = QuestionList_SYNTAX[this.id];
        questionSet.DisplayQuestionData();
    }
}

//Function whenever a new Round Starts
function StartRound(){
    console.log("Starting Quiz Game");
 
    //Fill in Header Info
    FillHeader();

    //GAMEPLAY LOOP! {Recursive Loop, when correct answer is submitted }
    if(currRound <= MAX_ROUNDS){
        console.log(`Starting Round ${currRound} of ${MAX_ROUNDS}`);
        //Clean any previous card info
        var card = new QuizCard(currRound-1, QuestionList_SYNTAX[currRound-1]); //Make a new Quiz Card for the round
        
        card.DisplayQuizCard();
    }
}

//Fills in the Quiz's Header Information
function FillHeader(){
    //Diplay the Correct Quiz Label
    let QuizLabel = document.getElementById("QuizLabel");
    QuizLabel.innerText = "Syntax";
    //update displays to the current round information
    UpdateRoundInfo();
}
//Updates the Round Info
function UpdateRoundInfo(){
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

    //Save the Correct Answer [assumed it's held in the first index of answers]
    const correctAnswer = q_data.answerList[0];
    console.log(`Corret Answer is: ${correctAnswer}`);

    //reference for the Container that will hold all of the answer buttons
    const a_box = document.getElementById("AnswerBtnsContainer"); 
    //Shuffle the Answer List
    const a_list = ShuffleArray(q_data.answerList);

    //===| Generating Answer Buttons |===
    for (i = 0; i <= a_list.length-1 ; i++){
        //saves the answer from this current iteration
        const answer = a_list[i];
        //Create A New Button to hold the generated data
        const a_btn = document.createElement("button");
        const a_btn_txt = document.createElement("p");

        //Print an answer in the button
        a_btn_txt.innerText = a_list[i];

        //append the created button with the data obtained
        a_box.appendChild(a_btn);
        a_btn.appendChild(a_btn_txt);

        //Adding Option class
        a_btn.classList.add("a_option");
        //if the iterated answer is the correct answer
         if(answer == correctAnswer){
            //add the correct answer class
            a_btn.classList.add("a_correct");
        }
    }
}

//destroys the buttons used to answer
function DestroyAnswerBtns(){
    let a_box = document.getElementById("AnswerBtnsContainer");

    a_box.replaceChildren(); //replace all of the answer box's children with nothing
}


//====| General Functions |====
//Getting a random intenger within a range
function GetRandomInt(max_range){
    let ranInt = Math.floor((Math.random()*max_range));
    return ranInt;
}
function ShuffleArray(array){
    //Create a temporary array that's a copy of the specific array
    let tempArray = array.slice();

    //Goes throuigh each index of the temp array
    for (let i = tempArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        //swaps the random array item with the incremented array item
        [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]];
    }

    return tempArray;   // returns shuffled temporary array
}
