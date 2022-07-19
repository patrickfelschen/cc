const fileName = 'CC_Aufgabe_02_Canvas';

let scaleRatio = 1;
let exportRatio = 10;
let buffer;

const paperSizeIndex = 1;

const paperSizes = [{
    name: 'A3',
    width: 2480,
    height: 3508,
}, {
    name: 'A1',
    width: 7016,
    height: 9933,
}];

let canvas;
let frame;

let faceParamsList = [];
let rows = 6;
let cols = 6;

function preload() {
  frame = loadImage('../../data/frame_square.png');
}

function setup() {
  frameRate(10);
  //canvas = createCanvas(window.innerWidth, window.innerHeight);
  
  let w = paperSizes[paperSizeIndex].width / exportRatio;
  let h = paperSizes[paperSizeIndex].height / exportRatio;

  buffer = createGraphics(w, h);
  canvas = createCanvas(w, h);

  exportRatio /= pixelDensity();
  
  buffer.background(255);
  //image(frame, 0, 0, window.innerWidth, window.innerHeight);
  generateFaceParamsList();
}

function draw() {
  buffer.clear();
  buffer.background(255);
  
  // Transform (scale) all the drawings
  buffer.scale(scaleRatio);
  
  let i = 0;
  for(let row = 0; row < rows; row++){
    for(let col = 0; col < cols; col++){
      faceParamsList[i].blinzeln = random(0,1);
      drawFace(60 +(row * 100), 80 + (col * 125), faceParamsList[i]);
      i++;
    }
  }

  // Draw buffer to canvas
  image(buffer, 0, 0);
}


function generateFaceParamsList(){
  for(let i = 0; i < cols * rows; i++){
    faceParamsList[i] = generateFaceParams();
  }
}

function generateFaceParams(){
  return ({
    "LR": random(-7, 7),
    "OU": random(-7, 7),
    "r": random(1, 255),
    "g": random(1, 255),
    "b": random(1, 255),
    "nase" : random(-20, 20),
    "hut" : random(-20, 35),
    "mund" : random(-100, 50),
    "z1": random(0, 1),
    "z2": random(0, 1),
    "z3": random(0, 1),
    "z4": random(0, 1),
    "haare": random(0, 1),
    "blinzeln": 0
  });
}

function drawFace(x, y, face) {
  buffer.push();
  buffer.translate(x, y);
  buffer.scale(0.3);
  
  const hautfarbe = color('#FFCC99');
  const hautfarbe2 = color('#FEB186');
  const augenfarbe = color('green');
  const mundfarbe = color('darkred');
  
  // Random Farbe
  buffer.colorMode(RGB, 100);
  const hutfarbe = color(face.r, face.g, face.b);
  
  // Ohren
  buffer.fill(hautfarbe2);
  buffer.ellipse(-10, 100, 30, 100);
  buffer.ellipse(210, 100, 30, 100);
  // Hals
  buffer.fill(hautfarbe);
  buffer.rect(50, 200, 100, 60);
  // Gesicht
  buffer.fill(hautfarbe);
  buffer.ellipse(100, 100, 220, 280);
  if(face.blinzeln > 0.99){
    // Auge links geschlossen
    buffer.fill(255);
    buffer.ellipse(50, 50, 40, 0);
    // Auge rechts geschlossen
    buffer.fill(255);
    buffer.ellipse(150, 50, 40, 0);
  }else{
    // Auge links geoeffnet
    buffer.fill(255);
    buffer.ellipse(50, 50, 40);
    buffer.fill(augenfarbe);
    buffer.ellipse(50 + face.LR, 50 + face.OU, 20);
    buffer.fill(0);
    buffer.ellipse(50 + face.LR, 50 + face.OU, 10);
    // Auge rechts geoeffnet
    buffer.fill(255);
    buffer.ellipse(150, 50, 40);
    buffer.fill(augenfarbe);
    buffer.ellipse(150 + face.LR, 50 + face.OU, 20);
    buffer.fill(0);
    buffer.ellipse(150 + face.LR, 50 + face.OU, 10);
  }
  // Nase
  buffer.fill(hautfarbe2);
  buffer.triangle(100, 75 + face.nase, 75, 110 + face.nase, 125, 110 + face.nase);
  // Mund
  buffer.fill(mundfarbe);
  buffer.arc(100, 150, 120, 100 + face.mund, 0, PI, CHORD);
  // Zaehne
  buffer.fill(255);
  if(face.z1 > 0.5) buffer.rect(55, 150, 20, 10);  
  if(face.z2 > 0.5) buffer.rect(80, 150, 20, 10);
  if(face.z3 > 0.5) buffer.rect(105, 150, 20, 10);
  if(face.z3 > 0.5) buffer.rect(130, 150, 20, 10);
  // Hut
  if(face.haare > 0.1){
    buffer.strokeWeight(1);
    buffer.fill(hutfarbe);
    buffer.rect(0, -30 + face.hut, 200, 40, 20);
    buffer.rect(25, -100 + face.hut, 150, 80, 10);
  }else{
    buffer.strokeWeight(2);
    buffer.line(110, -20, 105, -50);
    buffer.line(100, -20, 105, -50);
  }
  
  buffer.pop();
}

function exportHighResolution() {
  scaleRatio = exportRatio;

  // Re-create buffer with exportRatio and re-draw
  buffer = createGraphics(scaleRatio*width, scaleRatio*height);
  draw();

  // Get timestamp to name the ouput file
  let timestamp = new Date().getTime();

  // Save as PNG
  save(buffer, str(timestamp), 'png');

  // Reset scaleRation back to 1, re-create buffer, re-draw
  scaleRatio = 1;
  buffer = createGraphics(width, height);
  draw();
}

function keyPressed() {
  if (key == 's') {
    saveCanvas(canvas, fileName, 'jpg');
  }
  if (key == "e") {
    exportHighResolution();
  }
  if (key == "r") {
    generateFaceParamsList();
  }
}