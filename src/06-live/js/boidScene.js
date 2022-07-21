class BoidScene extends Scene {
    constructor(count = 120) {
        super();
        this.bassBoids = [];
        this.midBoids = [];
        this.highBoids = [];

        for (let i = 0; i < count / 3; i++) {
            this.bassBoids[i] = new Boid();
        }

        for (let i = 0; i < count / 3; i++) {
            this.midBoids[i] = new Boid();
        }

        for (let i = 0; i < count / 3; i++) {
            this.highBoids[i] = new Boid();
        }
    }

    render(data) {
        let dx = map(data.bassAmp, 0, 255, -5, 1);
        let dy = map(data.highAmp, 0, 255, -5, 1);
        this.bassBoids.forEach(boid => {
            boid.velocity.x = dx;
            boid.velocity.y = dy;
            reposition(boid);
            boid.update();
            boid.render();
        });

        dx = map(data.midAmp, 0, 255, -5, 1);
        dy = map(data.highMidAmp, 0, 255, -5, 1);
        this.midBoids.forEach(boid => {
            boid.velocity.x = dx;
            boid.velocity.y = dy;
            reposition(boid);
            boid.update();
            boid.render();
        });

        dx = map(data.highAmp, 0, 255, -5, 1);
        dy = map(data.bassAmp, 0, 255, -5, 1);
        this.highBoids.forEach(boid => {
            boid.velocity.x = dx;
            boid.velocity.y = dy;
            reposition(boid);
            boid.update();
            boid.render();
        });
    }
}

function reposition(boid) {
    if (boid.pos.y > windowHeight) {
        boid.pos.y = 0;
    } else if (boid.pos.y < 0) {
        boid.pos.y = windowHeight;
    } else if (boid.pos.x > windowWidth) {
        boid.pos.x = 0;
    } else if (boid.pos.y < 0) {
        boid.pos.x = windowWidth;
    }
}