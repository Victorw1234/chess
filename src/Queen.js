import Rook from './Rook'
import Bishop from './Bishop'

class Queen {

    static legalMoves(board,x,y) {
        var legalMoves = Rook.legalMoves(board,x,y);
        legalMoves.push(...Bishop.legalMoves(board,x,y));
        return legalMoves;
    }

}

export default Queen;