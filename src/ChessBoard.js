import React,{useState,useEffect} from 'react'
import Square from './Square'
import Knight from './Knight'
import Pawn from './Pawn'
import Bishop from './Bishop'
import Rook from './Rook'
import './ChessBoard.css'
import Queen from './Queen'
import King from './King'
import ChessFunctions from './ChessFunctions'
import { HubConnectionBuilder } from '@microsoft/signalr';



export default function ChessBoard(props) {
    const [connection,setConnection] = useState(null)


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

    const [toMove,setToMove] = useState('w')

    const [yourColor,setYourColor] = useState(props.color)

    const [checkmated,setCheckmated] = useState('')
    
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
        .withUrl('http://localhost:60232/hubs/chess')
        .withAutomaticReconnect()
        .build();


        setConnection(newConnection);
    },[]);
    
    useEffect(() => {
        if (connection) {
            connection.start()
            .then(result => {
                console.log("Connected!");

                console.log(connection.invoke("JoinRoom",props.name,props.gameId))

                connection.on('MoveMade',message => {
                    console.log("Move received: ")
                    console.log(message)
                    applyMove(message);
                })
            })
            .catch(e => console.log("connection failed"))
        }
    },[connection])



    function applyMove(move) {
        console.log("Running apply move")
        console.log(move)
        var arr = board.slice();
        arr[move.y1][move.x1] = arr[move.y][move.x]
        arr[move.y][move.x] = ''
        setBoard(arr)


        if (King.isCheckMated(board,yourColor)) {
            console.log(`${yourColor} just got checkmated`);
            setCheckmated(yourColor)
        }
        else {
            setToMove(yourColor)
        }

    

    }
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

    async function sendMoveToOtherPlayer(move) {
        if (connection) {
            try {
                await connection.send('SendMove',move,props.gameId)
                console.log("Move was sent")
            }
            catch(e) {
                console.log(e)
            }
        }
    }

    function moveHighlightedPiece(x,y) {
        var newBoard = board;
        newBoard[y][x] = board[highlightedPiece.y][highlightedPiece.x]
        newBoard[highlightedPiece.y][highlightedPiece.x] = '';
        setBoard(newBoard)
    }

    async function handleClick(e,x,y) {
        
        // Highlight piece
        if (highlightedPiece.x === null && highlightedPiece.y === null) {
            if (board[y][x] !== '' 
                && board[y][x].charAt(0) === toMove
                && toMove === yourColor) {// check if there is a piece on this location, and if it is of correct color
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
            var moveWasMade = false;
            switch (piece) {
                case 'h':
                    var legalMoves = Knight.legalMoves(board,highlightedPiece.x,highlightedPiece.y);
                    if (checkIfLegalMove(legalMoves,{x,y}) && !King.movePutsKingInCheck(board,highlightedPiece.x,highlightedPiece.y,x,y)) {
                        moveHighlightedPiece(x,y);
                        moveWasMade = true;
                    }
                    break;
                case 'p':
                    var legalMoves = Pawn.legalMoves(board,highlightedPiece.x,highlightedPiece.y);
                    if (checkIfLegalMove(legalMoves,{x,y}) && !King.movePutsKingInCheck(board,highlightedPiece.x,highlightedPiece.y,x,y)) {
                        moveHighlightedPiece(x,y);
                        moveWasMade = true;
                    }
                    break;
                case 'b':
                    var legalMoves = Bishop.legalMoves(board,highlightedPiece.x,highlightedPiece.y);
                    if (checkIfLegalMove(legalMoves,{x,y}) && !King.movePutsKingInCheck(board,highlightedPiece.x,highlightedPiece.y,x,y)) {
                        moveHighlightedPiece(x,y);
                        moveWasMade = true;
                    }
                    break;
                case 'q':
                    var legalMoves = Queen.legalMoves(board,highlightedPiece.x,highlightedPiece.y);
                    if (checkIfLegalMove(legalMoves,{x,y}) && !King.movePutsKingInCheck(board,highlightedPiece.x,highlightedPiece.y,x,y)) {
                        moveHighlightedPiece(x,y);
                        moveWasMade = true;
                    }
                    break;
                case 'r':
                    var legalMoves = Rook.legalMoves(board,highlightedPiece.x,highlightedPiece.y);
                    if (checkIfLegalMove(legalMoves,{x,y}) && !King.movePutsKingInCheck(board,highlightedPiece.x,highlightedPiece.y,x,y)) {
                        moveHighlightedPiece(x,y);
                        moveWasMade = true;
                    }
                    break;
                case 'k':
                    var legalMoves = King.legalMoves(board,highlightedPiece.x,highlightedPiece.y);
                    console.log(legalMoves)
                    if (checkIfLegalMove(legalMoves,{x,y}) && !King.movePutsKingInCheck(board,highlightedPiece.x,highlightedPiece.y,x,y)) {
                        moveHighlightedPiece(x,y);
                        moveWasMade = true;
                    }
                    break;
                default:
                    console.log("default");
                    break;
            }

            if (moveWasMade) {
                var move = {x:highlightedPiece.x,
                           y:highlightedPiece.y,
                           x1:x,
                           y1:y}

                setHighlightedPiece({x:null,y:null})
                sendMoveToOtherPlayer(move);
                
                // shift color 
                if (color === 'w') {
                    color = 'b';
                    setToMove('b');
                }
                else {
                    color = 'w'
                    setToMove('w')
                }
                console.log(toMove)
                // checkmate check
                console.log("Checking if "+color + " got checkmated")
                if (King.isCheckMated(board,color)) {
                    console.log(`${color} just got checkmated`);
                    setCheckmated(color)
                }
                else {
                    console.log('no mate')
                }
            }
        }
    }

    var boardJSX = board.map((board,rowIndex) => {
        return board.map((square,columnIndex) => {
            var styles = {};
            (rowIndex + columnIndex) % 2 === 1 ? styles.backgroundColor = "black" : styles.backgroundColor = "white"

            if (highlightedPiece.y === rowIndex && highlightedPiece.x === columnIndex)
                styles.backgroundColor = "red";

            return <Square
                         key={rowIndex+columnIndex} 
                         styles={styles}  
                         piece={square}
                         clickFunction={handleClick}
                         x={columnIndex}
                         y={rowIndex}
                         />
        })
    });


    return (
        <>
            <div>{props.otherPlayerName}</div>
            <div id={yourColor} className="ChessBoard">
                {boardJSX}
            </div>
            <div>{props.name}</div>
            
            
            {checkmated !== '' ? <h1>{checkmated} just got checkmated!</h1> : <span></span>}
        </>
    )
}
