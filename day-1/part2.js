const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8').replaceAll("\r", "").split('\n');

const mappedInputs = [
    {
        name: "one",
        value: "one1one",
    },
    {
        name: "two",
        value: "two2two",
    },
    {
        name: "three",
        value: "three3three",
    },
    {
        name: "four",
        value: "four4four",
    },
    {
        name: "five",
        value: "five5five",
    },
    {
        name: "six",
        value: "six6six",
    },
    {
        name: "seven",
        value: "seven7seven",
    },
    {
        name: "eight",
        value: "eight8eight",
    },
    {
        name: "nine",
        value: "nine9nine",
    },
];

input = input.map(element => {
    return replaceNumbers(element);
});

console.log(input[0]);

function replaceNumbers(line) {
    mappedInputs.forEach(element => {
        line = line.replaceAll(element.name, element.value);
    });

    return line;
}

function findFirstNumber(line) {
    for (const character of line.split("")) {
        if(!Number.isNaN(Number(character))){
            return character;
        }
    }
}

let inputsMapped = input.map(element => Number(findFirstNumber(element) + findFirstNumber(element.split("").reverse().join(""))));

console.log(inputsMapped.reduce((a,b) => a+b));