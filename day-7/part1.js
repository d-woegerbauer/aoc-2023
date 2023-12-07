const fs = require("fs");

let input = fs.readFileSync("./input.txt", 'utf8').replaceAll("\r", "").split("\n");

input = input.map(line => line.split(" "));

console.log(input);

function getSubArraysOfString(inputString){
    let inputSplitted = [];

    inputString.split("").forEach(character => {
        if(!inputSplitted.find(element => element.character == character)){
            inputSplitted.push({
                character,
                value: inputString.split("").filter(element => element == character).length
            });
        }
    })

    return inputSplitted;
}

function isFiveOfAKind(inputString){
    let inputSplitted = getSubArraysOfString(inputString);

    return inputSplitted.length == 1;
}

function isFourOfAKind(inputString){
    let inputSplitted = getSubArraysOfString(inputString);

    return !!inputSplitted.find(element => element.value == 4);
}

function isFullHouse(inputString){
    let inputSplitted = getSubArraysOfString(inputString);

    return !!(inputSplitted.find(element => element.value == 3) && inputSplitted.find(element => element.value == 2));
}

function isThreeOfAKind(inputString){
    let inputSplitted = getSubArraysOfString(inputString);

    return !!inputSplitted.find(element => element.value == 3);
}

function isTwoPair(inputString){
    let inputSplitted = getSubArraysOfString(inputString);

    return inputSplitted.length == 3;
}

function isOnePair(inputString){
    let inputSplitted = getSubArraysOfString(inputString);

    return inputSplitted.length == 4;
}

function isHighCard(inputString){
    let inputSplitted = getSubArraysOfString(inputString);

    return inputSplitted.length == 5;
}

let inputFunctions = [isHighCard, isOnePair, isTwoPair, isThreeOfAKind, isFullHouse, isFourOfAKind, isFiveOfAKind];

let ordering = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];

let orderedNumbers = [];

inputFunctions.reverse().forEach(inputFunction => {
    let currentOrderedNumbers = [];
    input = input.flatMap(element => {
        if(inputFunction(element[0])){
            currentOrderedNumbers.push(element);
            return [];
        } else {
            return [element];
        }
    });

    orderedNumbers.push(...currentOrderedNumbers.sort((a,b) => orderString(a[0], b[0])));
});

function orderString(inputString1, inputString2){
    if(inputString1.length == 0){
        return 0;
    }
    let ordering1 = ordering.findIndex(element => element == inputString1.split("")[0]);
    let ordering2 = ordering.findIndex(element => element == inputString2.split("")[0]);

    if(ordering1 == ordering2){
        return orderString(inputString1.slice(1), inputString2.slice(1))
    } else {
        if(ordering1 < ordering2){
            return -1;
        } else {
            return 1;
        }
    }
}

console.log(orderedNumbers);

let sum = 0;

orderedNumbers.reverse().forEach((element, index) => {
    sum += Number(element[1])*(index+1)
});

console.log(sum);