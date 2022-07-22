class CircularScene extends Scene {
    constructor(data, alpha = 0.8) {
        super(data);

        // Farben pro Amplitude
        this.bassColor = 'rgba(255, 100, 100, ' + alpha + ')';
        this.lowMidColor = 'rgba(255, 255, 100, ' + alpha + ')';
        this.midColor = 'rgba(100, 255, 100, ' + alpha + ')';
        this.highMidColor = 'rgba(255, 100, 255, ' + alpha + ')';
        this.highColor = 'rgba(100, 100, 255, ' + alpha + ')';

        // Größe der Kreise
        this.eSize = 50;
    }

    render() {
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
                // Bass Kreis zeichnen
                x = this.data.bassAmp * cosI;
                y = this.data.bassAmp * sinI;
                noStroke();
                fill(this.bassColor);
                ellipse(x, y, this.eSize);
            } else if (i < 2 * s) {
                // LowMid Kreis zeichnen
                x = this.data.lowMidAmp * cosI;
                y = this.data.lowMidAmp * sinI;
                noStroke();
                fill(this.lowMidColor);
                ellipse(x, y, this.eSize);
            } else if (i < 3 * s) {
                // Mid Kreis zeichnen
                x = this.data.midAmp * cosI;
                y = this.data.midAmp * sinI;
                noStroke();
                fill(this.midColor);
                ellipse(x, y, this.eSize);
            } else if (i < 4 * s) {
                // HighMid Kreis zeichnen
                x = this.data.highMidAmp * cosI;
                y = this.data.highMidAmp * sinI;
                noStroke();
                fill(this.highMidColor);
                ellipse(x, y, this.eSize);
            } else if (i < 5 * s) {
                // High Kreis zeichnen
                x = this.data.highAmp * cosI;
                y = this.data.highAmp * sinI;
                noStroke();
                fill(this.highColor);
                ellipse(x, y, this.eSize);
            }
        }
        pop();
    }
}