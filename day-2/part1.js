const fs = require("fs");

let input = fs.readFileSync("./input.txt", 'utf8').replaceAll("\r", "").split("\n");

let colorCounts = [
    {
        color: "red",
        value: 12,
    },
    {
        color: "blue",
        value: 14,
    },
    {
        color: "green",
        value: 13
    }
]

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

let notAllowedSegments = [];

input.forEach((line, lineIndex) => {
    let exceededsLimit = false;
    line.flatMap(element => {
        element.forEach(colorSegment => {
            if(!isColorSegmentAllowed(colorSegment)){
                exceededsLimit = true;
            }
        })
    });
    if(!exceededsLimit){        
        notAllowedSegments.push(lineIndex+1);
    }
});

console.log(notAllowedSegments.reduce((a,b) => a+b))

function isColorSegmentAllowed(segment){
    for (const color of colorCounts) {
        if(color.color == segment.color && segment.value > color.value){
            return false;
        }
    }
    return true
}