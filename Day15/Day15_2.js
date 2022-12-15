const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

const regExp = /Sensor at x=(?<sensorX>-?\d+), y=(?<sensorY>-?\d+): closest beacon is at x=(?<beaconX>-?\d+), y=(?<beaconY>-?\d+)/;

file = file.map((line) => {
    const match = line.match(regExp).groups;
    const lineObj = {
        sensor: {
            x: +match.sensorX,
            y: +match.sensorY,
        },
        beacon: {
            x: +match.beaconX,
            y: +match.beaconY,
        },
    };

    lineObj.distance = Math.abs(lineObj.sensor.x - lineObj.beacon.x) + Math.abs(lineObj.sensor.y - lineObj.beacon.y);
    return lineObj;
});

for (let y = 0; y < 4000000; y++) {
    let ranges = [];

    for (const { sensor, beacon, distance } of file) {
        const distanceToYRow = Math.abs(sensor.x - sensor.x) + Math.abs(sensor.y - y);
        if (distanceToYRow < distance) {
            ranges.push([
                sensor.x - (distance - distanceToYRow),
                sensor.x + (distance - distanceToYRow)
            ]);
        }

        if (beacon.y === y) ranges.push([beacon.x, beacon.y]);
        if (sensor.y === y) ranges.push([sensor.x, sensor.y]);
    }
    const sortedRanges = ranges.sort((a, b) => a[0] - b[0]);

    const result = [];
    let previous = sortedRanges[0];

    for (let i = 1; i < sortedRanges.length; i++) {
        if (previous[1] >= sortedRanges[i][0]) {
            previous = [previous[0], Math.max(previous[1], sortedRanges[i][1])];
        } else {
            result.push(previous);
            previous = sortedRanges[i];
        }
    }

    result.push(previous);
    if (result.length > 1) {
        console.log((result[0][1] + 1) * 4000000 + y);
        break;
    }
}