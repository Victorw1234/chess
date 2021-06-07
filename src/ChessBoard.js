import React,{useState,useEffect} from 'react'
import Square from './Square'
import Knight from './Knight'
import './ChessBoard.css'

export default function ChessBoard() {
    const [board,setBoard] = useState([
        ['br','bh','bb','bq','bk','bb','bh','br'],
        ['bp','bp','bp','bp','bp','bp','bp','bp'],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['wp','wp','wp','wp','wp','wp','wp','wp'],
        ['wr','wh','wb','wq','wk','wb','wh','wr']
    ])

    const [highlightedPiece,setHighlightedPiece] = useState({x:null,y:null});

    const [toMove,setToMove] = useState(['white'])
    
    //Checks the values of the objects, instead of reference(like include would do)
    // Only works with x,y objs
    function objectInArray(arr,obj) {
        for (var i = 0 ; i < arr.length ; i++) {
            if (arr[i].x == obj.x && arr[i].y == obj.y) {
                return true;
            }
        }
        return false;
    }

    function handleClick(e,x,y) {
        // Highlight piece
        if (highlightedPiece.x === null && highlightedPiece.y === null) {
            if (board[y][x] !== '') {// check if there is a piece on this location
                setHighlightedPiece({x:x,y:y})
            } 
        }
        // Unhighlight piece
        else if (highlightedPiece.x === x && highlightedPiece.y === y) {
            setHighlightedPiece({x:null,y:null})
        }
        // Check if its legal move,
        // Check if this move would put you in check.
        // Check if you are in check.
        // then move
        // then set highligtedpiece to null.
        else if (highlightedPiece.x !== x || highlightedPiece.y !== y) {
            var piece = board[highlightedPiece.y][highlightedPiece.x].charAt(1);
            console.log(piece)
            switch (piece) {
                case 'h':
                    var legalMoves = Knight.legalMoves(board,highlightedPiece.x,highlightedPiece.y);
            
                    if (objectInArray(legalMoves,{x,y})) {
                        var newBoard = board;
                        newBoard[y][x] = board[highlightedPiece.y][highlightedPiece.x]
                        newBoard[highlightedPiece.y][highlightedPiece.x] = '';
                        setBoard(newBoard)
                        setHighlightedPiece({x:null,y:null})
                    }
                case 'b':
                
                case 'q':

                case 'r':

                default:

            }
        
        }




        console.log(e.target,x,y)
        
    }

    var boardJSX = board.map((board,rowIndex) => {
        return board.map((square,columnIndex) => {
            var color = "white";
            (rowIndex + columnIndex) % 2 === 1 ? color = "black" : color = "white"
            if (highlightedPiece.y == rowIndex && highlightedPiece.x == columnIndex)
                color = "red";
            return <Square
                         key={rowIndex+columnIndex} 
                         color={color}  
                         piece={square}
                         clickFunction={handleClick}
                         x={columnIndex}
                         y={rowIndex}
                         />
        })
    });

    return (
        <div className="ChessBoard">
            {boardJSX}
        </div>
    )
}
