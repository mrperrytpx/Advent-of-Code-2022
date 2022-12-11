let monkeys = {
    "monkey 0": {
        items: [66, 59, 64, 51],
        operation: (arg) => arg * 3,
        test: (arg) => arg % 2 === 0 ? "monkey 1" : "monkey 4"
    },
    "monkey 1": {
        items: [67, 61],
        operation: (arg) => arg * 19,
        test: (arg) => arg % 7 === 0 ? "monkey 3" : "monkey 5"
    },
    "monkey 2": {
        items: [86, 93, 80, 70, 71, 81, 56],
        operation: (arg) => arg + 2,

        test: (arg) => arg % 11 === 0 ? "monkey 4" : "monkey 0"
    },
    "monkey 3": {
        items: [94],
        operation: (arg) => arg * arg,
        test: (arg) => arg % 19 === 0 ? "monkey 7" : "monkey 6"
    },
    "monkey 4": {
        items: [71, 92, 64],
        operation: (arg) => arg + 8,
        test: (arg) => arg % 3 === 0 ? "monkey 5" : "monkey 1"
    },
    "monkey 5": {
        items: [58, 81, 92, 75, 56],
        operation: (arg) => arg + 6,
        test: (arg) => arg % 5 === 0 ? "monkey 3" : "monkey 6"
    },
    "monkey 6": {
        items: [82, 98, 77, 94, 86, 81],
        operation: (arg) => arg + 7,
        test: (arg) => arg % 17 === 0 ? "monkey 7" : "monkey 2"
    },
    "monkey 7": {
        items: [54, 95, 70, 93, 88, 93, 63, 50],
        operation: (arg) => arg + 4,
        test: (arg) => arg % 13 === 0 ? "monkey 2" : "monkey 0"
    },
};

let monkeyBusiness = new Array(7).fill(0);

// let monkeys = {
//     "monkey 0": {
//         items: [79, 98],
//         operation: (arg) => arg * 19,
//         test: (arg) => arg % 23 === 0 ? "monkey 2" : "monkey 3"
//     },
//     "monkey 1": {
//         items: [54, 65, 75, 74],
//         operation: (arg) => arg + 6,
//         test: (arg) => arg % 19 === 0 ? "monkey 2" : "monkey 0"
//     },
//     "monkey 2": {
//         items: [79, 60, 97],
//         operation: (arg) => arg * arg,
//         test: (arg) => arg % 13 === 0 ? "monkey 1" : "monkey 3"
//     },
//     "monkey 3": {
//         items: [74],
//         operation: (arg) => arg + 3,
//         test: (arg) => arg % 17 === 0 ? "monkey 0" : "monkey 1"
//     },
// };

let keys = Object.keys(monkeys);

// const COMMON_MODULO = 17 * 13 * 19 * 23; //example
const COMMON_MODULO = 13 * 17 * 5 * 3 * 19 * 11 * 7 * 2; //input
const ROUNDS = 10000;

for (let i = 0; i < ROUNDS; i++) {
    for (let j = 0; j < keys.length; j++) {
        const monkey = keys[j];
        const monkeyObj = monkeys[monkey];
        const monkeyNum = +monkey.split(" ")[1];

        while (monkeyObj.items.length > 0) {
            monkeyBusiness[monkeyNum]++;
            let item = monkeyObj.items.shift();
            item = monkeyObj.operation(item) % COMMON_MODULO;
            const nextMonkey = monkeyObj.test(item);
            monkeys[nextMonkey].items.push(item);
        }
    }
}

let highestCounter = monkeyBusiness.sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b, 1);
console.log(highestCounter);