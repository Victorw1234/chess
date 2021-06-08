import React,{useState,useEffect} from 'react'
import Square from './Square'
import Knight from './Knight'
import Pawn from './Pawn'
import Bishop from './Bishop'
import Rook from './Rook'
import './ChessBoard.css'
import Queen from './Queen'
import King from './King'

export default function ChessBoard() {
    const [board,setBoard] = useState([
        ['br','bh','bb','bq','bk','bb','bh','br'],
        ['bp','bp','bp','bp','bp','bp','bp','bp'],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','wk','','','','',''],
        ['','','','','','','',''],
        ['wp','wp','wp','wp','wp','wp','wp','wp'],
        ['wr','wh','wb','wq','wk','wb','wh','wr']
    ])

    const [highlightedPiece,setHighlightedPiece] = useState({x:null,y:null});

    const [toMove,setToMove] = useState('w')
    
    useEffect(() => {
        console.log("is king checked?")
        console.log(King.isKingChecked(board,2,4));
        
    }, [])
    //Checks the values of the objects, instead of reference(like include would do)
    // Only works with x,y objs
    function checkIfLegalMove(legalMoves,move) {
        for (var i = 0 ; i < legalMoves.length ; i++) {
            if (legalMoves[i].x === move.x && legalMoves[i].y === move.y) {
                return true;
            }
        }
        return false;
    }

    function moveHighlightedPiece(x,y) {
        var newBoard = board;
        newBoard[y][x] = board[highlightedPiece.y][highlightedPiece.x]
        newBoard[highlightedPiece.y][highlightedPiece.x] = '';
        setBoard(newBoard)
    }

    function handleClick(e,x,y) {
        
        // Highlight piece
        if (highlightedPiece.x === null && highlightedPiece.y === null) {
            if (board[y][x] !== '' && board[y][x].charAt(0) === toMove) {// check if there is a piece on this location, and if it is of correct color
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
            var color = board[highlightedPiece.y][highlightedPiece.x].charAt(0);
            console.log(piece)
            switch (piece) {
                case 'h':
                    var legalMoves = Knight.legalMoves(board,highlightedPiece.x,highlightedPiece.y);
                    if (checkIfLegalMove(legalMoves,{x,y})) {
                        moveHighlightedPiece(x,y);
                        setHighlightedPiece({x:null,y:null})
                        color === 'w' ? setToMove('b') : setToMove('w');
                    }
                    break;
                case 'p':
                    var legalMoves = Pawn.legalMoves(board,highlightedPiece.x,highlightedPiece.y);
                    if (checkIfLegalMove(legalMoves,{x,y})) {
                        moveHighlightedPiece(x,y);
                        setHighlightedPiece({x:null,y:null})
                        color === 'w' ? setToMove('b') : setToMove('w');
                    }
                    break;
                case 'b':
                    var legalMoves = Bishop.legalMoves(board,highlightedPiece.x,highlightedPiece.y);
                    if (checkIfLegalMove(legalMoves,{x,y})) {
                        moveHighlightedPiece(x,y);
                        setHighlightedPiece({x:null,y:null})
                        color === 'w' ? setToMove('b') : setToMove('w');
                    }
                    break;
                case 'q':
                    var legalMoves = Queen.legalMoves(board,highlightedPiece.x,highlightedPiece.y);
                    if (checkIfLegalMove(legalMoves,{x,y})) {
                        moveHighlightedPiece(x,y);
                        setHighlightedPiece({x:null,y:null})
                        color === 'w' ? setToMove('b') : setToMove('w');
                    }
                    break;
                case 'r':
                    var legalMoves = Rook.legalMoves(board,highlightedPiece.x,highlightedPiece.y);
                    if (checkIfLegalMove(legalMoves,{x,y})) {
                        moveHighlightedPiece(x,y);
                        setHighlightedPiece({x:null,y:null})
                        color === 'w' ? setToMove('b') : setToMove('w');
                    }
                    break;
                case 'k':
                    var legalMoves = King.legalMoves(board,highlightedPiece.x,highlightedPiece.y);
                    console.log(legalMoves)
                    if (checkIfLegalMove(legalMoves,{x,y})) {
                        moveHighlightedPiece(x,y);
                        setHighlightedPiece({x:null,y:null})
                        color === 'w' ? setToMove('b') : setToMove('w');
                    }
                    break;
                default:

            }
        }




        console.log(e.target,x,y)
        
    }

    var boardJSX = board.map((board,rowIndex) => {
        return board.map((square,columnIndex) => {
            var color = "white";
            (rowIndex + columnIndex) % 2 === 1 ? color = "black" : color = "white"
            if (highlightedPiece.y === rowIndex && highlightedPiece.x === columnIndex)
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
