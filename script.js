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

function draw(element) {
    element.style.backgroundColor = "#646464";
}

grid.addEventListener("mouseover", (e) => {
    if (mouseDown === true) {
        draw(e.target);
    }
})

createGrid(4);