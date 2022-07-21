const fileName = 'CC_Aufgabe_03_Canvas';

let canvas;
let frame;
let currentFace;

function preload() {
    frame = loadImage('../../data/frame_square.png');
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    image(frame, 0, 0, windowWidth, windowHeight);
    generateNewFace();
}

function draw() {
    clear();
    background(50);
    drawFace();
}

function generateNewFace() {
    clear();
    currentFace = new Face();
    //currentFace._blinzeln = 1;
    //currentFace._r = 255;
    //currentFace._g = 0;
    //currentFace._b = 0;
}

function drawFace() {
    const x = (window.innerWidth / 2) - 100;
    const y = (window.innerHeight / 2) - 80;
    currentFace.render(x, y);
}

function keyPressed() {
    if (key === 's') {
        saveCanvas(canvas, fileName, 'jpg');
    }
    if (key === 'r') {
        generateNewFace();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}