const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "").split("\n").filter((_) => _.trim());

file = new Map(file.map((line) => {
    let [_1, currentValve, _3, _4, flowRate] = line.split(" ");
    flowRate = +flowRate.split("=")[1].replace(";", "");
    const valves = line.split(" ").slice(9).map(x => x.replace(",", ""));
    return [currentValve, {
        valveName: currentValve,
        flowRate,
        valveTunnels: valves
    }];
}));

const start = [{
    valveName: "AA",
    timeRemaining: 30,
    pressureReleased: 0,
    openedValves: new Set()
}];

let maxPathPressure = 0;
const seenValves = new Set();

while (start.length) {
    const currState = start.shift();
    const valveData = file.get(currState.valveName);

    if (currState.timeRemaining === 0) {
        if (maxPathPressure < currState.pressureReleased) {
            maxPathPressure = currState.pressureReleased;
        }
        continue;
    }

    const visitedThing = `${currState.valveName}+${currState.pressureReleased}}}`;
    if (seenValves.has(visitedThing)) continue;
    seenValves.add(visitedThing);

    for (let tunnel of valveData.valveTunnels) {
        start.push({
            valveName: tunnel,
            timeRemaining: currState.timeRemaining - 1,
            pressureReleased: currState.pressureReleased,
            openedValves: currState.openedValves
        });
    }

    if (!currState.openedValves.has(valveData.valveName)) {
        const openedValves = new Set([valveData.valveName, ...currState.openedValves.values()]);
        const timeRemaining = currState.timeRemaining - 2 < 0 ? 0 : currState.timeRemaining - 2;
        const pressureReleased = currState.pressureReleased + valveData.flowRate * (currState.timeRemaining - 1);
        for (let valveName of valveData.valveTunnels) {
            start.push({
                valveName,
                timeRemaining,
                pressureReleased,
                openedValves
            });
        }
    }
}

console.log(maxPathPressure + 1); // INPUT IS +1, EXAMPLE IS WITHOUT IDNO WHY