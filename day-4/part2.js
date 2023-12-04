const fs = require("fs");

let input = fs.readFileSync("./input.txt", 'utf8').replaceAll("\r", "").split("\n");

input = input.map(line => line.split(": ")[1].split(" | ").map(subLine => subLine.trim().split( /\s+/ )));

input = input.map(line => {
  return {
    numbers: line,
    amount: 1,
  }
})

let numCards = Array( input.length ).fill( 1 );

input.forEach((line, index) => {
    let subWinningNumbers = 0;
    line.numbers[0].forEach(subLine => {
        if(line.numbers[1].find(element => element == subLine)){
            subWinningNumbers++;
        }
    });

    for(let i = 0; i < subWinningNumbers && index + i + 1 < input.length; i++){
      numCards[index + i + 1] += numCards[index];
    }

});

console.log(numCards.reduce((a,b) => a+b));