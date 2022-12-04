const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

function numbersFromTo(string) {
    return string.split("-").map(Number);
}

let numOfOverlaps = 0;

for (let pairs of file) {
    pairs = pairs.split(",");

    let left = numbersFromTo(pairs[0]);
    let right = numbersFromTo(pairs[1]);

    if (left[0] >= right[0] && left[1] <= right[1] || left[0] <= right[0] && left[1] >= right[1]) {
        numOfOverlaps += 1;
    }
}

console.log(numOfOverlaps);