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

            //Color even cells white:
            if((i+j) % 2 == 1)
            {
                //set up cell and add it to the row                
                checkerSpace.classList.add('blackcell')
                //make these cell listen to if there's a piece being moved
                checkerSpace.addEventListener("click", MovePiece);
                
            }
            //color odd cells black
            else{
                //set up cell and add it to the row
                checkerSpace.classList.add('whitecell');
            } 

            
            tr.appendChild(checkerSpace);

            if(checkerPieces[i][j]){
                CreatePiece("Piece " +i +j, "type-" + checkerPieces[i][j], checkerSpace)
            }
        }
         //add the constucted row to the table
         table.appendChild(tr);
    }

}

//Creates A checker piece
function CreatePiece(id, pieceClass, cell){
    
}

//Used to update a slot if there's meant to be a piece in a cell
function UpdatePieceDisplay(){

}

//Logic for when a piece is moved
function MovePiece(event)
{
    console.log("PIECE MOVE!");
}