import React,{useState} from 'react'
import Square from './Square'
import Knight from './Knight'
import Pawn from './Pawn'
import Bishop from './Bishop'
import Rook from './Rook'
import './ChessBoard.css'
import Queen from './Queen'
import King from './King'
import ChessFunctions from './ChessFunctions'

export default function ChessBoard() {
    const [board,setBoard] = useState([
        /*['br','bh','bb','bq','bk','bb','bh','br'],
        ['bp','bp','bp','bp','bp','bp','bp','bp'],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['wp','wp','wp','wp','wp','wp','wp','wp'],
        ['wr','wh','wb','wq','wk','wb','wh','wr']*/
        ['','','','','','','','bk'],
        ['','','','','','','',''],
        ['','','','','','bq','',''],
        ['','','','','','','br',''],
        ['','','','wk','','','','wr'],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','','']

    ])

    const [highlightedPiece,setHighlightedPiece] = useState({x:null,y:null});

    const [toMove,setToMove] = useState('w')
    
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
            console.log("Colorearly:" + color)
            var moveWasMade = false;
            switch (piece) {
                case 'h':
                    var legalMoves = Knight.legalMoves(board,highlightedPiece.x,highlightedPiece.y);
                    if (checkIfLegalMove(legalMoves,{x,y}) && !King.movePutsKingInCheck(board,highlightedPiece.x,highlightedPiece.y,x,y)) {
                        moveHighlightedPiece(x,y);
                        setHighlightedPiece({x:null,y:null})
                        moveWasMade = true;
                    }
                    break;
                case 'p':
                    var legalMoves = Pawn.legalMoves(board,highlightedPiece.x,highlightedPiece.y);
                    if (checkIfLegalMove(legalMoves,{x,y}) && !King.movePutsKingInCheck(board,highlightedPiece.x,highlightedPiece.y,x,y)) {
                        moveHighlightedPiece(x,y);
                        setHighlightedPiece({x:null,y:null})
                        moveWasMade = true;
                    }
                    break;
                case 'b':
                    var legalMoves = Bishop.legalMoves(board,highlightedPiece.x,highlightedPiece.y);
                    if (checkIfLegalMove(legalMoves,{x,y}) && !King.movePutsKingInCheck(board,highlightedPiece.x,highlightedPiece.y,x,y)) {
                        moveHighlightedPiece(x,y);
                        setHighlightedPiece({x:null,y:null})
                        moveWasMade = true;
                    }
                    break;
                case 'q':
                    var legalMoves = Queen.legalMoves(board,highlightedPiece.x,highlightedPiece.y);
                    if (checkIfLegalMove(legalMoves,{x,y}) && !King.movePutsKingInCheck(board,highlightedPiece.x,highlightedPiece.y,x,y)) {
                        moveHighlightedPiece(x,y);
                        setHighlightedPiece({x:null,y:null})
                        moveWasMade = true;
                    }
                    break;
                case 'r':
                    var legalMoves = Rook.legalMoves(board,highlightedPiece.x,highlightedPiece.y);
                    if (checkIfLegalMove(legalMoves,{x,y}) && !King.movePutsKingInCheck(board,highlightedPiece.x,highlightedPiece.y,x,y)) {
                        moveHighlightedPiece(x,y);
                        setHighlightedPiece({x:null,y:null})
                        moveWasMade = true;
                    }
                    break;
                case 'k':
                    var legalMoves = King.legalMoves(board,highlightedPiece.x,highlightedPiece.y);
                    console.log(legalMoves)
                    if (checkIfLegalMove(legalMoves,{x,y}) && !King.movePutsKingInCheck(board,highlightedPiece.x,highlightedPiece.y,x,y)) {
                        moveHighlightedPiece(x,y);
                        setHighlightedPiece({x:null,y:null})
                        moveWasMade = true;
                    }
                    break;
                default:
                    console.log("default");
                    break;
            }

            console.log("moveWasMade: " + moveWasMade)
            // check for checkmate:
            if (moveWasMade) {
                console.log("Color:" + color)
                if (color === 'w') {
                    color = 'b';
                    setToMove('b');
                }
                else {
                    color = 'w'
                    setToMove('w')
                }
                console.log("Checking if "+color + " got checkmated")
                if (King.isCheckMated(board,color)) {
                    console.log(`${color} just got checkmated`);
                }
                else {
                    console.log('no mate')
                }
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
