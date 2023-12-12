const fs = require("fs");

let input = fs
  .readFileSync("./input.txt", "utf8")
  .replaceAll("\r", "")
  .split("\n")
  .map((x) => x.split(" ").map((y) => y.replaceAll(",", "").split("")));


  console.log(input);

  let permutations = [];

  // make a permutation of the input which replaces each "?" with a "." or "#", there are multiple ? in each line of the input
  input.forEach(line => {
    // the permutation should replace every "?" with a "." or "#"
    let permutation = [];
    function replaceQuestionMarks(line) {
      let questionMarkIndex = line.indexOf("?");
      if (questionMarkIndex > -1) {
        let lineCopy = [...line];
        lineCopy[questionMarkIndex] = ".";
        replaceQuestionMarks(lineCopy);
        lineCopy[questionMarkIndex] = "#";
        replaceQuestionMarks(lineCopy);
      } else {
        permutation.push(line);
      }
    }
    replaceQuestionMarks(line[0]);
    permutations.push(permutation);
  });

  console.log(permutations[5]);

  let sum = 0;

  permutations.forEach((permutation, index) => {
    let possibleDamaged = input[index][1];

    permutation.forEach((line) => {
      line.join("").split(".").forEach((subsequence) => {
        if(subsequence.length == possibleDamaged.shift() && index == 5) {
          sum++;
        }
      });
    });
  }
  );

console.log(sum);