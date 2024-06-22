function SubmitPlayerInfo(){
    event.preventDefault();
    
    //Obtain values entered in the specific text inputs
    var name = document.getElementById("UsernameInput").value;      //Name
    var weapon = document.getElementById("WeaponInput").value;  //Weapon
    var health = document.getElementById("HealthInput").value;  //Health
    var points = document.getElementById("PointsInput").value;   //Points

    //Construct the output from the input
    var output =    "Name: " + name;
    output +=   "\n\nWeapon: " + weapon;
    output +=   "\n\nHealth: " + health;
    output +=   "\n\nPoints: " + points;

    document.getElementById("FormOutput").value = output;
}