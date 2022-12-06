const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "");

for (let i = 0; i < file.length - 3; i++) {
    let uniques = new Set();
    uniques.add(file[i]).add(file[i + 1]).add(file[i + 2]).add(file[i + 3]);
    if (uniques.size === 4) {
        console.log("solution:", i + 4);
        break;
    } else {
        uniques.clear();
    }
}