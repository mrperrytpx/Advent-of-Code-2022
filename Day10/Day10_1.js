const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

let cycles = 0;
let signals = [];
let register = 1;

for (let instruction of file) {
    let [cycle, amount] = instruction.split(" ");

    if (cycle === "noop") {
        cycles++;
    } else {
        for (let i = 0; i < 2; i++) {
            cycles++;
            if (cycles === 20 || cycles === 60 || cycles === 100 || cycles === 140 || cycles === 180 || cycles === 220) {
                signals.push(cycles * register);
            }
            if (i === 1) {
                register += +amount;
            }
        }
    }
}

const sumOfSignals = signals.reduce((a, b) => a + b, 0);
console.log(sumOfSignals);