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

createGrid(4);