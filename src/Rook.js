
class Rook {

    static legalMoves(board,x,y) {
        var legalMoves = []
        var color = board[y][x].charAt(0);
        var x1 = x;
        var y1 = y;

        while (x1 > 0) {
            x1--;

            if (board[y1][x1] !== '') {// piece in the way of rook way.
                if (board[y1][x1].charAt(0) === color) { // friendly piece
                    break;
                }
                else { // non-friendly piece
                    legalMoves.push({x:x1,y:y1});
                    break;
                }
            }

            legalMoves.push({x:x1,y:y1});
        
        }

        x1 = x;

        while (x1 < 7) {
            x1++;

            if (board[y1][x1] !== '') {// piece in the way of rook way.
                if (board[y1][x1].charAt(0) === color) { // friendly piece
                    break;
                }
                else { // non-friendly piece
                    legalMoves.push({x:x1,y:y1});
                    break;
                }
            }

            legalMoves.push({x:x1,y:y1});

        }

        x1 = x;

        while (y1 > 0) {
            y1--;

            if (board[y1][x1] !== '') {// piece in the way of rook way.
                if (board[y1][x1].charAt(0) === color) { // friendly piece
                    break;
                }
                else { // non-friendly piece
                    legalMoves.push({x:x1,y:y1});
                    break;
                }
            }

            legalMoves.push({x:x1,y:y1});

        }

        y1 = y;

        while (y1 < 7) {
            y1++;

            if (board[y1][x1] !== '') {// piece in the way of rook way.
                if (board[y1][x1].charAt(0) === color) { // friendly piece
                    break;
                }
                else { // non-friendly piece
                    legalMoves.push({x:x1,y:y1});
                    break;
                }
            }

            legalMoves.push({x:x1,y:y1});

        }

        return legalMoves;
    }


}

export default Rook;