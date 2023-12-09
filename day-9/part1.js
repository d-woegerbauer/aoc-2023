const fs = require("fs");

let input = fs
  .readFileSync("./input.txt", "utf8")
  .replaceAll("\r", "")
  .split("\n")
  .map((x) => x.split(" ").map(Number));

console.log(input);

let sum = 0;

input.forEach(line => {
  let valueArray = [[...line]];

  differences = getDifferencesInArray(valueArray);

  differences.forEach(difference => {
    sum += difference[difference.length-1];
  });
});

console.log(sum); 

function getDifferencesInArray(arrays){
  let differences = [];
  let isZero = true;
  let currentArray = arrays[arrays.length-1];
  for(let i = 1; i < currentArray.length; i++){
    differences.push(currentArray[i] - currentArray[i-1]);
    if(currentArray[i] - currentArray[i-1] != 0){
      isZero = false;
    }
  }
  arrays.push(differences);
  if(isZero){
    return arrays;
  } else {
    return getDifferencesInArray(arrays);
  }
}