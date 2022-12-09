const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

let H = [0, 0];
let T = [0, 0];

let visited = [[0, 0]];

for (let motion of file) {
    motion = motion.split(" ");
    let [direction, amount] = motion;

    for (let i = 0; i < amount; i++) {
        switch (direction) {
            case "R": {
                H[0] = H[0] + 1;
                if (Math.abs(H[0] - T[0]) >= 2) {
                    T[1] = H[1];
                    T[0] = T[0] + 1;
                    visited.push([...T]);
                }
                break;
            }
            case "U": {
                H[1] = H[1] + 1;
                if (Math.abs(H[1] - T[1]) >= 2) {
                    T[0] = H[0];
                    T[1] = H[1] - 1;
                    visited.push([...T]);

                }
                break;
            }
            case "L": {
                H[0] = H[0] - 1;
                if (Math.abs(H[0] - T[0]) >= 2) {
                    T[1] = H[1];
                    T[0] = H[0] + 1;
                    visited.push([...T]);

                }
                break;
            }
            case "D": {
                H[1] = H[1] - 1;
                if (Math.abs(H[1] - T[1]) >= 2) {
                    T[0] = H[0];
                    T[1] = T[1] - 1;
                    visited.push([...T]);
                }
                break;
            }
        }
    }
}

let set = new Set(visited.map(JSON.stringify));
let uniques = Array.from(set).map(JSON.parse);

console.log(uniques.length);