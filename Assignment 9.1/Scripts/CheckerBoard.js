//Board Data Matrix 
var checkerPieces = [   
                        [null, 'w', null, 'w', null, 'w', null, 'w'],
                        ['w', null, 'w', null, 'w', null, 'w', null],
                        [null, 'w', null, 'w', null, 'w', null, 'w'],
                        [null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null],
                        ['b', null, 'b', null, 'b', null, 'b', null],
                        [null, 'b', null, 'b', null, 'b', null, 'b'],
                        ['b', null, 'b', null, 'b', null, 'b', null]
                    ];

var isPieceGrabbed = false;

//Construct the Board
function MakeBoard(){
    //table element
    var table= document.getElementById("CheckerTable");

    //CONSTRUCT ROW
    for (var i=0;i< 8; i++){
        //creating table row
        var tr = document.createElement('tr');
        
        //CONSTRUCT COLUMN
        for(var j=0; j < 8; j++){
            //create table cell
            var checkerSpace = document.createElement("td"); //add the board cell into the table
            checkerSpace.className =  "boardcell" //give the board cell the appropriate CSS
            checkerSpace.setAttribute("id", "Cell " + i + j); //give the cell an ID

            //Color non-even cells black:
            if((i+j) % 2 == 1)
            {
                //set up cell and add it to the row                
                checkerSpace.classList.add('blackcell')
                //make these cell listen to if there's a piece being moved
                checkerSpace.addEventListener("click", MovePiece);
                
            }
            //color even cells white
            else{
                //set up cell and add it to the row
                checkerSpace.classList.add('whitecell');
            } 

            
            tr.appendChild(checkerSpace);

            if(checkerPieces[i][j]){
                CreatePiece("piece" +i +j, "CheckerPiece-" + checkerPieces[i][j], checkerSpace)
            }
        }
         //add the constucted row to the table
         table.appendChild(tr);
    }

}

//Creates A checker piece
function CreatePiece(id, pieceClass, cell){
    //Make a container for the checker piece
    var newPiece = document.createElement("div");
    newPiece.setAttribute("id", id) // Set ID
    //Add the required Checker Piece Classes
    newPiece.classList.add("CheckerPiece"); //genera; checkerpiece css
    newPiece.classList.add(pieceClass);     //dark or light piece

    newPiece.addEventListener("click", savePieceID);    //Give it an event handler

    cell.appendChild(newPiece); //Add piece to the board cell
}

function savePieceID(event)
{
    var pieceHoldSpan = document.getElementById("selectedCell");

    var selectedPieceID = event.target.id; //hold the id of the piece
    selectedPieceID = selectedPieceID.replace("div","").replace("piece", "");

    //store the piece
    pieceHoldSpan.textContent = selectedPieceID;
    
    console.log("selected Piece = " + selectedPieceID); //DEBUG: SHows the ID of selected Piece
}

//Logic for when a piece is moved
function MovePiece(event)
{
    var pieceHoldSpan = document.getElementById("selectedCell");
    var newCell_ID = event.target.id; //Get the ID of the cell
    
    console.log(newCell_ID); //DEBUG: Check the Raw ID of the New Cell
    
    //remove ID name prefix
    newCell_ID = newCell_ID.replace("Cell ","").replace("piece", "");

    var selectedPieceID = pieceHoldSpan.textContent; //get piece held

    if (selectedPieceID != newCell_ID)
    {
        //get the old cell
        var oldCell = document.getElementById("Cell " + selectedPieceID);
        //get the old piece
        var oldPiece = document.getElementById("piece" + selectedPieceID);
        //get the type of the old piece
        var oldPieceType = oldPiece.classList[1];

        //Remove the Old piece from the board
        oldCell.removeChild(oldPiece);
        
        //Add the new piece position
        var newCell = document.getElementById("Cell " + newCell_ID);
        CreatePiece("piece"+ newCell, oldPieceType, newCell);
        pieceHoldSpan.textContent = ""; //Clear the piece held by the span
    }
}