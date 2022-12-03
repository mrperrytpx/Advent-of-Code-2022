const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

let prorityValueSum = 0;

for (let i = 0; i < file.length; i += 3) {
    const biggestBag = file.slice(i, i + 3).sort((a, b) => a.length - b.length).reverse();

    let badge = "";
    for (let j = 0; j < biggestBag[0].length; j++) {
        if (biggestBag[1].includes(biggestBag[0][j]) && biggestBag[2].includes(biggestBag[0][j])) {
            badge = biggestBag[0][j];
        }
    }

    if (badge === badge.toUpperCase()) {
        prorityValueSum += badge.charCodeAt(0) - 90 + 52;
    } else {
        prorityValueSum += badge.charCodeAt(0) - 122 + 26;
    }
}
console.log(prorityValueSum);