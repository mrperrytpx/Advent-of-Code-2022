const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/example.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

// ako x1 === x2
// 	maxy = math.max y1 y2
// 	miny = math.min y1 y2
// 	for let i miy, i < maxy, i++
// 		let coord = [x, i]
// 		rockcords push cord

// isto za y
let rockCoords = [];

for (let rockMap of file) {
    const coords = rockMap.split("->");
    for (let i = 0; i < coords.length - 1; i++) {
        const left = coords[i].trim().split(",");
        const right = coords[i + 1].trim().split(",");

        if (+left[0] === +right[0]) {
            const maxY = Math.max(+left[1], +right[1]);
            const minY = Math.min(+left[1], +right[1]);
            for (let j = minY; j <= maxY; j++) rockCoords.push([+left[0], j]);
        } else {
            const maxX = Math.max(+left[0], +right[0]);
            const minX = Math.min(+left[0], +right[0]);
            for (let j = minX; j <= maxX; j++) rockCoords.push([j, +left[1]]);
        }
    }
}

let set = new Set(rockCoords.map(JSON.stringify));
rockCoords = Array.from(set).map(JSON.parse).sort();

// console.log(rockCoords);

function sand(coord) {

    let [x, y] = coord;
    console.log("entering with", x, y);

    if (rockCoords.some(rock => rock[0] === x && rock[1] === y + 1)) {

        console.log("postoji ispod");
        console.log(x, y);
        if (rockCoords.some(rock => rock[0] === x - 1 && rock[1] === y + 1)) {
            console.log("postoji ljevo", x - 1, y);

            if (rockCoords.some(rock => rock[0] === x + 1 && rock[1] === y + 1)) {
                console.log("postoji desno");
                console.log("REST REST REST REST REST");
            }
        } else {
            console.log("ne postoji ljevo", x - 1, y);
            sand([x - 1, y]);
        }
    } else {
        console.log("ne postoji ispod");
        sand([x, y + 1]);
    }
}

sand([500, 0]);

// svaki coord

// [x, y] = cord.split(->)
// cordsArr = push x y


// max cordsArr[1] je granica za abyss

// sand start 500 0

// provjeri ispod,
// ako je y >= maxcordsArr[1] break;
// ako nije u coords array, y++, recur
// provjeri ispod, ako je, provjeri ljevo x--, y recur
// provjeri ljevo, ako je, provjeri desno x +2, y, recur
// provjeri desno, ako je, postavi na x y return
