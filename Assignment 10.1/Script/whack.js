var holeArr = [];
var lasthole = 0;

function CreateHoles(amountOfHoles){
    var parent = document.getElementById("gameBoardContainer");

    for(var i= 0; i < amountOfHoles; i++)
    {
        var hole = document.createElement("div");
        hole.setAttribute("id", "Hole " + i);
        hole.classList.add("hole");

        parent.appendChild(hole);
    }
    
    holeArr = document.querySelectorAll(".hole");
}

function StartGame()
{
    timeUp = false
    Pop_Up();
}

function Pop_Up()
{
    var time = RandomTime(200, 1000); //random time between range
   GetRandomHole(holeArr);
}

function RandomTime(min, max)
{
    // 0%-100% of the cumulative value of Min and Max values wanted
    return Math.round(Math.random() * (max-min) + min);
}

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