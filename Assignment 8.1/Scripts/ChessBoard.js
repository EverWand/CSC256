function MakeBoard(){
    //table element
    var table= document.getElementById("ChessTable");

    //CONSTRUCT ROW
    for (var i=0;i< 8; i++){
        //creating table row
        var tr = document.createElement('tr');
        
        //CONSTRUCT COLUMN
        for(var j=0; j < 8; j++){
            //create table cell
            var td =document.createElement("td");

            //Color even cells white:
            if((i+j) % 2 == 0)
            {
                //set up cell and add it to the row                
                td.setAttribute('class', 'cell whitecell')
                tr.appendChild(td);
            }
            //color odd cells black
            else{
                //set up cell and add it to the row
                td.setAttribute('class','cell blackcell');
                tr.appendChild(td);
            }
        }
         //add the constucted row to the table
         table.appendChild(tr);
    }
}