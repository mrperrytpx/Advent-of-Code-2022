const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n\n");

let pairs = [];

for (let i = 0; i < file.length; i++) {
    const [left, right] = file[i].split("\n");
    pairs.push(JSON.parse(left));
    pairs.push(JSON.parse(right));
}

function compareArrays(a, b) {

    if (Number.isInteger(a) && Number.isInteger(b)) return a - b;

    if (Array.isArray(a) && Array.isArray(b)) {
        for (let i = 0; i < a.length && i < b.length; i++) {
            let left = a[i];
            let right = b[i];

            const result = compareArrays(left, right);
            if (result !== 0) return result;
        }
        return a.length - b.length;

    }

    return Array.isArray(a) ? compareArrays(a, [b]) : compareArrays([a], b);
}

const dividerOne = [[2]];
const dividerTwo = [[6]];

let sortedPackets = [...pairs, dividerOne, dividerTwo];

for (let i = 0; i < sortedPackets.length; i++) {
    for (let j = 0; j < (sortedPackets.length - i - 1); j++) {
        if (compareArrays(sortedPackets[j], sortedPackets[j + 1]) > 0) {
            let temp = sortedPackets[j];
            sortedPackets[j] = sortedPackets[j + 1];
            sortedPackets[j + 1] = temp;
        }
    }
}

const decoderKey = (sortedPackets.indexOf(dividerOne) + 1) * (sortedPackets.indexOf(dividerTwo) + 1);
console.log(decoderKey);