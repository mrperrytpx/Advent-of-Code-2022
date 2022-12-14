const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

let rockCoords = new Set();
let highestY = 0;

for (let rockMap of file) {
    const coords = rockMap.split("->");
    for (let i = 0; i < coords.length - 1; i++) {
        const left = coords[i].trim().split(",");
        const right = coords[i + 1].trim().split(",");

        if (+left[0] === +right[0]) {
            const maxY = Math.max(+left[1], +right[1]);
            if (maxY > highestY) highestY = maxY;
            const minY = Math.min(+left[1], +right[1]);
            for (let j = minY; j <= maxY; j++) rockCoords.add([+left[0], j].toString());
        } else {
            const maxX = Math.max(+left[0], +right[0]);
            const minX = Math.min(+left[0], +right[0]);
            for (let j = minX; j <= maxX; j++) rockCoords.add([j, +left[1]].toString());
        }
    }
}

const infinityRow = highestY + 2;
for (let i = 0; i < 1000; i++) rockCoords.add([i, infinityRow].toString());

const startSize = rockCoords.size;

console.time("sand");

function sand(coord) {
    let [x, y] = coord;
    if (rockCoords.has([x, y + 1].toString())) {
        if (rockCoords.has([x - 1, y + 1].toString())) {
            if (rockCoords.has([x + 1, y + 1].toString())) {
                rockCoords.add([x, y].toString());
                return x === 500 && y === 0 ? false : true;
            } else {
                return sand([x + 1, y + 1]);
            }
        } else {
            return sand([x - 1, y + 1]);
        }
    } else {
        return sand([x, y + 1]);
    }
}

let shouldRun = true;
while (shouldRun) shouldRun = sand([500, 0]);

console.timeEnd("sand");

const endSize = rockCoords.size;

console.log(endSize - startSize);