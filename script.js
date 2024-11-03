let grid = document.querySelector("#grid");
let gridWidth = grid.getBoundingClientRect().width;
let clearButton = document.querySelector("#clear-btn");
let gridSizeSlider = document.querySelector("#grid-size-slider");
let gridSizeText = document.querySelector(".grid-size-text");
let colorPicker = document.querySelector("#color-picker");

let currentColor = "#646464";

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

gridSizeSlider.onmousemove = (e) => updateGridSizeText(e.target.value);
gridSizeSlider.onchange = (e) => updateGridSize(e.target.value);
colorPicker.onchange = (e) => updateColor(e.target.value);

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
    element.style.backgroundColor = currentColor;
}

function updateGridSize(value) {
    grid.innerHTML = '';
    createGrid(value);
}

function updateGridSizeText(value) {
    gridSizeText.textContent = `${value} x ${value}`;
}

function updateColor(value) {
    currentColor = value;
}

clearButton.addEventListener("click", () => {
    let gridChildren = grid.children;
    for (let i = 0; i < gridChildren.length; i++) {
        gridChildren[i].style.backgroundColor = "#D9D9D9";
    }
})

createGrid(24);