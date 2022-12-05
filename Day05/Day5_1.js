const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n");

// let exampleBoxes = [
//     ["Z", "N"],
//     ["M", "C", "D"],
//     ["P"]
// ];

let boxes = [
    ["M", "J", "C", "B", "F", "R", "L", "H"],
    ["Z", "C", "D"],
    ["H", "J", "F", "C", "N", "G", "W"],
    ["P", "J", "D", "M", "T", "S", "B"],
    ["N", "C", "D", "R", "J"],
    ["W", "L", "D", "Q", "P", "J", "G", "Z"],
    ["P", "Z", "T", "F", "R", "H"],
    ["L", "V", "M", "G"],
    ["C", "B", "G", "P", "F", "Q", "R", "J"]
];

const instructions = file.filter((x) => x.charAt(0) === "m");

for (let move of instructions) {
    const splitInstructions = move.split(" ");
    const howMany = +splitInstructions[1];
    const startingCol = +splitInstructions[3];
    const endingCol = +splitInstructions[5];

    for (let i = 0; i < howMany; i++) {
        let crateToMove = boxes[startingCol - 1].pop();
        boxes[endingCol - 1].push(crateToMove);
    }
}

let firstBoxes = "";

for (let box of boxes) {
    firstBoxes += box[box.length - 1];
}

console.log(firstBoxes);