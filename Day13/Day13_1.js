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
        for (let i = 0; i < Math.min(a.length, b.length); i++) {
            let left = a[i];
            let right = b[i];

            const result = compareArrays(left, right);
            if (result !== 0) return result;
        }

        return a.length - b.length;
    }

    return Array.isArray(a) ? compareArrays(a, [b]) : compareArrays([a], b);
}

let count = 0;
let pairIdx = 0;

for (let i = 0; i < pairs.length - 1; i += 2) {
    pairIdx++;
    let left = pairs[i];
    let right = pairs[i + 1];
    if (compareArrays(left, right) < 0) count += pairIdx;
}

console.log(count);