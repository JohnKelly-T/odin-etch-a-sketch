let grid = document.querySelector("#grid");
let gridWidth = grid.getBoundingClientRect().width;
let clearButton = document.querySelector("#clear-btn");

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function createGrid(dimension) {
    let gridSquareNum = dimension * dimension;

    for (let i = 1; i <= gridSquareNum; i++) {
        let gridSquare = document.createElement("div");
        gridSquare.style.width = (gridWidth / dimension) + "px";
        gridSquare.style.height = (gridWidth / dimension) + "px";
        
        gridSquare.addEventListener("mousedown", (e) => {
            colorSquare(e.target);
        })

        gridSquare.addEventListener("mouseenter", (e) => {
            if (mouseDown === true) {
                colorSquare(e.target);
            }
        })

        grid.appendChild(gridSquare);
    }
}

function colorSquare(element) {
    element.style.backgroundColor = "#646464";
}

clearButton.addEventListener("click", () => {
    let gridChildren = grid.children;
    for (let i = 0; i < gridChildren.length; i++) {
        gridChildren[i].style.backgroundColor = "#D9D9D9";
    }
})

createGrid(4);