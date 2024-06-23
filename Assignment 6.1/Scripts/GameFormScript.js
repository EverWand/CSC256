//Function to submit Player info from the player form
function SubmitPlayerInfo(){
    event.preventDefault();
    
    //Obtain values entered in the specific text inputs
    var name = document.getElementById("UsernameInput").value;  //Name
    var weapon = document.getElementById("WeaponInput").value;  //Weapon
    var health = document.getElementById("HealthInput").value;  //Health
    var points = document.getElementById("PointsInput").value;  //Points

    //Construct the output from the input
    var output =    "Name: " + name;        //Set with Name
    output +=   "\n\nWeapon: " + weapon;    //Append Weapon
    output +=   "\n\nHealth: " + health;    //Append Health
    output +=   "\n\nPoints: " + points;    //Append Points

    //Display the output
    document.getElementById("FormOutputDisplay").value = output;
}