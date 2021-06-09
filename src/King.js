import Bishop from "./Bishop";
import Knight from "./Knight";
import Pawn from "./Pawn";
import Queen from "./Queen";
import Rook from "./Rook";
import ChessFunctions from './ChessFunctions'
class King {

    static checkIfLegalMove(legalMoves,move) {
        for (var i = 0 ; i < legalMoves.length ; i++) {
            if (legalMoves[i].x === move.x && legalMoves[i].y === move.y) {
                return true;
            }
        }
        return false;
    }

    static isKingChecked(board,x,y) {
        var color = board[y][x].charAt(0);

        for (var i = 0 ; i < 8 ; i++) {
            for (var j = 0 ; j < 8 ; j++) {
                if (board[i][j] !== '') {
                    if (board[i][j].charAt(0) !== color) {
                        if (board[i][j].charAt(1) === 'q') {
                            var list = Queen.legalMoves(board,j,i);
                            if (this.checkIfLegalMove(list,{x,y})) {
                                return true;
                            }
                        }
                        else if (board[i][j].charAt(1) === 'p') {
                            var list = Pawn.legalMoves(board,j,i);
                            if (this.checkIfLegalMove(list,{x,y})) {
                                return true;
                            }
                        }
                        else if (board[i][j].charAt(1) === 'r') {
                            var list = Rook.legalMoves(board,j,i);
                            if (this.checkIfLegalMove(list,{x,y})) {
                                return true;
                            }
                        }
                        else if (board[i][j].charAt(1) === 'b') {
                            var list = Bishop.legalMoves(board,j,i);
                            if (this.checkIfLegalMove(list,{x,y})) {
                                return true;
                            }
                        }
                        else if (board[i][j].charAt(1) === 'h') {
                            var list = Knight.legalMoves(board,j,i);
                            if (this.checkIfLegalMove(list,{x,y})) {
                                return true;
                            }
                        }
                        
                        
                        // Lägg till king här senare.
                        
                    }
                }
            }
        }
        return false;

    }

    static movePutsKingInCheck(board,x,y,x1,y1) {
        var newBoard=[
            [],[],[],[],[],[],[],[]
        ]
        for (var i = 0 ; i < 8 ; i++) {
            for (var j = 0 ; j  < 8 ; j++) {
                newBoard[i][j] = board[i][j]
            }
        }
        var color = newBoard[y][x].charAt(0);
        newBoard[y1][x1] = newBoard[y][x]
        newBoard[y][x] = ''
        var color = newBoard[y1][x1].charAt(0);
        var kingPos = ChessFunctions.findPieceOnBoard(newBoard,color+'k')[0]
        return this.isKingChecked(newBoard,kingPos.x,kingPos.y)
    }

    static isCheckMated(board,color) {
        var kingPos = ChessFunctions.findPieceOnBoard(board,color+'k')[0];
        if (!this.isKingChecked(board,kingPos.x,kingPos.y)) {
            return false;
        }

        var pawns = ChessFunctions.findPieceOnBoard(board,color+'p');
        var rooks = ChessFunctions.findPieceOnBoard(board,color+'r')
        var horses = ChessFunctions.findPieceOnBoard(board,color+'h')
        var bishops = ChessFunctions.findPieceOnBoard(board,color+'b')
        var queen = ChessFunctions.findPieceOnBoard(board,color+'q')

        for (var i = 0 ; i < pawns.length ; i++) {
            var legalMoves = Pawn.legalMoves(board,pawns[i].x,pawns[i].y);
            for (var j = 0 ; j < legalMoves.length ; j++) {
                if (!King.movePutsKingInCheck(board,pawns[i].x,pawns[i].y,legalMoves[j].x,legalMoves[j].y)) {
                    return false;
                }
            }
        }

        for (var i = 0 ; i < rooks.length ; i++) {
            var legalMoves = Rook.legalMoves(board,rooks[i].x,rooks[i].y);
            for (var j = 0 ; j < legalMoves.length ; j++) {
                if (!King.movePutsKingInCheck(board,rooks[i].x,rooks[i].y,legalMoves[j].x,legalMoves[j].y)) {
                    return false;
                }
            }
        }

        for (var i = 0 ; i < horses.length ; i++) {
            var legalMoves = Knight.legalMoves(board,horses[i].x,horses[i].y);
            for (var j = 0 ; j < legalMoves.length ; j++) {
                if (!King.movePutsKingInCheck(board,horses[i].x,horses[i].y,legalMoves[j].x,legalMoves[j].y)) {
                    return false;
                }
            }
        }

        for (var i = 0 ; i < bishops.length ; i++) {
            var legalMoves = Bishop.legalMoves(board,bishops[i].x,bishops[i].y);
            for (var j = 0 ; j < legalMoves.length ; j++) {
                if (!King.movePutsKingInCheck(board,bishops[i].x,bishops[i].y,legalMoves[j].x,legalMoves[j].y)) {
                    return false;
                }
            }
        }

        for (var i = 0 ; i < queen.length ; i++) {
            var legalMoves = Queen.legalMoves(board,queen[i].x,queen[i].y);
            for (var j = 0 ; j < legalMoves.length ; j++) {
                if (!King.movePutsKingInCheck(board,queen[i].x,queen[i].y,legalMoves[j].x,legalMoves[j].y)) {
                    return false;
                }
            }
        }

        var kingLegalMoves = King.legalMoves(board,kingPos.x,kingPos.y);
        for (var i = 0 ; i < kingLegalMoves.length ; i++) {
            if (!King.movePutsKingInCheck(board,kingPos.x,kingPos.y,kingLegalMoves[i].x,kingLegalMoves[i].y)) {
                return false;
            }
        }
        


        return true;
    }

    static legalMoves(board,x,y) {
        var legalMoves = []
        var color = board[y][x].charAt(0);

        for (var i = -1 ; i < 2 ; i++) {
            for (var j = -1 ; j < 2 ; j++) {
                if (x+i >= 0 && x+i <= 7 && y + j <= 7 && y+j >= 0) {
                    if (board[y+j][x+i] !== '') {
                        if (board[y+j][x+i].charAt(0) !== color) {
                            
                            if (this.movePutsKingInCheck(board,x,y,x+i,y+j) == false) {
                                legalMoves.push({x:x+i,y:y+j})  
                            }
                             
                        }
                    }
                    else {
                        if (this.movePutsKingInCheck(board,x,y,x+i,y+j) == false) {
                            legalMoves.push({x:x+i,y:y+j})
                        }
                    }
                    
                }
            }
        }

        return legalMoves;
    }
}

export default King;