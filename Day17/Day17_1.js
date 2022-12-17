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
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0],
];

let currentTetromino = 4;
let landedRocks = 0;

while (landedRocks <= 2022) {

    let rock = rocks[currentTetromino % 5];
    for (let i = rock.shape.length - 1; i >= 0; i--) {
        const rockRow = rock.shape[i];
        const newBoardRow = [0, 0, ...rockRow];
        while (newBoardRow.length !== 7) newBoardRow.push(0);
        board.unshift([...newBoardRow]);
    }

    rock.topLeft = {
        row: 0,
        col: 2,
    };
    rock.potentialTopLeft = {
        row: rock.topLeft.row + 1,
        col: rock.topLeft.col
    };

    let notLanded = true;

    while (notLanded) {
        console.log(rock);
        for (let r = 0; r < rock.shape.length; r++) {
            for (let c = 0; c < rock.shape[r].length; c++) {
                if (rock.shape[r][c] !== 0) {
                    if (r + rock.potentialTopLeft.row >= board.length) {
                        notLanded = false;
                        board[r + rock.topLeft.row][c + rock.topLeft.col] = rock.shape[r][c];
                        break;
                    } else if (!!board[r + rock.potentialTopLeft.row][rock.potentialTopLeft.col]
                        && !!board[rock.potentialTopLeft.row][c + rock.potentialTopLeft.col]) {
                        notLanded = false;
                        board[r + rock.topLeft.row][c + rock.topLeft.col] = rock.shape[r][c];
                        break;
                    }
                }
            }
        }
        rock.topLeft = { ...rock.potentialTopLeft };
        rock.potentialTopLeft = { row: rock.potentialTopLeft.row + 1, col: rock.potentialTopLeft.col };
    }
    break;
}

console.table(board);