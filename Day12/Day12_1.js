const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

const ROWS = file.length;
const COLS = file[0].length;

let STARTING_CORD;
let END_CORD;
for (let i = 0; i < file.length; i++) {
    let row = file[i].split("");
    row = row.map((x, idx) => {
        if (x === "S") {
            STARTING_CORD = [i, idx];
            return "a".charCodeAt(0) - 1;
        } else if (x === "E") {
            END_CORD = [i, idx];
            return "z".charCodeAt(0) + 1;
        } else {
            return x.charCodeAt(0);
        }
    });
    file[i] = row;
}

function isValid(row, col, lastValue) {
    if (row < 0 || col < 0 || row >= ROWS || col >= COLS) return false;
    const value = file[row][col];
    if (Math.abs(value - lastValue) > 1) return false;
    return [0, [row, col]];
}

let start = [0, [...STARTING_CORD]];
let end = END_CORD;

let queue = [start];
let locked = new Set();

while (queue.length !== 0) {
    queue.sort((a, b) => a[0] - b[0]);
    let [steps, pos] = queue.shift();

    const coord = `${pos[0]},${pos[1]}`;
    if (locked.has(coord)) continue;
    locked.add(coord);

    if (pos[0] === end[0] && pos[1] === end[1]) {
        console.log(steps);
        break;
    }

    const value = file[pos[0]][pos[1]];

    const up = isValid(pos[0] - 1, pos[1], value);
    const down = isValid(pos[0] + 1, pos[1], value);
    const left = isValid(pos[0], pos[1] - 1, value);
    const right = isValid(pos[0], pos[1] + 1, value);

    const neighbours = [right, down, left, up].filter((elem) => elem !== false);
    for (let i = 0; i < neighbours.length; i++) {
        neighbours[i][0] = steps + 1;
        queue.push(neighbours[i]);
    }

}