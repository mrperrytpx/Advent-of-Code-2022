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

const Y = 2000000;
let signalCoveredArea = new Set();

for (const { sensor, beacon, distance } of file) {
    const distanceToYRow = Math.abs(sensor.x - sensor.x) + Math.abs(sensor.y - Y);
    if (distanceToYRow <= distance) {
        // Y row is within sensor's distance
        const distanceAroundSensorX = distance - distanceToYRow;
        // checking left and right of sensor.x, Y for the remainder of the distance and adding to 
        for (let x = sensor.x - distanceAroundSensorX; x <= sensor.x + distanceAroundSensorX; x++) {
            signalCoveredArea.add(x);
        }
    }

    if (beacon.y === Y) signalCoveredArea.delete(beacon.x);
}

console.log(signalCoveredArea.size);