const fs = require("fs");

let input = fs
  .readFileSync("./input.txt", "utf8")
  .replaceAll("\r", "")
  .split("\n")
  .map((x) => x.split(" ").map((y) => {
    if(y.includes(",")){
      let subArray = new Array(5).fill(y);
      return subArray.join(",").split(",");
    } else {
      let subArray = new Array(5).fill(y);
      return subArray.join("?").split("");
    }
  }));

  console.log(input);

  let permutations = [];

  input.forEach(line => {
    let permutation = [];
    let questionMarks = line[0].filter((x) => x == "?").length;
    let possiblePermutations = Math.pow(2, questionMarks);

    for(let i = 0; i < possiblePermutations; i++) {
      let binary = i.toString(2).padStart(questionMarks, "0");
      let permutationLine = [...line[0]];

      for(let j = 0; j < binary.length; j++) {
        permutationLine[permutationLine.indexOf("?")] = binary[j] == "0" ? "." : "#";
      }

      permutation.push(permutationLine);
    }

    permutations.push(permutation);
  });

  let sum = 0;

  permutations.forEach((permutation, index) => {

    permutation.forEach((line) => {
      let possibleDamaged = [...input[index][1]];
      let notMatched = false;


      line.join("").split(".").forEach((subsequence) => {
        if(subsequence.length == possibleDamaged[0]) {
          possibleDamaged.shift();
        } else if(subsequence != ""){
          notMatched = true;
        }
      });

      if(possibleDamaged.length == 0 && !notMatched) {
          // console.log(line.join(""));
        sum++;
      }
    });

    // console.log("sum", sum)
  }
  );

console.log(sum);