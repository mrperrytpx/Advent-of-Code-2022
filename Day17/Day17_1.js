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

let board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
];

let landedRocks = 0;
let moves = 0;
let run = 0;
while (landedRocks <= 2022) {

    let rock = rocks[landedRocks % 5];
    rock.shape.forEach(_ => board.unshift([0, 0, 0, 0, 0, 0, 0]));

    let currRow = 0;
    let currCol = 2;

    let notStopped = true;
    while (notStopped) {

        let direction = file.charAt(moves % file.length);
        // console.log(direction);

        if (direction === ">") {
            let canMove = true;
            for (let r = 0; r < rock.shape.length; r++) {
                for (let c = rock.shape[r].length - 1; c >= 0; c--) {
                    // Skip empty cells
                    if (rock.shape[r][c] === 0) continue;
                    // Check if the cell is at the right edge of the board
                    if (currCol + rock.shape[r].length >= board[0].length) {
                        canMove = false;
                        break;
                    }
                    // Check if the cell to the right is empty
                    if (board[r + currRow][currCol + rock.shape[r].length] !== 0) {
                        canMove = false;
                        break;
                    }
                }
                if (!canMove) break;
            }
            if (canMove) currCol += 1;
        }

        if (direction === "<") {
            let canMove = true;
            for (let r = 0; r < rock.shape.length; r++) {
                for (let c = 0; c < rock.shape[r].length; c++) {
                    // Skip empty cells
                    if (rock.shape[r][c] === 0) continue;
                    // Check if the cell is at the left edge of the board
                    if (currCol - 1 < 0) {
                        canMove = false;
                        break;
                    }
                    // Check if the cell to the left is empty
                    if (board[r + currRow][currCol - 1] !== 0) {
                        canMove = false;
                        break;
                    }
                }
                if (!canMove) break;
            }
            if (canMove) currCol -= 1;
        }

        for (let r = 0; r < rock.shape.length; r++) {
            for (let c = 0; c < rock.shape[r].length; c++) {
                if (r + currRow + 1 >= board.length && rock.shape[r][c] === 1) {

                    for (let i = 0; i < rock.shape.length; i++) {
                        for (let j = 0; j < rock.shape[i].length; j++) {
                            if (rock.shape[i][j] === 1) board[i + currRow][j + currCol] = 1;
                        }
                    }

                    notStopped = false;
                    break;
                }
                if (rock.shape[r][c] === 1)
                    if (board[r + currRow + 1][c + currCol]) {
                        // console.log(board[r + currRow + 1].toString(), r + currRow);
                        for (let i = 0; i < rock.shape.length; i++) {
                            for (let j = 0; j < rock.shape[i].length; j++) {
                                if (rock.shape[i][j] === 1) {
                                    // console.log(i, j);
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
    landedRocks++;
    let height = board.length;
    for (let i = 0; i < height; i++) {
        if (board[i].some(x => x === 1)) {
            for (let j = 3; j < i; j++) board.shift();
            break;
        }
    }

    run++;
    if (run === 22) break;

}

// let height = 0;
// for (let row of board) {
//     if (row.some(cell => cell === 1)) {
//         height += 1;
//     }
// }

// console.log(height);

console.table(board);