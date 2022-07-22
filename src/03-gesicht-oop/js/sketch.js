const fileName = 'CC_Aufgabe_03_Canvas';

let canvas;
//let frame;
let currentFace;

function preload() {
    //frame = loadImage('../../data/frame_square.png');
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    //image(frame, 0, 0, windowWidth, windowHeight);
    generateNewFace();
}

function draw() {
    background(50);
    drawFace();
}

// Generiert ein neues random Face
function generateNewFace() {
    currentFace = new Face();
}

// Zeichnet aktuelles Face in der mitte des Fensters
function drawFace() {
    const x = (window.innerWidth / 2) - 100;
    const y = (window.innerHeight / 2) - 80;
    currentFace.x = x;
    currentFace.y = y;
    currentFace.render();
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