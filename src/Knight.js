
class Knight {
    //Doesn't account for checks
    static legalMoves(board,x,y) {
        var list = []
        var color = board[y][x].charAt(0);

        if (y+2 <= 7  && y+2 >= 0 && x+1 >= 0 && x+1 <= 7) {
            if (board[y+2][x+1].charAt(0) !== color) {
                list.push({x:x+1,y:y+2});
            }
        }

        if (y+2 <= 7  && y+2 >= 0 && x-1 >= 0 && x-1 <= 7) {
            if (board[y+2][x-1].charAt(0) !== color) {
                list.push({x:x-1,y:y+2});
            }
        }

        if (y-2 <= 7  && y-2 >= 0 && x+1 >= 0 && x+1 <= 7) {
            if (board[y-2][x+1].charAt(0) !== color) {
                list.push({x:x+1,y:y-2});
            }
        }

        if (y-2 <= 7  && y-2 >= 0 && x-1 >= 0 && x-1 <= 7) {
            if (board[y-2][x-1].charAt(0) !== color) {
                list.push({x:x-1,y:y-2});
            }
        }

        if (y+1 <= 7  && y+1 >= 0 && x+2 >= 0 && x+2 <= 7) {
            if (board[y+1][x+2].charAt(0) !== color) {
                list.push({x:x+2,y:y+1});
            }
        }

        if (y+1 <= 7  && y+1 >= 0 && x-2 >= 0 && x-2 <= 7) {
            if (board[y+1][x-2].charAt(0) !== color) {
                list.push({x:x-2,y:y+1});
            }
        }

        if (y-1 <= 7  && y-1 >= 0 && x-2 >= 0 && x-2 <= 7) {
            if (board[y-1][x-2].charAt(0) !== color) {
                list.push({x:x-2,y:y-1});
            }
        }

        if (y-1 <= 7  && y-1 >= 0 && x+2 >= 0 && x+2 <= 7) {
            if (board[y-1][x+2].charAt(0) !== color) {
                list.push({x:x+2,y:y-1});
            }
        }


        /*console.log(board[y+2][x+1])
        console.log(board[y+2][x-1])
        console.log(board[y-2][x+1])
        console.log(board[y-2][x-1])
        console.log(board[y+1][x+2])
        console.log(board[y+1][x-2])
        console.log(board[y-1][x-2])
        console.log(board[y-1][x+2])*/
        
        return list;
    }

}

export default Knight;