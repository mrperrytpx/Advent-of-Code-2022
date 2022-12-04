const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

function numbersFromTo(string) {
    let fromTo = string.split("-");
    let from = +fromTo[0];
    let to = +fromTo[1];

    let product = [];
    if (from === to) {
        product.push(from);
        return product;
    }

    for (let i = from; i <= to; i++) {
        product.push(i);
    }

    return product;
}

let numOfOverlaps = 0;

for (let pairs of file) {
    pairs = pairs.split(",");

    let left = numbersFromTo(pairs[0]);
    let right = numbersFromTo(pairs[1]);

    for (let j = 0; j < right.length; j++) {
        if (left.includes(right[j])) {
            numOfOverlaps += 1;
            break;
        }
    }
}

console.log(numOfOverlaps);