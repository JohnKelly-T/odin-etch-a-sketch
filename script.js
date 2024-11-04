const DEFAULT_COLOR = "#646464";

let grid = document.querySelector("#grid");
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
        gridSquare.style.opacity = 0;

        grid.appendChild(gridSquare);
    }
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
        element.style.opacity = parseFloat(element.style.opacity) + .10;
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

grid.addEventListener("mousedown", (e) => {
    colorSquare(e.target);
})

grid.addEventListener("mouseover", (e) => {
    if (mouseDown === true) {
        colorSquare(e.target);
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