const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

const ROW_LEN = file[0].length;
const COL_LEN = file.length;

function isVisible(x, y) {

    let scenicArr = [];

    let length = 0;
    for (let i = y - 1; i >= 0; i--) {
        length++;
        if (+file[x][i] >= +file[x][y] || i === 0) {
            scenicArr.push(length);
            break;
        }
    }

    length = 0;
    for (let i = y + 1; i < ROW_LEN; i++) {
        length++;
        if (+file[x][i] >= +file[x][y] || ROW_LEN - i === 1) {
            scenicArr.push(length);
            break;
        }
    }

    length = 0;
    for (let i = x - 1; i >= 0; i--) {
        length++;
        if (+file[i][y] >= +file[x][y] || i === 0) {
            scenicArr.push(length);
            break;

        }
    }

    length = 0;
    for (let i = x + 1; i < COL_LEN; i++) {
        length++;
        if (+file[i][y] >= +file[x][y] || COL_LEN - i === 1) {
            scenicArr.push(length);
            break;
        }
    }

    return scenicArr.map(x => x === 0 ? 1 : x).reduce((a, b) => a * b, 1);
}

let allScores = [];
for (let i = 1; i < ROW_LEN - 1; i++) {
    for (let j = 1; j < COL_LEN - 1; j++) {
        let score = isVisible(i, j);
        allScores.push(score);
    }
}

let highestScenicScore = allScores.sort((a, b) => b - a)[0];
console.log(highestScenicScore);