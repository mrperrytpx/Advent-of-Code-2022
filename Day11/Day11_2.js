const { monkeysInput } = require("./monkeys");
const monkeys = { ...monkeysInput };

const monkeyBusiness = new Array(7).fill(0);
const keys = Object.keys(monkeys);

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