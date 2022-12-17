const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/example.txt", "utf-8").replace(/\r/g, "").trim();

const rocks = [
    {
        shape: [
            [1, 1, 1, 1]
        ],
    },
    {
        shape: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 1, 0]
        ],
    },
    {
        shape: [
            [0, 0, 1],
            [0, 0, 1],
            [1, 1, 1]
        ],
    },
    {
        shape: [
            [1],
            [1],
            [1],
            [1],
        ],
    },
    {
        shape: [
            [1, 1],
            [1, 1]
        ],
    }
];

const board = [
    [0, 0, 0, 0, 0, 0, 0],
];

// const board = new Array(100).fill(new Array(7).fill(0));

let currRock = 0;
let landedRocks = 0;
let moves = 0;

let run = 0;
while (landedRocks <= 2022) {


    let rock = rocks[currRock % 5];
    const boardHeight = board.length;
    while (board.length < boardHeight + 3) {
        board.unshift([0, 0, 0, 0, 0, 0, 0]);
    }

    let currRow = 0;
    let currCol = 2;

    let notStopped = true;
    while (notStopped) {


        let direction = file.charAt(moves % file.length);
        console.log(direction);


        if (direction === ">") {
            for (let r = 0; r < rock.shape.length; r++) {
                if (board[r + currRow][currCol + rock.shape[r].lenght] !== 0 && currCol + rock.shape[r].length < board[0].length) {
                    currCol += 1;
                }
            }
        } else {
            for (let r = 0; r < rock.shape.length; r++) {
                if (board[r + currRow][currCol - 1] !== 0 || currCol - 1 >= 0) {
                    currCol -= 1;
                }
            }
        }


        for (let r = 0; r < rock.shape.length; r++) {
            for (let c = 0; c < rock.shape[r].length; c++) {
                if (r + currRow + 1 >= board.length) {
                    for (let i = 0; i < rock.shape.length; i++) {
                        for (let j = 0; j < rock.shape[i].length; j++) {
                            if (rock.shape[i][j] === 1) board[i + currRow][j + currCol] = 1;
                        }
                    }

                    notStopped = false;
                    break;
                }

                if (board[r + currRow + 1][c + currCol] === 1) {
                    // board[r + currRow + 1][currCol + 1] === 1 to fix L shaped tetrisoid ????
                    for (let i = 0; i < rock.shape.length; i++) {
                        for (let j = 0; j < rock.shape[i].length; j++) {
                            if (rock.shape[i][j] === 1) {
                                board[i + currRow][j + currCol] = 1;
                            }
                        }
                    }
                    notStopped = false;
                    break;
                }
            }
        }
        moves++;
        if (notStopped) currRow += 1;
    }

    console.table(board);
    console.log("_______________________________________________________________");
    landedRocks++;
    currRock++;
    run++;

    if (run === 3) break;
}

console.log(moves);