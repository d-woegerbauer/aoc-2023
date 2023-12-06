const fs = require("fs");

let input = fs.readFileSync("./input.txt", 'utf8').replaceAll("\r", "").replaceAll(" ", "").split("\n");

let times = [input[0].split(":")[1]];
let distances = [input[1].split(":")[1]];

console.log(input);

let raceCounts = [];

times.forEach((time, timeIndex) => {
    let validRaceCounter = 0;
    for(let i = 1; i < time; i++){
        let distance = i * (time-i);
        if(distance > distances[timeIndex]){
            validRaceCounter++;
        }
    }
    raceCounts.push(validRaceCounter);
});

console.log(raceCounts.reduce((a,b) => a*b));