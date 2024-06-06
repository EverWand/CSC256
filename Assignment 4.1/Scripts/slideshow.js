//==== Images ====
//Array of Images
const images = ["GodotJar","Tacos","Stairs","Menacing"];
let imageRoot = "../Assets/Images/";    //Start of the Image Location
let imageFileType = ".png";             //Intended File type
let currImgID = 0;                      //Current Image index  

//==== Slideshow Timer====
let slideLapse = 0;     // Time it takes before the next slide (in seconds)
let SlideTimer;         // Used to set the Timer interval

//Function for when the Image of the slideshow needs to change
function ChangeImage(imgID)
{
    const slide = document.getElementById("slide-img"); //get the image element to change it

    //Make sure the Index loops back around if passing the end of the slideshow
    if(imgID >= images.length){
        imgID = 0;  //first ID in the images array
    } 
    //Make sure we loop back to the end id we're going past the start of the slideshow
    else if(imgID < 0){
        imgID = images.length-1;    // Set the ID to the end of the images array
    }
    currImgID = imgID; //Set the image ID as the current image

    let newImg = imageRoot + images[currImgID] + imageFileType; //Combine the Root + image's Name + File Type
    slide.src = newImg; //Set the new image

    RestartSlideTimer();   //Restart the Slide Timer
}

//Go to the Next Slide
function NextSlide()
{
    ChangeImage(currImgID + 1); // change the Image with a incremented ID
}
//Go to the previous Slide
function PrevSlide()
{
    ChangeImage(currImgID - 1); //change the image with a decremented ID
}

//Timer that goes through slides automatically
function StartSlideTimer(seconds){
    //If there are seconds given (not 0 or a negative value)
    if(seconds > 0){
        slideLapse=seconds; //set the seconds as the slide timelapse
        SlideTimer = setInterval(NextSlide, slideLapse*1000); //Iterate to the next slide after given seconds
    }
    //No seconds were given or an invalid (negative) parameter was given
    else{ slideLapse = 0;} //set the slide timelapse to 0 (no timelapse)
}

//Function to restart the timer (added for better UX, otherwise timer would overlap user input on slideshow)
function RestartSlideTimer(){
    clearInterval(SlideTimer); //Clear the Slide Timer
    StartSlideTimer(slideLapse); //Start a new Slide Timer with the saved Slide Timelapse
}