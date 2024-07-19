//VARIABLES:
//---Holes
var holeArr = [];
var lasthole = 0;
//---Points
var currPoints = 0;
const WACK_VALUE = 25; 
//---Timer
var gameTimerSeconds = 120;
var timeInterval;

//GAME FUNCTIONS
function CreateHoles(amountOfHoles){
    var parent = document.getElementById("gameBoardContainer");

    for(var i= 0; i < amountOfHoles; i++)
    {
        var hole = document.createElement("div");
        hole.setAttribute("id", "Hole " + i);
        hole.classList.add("hole");

        hole.addEventListener("click", handle_WhackHole);
        parent.appendChild(hole);   
    }
    
    holeArr = document.querySelectorAll(".hole");
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

    if(counter == lasthole)
    {
        return GetRandomHole(holes);
    }
    lasthole = counter;

    console.log("Hole shown: " + counter);
    return hole;
}

//UI FUNCTIONS
//---Updates the Points Display
function UpdateScoreDisplay()
{
    var PointUI = document.getElementById("Score_Points");

    PointUI.textContent = currPoints;
}
//Updates teh display with the current seconds left in the game
function UpdateTimerDisplay(TimerEnd){
    timeDisplay = document.getElementById("Timer");  //Get the element for the display

    timeRemaining = TimerEnd - Date.now();
    timeDisplay.textContent = Math.round(timeRemaining/1000);             //Put the current time left into the display container
}

//GENERAL FUNCTIONS
//---Gets a random time based on range
function RandomTime(min, max)
{
    // 0%-100% of the cumulative value of Min and Max values wanted
    return Math.round(Math.random() * (max-min) + min);
}
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

    return hex;
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

function handle_eventBoxHovered(event)
{
    let box = event.target  //get the target

    box.style.backgroundColor = GetRandomColorHex(); //Randomize the background color of the target
}