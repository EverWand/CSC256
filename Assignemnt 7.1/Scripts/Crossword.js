var wordsArr = ["TestOne","TestTwo","TestThree"];

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

function BuildClue(wordIndex, direction, startRow, startCol, table, ShowAnswer)
{
    //Loop through each character of a specific word
    for (var i = 0; i < wordsArr[wordIndex].length; i++) {
        var tr;
        var td;
        var rowIndex = 0;
        var colIndex = 0;

        //Fills clues in a specific direction
        switch(direction)
    {
        //ACROSS
        case "across":
            rowIndex = startRow;
            colIndex = startCol + i;
            break;

        //DOWN
        case "down":
            rowIndex = startRow + i;
            colIndex = startCol;
            break;
        
        //Defaulting: unexpected input
        default:
            console.log("invalid direction when building clue");
            break;
        }

        tr = table.rows[rowIndex];   //get relevant table row
        td = tr.cells[colIndex];    //get relevent table column

        //if no 
        if(td.childElementCount == 0)
            {
                var input = document.createElement("input");
                input.setAttribute("maxLength", "1");
                if (ShowAnswer){
                    input.value = wordsArr[wordIndex][i].toUpperCase();
                }
                td.appendChild(input);
            }
            else if(ShowAnswer){
                var existingInput = td.getElementbyTagName("input");
                existingInput.value = wordsArr[wordIndex][i].toUpperCase();
            }

        //Add letter into the proper table cell
       // td.textContent = wordsArr[wordIndex][i]
        //td.classList.add("letter")
    }
}