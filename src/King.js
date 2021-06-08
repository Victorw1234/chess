import Bishop from "./Bishop";
import Knight from "./Knight";
import Pawn from "./Pawn";
import Queen from "./Queen";
import Rook from "./Rook";

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
        newBoard[y1][x1] = newBoard[y][x]
        newBoard[y][x] = ''
        return this.isKingChecked(newBoard,x1,y1)
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