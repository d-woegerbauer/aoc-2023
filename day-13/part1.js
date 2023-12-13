const fs = require("fs");

let input = fs
  .readFileSync("./input.txt", "utf8")
  .replaceAll("\r", "")
  .split("\n\n")
  .map((x) => x.split("\n"));

  let sum = 0;


  console.log(input);

  for(let i = 0; i < input.length; i++){
    let currentInput = input[i];

    for(let j = 0; j < currentInput.length - 1; j++){
      let currentLine = currentInput[j];

    let smallestDiff = 0;
    let beforeLine = j + 1;
    let afterLine = currentInput.length - j - 1;
    console.log(beforeLine, afterLine);
    if(beforeLine < afterLine){
      smallestDiff = beforeLine;
    } else {
      smallestDiff = afterLine;
    }
    console.log(smallestDiff);
    if(currentInput.slice(j - smallestDiff + 1, j).join("") == currentInput.slice(j + 1, j + smallestDiff).join("")){
      console.log("start line column", j);
    }
    } 

  }