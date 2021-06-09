
class ChessFunctions {

    static findPieceOnBoard(board,piece) {
        var pieces = []
        for (var i = 0 ; i < board.length;i++) {
            for (var j = 0 ; j < board[i].length ; j++) {
                if ((board[i][j]) === piece) {
                    pieces.push({x:j,y:i})
                }
            }
        }
        return pieces;
    }

    
}

export default ChessFunctions;