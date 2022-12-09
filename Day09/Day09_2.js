const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/biggerExample.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

let visited = [[0, 0]];
let knots = new Array(10).fill([0, 0]);

for (let motion of file) {
    motion = motion.split(" ");
    let [direction, amount] = motion;

    for (let i = 0; i < amount; i++) {

    }

}


let set = new Set(visited.map(JSON.stringify));
let uniques = Array.from(set).map(JSON.parse);

console.log(uniques.length);
