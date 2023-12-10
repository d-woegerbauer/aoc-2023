const fs = require("fs");

/*Input:
-L|F7
7S-7|
L|7||
-L-J|
L|-JF*/

let input = fs
  .readFileSync("./input.txt", "utf8")
  .replaceAll("\r", "")
  .split("\n")
  .map((x) => x.split(""));

console.log(input);

let path = [];

input.forEach((line, i) => {
  line.forEach((char, j) => {
    if (char === "S") {
      path.push([i, j]);
    }
  });
});

let stopLoop = false;

/* The pipes are arranged in a two-dimensional grid of tiles:

| is a vertical pipe connecting north and south.
- is a horizontal pipe connecting east and west.
L is a 90-degree bend connecting north and east.
J is a 90-degree bend connecting north and west.
7 is a 90-degree bend connecting south and west.
F is a 90-degree bend connecting south and east.
. is ground; there is no pipe in this tile.
S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.*/

function findPath(input, path) {
  let currentPosition = path[path.length - 1];
  let previousPosition = path[path.length - 2] || null;

  let [i, j] = currentPosition;
  let [prevI, prevJ] = previousPosition || [null, null];

  let currentChar = input[i][j];

  let possibleDirections = [];

  if (currentChar === "|") {
    if (prevI === i - 1) {
      possibleDirections.push("S");
    } else if (prevI === i + 1) {
      possibleDirections.push("N");
    }
  } else if (currentChar === "-") {
    if (prevJ === j - 1) {
      possibleDirections.push("E");
    } else if (prevJ === j + 1) {
      possibleDirections.push("W");
    }
  } else if (currentChar === "L") {
    if (prevI === i - 1) {
      possibleDirections.push("E");
    } else if (prevJ === j + 1) {
      possibleDirections.push("N");
    }
  } else if (currentChar === "J") {
    if (prevI === i - 1) {
      possibleDirections.push("W");
    } else if (prevJ === j - 1) {
      possibleDirections.push("N");
    }
  } else if (currentChar === "7") {
    if (prevI === i + 1) {
      possibleDirections.push("W");
    } else if (prevJ === j - 1) {
      possibleDirections.push("S");
    }
  } else if (currentChar === "F") {
    if (prevI === i + 1) {
      possibleDirections.push("E");
    } else if (prevJ === j + 1) {
      possibleDirections.push("S");
    }
  } else if (currentChar === "S") {
    if (previousPosition != null) {
      return path;
    } else {
      possibleDirections.push("N");
      possibleDirections.push("S");
      possibleDirections.push("W");
      possibleDirections.push("E");
    }
  }

  let endPosition = getPossiblePosition(
    possibleDirections,
    currentPosition,
    input
  );
  
  if(endPosition == null) {
    stopLoop = true;
    return path;
  } else {
    path.push(endPosition);
    return path;
  }
}

function getPossiblePosition(possibleDirections, currentPosition, input) {
  // check if the direction is possible based on its char
  // if it is, add it to possibleDirections
  // return possibleDirections

  let [i, j] = currentPosition;

  let endPosition = null;

  possibleDirections.forEach((direction) => {
    let possibleI,
      possibleJ = null;
    if (direction === "N") {
      if (i === 0) {
        return;
      }
      possibleI = i - 1;
      possibleJ = j;

      let possibleChar = input[possibleI][possibleJ];

      if(possibleChar == "|" || possibleChar == "7" || possibleChar == "F") {
        endPosition = [possibleI, possibleJ];
      }
    } else if (direction === "S") {
      if (i === input.length - 1) {
        return;
      }
      possibleI = i + 1;
      possibleJ = j;

      let possibleChar = input[possibleI][possibleJ];

      if(possibleChar == "|" || possibleChar == "L" || possibleChar == "J") {
        endPosition = [possibleI, possibleJ];
      }
    } else if (direction === "W") {
      if (j === 0) {
        return;
      }
      possibleI = i;
      possibleJ = j - 1;

      let possibleChar = input[possibleI][possibleJ];

      if(possibleChar == "-" || possibleChar == "L" || possibleChar == "F") {
        endPosition = [possibleI, possibleJ];
      }
    } else if (direction === "E") {
      if (j === input[0].length - 1) {
        return;
      }
      possibleI = i;
      possibleJ = j + 1;

      let possibleChar = input[possibleI][possibleJ];

      if(possibleChar == "-" || possibleChar == "J" || possibleChar == "7") {
        endPosition = [possibleI, possibleJ];
      }
    }
    
    let possibleChar = input[possibleI][possibleJ];

    // if(possibleChar == "S") {
    //   endPosition = [possibleI, possibleJ];
    // }
  });

  return endPosition;
}

let newPath = path;

for(let i = 0; i < 1000000000000000000000000000; i++) {
  if(stopLoop) {
    break;
  }
  newPath = findPath(input, newPath);
}



console.log(Math.round((newPath.length - 1)/2));