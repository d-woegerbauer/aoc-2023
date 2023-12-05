const fs = require("fs");

let input = fs.readFileSync("./input.txt", 'utf8').replaceAll("\r", "").split("\n\n");

let seeds = input.shift().split(": ")[1].split(" ").map(Number);

let newSeeds = [];

for(let i = 0; i < seeds.length; i+=2){
  for(let j = seeds[i]; j < seeds[i] + seeds[i+1]; j+=100000){
    if(!newSeeds.find(seed => seed == j)){
      newSeeds.push(j);
    }
  }
}

console.log(newSeeds.length);

input = input.map(line => line.split("\n").flatMap(lineElement => {
    if(lineElement.includes("map")){
        return [];
    }
    return [lineElement.split(" ").map(Number)]
}));

let seedMappings = [];

newSeeds.forEach(seed => {
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

    seedMappings.push({currentSeed, seed});
});

let minSeed = {
  currentSeed: 10000000000000000000,
  seed: -1,
};

seedMappings.forEach(seedMap => {
  if(seedMap.currentSeed < minSeed.currentSeed){
    minSeed = seedMap;
  }
});

console.log(minSeed);

newSeeds = [];

for(let i = 0; i < seeds.length; i+=2){
  if(minSeed.seed >= seeds[i] && minSeed.seed < seeds[i] +  seeds[i+1]){
    for(let j = minSeed.seed - 1000000; j < minSeed.seed + 1000000; j+=1){
      newSeeds.push(j);
    }
  }
}

console.log(newSeeds);

seedMappings = [];

newSeeds.forEach(seed => {
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

    seedMappings.push({currentSeed, seed});
});

minSeed = {
  currentSeed: 10000000000000000000,
  seed: -1,
};

seedMappings.forEach(seedMap => {
  if(seedMap.currentSeed < minSeed.currentSeed){
    minSeed = seedMap;
  }
});

console.log(minSeed);