const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

// grid border trees
let treeSizeSum = 0;
for (let i = 0; i < file.length; i++) {
    if (i === 0 || i === file.length - 1) {
        treeSizeSum += file[i].length;
    } else {
        treeSizeSum += 2;
    }
}

const ROW_LEN = file[0].length;
const COL_LEN = file.length;

function isVisible(x, y) {
    let visibleFailureCount = 0;
    for (let i = y - 1; i >= 0; i--) {
        if (+file[x][i] >= +file[x][y]) {
            visibleFailureCount += 1;
            break;
        }
    }
    for (let i = y + 1; i < ROW_LEN; i++) {
        if (+file[x][i] >= +file[x][y]) {
            visibleFailureCount += 1;
            break;
        }
    }

    for (let i = x - 1; i >= 0; i--) {
        if (+file[i][y] >= +file[x][y]) {
            visibleFailureCount += 1;
            break;

        }
    }
    for (let i = x + 1; i < COL_LEN; i++) {
        if (+file[i][y] >= +file[x][y]) {
            visibleFailureCount += 1;
            break;
        }
    }

    if (visibleFailureCount === 4) return false;
    return true;
}

for (let i = 1; i < ROW_LEN - 1; i++) {
    for (let j = 1; j < COL_LEN - 1; j++) {
        // console.log(i, j);
        let isTreeVisible = isVisible(i, j);
        if (isTreeVisible) {
            treeSizeSum += 1;
        }
    }
}

console.log(treeSizeSum);