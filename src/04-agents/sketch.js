const fileName = 'CC_Aufgabe_02_Canvas';

let canvas;
let agents = [];

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 200; i++) {
    agents.push(new Agent(
        width / 2,
        height / 2,
        5,
        randomColor(),
    ));
  }

  background(200);
}


function randomColor(){
  return 'rgba(' + Math.floor(random(0, 255)) + ', ' + Math.floor(random(0, 255)) + ', ' + Math.floor(random(0, 255)) + ', 0.25)';
}

function draw() {
  agents.forEach(function(agent){
    agent.update();
    agent.render();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}