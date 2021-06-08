
class Pawn {

    static legalMoves(board,x,y) {
        var color = board[y][x].charAt(0);
        var captureColor;
        var moveFront = false;
        var moveFront2 = false;
        color === 'w' ? captureColor = 'b' : captureColor = 'w'; // the color the piece wants to capture
        var legalMoves = [];
        // Check captures
        if (color === 'w') {
            if (x >= 1 && y >= 1) { // check left capture
                if (board[y-1][x-1].charAt(0) === captureColor) {
                    legalMoves.push({x:x-1,y:y-1});
                }
            }

            if (x <= 6 && y >= 1) { // check right capture
                if (board[y-1][x+1].charAt(0) === captureColor) {
                    legalMoves.push({x:x+1,y:y-1});
                }
            }
        }
        else if (color === 'b') {
            if (x >= 1 && y <= 6) { // check left capture
                if (board[y+1][x-1].charAt(0) === captureColor) {
                    legalMoves.push({x:x-1,y:y+1});
                }
            }
             
            if (x <= 6 && y <= 6) { // check right capture
                if (board[y+1][x+1].charAt(0) === captureColor) {
                    legalMoves.push({x:x+1,y:y+1});
                }
            }
        }
        // deal with moving forwards
        if (color === 'w') {
            moveFront = true;
            moveFront2 = true;

            // check if there is piece right in front of pawn
            if ((y-1) >= 0) { // array bounds
                if (board[y-1][x] !== '') {
                    moveFront = false;
                }
            }
            else { // there is no square in front of pawn, meaning it can't move forward 1 step
                moveFront = false;
            }

            // check if there is piece 2 squares ahead of pawn
            if ((y-2) >= 0) {// array bounds
                if (board[y-2][x] !== '') {
                    moveFront2 = false;
                }
            }
            else { // there is no square 2 steps in front of pawn, meaning it can't move forward 2 steps.
                moveFront2 = false;
            }

            // if pawn isn't on second rank, it can't move 2 steps.
            if (y !== 6) {
                moveFront2 = false;
            }

            // add legalmoves to array
            if (moveFront) {
                legalMoves.push({x:x,y:y-1});
            }

            if (moveFront2) {
                legalMoves.push({x:x,y:y-2});
            }

        }
        else if (color === 'b') {
            moveFront = true;
            moveFront2 = true;

            // check if there is piece right in front of pawn
            if ((y+1) <= 6) { // array bounds
                if (board[y+1][x] !== '') {
                    moveFront = false;
                }
            }
            else { // there is no square in front of pawn, meaning it can't move forward 1 step
                moveFront = false;
            }

            // check if there is piece 2 squares ahead of pawn
            if ((y+2) <= 7) {// array bounds
                if (board[y+2][x] !== '') {
                    moveFront2 = false;
                }
            }
            else { // there is no square 2 steps in front of pawn, meaning it can't move forward 2 steps.
                moveFront2 = false;
            }

            // if pawn isn't on second rank, it can't move 2 steps.
            if (y !== 1) {
                moveFront2 = false;
            }

            // add legalmoves to array
            if (moveFront) {
                legalMoves.push({x:x,y:y+1});
            }

            if (moveFront2) {
                legalMoves.push({x:x,y:y+2});
            }
        }
        return legalMoves;
    }

}

export default Pawn;