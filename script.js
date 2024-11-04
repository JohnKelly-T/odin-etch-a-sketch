const DEFAULT_COLOR = "#646464";

let grid = document.querySelector("#grid");
let gridChildren = null;
let gridWidth = grid.getBoundingClientRect().width;
let clearButton = document.querySelector("#clear-btn");
let gridSizeSlider = document.querySelector("#grid-size-slider");
let gridSizeText = document.querySelector(".grid-size-text");
let colorPicker = document.querySelector("#color-picker");
let darkeningButton = document.querySelector("#darkening-btn");
let rgbButton = document.querySelector("#rgb-btn");

let currentColor = "#646464";
let colorMode = "default";
let hue = 0;

let currentNode = null;
let previousNode = null;
let gridSize;

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

gridSizeSlider.onmousemove = (e) => updateGridSizeText(e.target.value);
gridSizeSlider.onchange = (e) => updateGridSize(e.target.value);
colorPicker.onchange = (e) => updateColor(e.target.value);

function createGrid(dimension) {
    gridSize = dimension;
    let gridSquareNum = dimension * dimension;

    for (let i = 1; i <= gridSquareNum; i++) {
        let gridSquare = document.createElement("div");
        gridSquare.style.width = (gridWidth / dimension) + "px";
        gridSquare.style.height = (gridWidth / dimension) + "px";
        gridSquare.style.opacity = 0;

        grid.appendChild(gridSquare);
    }

    gridChildren = grid.childNodes;
}

function colorSquare(element) { 
    if (colorMode === "default") {
        element.style.opacity = 1;
    } else if (colorMode === "rgb") {

        element.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
        hue += 5;

        if (hue > 360) {
            hue = 0;
        }

        element.style.opacity = 1;
        return;
    } else {
        element.style.opacity = parseFloat(element.style.opacity) + .1;
        console.log(element.style.opacity);
    }

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

function getChildIndex(child) {
    let children = grid.childNodes;

    for (let i = 0; i < children.length; i++) {
        if (children[i] === child) {
            return i;
        }
    }
}

function getChildCoordinate(child) {
    let childIndex = getChildIndex(child);

    let row = Math.floor(childIndex / gridSize);
    let col = childIndex % gridSize;

    return [row, col];
}

function convertCoordinatetoIndex(row, col) {
    return row * gridSize + col;
}

// plot line using Bresenham's line algorithm
function plotLine() {
    let [x0, y0] = getChildCoordinate(previousNode);
    let [x1, y1] = getChildCoordinate(currentNode);

    let dx = Math.abs(x1 - x0);
    let sx = (x0 < x1) ? 1 : -1;
    let dy = -(Math.abs(y1 - y0));
    let sy = (y0 < y1) ? 1 : -1;
    let error = dx + dy;

    let lineArray = []

    while (true) {
        lineArray.push([x0, y0]);
        if (x0 === x1 && y0 === y1) {
            break;
        }

        let e2 = 2 * error;

        if (e2 >= dy) {
            error = error + dy;
            x0 = x0 + sx;
        }

        if (e2 <= dx) {
            error = error + dx;
            y0 = y0 + sy;
        }
    }

    if (lineArray.length === 2) {
        let childIndex = convertCoordinatetoIndex(...lineArray[1]);
        colorSquare(gridChildren[childIndex]);
        return;
    }

    for (let i = 0; i < lineArray.length; i++){
        let childIndex = convertCoordinatetoIndex(...lineArray[i]);
        colorSquare(gridChildren[childIndex]);
    }
}

grid.addEventListener("mousedown", (e) => {
    currentNode = e.target;
    colorSquare(e.target);
})

grid.addEventListener("mouseover", (e) => {
    if (mouseDown === true) {
        previousNode = currentNode;
        currentNode = e.target;
        plotLine();
    }
})

clearButton.addEventListener("click", () => {
    let gridChildren = grid.children;
    for (let i = 0; i < gridChildren.length; i++) {
        gridChildren[i].style.backgroundColor = "#D9D9D9";
        gridChildren[i].style.opacity = 0;
    }
})

darkeningButton.addEventListener("click", () => {
    colorMode = (colorMode === "darkening") ? "default" : "darkening";
})

rgbButton.addEventListener("click", () =>{
    colorMode = (colorMode === "rgb") ? "default" : "rgb";
})

createGrid(24);