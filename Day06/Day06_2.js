const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "");

for (let i = 0; i < file.length - 14; i++) {
    let uniques = new Set();
    let stringSlice = file.slice(i, i + 14).split("");
    for (let x of stringSlice) uniques.add(x);
    if (uniques.size === stringSlice.length) {
        console.log("solution:", i + 14);
        break;
    } else {
        uniques.clear();
    }
}