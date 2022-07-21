const fileName = 'CC_Aufgabe_01_Canvas';
let canvas, frame;

function preload() {
    //frame = loadImage('../../data/frame_square.png');
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    //image(frame, 0, 0, windowWidth, windowHeight);
}

function draw() {
    background(200);
    drawFace(
        (windowWidth / 2) - 100,
        (windowHeight / 2) - 80,
        7,
        0
    );
}

function drawFace(x, y, LR, OU) {
    push();
    translate(x, y);

    const hautfarbe = color('#FFCC99');
    const hautfarbe2 = color('#FEB186');
    const augenfarbe = color('green');
    const mundfarbe = color('darkred');
    const hutfarbe = color('darkblue');

    noStroke();
    // Ohren
    fill(hautfarbe2);
    ellipse(-10, 100, 30, 100);
    ellipse(210, 100, 30, 100);
    // Hals
    fill(hautfarbe);
    rect(50, 200, 100, 60);
    // Gesicht
    fill(hautfarbe);
    ellipse(100, 100, 220, 280);
    // Auge links
    fill(255);
    ellipse(50, 50, 40);
    fill(augenfarbe);
    ellipse(50 + LR, 50 + OU, 20);
    fill(0);
    ellipse(50 + LR, 50 + OU, 10);
    // Auge rechts
    fill(255);
    ellipse(150, 50, 40);
    fill(augenfarbe);
    ellipse(150 + LR, 50 + OU, 20);
    fill(0);
    ellipse(150 + LR, 50 + OU, 10);
    // Nase
    fill(hautfarbe2);
    triangle(100, 75, 75, 110, 125, 110);
    // Mund
    fill(mundfarbe);
    arc(100, 150, 120, 100, 0, PI, CHORD);
    // Zaehne
    fill(255);
    rect(50, 150, 20, 10);
    rect(75, 150, 20, 10);
    rect(100, 150, 20, 10);
    rect(125, 150, 20, 10);
    rect(90, 195, 20, 5);
    // Hut
    fill(hutfarbe);
    rect(0, -30, 200, 40, 20);
    rect(25, -100, 150, 80, 10);

    pop();
}

function keyPressed() {
    if (key === 's') {
        saveCanvas(canvas, fileName, 'jpg');
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}