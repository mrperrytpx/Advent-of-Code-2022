const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());
file = file.map((line) => line.split(","));

let maxSides = file.length * 6;
for (let i = 0; i < file.length; i++) {
    for (let j = i + 1; j < file.length; j++) {
        const [x1, y1, z1] = file[i];
        const [x2, y2, z2] = file[j];
        if (Math.abs(x1 - x2) + Math.abs(y1 - y2) + Math.abs(z1 - z2) === 1) {
            maxSides -= 2;
        }
    }
}

console.log(maxSides);