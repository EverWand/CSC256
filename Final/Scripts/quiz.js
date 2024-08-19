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

//CLASS Use to create The Information of the quiz pages.
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
        DestroyAnswerOptions();
        //Display options used to answer
        CreateAnswerOptions(this.data);
    }

    UpdateQuizInfo() {
        const questionSet = QuestionList_SYNTAX[this.id];
        questionSet.DisplayQuestionData();
    }
}

//====| QUIZ INITIALIZATION FUNCTIONS | ====
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


//Create different options in the Answer Choice Sections
function CreateAnswerOptions(questionData)
{    
    //set the Question Data from the Data given
    let q_data = QuestionData;
    q_data = questionData;

    //Save the Correct Answer [assumed it's held in the first index of answers]
    const correctAnswer = q_data.answerList[0];
    console.log(`Correct Answer is: ${correctAnswer}`);

    //reference for the Container that will hold all of the answer options
    const a_box = document.getElementById("AnswerOptionsContainer"); 
    //Shuffle the Answer List
    const a_list = ShuffleArray(q_data.answerList);

    //===| Generating Answer Options |===
    for (i = 0; i <= a_list.length-1 ; i++){
        //saves the answer from this current iteration
        const answer = a_list[i];
        //Create A New option to hold the generated data
        const a_option = document.createElement("div");
        const a_option_txt = document.createElement("p");

        //Print an answer in the option
        a_option_txt.innerText = a_list[i];

        //append the created option with the data obtained
        a_box.appendChild(a_option);
        a_option.appendChild(a_option_txt);

        //Adding Option class
        a_option.classList.add("a_option");
        //if the iterated answer is the correct answer
         if(answer == correctAnswer){
            //add the correct answer class
            a_option.classList.add("a_correct");
        }

        //===| ADDING OPTION FUNCTIONALITY |===
        a_option.onclick = function() {
            CheckAnswerOption(a_option);
        };
    }
}
//destroys the options used to answer
function DestroyAnswerOptions(){
    let a_box = document.getElementById("AnswerOptionsContainer");

    a_box.replaceChildren(); //replace all of the answer box's children with nothing
}

//====| QUIZ FUNCTIONS | ====
function CheckAnswerOption(option){
    //is the answer a correct answer?
    if (option.classList.contains("a_correct"))
    {
        //do we have more round in the quiz?
        if(currRound != MAX_ROUNDS){
            NextRound();    //go to next round
        }
        else{
            //alert the user they won
            alert("Congratulations! you completed the Quiz!");
            window.location.replace("../Pages/index.html")
        }
    }
    else{
        //alert player that the submission is not correct
        alert("This is not the correct answer");
        StartRound();   //restart the round
    }
}
//Adds what round the user is on
function NextRound(){
    currRound++;

    //Clamps round from 1 to the set Max Rounds
    if(currRound <= 0)
        {
            currRound = 1; 
        }
    else if(currRound > MAX_ROUNDS){
        currRound = MAX_ROUNDS;
    }

    StartRound();   //Start the new round
}
//====| General Functions |====
//Getting a random intenger within a given range
function GetRandomInt(max_range){
    let ranInt = Math.floor((Math.random()*max_range));
    return ranInt;
}
//Shuffles the values of a given array
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
