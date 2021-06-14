
class ChessFunctions {

    static copy2DArrayByValue(src) {
        var arr = [[],[],[],[],[],[],[],[]]
        for (var i = 0 ; i < src.length ; i++) {
            for (var j = 0 ; j < src[i].length ; j++) {
                arr[i][j] = src[i][j]
            }
        }
        return arr;
    }

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