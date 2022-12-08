const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

const ROW_LEN = file[0].length;
const COL_LEN = file.length;

function isVisible(x, y) {
    let scenicArr = new Array(4).fill(0);

    for (let i = y - 1; i >= 0; i--) {
        scenicArr[0]++;
        if (+file[x][i] >= +file[x][y] || i === 0) break;
    }

    for (let i = y + 1; i < ROW_LEN; i++) {
        scenicArr[1]++;
        if (+file[x][i] >= +file[x][y] || ROW_LEN - i === 1) break;
    }

    for (let i = x - 1; i >= 0; i--) {
        scenicArr[2]++;
        if (+file[i][y] >= +file[x][y] || i === 0) break;
    }

    for (let i = x + 1; i < COL_LEN; i++) {
        scenicArr[3]++;
        if (+file[i][y] >= +file[x][y] || COL_LEN - i === 1) break;
    }

    return scenicArr.reduce((a, b) => a * b, 1);
}

let highestScore = 0;
for (let i = 1; i < ROW_LEN - 1; i++) {
    for (let j = 1; j < COL_LEN - 1; j++) {
        let score = isVisible(i, j);
        if (score > highestScore) highestScore = score;
    }
}

console.log(highestScore);