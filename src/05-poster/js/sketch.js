// Erstellt mittels Taste "p" ein Array mit erfassten Musikdaten.
// Erstellt mittels Taste "e" einen HighRes-Export der erfassten Musikdaten.

let song, fft, spectrum;
let selectedSong = 0;

const songs = [
    '50_cent_-_in_da_club.mp3',
    'daft_punk_-_one_more_time.mp3',
    'junior_senior_-_move_your_feet.mp3',
    'justin_timberlake_-_sexyback.mp3',
    'right_said_fred_-_you_re_my_mate.mp3',
    'rihanna_-_umbrella.mp3',
    'scissor_sisters_-_i_dont_feel_like_dancin.mp3'
];

let songData = [];

let scaleRatio = 1;
let exportRatio = 10;
let canvas, buffer;
let w, h;

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

function preload() {
    song = loadSound('../../data/' + songs[selectedSong]);
}

function setup() {
    w = paperSizes[paperSizeIndex].width / exportRatio;
    h = paperSizes[paperSizeIndex].height / exportRatio;
    buffer = createGraphics(w, h);
    canvas = createCanvas(w, h);
    exportRatio /= pixelDensity();

    fft = new p5.FFT();
}

function draw() {
    if (!song.isPlaying()) return;

    spectrum = fft.analyze();

    let minAmp = 0;
    let maxAmp = (w / 2) - 10;

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

    songData.push(data);

    // Vermindert die Framerate und somit die Qualität des Endbildes
    // drawFrame(data);
    // image(buffer, 0, 0);
}

function drawFrame(data) {
    const alpha = 0.05;
    const bassColor = 'rgba(255, 100, 100, ' + alpha + ')';
    const lowMidColor = 'rgba(255, 255, 100, ' + alpha + ')';
    const midColor = 'rgba(100, 255, 100, ' + alpha + ')';
    const highMidColor = 'rgba(255, 100, 255, ' + alpha + ')';
    const highColor = 'rgba(100, 100, 255, ' + alpha + ')';

    const eSize = 2;

    buffer.push();
    buffer.scale(scaleRatio);
    buffer.translate(w / 2, h / 2);
    angleMode(DEGREES);
    for (let i = 0; i < 360; i++) {
        let s = 360 / 5;
        let x = 0;
        let y = 0;

        let cosI = cos(i);
        let sinI = sin(i);

        buffer.noStroke();
        if (i < s) {
            // Bass Abschnitt zeichnen
            x = data.bassAmp * cosI;
            y = data.bassAmp * sinI;
            buffer.fill(bassColor);
            buffer.ellipse(x, y, eSize);
        } else if (i < 2 * s) {
            // LowMid Abschnitt zeichnen
            x = data.lowMidAmp * cosI;
            y = data.lowMidAmp * sinI;
            buffer.fill(lowMidColor);
            buffer.ellipse(x, y, eSize);
        } else if (i < 3 * s) {
            // Mid Abschnitt zeichnen
            x = data.midAmp * cosI;
            y = data.midAmp * sinI;
            buffer.fill(midColor);
            buffer.ellipse(x, y, eSize);
        } else if (i < 4 * s) {
            // HighMid Abschnitt zeichnen
            x = data.highMidAmp * cosI;
            y = data.highMidAmp * sinI;
            buffer.fill(highMidColor);
            buffer.ellipse(x, y, eSize);
        } else if (i < 5 * s) {
            // High Abschnitt zeichnen
            x = data.highAmp * cosI;
            y = data.highAmp * sinI;
            buffer.fill(highColor);
            buffer.ellipse(x, y, eSize);
        }
    }
    buffer.pop();
}

// Zeichnet alle Frames übereinander anhand der
// Musikdaten
function drawMusic() {

    songData.forEach(data => {
        drawFrame(data);
    });

    image(buffer, 0, 0);
}

// HighRes Poster exportieren
function exportHighResolution() {
    scaleRatio = exportRatio;

    // Re-create buffer with exportRatio and re-draw
    buffer = createGraphics(scaleRatio * width, scaleRatio * height);
    drawMusic();

    // Save as PNG
    save(buffer, songs[selectedSong] + "_HighRes", 'png');

    // Reset scaleRation back to 1, re-create buffer, re-draw
    scaleRatio = 1;
    buffer = createGraphics(width, height);
    drawMusic();
}

function keyPressed() {
    if (key === 'p') {
        if (song.isPlaying()) {
            song.pause();
        } else {
            song.play();
        }
    }
    if (key === 'e') {
        exportHighResolution();
    }
    if (key === 's') {
        saveCanvas(canvas, songs[selectedSong] + "_Canvas", 'jpg');
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}