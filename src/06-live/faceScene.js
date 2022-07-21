class FaceScene extends Scene {
    constructor() {
        super();
        this.faces = [];

        this.faces[0] = new Face();
        this.faces[1] = new Face();
        this.faces[2] = new Face();
        this.faces[3] = new Face();
        this.faces[4] = new Face();
    }

    render(data) {

        this.faces[0].mund = map(data.bassAmp, 0, 255, 0, -80);
        this.faces[1].mund = map(data.lowMidAmp, 0, 255, 0, -80);
        this.faces[2].mund = map(data.midAmp, 0, 255, 0, -80);
        this.faces[3].mund = map(data.highMidAmp, 0, 255, 0, -80);
        this.faces[4].mund = map(data.highAmp, 0, 255, 0, -80);

        this.faces[0].scale = map(data.bassAmp, 0, 255, 0.1, 0.6);
        this.faces[1].scale = map(data.lowMidAmp, 0, 255, 0.1, 0.6);
        this.faces[2].scale = map(data.midAmp, 0, 255, 0.1, 0.6);
        this.faces[3].scale = map(data.highMidAmp, 0, 255, 0.1, 0.6);
        this.faces[4].scale = map(data.highAmp, 0, 255, 0.1, 0.6);

        angleMode(RADIANS);

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

        angleMode(DEGREES);

    }
}