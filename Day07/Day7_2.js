const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

let sizesArr = [];
let occurs = {};

function folderSize(i, name = "/") {
    if (name === "zdvj") console.log(i);
    occurs[name] = i;
    let dirSize = 0;
    let directories = [];
    let len = 0;

    for (let j = i; j < file.length; j++) {
        if (j === file.length - 1) {
            len = j + 1;
            break;
        }
        if (file[j].charAt(0) === "$") {
            len = j - i;
            break;
        }
    }

    let arr = file.slice(i, len + i);
    for (let j = 0; j < arr.length; j++) {
        let command = arr[j].split(" ");
        if (command[0] === "dir") {
            directories.push(command[1]);
            continue;
        }
        if (!isNaN(+command[0])) {
            dirSize += +command[0];
        }
    }

    for (let k = 0; k < directories.length; k++) {
        name = directories[k];
        let subDirSize = folderSize(file.indexOf(`$ cd ${directories[k]}`, occurs[name]) + 2, name);
        dirSize += subDirSize;
    }

    sizesArr.push(dirSize);
    return dirSize;
}

folderSize(2);

const DISK_SPACE = 70000000;
const NEEDED_SPACE = 30000000;

let directorySizes = sizesArr.sort((a, b) => a - b);
let minimalDirSize = NEEDED_SPACE - (DISK_SPACE - directorySizes[directorySizes.length - 1]);
let firstBigEnoughDir = directorySizes.find(x => x > minimalDirSize);

console.log(firstBigEnoughDir);