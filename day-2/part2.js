const fs = require("fs");

let input = fs.readFileSync("./input.txt", 'utf8').replaceAll("\r", "").split("\n");

input = input.map(inputLine => {
    inputLine = inputLine.split(": ")[1];
    return inputLine.split("; ").map(inputSegment => {
        return inputSegment.split(", ").map(inputSegmentElement => {
            return {
                color: inputSegmentElement.split(" ")[1],
                value: Number(inputSegmentElement.split(" ")[0]),
            }
        })
    });
});

const results = [];


input.forEach((line, lineIndex) => {
    let colorCounts = [
        {
            color: "red",
            value: -1,
        },
        {
            color: "blue",
            value: -1,
        },
        {
            color: "green",
            value: -1
        }
    ];

    line.flatMap(element => {
        element.forEach(currentColor => {
            colorCounts = addColorIfBigger(currentColor, colorCounts);
        })
    });
    
    results.push(colorCounts.map(color => color.value).reduce((a,b) => a*b))
});

console.log(results.reduce((a,b) => a+b));

function addColorIfBigger(color, colorArray){
    return colorArray.map(currentColor => {
        if(currentColor.color == color.color && currentColor.value < color.value){
            return color;
        } else {
            return currentColor;
        }
    })
}