const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/biggerExample.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

function reduceArr(arr1, arr2, sign) {
    switch (sign) {
        case "+": {
            return [+arr1[0] + +arr2[0], +arr1[1] + +arr2[1]];
        }
        case "-": {
            return [+arr1[0] - +arr2[0], +arr1[1] - +arr2[1]];
        }
    }
}

function arrDirection(dir) {
    switch (dir) {
        case "R": {
            return [1, 0];
        }
        case "U": {
            return [0, 1];
        }
        case "L": {
            return [-1, 0];
        }
        case "D": {
            return [0, -1];
        }
    }
}

let visited = [[0, 0]];
let knots = new Array(10).fill([0, 0]);

for (let motion of file) {
    motion = motion.split(" ");
    let [direction, amount] = motion;

    for (let i = 0; i < amount; i++) {
        let move = arrDirection(direction);
        knots[0] = reduceArr(knots[0], move, "+");

        console.log("loop");
        for (let j = 1; j < knots.length; j++) {
            let diff = reduceArr(knots[j - 1], knots[j], "-");
            // if (Math.abs(diff[0]) >= 2 || Math.abs(diff[1]) >= 2) {
            //     console.log("diff, ", diff, j);
            //     knots[j] = reduceArr(knots[j], diff, "-");
            // }
        }
    }
    console.log(knots);
    break;
}

// let set = new Set(visited.map(JSON.stringify));
// let uniques = Array.from(set).map(JSON.parse);

// console.log(uniques.length);