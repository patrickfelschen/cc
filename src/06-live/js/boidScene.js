class BoidScene extends Scene {
    constructor(data, count = 120) {
        super(data);
        this.bassBoids = [];
        this.midBoids = [];
        this.highBoids = [];

        // Generiert Bass-Boids
        for (let i = 0; i < count / 3; i++) {
            this.bassBoids[i] = new Boid();
        }
        // Generiert Mid-Boids
        for (let i = 0; i < count / 3; i++) {
            this.midBoids[i] = new Boid();
        }
        // Generiert High-Boids
        for (let i = 0; i < count / 3; i++) {
            this.highBoids[i] = new Boid();
        }
    }

    // Lässt Boids endlos durch den Screen wandern
    reposition_(boid) {
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

    // Zeichnet Boids mit verschiedenen Verhaltensmustern
    render() {
        let dx = map(this.data.bassAmp, 0, 255, -5, 1);
        let dy = map(this.data.highAmp, 0, 255, -5, 1);
        this.bassBoids.forEach(boid => {
            boid.velocity.x = dx;
            boid.velocity.y = dy;
            this.reposition_(boid);
            boid.update();
            boid.render();
        });

        dx = map(this.data.midAmp, 0, 255, -5, 1);
        dy = map(this.data.highMidAmp, 0, 255, -5, 1);
        this.midBoids.forEach(boid => {
            boid.velocity.x = dx;
            boid.velocity.y = dy;
            this.reposition_(boid);
            boid.update();
            boid.render();
        });

        dx = map(this.data.highAmp, 0, 255, -5, 1);
        dy = map(this.data.bassAmp, 0, 255, -5, 1);
        this.highBoids.forEach(boid => {
            boid.velocity.x = dx;
            boid.velocity.y = dy;
            this.reposition_(boid);
            boid.update();
            boid.render();
        });
    }
}