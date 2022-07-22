class FaceScene extends Scene {
    constructor(data) {
        super(data);
        this.faces = [];

        // Face pro Amplitude erstellen
        this.faces[0] = new Face();
        this.faces[1] = new Face();
        this.faces[2] = new Face();
        this.faces[3] = new Face();
        this.faces[4] = new Face();
    }

    render() {
        // Mundgröße anpassen
        this.faces[0].mund = map(this.data.bassAmp, 0, 255, 0, -80);
        this.faces[1].mund = map(this.data.lowMidAmp, 0, 255, 0, -80);
        this.faces[2].mund = map(this.data.midAmp, 0, 255, 0, -80);
        this.faces[3].mund = map(this.data.highMidAmp, 0, 255, 0, -80);
        this.faces[4].mund = map(this.data.highAmp, 0, 255, 0, -80);

        // Skalierung anpassen
        this.faces[0].scale = map(this.data.bassAmp, 0, 255, 0.3, 0.6);
        this.faces[1].scale = map(this.data.lowMidAmp, 0, 255, 0.3, 0.6);
        this.faces[2].scale = map(this.data.midAmp, 0, 255, 0.3, 0.6);
        this.faces[3].scale = map(this.data.highMidAmp, 0, 255, 0.3, 0.6);
        this.faces[4].scale = map(this.data.highAmp, 0, 255, 0.3, 0.6);

        angleMode(RADIANS);

        // Face bewegen und im Fenster behalten
        this.faces.forEach(face => {
            if (face.y > windowHeight - 200) {
                face.velY *= -1;
            } else if (face.y < 0) {
                face.velY *= -1;
            } else if (face.x > windowWidth - 200) {
                face.velX *= -1;
            } else if (face.x < 0) {
                face.velX *= -1;
            }

            face.x += face.velX;
            face.y += face.velY;

            face.render();
        });
    }
}