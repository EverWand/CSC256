var MovieList = []; //Array used to store movies into

//Functions needed to insert new movie submissions into the movie list
function addMovie(){
    
    event.preventDefault(); //TEST OUT WHAT THIS DOES IF COMMENTED OUT! {THink it allows you to submit an event without refreshing the page?}
    var MovieTitleInput = document.getElementById("MovieName"); //set a variable to the input found in the Movie name submission
    var MovieTitle = MovieTitleInput.value.trim(); //removes empty space from the input and set it as the Movie Name

    //Has a Movie title been entered?
    if(MovieTitle){

        MovieList.push(MovieTitle); //Push the title to the list
        MovieList.sort();           //Alphabetically sort the current list items
        MovieTitleInput.value = ""; //Clear the Movie submission text
        
        updateMovieListDisplay();   //Update Movie List Display to include the new movie added
    }
}

function updateMovieListDisplay(){
    var FormattedMovieList = []; //empty array to hold html formatted movie list
    var divMovies = document.getElementById("MovieListDisplay");

    //Loop that goes through each submitted movie in the movie list
    for(var i=0; i < MovieList.length; i++){
        FormattedMovieList.push("<div>" + MovieList[i] + "</div>"); //Format the movie item into html
    }    

    divMovies.innerHTML = FormattedMovieList.join(''); //turn the formatted list into a string
}

//Function used to clear the current saved list
function clearMovieList(){
    MovieList = [];             //set the Movie list back to an empty array

    updateMovieListDisplay();   //Update the Movie List Display
}