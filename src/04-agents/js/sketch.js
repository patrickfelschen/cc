const fileName = 'CC_Aufgabe_04_Canvas';

let canvas;
let flock;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    flock = new Flock();
    flock.createBoids(100);
}

function draw() {
    background(50);
    flock.update();
    flock.render();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
    if (key === 's') {
        saveCanvas(canvas, fileName, 'jpg');
    }
}