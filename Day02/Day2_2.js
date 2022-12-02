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
    const elfGuess = Object.values(win).indexOf(pair[0]);

    if (pair[1] === "Y") {
        score += 3 + (pair[0].charCodeAt(0) + 24) % 4;
    } else if (pair[1] === "Z") {
        const myGuess = Object.keys(win)[elfGuess];
        score += 6 + Object.keys(win).indexOf(myGuess) + 1;
    } else {
        const myGuess = Object.keys(win)[(elfGuess + 1) % 3 ?? 0];
        score += Object.keys(win).indexOf(myGuess) + 1;
    }
}

console.log(score);