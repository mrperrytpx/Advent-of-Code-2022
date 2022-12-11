const readFile = require("fs").readFileSync;
const file = readFile(__dirname + "/example.txt", "utf-8").replace(/\r/g, "").split("\n");

let monkeys = {
    "monkey 0": {
        items: [66, 59, 64, 51],
        operation: function (arg) {
            return arg * 3;
        },
        test: function (arg) {
            return arg % 2 === 0;
        },
        true: "monkey 1",
        false: "monkey 4"
    },
    "monkey 1": {
        items: [67, 61],
        operation: function (arg) {
            return arg * 19;
        },
        test: function (arg) {
            return arg % 7 === 0;
        },
        true: "monkey 3",
        false: "monkey 5"
    },
    "monkey 2": {
        items: [86, 93, 80, 70, 71, 81, 56],
        operation: function (arg) {
            return arg + 2;
        },
        test: function (arg) {
            return arg % 11 === 0;
        },
        true: "monkey 4",
        false: "monkey 0"
    },
    "monkey 3": {
        items: [94],
        operation: function (arg) {
            return arg * arg;
        },
        test: function (arg) {
            return arg % 19 === 0;
        },
        true: "monkey 7",
        false: "monkey 6"
    },
    "monkey 4": {
        items: [71, 92, 64],
        operation: function (arg) {
            return arg + 8;
        },
        test: function (arg) {
            return arg % 3 === 0;
        },
        true: "monkey 5",
        false: "monkey 1"
    },
    "monkey 5": {
        items: [58, 81, 92, 75, 56],
        operation: function (arg) {
            return arg + 6;
        },
        test: function (arg) {
            return arg % 5 === 0;
        },
        true: "monkey 3",
        false: "monkey 6"
    },
    "monkey 6": {
        items: [82, 98, 77, 94, 86, 81],
        operation: function (arg) {
            return arg + 7;
        },
        test: function (arg) {
            return arg % 17 === 0;
        },
        true: "monkey 7",
        false: "monkey 2"
    },
    "monkey 7": {
        items: [54, 95, 70, 93, 88, 93, 63, 50],
        operation: function (arg) {
            return arg + 4;
        },
        test: function (arg) {
            return arg % 13 === 0;
        },
        true: "monkey 2",
        false: "monkey 0"
    },
};

let monkeyBusiness = new Array(7).fill(0);

// let monkeys = {
//     "monkey 0": {
//         items: [79, 98],
//         operation: function (arg) {
//             return arg * 19;
//         },
//         test: function (arg) {
//             return arg % 23 === 0;
//         },
//         true: "monkey 2",
//         false: "monkey 3"
//     },
//     "monkey 1": {
//         items: [54, 65, 75, 74],
//         operation: function (arg) {
//             return arg + 6;
//         },
//         test: function (arg) {
//             return arg % 19 === 0;
//         },
//         true: "monkey 2",
//         false: "monkey 0"
//     },
//     "monkey 2": {
//         items: [79, 60, 97],
//         operation: function (arg) {
//             return arg * arg;
//         },
//         test: function (arg) {
//             return arg % 13 === 0;
//         },
//         true: "monkey 1",
//         false: "monkey 3"
//     },
//     "monkey 3": {
//         items: [74],
//         operation: function (arg) {
//             return arg + 3;
//         },
//         test: function (arg) {
//             return arg % 17 === 0;
//         },
//         true: "monkey 0",
//         false: "monkey 1"
//     },
// };

let keys = Object.keys(monkeys);

const ROUNDS = 20;

for (let i = 0; i < ROUNDS; i++) {
    for (let j = 0; j < keys.length; j++) {
        const monkey = keys[j];
        const monkeyObj = monkeys[monkey];
        const monkeyNum = +monkey.split(" ")[1];
        while (monkeyObj.items.length > 0) {
            monkeyBusiness[monkeyNum]++;
            let item = monkeyObj.items.shift();
            item = monkeyObj.operation(item);
            item = Math.floor(item / 3);

            let test = monkeyObj.test(item);
            if (test) {
                monkeys[monkeyObj.true].items.push(item);
            } else {
                monkeys[monkeyObj.false].items.push(item);
            }
        }
    }
}

let highestCounter = monkeyBusiness.sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b, 1);
console.log(highestCounter);