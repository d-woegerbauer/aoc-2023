const fs = require("fs");

let input = fs
  .readFileSync("./input2.txt", "utf8")
  .replaceAll("\r", "")
  .replaceAll("(", "")
  .replaceAll(")", "")
  .replaceAll(" = ", ", ");

let instructions = input.split("\n\n")[0];

let sets = input
  .split("\n\n")[1]
  .split("\n")
  .map((x) => x.split(", "));

let setsArray = [];

let start = "AAA";

for (let i = 0; i < sets.length; i++) {
 



  let set = sets[i];
  let firstSet = set.shift();

  setsArray[firstSet] = set;
}

let counter = 0;
let finished = false;

for (let i = 0; finished == false; i++) {
  instructions.split("").forEach((x) => {
    if (finished) {
      return;
    }
    if (start == "ZZZ") {
      console.log(counter);
      finished = true;
      return;
    }
    if (x == "L") {
      start = setsArray[start][0];
    } else if (x == "R") {
      start = setsArray[start][1];
    }
    counter++;
  });
}
