const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

const ROWS = file.length;
const COLS = file[0].length;

let END_CORD;
let lowestStarts = [];

for (let i = 0; i < file.length; i++) {
    let row = file[i].split("");
    row = row.map((x, idx) => {
        if (x === "S") {
            STARTING_CORD = [i, idx];
            return "a".charCodeAt(0);
        } else if (x === "E") {
            END_CORD = [i, idx];
            return "z".charCodeAt(0);
        } else {
            if (x === "a") lowestStarts.push([i, idx]);
            return x.charCodeAt(0);
        }
    });
    file[i] = row;
}

function isInBounds(row, col, steps) {
    if (row < 0 || col < 0 || row >= ROWS || col >= COLS) return null;
    return [steps + 1, [row, col]];
}

let shortest = Number.MAX_SAFE_INTEGER;

for (let lowest of lowestStarts) {
    let start = [0, [...lowest]];
    let queue = [start];
    let locked = new Set();

    while (queue.length !== 0) {
        let [steps, pos] = queue.shift();

        if (locked.has(pos.toString())) continue;
        locked.add(pos.toString());

        if (pos[0] === END_CORD[0] && pos[1] === END_CORD[1]) {
            if (shortest > steps) shortest = steps;
            break;
        }

        const value = file[pos[0]][pos[1]];

        const up = isInBounds(pos[0] - 1, pos[1], steps);
        const down = isInBounds(pos[0] + 1, pos[1], steps);
        const left = isInBounds(pos[0], pos[1] - 1, steps);
        const right = isInBounds(pos[0], pos[1] + 1, steps);

        let validNeighbours = [right, down, left, up].filter((elem) => !!elem)
            .filter(elem => {
                const [x, y] = elem[1];
                const neighbourValue = file[x][y];
                return neighbourValue - value <= 1;
            });

        validNeighbours.forEach(x => queue.push(x));
    }
}

console.log(shortest);