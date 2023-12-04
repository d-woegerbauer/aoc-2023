const fs = require("fs");

let input = fs.readFileSync("./input.txt", 'utf8').replaceAll("\r", "").split("\n");

input = input.map(line => line.replaceAll("  ", " ").split(": ")[1].split(" | ").map(subLine => subLine.split(" ")));

let winningNumbers = [];

input.forEach(line => {
    let subWinningNumbers = [];
    line[0].forEach(subLine => {
        if(line[1].find(element => element == subLine)){
            subWinningNumbers.push(Number(subLine));
        }
    });

    if(subWinningNumbers.length > 0){
        winningNumbers.push(subWinningNumbers);
    }
});

let sum = 0;

winningNumbers.forEach(subWinningNumbers => {
    sum += 1*Math.pow(2, subWinningNumbers.length-1);
});

console.log(sum);