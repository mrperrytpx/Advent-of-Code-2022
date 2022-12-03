const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

let prorityValueSum = 0;

for (let i = 0; i < file.length; i++) {
    const leftPart = file[i].slice(0, file[i].length / 2);
    const rightPart = file[i].slice(file[i].length / 2);

    let item = "";
    for (let j = 0; j < leftPart.length; j++) {
        if (rightPart.includes(leftPart[j])) {
            item = leftPart[j];
            break;
        }
    }

    if (item === item.toUpperCase()) {
        prorityValueSum += item.charCodeAt(0) - 90 + 52;
    } else {
        prorityValueSum += item.charCodeAt(0) - 122 + 26;
    }
}

console.log(prorityValueSum);