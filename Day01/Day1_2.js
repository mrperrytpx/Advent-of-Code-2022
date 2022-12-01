const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n");

let currentCalories = 0;
let summedCaloriesArray = [];

for (let i = 0; i < file.length; i++) {
    currentCalories += +file[i];
    if (file[i] == "" || i === file.length - 1) {
        summedCaloriesArray.push(currentCalories);
        currentCalories = 0;
    }
}

top3Elves = elfArray.sort((a, b) => {
    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
}).slice(0, 3).reduce((a, b) => a + b, 0);

console.log(top3Elves);