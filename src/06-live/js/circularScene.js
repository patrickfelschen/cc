class CircularScene extends Scene {
    constructor(alpha = 0.8) {
        super();

        this.bassColor = 'rgba(255, 100, 100, ' + alpha + ')';
        this.lowMidColor = 'rgba(255, 255, 100, ' + alpha + ')';
        this.midColor = 'rgba(100, 255, 100, ' + alpha + ')';
        this.highMidColor = 'rgba(255, 100, 255, ' + alpha + ')';
        this.highColor = 'rgba(100, 100, 255, ' + alpha + ')';
        this.eSize = 50;
    }

    render(data) {

        push();
        angleMode(DEGREES);
        translate(windowWidth / 2, windowHeight / 2);

        for (let i = 0; i < 360; i++) {
            let s = 360 / 5;
            let x = 0;
            let y = 0;

            let cosI = cos(i);
            let sinI = sin(i);

            if (i < s) {
                x = data.bassAmp * cosI;
                y = data.bassAmp * sinI;
                noStroke();
                fill(this.bassColor);
                ellipse(x, y, this.eSize);
            } else if (i < 2 * s) {
                x = data.lowMidAmp * cosI;
                y = data.lowMidAmp * sinI;
                noStroke();
                fill(this.lowMidColor);
                ellipse(x, y, this.eSize);
            } else if (i < 3 * s) {
                x = data.midAmp * cosI;
                y = data.midAmp * sinI;
                noStroke();
                fill(this.midColor);
                ellipse(x, y, this.eSize);
            } else if (i < 4 * s) {
                x = data.highMidAmp * cosI;
                y = data.highMidAmp * sinI;
                noStroke();
                fill(this.highMidColor);
                ellipse(x, y, this.eSize);
            } else if (i < 5 * s) {
                x = data.highAmp * cosI;
                y = data.highAmp * sinI;
                noStroke();
                fill(this.highColor);
                ellipse(x, y, this.eSize);
            }
        }
        pop();
    }
}