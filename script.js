let grid = document.querySelector("#grid");
let gridWidth = grid.getBoundingClientRect().width;


function createGrid(dimension) {
    let gridSquareNum = dimension * dimension;

    for (let i = 1; i <= gridSquareNum; i++) {
        let gridSquare = document.createElement("div");
        gridSquare.style.width = (gridWidth / dimension) + "px";
        gridSquare.style.height = (gridWidth / dimension) + "px";
        
        grid.appendChild(gridSquare);
    }
}

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);
document.body.onmouseleave = () => (mouseDown = false);

function draw(element) {
    element.style.backgroundColor = "#646464";
}

grid.addEventListener("mouseover", (e) => {
    if (mouseDown === true) {
        draw(e.target);
    }
})

let clearButton = document.querySelector("#clear-btn");

clearButton.addEventListener("click", () => {
    let gridChildren = grid.children;
    for (let i = 0; i < gridChildren.length; i++) {
        gridChildren[i].style.backgroundColor = "#D9D9D9";
    }
})

createGrid(4);