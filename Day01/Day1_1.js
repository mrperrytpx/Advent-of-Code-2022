const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n");

let highestCalories = 0;
let currentCalories = 0;

for (let i = 0; i < file.length; i++) {
    currentCalories += +file[i];
    if (file[i] == "" || i === file.length - 1) {
        if (currentCalories > highestCalories) {
            highestCalories = currentCalories;
        }
        currentCalories = 0;
    }
}

console.log(highestCalories);