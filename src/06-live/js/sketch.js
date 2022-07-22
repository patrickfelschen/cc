// Startet mittels Taste "p" die Musik-Visualisierung

let song, fft, spectrum;
let selectedSong = 0;

let currentScene;
let scenes = [];

const songs = [
    '50_cent_-_in_da_club.mp3',
    'daft_punk_-_one_more_time.mp3',
    'junior_senior_-_move_your_feet.mp3',
    'justin_timberlake_-_sexyback.mp3',
    'right_said_fred_-_you_re_my_mate.mp3',
    'rihanna_-_umbrella.mp3',
    'scissor_sisters_-_i_dont_feel_like_dancin.mp3',
];

let canvas;
let timeCounter = 0;

function preload() {
    song = loadSound('../../data/' + songs[selectedSong]);
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    fft = new p5.FFT();

    // Szenen erstellen
    scenes[0] = new CircularScene();
    scenes[1] = new FaceScene();
    scenes[2] = new BoidScene();

    // Erste Szene setzen
    currentScene = random(scenes);
}

// Szenen alle 4 Sekunden random wechseln
function draw() {
    if (!song.isPlaying()) return;

    timeCounter += deltaTime;

    if (timeCounter >= 4000) {
        currentScene = random(scenes);
        timeCounter = 0;
    }

    // Musikdaten erfassen
    spectrum = fft.analyze();

    let minAmp = 0;
    let maxAmp = (windowWidth / 2) - 50;

    let bassAmp = fft.getEnergy("bass");
    bassAmp = map(bassAmp, 0, 255, minAmp, maxAmp);

    let lowMidAmp = fft.getEnergy("lowMid");
    lowMidAmp = map(lowMidAmp, 0, 255, minAmp, maxAmp);

    let midAmp = fft.getEnergy("mid");
    midAmp = map(midAmp, 0, 255, minAmp, maxAmp);

    let highMidAmp = fft.getEnergy("highMid");
    highMidAmp = map(highMidAmp, 0, 255, minAmp, maxAmp);

    let highAmp = fft.getEnergy("treble");
    highAmp = map(highAmp, 0, 255, minAmp, maxAmp);

    let data = ({
        "bassAmp": bassAmp,
        "lowMidAmp": lowMidAmp,
        "midAmp": midAmp,
        "highMidAmp": highMidAmp,
        "highAmp": highAmp
    });

    // Hintergrundfarbe anhand Bass, Mid, Treble
    background(fft.getEnergy("bass") / 2, fft.getEnergy("mid") / 2, fft.getEnergy("treble") / 2);

    // aktuelle Szene anzeigen
    currentScene.data = data;
    currentScene.render();
}

function keyPressed() {
    if (key === 'p') {
        if (song.isPlaying()) {
            song.pause();
        } else {
            song.play();
        }
    }
    if (key === 's') {
        saveCanvas(canvas, songs[selectedSong], 'jpg');
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}