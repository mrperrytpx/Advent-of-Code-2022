const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

// grid border trees
let numOfVisibleTrees = 0;
for (let i = 0; i < file.length; i++) {
    if (i === 0 || i === file.length - 1) {
        numOfVisibleTrees += file[i].length;
    } else {
        numOfVisibleTrees += 2;
    }
}

const ROW_LEN = file[0].length;
const COL_LEN = file.length;

function isVisible(x, y) {
    let isNotVisibleCount = 0;
    for (let i = y - 1; i >= 0; i--) {
        if (+file[x][i] >= +file[x][y]) {
            isNotVisibleCount += 1;
            break;
        }
    }
    for (let i = y + 1; i < ROW_LEN; i++) {
        if (+file[x][i] >= +file[x][y]) {
            isNotVisibleCount += 1;
            break;
        }
    }

    for (let i = x - 1; i >= 0; i--) {
        if (+file[i][y] >= +file[x][y]) {
            isNotVisibleCount += 1;
            break;

        }
    }
    for (let i = x + 1; i < COL_LEN; i++) {
        if (+file[i][y] >= +file[x][y]) {
            isNotVisibleCount += 1;
            break;
        }
    }

    if (isNotVisibleCount === 4) return false;
    return true;
}

for (let i = 1; i < ROW_LEN - 1; i++) {
    for (let j = 1; j < COL_LEN - 1; j++) {
        let isTreeVisible = isVisible(i, j);
        if (isTreeVisible) numOfVisibleTrees += 1;
    }
}

console.log(numOfVisibleTrees);