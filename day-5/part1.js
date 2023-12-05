const fs = require("fs");

let input = fs.readFileSync("./input.txt", 'utf8').replaceAll("\r", "").split("\n\n");

let seeds = input.shift().split(": ")[1].split(" ").map(Number);

console.log(seeds);

input = input.map(line => line.split("\n").flatMap(lineElement => {
    if(lineElement.includes("map")){
        return [];
    }
    return [lineElement.split(" ").map(Number)]
}));

let seedMappings = [];

seeds.forEach(seed => {
    let currentSeed = seed;
    input.forEach(changeLines => {
        let changedSeed = false;
        changeLines.forEach(changeLine => {
            if(!changedSeed && currentSeed >= changeLine[1] && currentSeed < changeLine[1] + changeLine[2]){
                currentSeed += changeLine[0]-changeLine[1];
                changedSeed = true;
            }
        })
    });

    seedMappings.push(currentSeed);
});

console.log(seedMappings);
console.log(Math.min(...seedMappings));