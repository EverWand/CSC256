var wordsArr = ["Scene","Mother","Opposite"];

function BuildTable(table)
{
    //Construct Row
    for(var i=0; i < 10; i++)
    {
        var row = document.createElement("tr") //Make table rowfor the Rows
            
        //Add Column Items
        for (var j = 0; j < 10; j++)
            {
                var col = document.createElement("td") //Make Table Data for Columns
                row.appendChild(col); //Add the Column item as part of the current row
            }
                
        table.appendChild(row); //attatched the contructed row into the table
    }
}

//Function that builds
function BuildClue(wordIndex, direction, startRow, startCol, table, ShowAnswer)
{
    //Loop through each character of a specific word
    for (var i = 0; i < wordsArr[wordIndex].length; i++) {
        var tr; //tracks the current table row the iteration is on
        var td; //tracks the current table data the iteration is on
        var rowIndex = 0; //for settings the how far across a needed table cell is
        var colIndex = 0; //for settings the how far Down a needed table cell is

        //Fills clues in a specific direction
        switch(direction)
        {
            //ACROSS
            case "across":
                rowIndex = startRow;        //Cell Row
                colIndex = startCol + i;    //Iterating Cell Column
                break;

            //DOWN
            case "down":
                rowIndex = startRow + i;    //Iterating Cell Row
                colIndex = startCol;        //Cell Column
                break;
            
            //Defaulting: unexpected input
            default:
                console.log("invalid direction when building clue");
                break;
        }

        tr = table.rows[rowIndex];   //get relevant table row
        td = tr.cells[colIndex];    //get relevent table column

        //if no children added to the cell, add input box
        if(td.childElementCount == 0)
        {
            var input = document.createElement("input"); // Create an input element
            input.setAttribute("maxLength", "1");        // Sets the Input's Max length to 1 character
            
            //Is the Word set to be shown?
            if (ShowAnswer)
            {
                input.value = wordsArr[wordIndex][i].toUpperCase(); //Set the value of the Input to the current iterated characted, then uppercase it
            }

            td.appendChild(input);  //add the created input element to the current table data
        }
        // Show the Answer if the setting is enabled
        else if(ShowAnswer)
        {
            var existingInput = td.getElementsByTagName("input")[0];        //create a input element
            existingInput.value = wordsArr[wordIndex][i].toUpperCase(); //set the value of the input to the current character in the iteration, then uppercase it.
        }
    }
}