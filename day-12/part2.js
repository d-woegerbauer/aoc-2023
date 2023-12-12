const fs = require("fs");

let input = fs
  .readFileSync("./input.txt", "utf8")
  .replaceAll("\r", "")
  .split("\n")
  .map((x) => x.split(""));

console.log(input);

let columnIndexes = [];
let rowIndexes = [];

input.forEach((line, index) => {
  let isOnlyDot = true;
  line.forEach(element => {
    if(element != "."){
      isOnlyDot = false;
    }
  });
  if(isOnlyDot){
    rowIndexes.push(index);
  }
});

for(let i = 0; i < input[0].length; i++){
  let isOnlyDot = true;
  for(let j = 0; j < input.length; j++){
    if(input[j][i] != "."){
      isOnlyDot = false;
    }
  }
  if(isOnlyDot){
    columnIndexes.push(i);
  }
}

// let newRowIndexes = [];
// let newColumnIndexes = [];

// rowIndexes.forEach((row, index) => {
//   newRowIndexes.push(row+index);
// });

// columnIndexes.forEach((row, index) => {
//   newColumnIndexes.push(row+index);
// });

// newRowIndexes.forEach(index => {
//   input.splice(index, 0, new Array(input[0].length).fill("."));
// })

// for(let i = 0; i < input.length; i++){
//   for(let j = 0; j < input[i].length; j++){
//     if(newColumnIndexes.includes(j)){
//       input[i].splice(j, 0, ".");
//     }
//   }
// }

let coordinates = [];

input.forEach((line, i) => {
  line.forEach((element, j) => {
    if(element == "#"){
      coordinates.push([i, j]);
    }
  })
})

let permutation = coordinates.flatMap(
  (v, i) => coordinates.slice(i+1).map( w => [v, w] )
);

let sum = 0;

permutation.forEach((pair) => {
  let [x1, y1] = pair[0];
  let [x2, y2] = pair[1];
  let xDiff = Math.abs(x1 - x2);
  let yDiff = Math.abs(y1 - y2);
  rowIndexes.forEach((row, index) => {
      if(x1 < row && row < x2 || x2 < row && row < x1){
        xDiff += 999999;
      }
    }
  );
  columnIndexes.forEach((column, index) => {
      if(y1 < column && column < y2 || y2 < column && column < y1){
        yDiff += 999999;
      }
    }
  );
  sum += xDiff + yDiff;
}
);

console.log(sum);