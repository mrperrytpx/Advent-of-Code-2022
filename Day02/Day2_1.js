const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n");

let score = 0;
const win = {
    "X": "C",
    "Y": "A",
    "Z": "B",
};

for (let i = 0; i < file.length; i++) {
    const pair = file[i].split(" ");
    const elfGuess = pair[0];
    const myGuess = pair[1];

    if (win[myGuess] === elfGuess) {
        score += 6 + Object.keys(win).indexOf(myGuess) + 1;
        continue;

    } else if ((elfGuess.charCodeAt(0) + 23) - myGuess.charCodeAt(0) === 0) {
        score += 3 + Object.keys(win).indexOf(myGuess) + 1;
        continue;
    } else {
        score += Object.keys(win).indexOf(myGuess) + 1;
    }
}

console.log(score);