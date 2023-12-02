const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8').replaceAll("\r", "").split('\n');

function findFirstNumber(line) {
    for (const character of line.split("")) {
        if(!Number.isNaN(Number(character))){
            return character;
        }
    }
}

let inputsMapped = input.map(element => Number(findFirstNumber(element) + findFirstNumber(element.split("").reverse().join(""))));

console.log(inputsMapped.reduce((a,b) => a+b));