//VARIABLES:
//---Holes
var holeArr = [];   //Saves a list of holes
var lasthole = 0;   //tracks what the last hole popped up is
//---Points
var currPoints = 0;     //the user's points
const WACK_VALUE = 25;  //The points gained after clicking a popped up hole
//---Timer
var gameTimerSeconds = 120; //Game's timer
var timeInterval;           //to track the timer countdown interval

//GAME FUNCTIONS
//---creates the holes on the board
function CreateHoles(amountOfHoles){

    var parent = document.getElementById("gameBoardContainer"); //get the element for the game board

    //loop to create each hole needed
    for(var i= 0; i < amountOfHoles; i++)
    {
        var hole = document.createElement("div");   //Create a new contianer
        hole.setAttribute("id", "Hole " + i);       //Give it a new ID based on the number of hole it is
        hole.classList.add("hole");                 //Make this a hole by giving it the hole class

        hole.addEventListener("click", handle_WhackHole);   //make holes have an event for when it gets whacked
        parent.appendChild(hole);                           //append the element to the game board
    }
    
    holeArr = document.querySelectorAll(".hole");   //Save all holes created to the hole array
}
//Starts the Game
function StartGame() {
    //GAME INITIALIZATION
    //---Init Score:
    currPoints = 0;         //reset the points
    UpdateScoreDisplay();   //Update Score Display
    //---Start the Timer:
    var endTime = Date.now() + gameTimerSeconds * 1000;

        //Start a Timer interval function
        timerInterval = setInterval(function()
        {  
            //update the time
            UpdateTimerDisplay(endTime);    //update the time
            //if the timer is reaches the end time
            if(Math.round((endTime - Date.now())/1000) <= 0){
                clearInterval(timerInterval); //Clear the timer interval
            }
    
        }, 1000);

    //Inline Function for recursively looping the game loop.
    function gameLoop() {
        //Is Game is Still Going
        if (Date.now() < endTime) {
            //After a random amount of time:
            setTimeout(function() {
            
                Reset_Holes();  // Reset all of the holes to no longer be popped up
                PopUp_Hole();   // Get a random hole to pop up
                gameLoop();     // === Recursive Loop ===
            
            }, RandomTime(500, 1000));
        } 
        //Is the game timer up?
        else {
            //Games' Ended
            Reset_Holes();                  //Reset all of the holes
            console.log("GAME ENDED!");     //Display Game Over
        }
    }
    gameLoop(); // Start the game loop
}

//HOLE FUNCTIONS
//---Reset the Hole Diplays
function Reset_Holes(holes)
{
    //For every hole inside of the holes array
    holeArr.forEach(element => {
        element.classList.remove("poppedUp");
    });
}
//---Pick a Whole to be popped up
function PopUp_Hole()
{
    GetRandomHole(holeArr);
    holeArr[lasthole].classList.add("poppedUp");
}
//---Returns a random Hole
function GetRandomHole(holes)
{
    //get random index from the hole list given
    var counter = Math.floor(Math.random()*holes.length);
    var hole = holes[counter];  //get he hole based on the index

    //if the random whole selected is the same as the last hole chosen
    if(counter == lasthole)
    {
        return GetRandomHole(holes); //go find another random hole
    }
    //after a hole is found:
    lasthole = counter;     //make the hole found the new last hole popped up

    //console.log("Hole shown: " + counter); [DEBUG]
    return hole;    //Return the found hole
}

//UI FUNCTIONS
//---Updates the Points Display
function UpdateScoreDisplay()
{
    var PointUI = document.getElementById("Score_Points");  //get the element for the score display

    PointUI.textContent = currPoints;                       //display the current score
}
//Updates teh display with the current seconds left in the game
function UpdateTimerDisplay(TimerEnd){
    timeDisplay = document.getElementById("Timer");  //Get the element for the display

    timeRemaining = TimerEnd - Date.now();                      //Get the time remaining
    timeDisplay.textContent = Math.round(timeRemaining/1000);   //Put the current remaining left into the display container as seconds
}

//GENERAL FUNCTIONS
//---Gets a random time based on range
function RandomTime(min, max)
{
    // 0%-100% of the cumulative value of Min and Max values wanted
    return Math.round(Math.random() * (max-min) + min);
}

//Get a random Hex code for a color
function GetRandomColorHex()
{
    //Variables
    var letters = '0123456789ABCDEF';   //list of characters used in hexcodes
    var hex = "#";  //saves the hex code
    
    //Create a complete
    for(var i = 0; i < 6 ; i ++)
    {
        //Add a random character to the hex code
        hex += letters[Math.floor(Math.random() * 16)];
    }

    return hex; //return the constructed hex code
}
//EVENTS:
//Whack a Hole
function handle_WhackHole(event)
{
    let hole = event.target; //get the hole that was clicked on

    //Does the hole have the class of it being poppedUp?
    if (hole.classList.contains('poppedUp'))
    {
        //put the hole back down : remove the class
        hole.classList.remove('poppedUp')

        //SCORE POINTS!
        currPoints += WACK_VALUE;   //increase the current points
        UpdateScoreDisplay();       //Update the score display
    }
}

//handles the event when the event box is being hovered over
function handle_eventBoxHovered(event)
{
    let box = event.target  //get the target

    box.style.backgroundColor = GetRandomColorHex(); //Randomize the background color of the target
}

//When the mouse leaves the Event Box
function handle_eventBoxExit(event)
{
    //Alert the user:
    alert("Oh wow, look at that!");
    alert("You changed the color, thats pretty neat");
}