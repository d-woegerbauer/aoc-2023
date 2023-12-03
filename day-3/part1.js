const fs = require("fs");

let input = fs.readFileSync("./input.txt", 'utf8').replaceAll("\r", "").split("\n");
fs.readFileSync("./input.txt", 'utf8').replaceAll("\r", "").replaceAll("\n", "").replaceAll(".", "").split("").map(element => {
    if(Number.isNaN(Number(element))){
        console.log(element);
    }
})
input = input.map(line=> {
    return line.split("");
});

let numbers = []

input.forEach((line, lineIndex) => {
    let numberLength = 0;
    let colIndex = -1;

    console.log("line", lineIndex);

    line.forEach((element, col) => {
        if(/[0-9]/.test(element)){
            numberLength++;
            if(colIndex == -1){
                colIndex = col;
            }
        } else {
            if(numberLength > 0 && isSymbolNearby(numberLength, Number(colIndex), Number(lineIndex), input)){
                let currNumber = "";

                for(let i = colIndex; i < colIndex+numberLength; i++){
                    currNumber += line[i];
                }
                console.log(currNumber);

                numbers.push(Number(currNumber));
            }
            numberLength = 0;
            colIndex = -1;
        }
    });

    if(numberLength > 0 && isSymbolNearby(numberLength, Number(colIndex), Number(lineIndex), input)){
        let currNumber = "";

        for(let i = colIndex; i < colIndex+numberLength; i++){
            currNumber += line[i];
        }
        console.log(currNumber);

        numbers.push(Number(currNumber));
    }



});


console.log(numbers, numbers.reduce((a,b) => a+b));

function isSymbolNearby(length, col, row, array){
    console.log(length, col, row);
    for(let rowIndex = (row > 0 ? row-1 : row); rowIndex < row+2 && rowIndex < array.length; rowIndex++){
        let rowEl = array[rowIndex];
        for(let colIndex = col > 0 ? col-1 : col; colIndex < rowEl.length && colIndex < col + length + 1; colIndex++){
            let colEl = rowEl[colIndex];
            
            if(!/[0-9]/.test(colEl) && colEl !== "."){
                console.log(colEl);
                return true;
            }
        }
    }
    return false;
}