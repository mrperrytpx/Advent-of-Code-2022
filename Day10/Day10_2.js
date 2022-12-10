const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

let cycles = 0;
let sprightPos = 1;
let monitor = new Array(6).fill(".".repeat(40));

function replaceRow(sprightPos, cycles, monitorRow) {
    if (Math.abs(sprightPos - (cycles % 40)) <= 1) {
        let str = setCharAt(monitor[monitorRow], (cycles % 40), "#");
        monitor[monitorRow] = str;
    }
}

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}

for (let instruction of file) {
    let [cycle, amount] = instruction.split(" ");
    let monitorRow = Math.floor(cycles / 40);

    if (cycle === "noop") {
        replaceRow(sprightPos, cycles, monitorRow);
        cycles++;

    } else {
        for (let i = 0; i < 2; i++) {
            replaceRow(sprightPos, cycles, monitorRow);
            cycles++;
            if (i === 1) sprightPos += +amount;
        }
    }
}

console.log(monitor);