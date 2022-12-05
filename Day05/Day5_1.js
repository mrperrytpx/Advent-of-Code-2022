const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n");

let stacks = file.slice(0, 8);
const arrays = [];
for (let string of stacks) {
    let appendix = [];
    for (let i = 1; i <= string.length; i += 4) appendix.push(string[i]);
    arrays.push(appendix);
}

let boxes = arrays[0].map((_, col) => arrays.map(row => row[col]));

for (let i = 0; i < boxes.length; i++) {
    boxes[i] = boxes[i].reverse().filter(x => x !== " ");
}

const instructions = file.slice(10);

for (let move of instructions) {
    const splitInstructions = move.split(" ");
    const howMany = +splitInstructions[1];
    const startingCol = +splitInstructions[3] - 1;
    const endingCol = +splitInstructions[5] - 1;

    for (let i = 0; i < howMany; i++) {
        let crateToMove = boxes[startingCol].pop();
        boxes[endingCol].push(crateToMove);
    }
}

let firstBoxes = "";
for (let box of boxes) firstBoxes += box[box.length - 1];

console.log(firstBoxes);