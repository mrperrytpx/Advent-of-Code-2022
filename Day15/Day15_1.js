const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

let sensors = [];
let beacons = [];

for (let line of file) {
    const words = line.split(" ");
    [, , x1, y1, , , , , x2, y2] = words;

    const coord1 = [+x1.split("=")[1].replace(",", ""), +y1.split("=")[1].replace(":", "")];
    const coord2 = [+x2.split("=")[1].replace(",", ""), +y2.split("=")[1]];

    sensors.push(coord1);
    beacons.push(coord2);
}

console.log("XD");

const sensorAreaCoords = new Set();

// https://en.wikipedia.org/wiki/Taxicab_geometry
for (let i = 0; i < sensors.length; i++) {
    const [x1, y1] = sensors[i];
    const [x2, y2] = beacons[i];
    const distance = (Math.abs(x1 - x2)) + (Math.abs(y1 - y2));
    console.log("distance between a sensor and closest beacon is:", distance);

    for (let j = distance; j > 0; j--) {
        // console.log("DISTANCE", distance, j);
        const leftEdge = [x1 - j, y1];
        const rightEdge = [x1 + j, y1];
        const downEdge = [x1, y1 + j];
        const upEdge = [x1, y1 - j];

        sensorAreaCoords.add(leftEdge.toString());
        sensorAreaCoords.add(rightEdge.toString());
        sensorAreaCoords.add(downEdge.toString());
        sensorAreaCoords.add(upEdge.toString());

        // console.log(leftEdge, rightEdge, upEdge, downEdge);
        for (let k = 1; k < j; k++) {
            // console.log("??", k);
            const leftUpDiagonal = [leftEdge[0] + k, leftEdge[1] - k];
            // console.log("left up diagonal edge", leftUpDiagonal);
            const rightUpDiagonal = [rightEdge[0] - k, rightEdge[1] - k];
            const leftDownDiagonal = [downEdge[0] - k, downEdge[1] - k];
            const rightDownDiagonal = [downEdge[0] + k, downEdge[1] - k];

            sensorAreaCoords.add(leftUpDiagonal.toString());
            sensorAreaCoords.add(rightUpDiagonal.toString());
            sensorAreaCoords.add(leftDownDiagonal.toString());
            sensorAreaCoords.add(rightDownDiagonal.toString());
            // console.log(sensorAreaCoords.size);
        }
    }

    sensorAreaCoords.delete(beacons[i].toString());
}
let count = 0;
const TARGET = 10;

let iter = [...sensorAreaCoords];

// console.log(iter);

for (let entry of iter) {
    let yCoord = +entry.split(",")[1];
    // console.log(entry, yCoord);
    if (yCoord === TARGET) {
        count++;
    }
}

console.log(count);
// 19 + (2 * 17) + (2 * 15) + (2 * 13) + (2 * 11) + (2 * 9) + (2 + 7) + (2 * 5) + (2 * 3) + 2