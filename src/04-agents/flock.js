let boids;
const visualRange = 60;

const speedLimit = 15;

const centeringFactor = 0.0005; // adjust velocity by this %

const minDistance = 30;
const avoidFactor = 0.025;

const minMouseDistance = 30;
const avoidMouseFactor = 0.03;

class Flock {
    constructor() {
        boids = [];
    }

    // Generiert zufällige Farbe
    randomColor() {
        return 'rgba('
            + Math.floor(random(0, 255)) + ', '
            + Math.floor(random(0, 255)) + ', '
            + Math.floor(random(0, 255))
            + ', 0.40)';
    }

    // Generiert zufällige Boids
    createBoids(count) {
        for (let i = 0; i < count; i++) {
            let newBoid = new Boid(
                random() * windowWidth,
                random() * windowHeight,
                random(-1, 1) * speedLimit,
                random(-1, 1) * speedLimit,
                this.randomColor()
            );
            boids.push(newBoid);
        }
    }

    // Steuert das Verhalten der einzelnen Boids
    update() {
        boids.forEach(function (boid) {
            flyTowardsCenter(boid);
            avoidOthers(boid);
            matchVelocity(boid);
            keepWithinBounds(boid);
            limitSpeed(boid);
            avoidMouse(boid);
        });
    }

    // Zeichnet alle Boids
    render() {
        boids.forEach(function (boid) {
            boid.render();
            boid.update();
        });
    }
}

// Boids drehen am Bildschirmrand um
function keepWithinBounds(boid) {
    const margin = 30;
    const turnFactor = 1;

    if (boid.pos.x < margin) {
        boid.velocity.x += turnFactor;
    }
    if (boid.pos.x > windowWidth - margin) {
        boid.velocity.x -= turnFactor
    }
    if (boid.pos.y < margin) {
        boid.velocity.y += turnFactor;
    }
    if (boid.pos.y > windowHeight - margin) {
        boid.velocity.y -= turnFactor;
    }
}

// Alle Boids steuern ein errechnetes Zentrum von einer
// Boidsammlung an.
function flyTowardsCenter(boid) {
    let centerX = 0;
    let centerY = 0;
    let numNeighbors = 0;

    boids.forEach(function (otherBoid) {
        if (boid.pos.dist(otherBoid.pos) < visualRange) {
            centerX += otherBoid.pos.x;
            centerY += otherBoid.pos.y;
            numNeighbors += 1;
        }
    });

    if (numNeighbors) {
        centerX = centerX / numNeighbors;
        centerY = centerY / numNeighbors;

        boid.velocity.x += (centerX - boid.pos.x) * centeringFactor;
        boid.velocity.y += (centerY - boid.pos.y) * centeringFactor;
    }
}

// Boids halten Abstand zu anderen Boids.
function avoidOthers(boid) {
    let moveX = 0;
    let moveY = 0;

    boids.forEach(function (otherBoid) {
        if (otherBoid !== boid) {
            if (boid.pos.dist(otherBoid.pos) < minDistance) {
                moveX += boid.pos.x - otherBoid.pos.x;
                moveY += boid.pos.y - otherBoid.pos.y;
            }
        }
    });

    boid.velocity.x += moveX * avoidFactor;
    boid.velocity.y += moveY * avoidFactor;
}

// Boids passen ihre Geschwindigkeit im Bezug auf den
// umliegenden Boids an.
function matchVelocity(boid) {
    const matchingFactor = 0.025;

    let avgDX = 0;
    let avgDY = 0;
    let numNeighbors = 0;

    boids.forEach(function (otherBoid) {
        if (boid.pos.dist(otherBoid.pos) < visualRange) {
            avgDX += otherBoid.velocity.x;
            avgDY += otherBoid.velocity.y;
            numNeighbors += 1;
        }
    });

    if (numNeighbors) {
        avgDX = avgDX / numNeighbors;
        avgDY = avgDY / numNeighbors;

        boid.velocity.x += (avgDX - boid.velocity.x) * matchingFactor;
        boid.velocity.y += (avgDY - boid.velocity.y) * matchingFactor;
    }
}

// Anpassung der maximalen Geschwindigkeit der Boids.
function limitSpeed(boid) {
    const speed = boid.velocity.mag();
    if (speed > speedLimit) {
        boid.velocity.x = (boid.velocity.x / speed) * speedLimit;
        boid.velocity.y = (boid.velocity.y / speed) * speedLimit;
    }
}

// Boids halten Abstand vorm Maus-Cursor.
function avoidMouse(boid) {
    let moveX = 0;
    let moveY = 0;
    let mouse = createVector(mouseX, mouseY);

    if (boid.pos.dist(mouse) < minMouseDistance) {
        moveX += boid.pos.x - mouse.x;
        moveY += boid.pos.y - mouse.y;
    }

    boid.velocity.x += moveX * avoidMouseFactor;
    boid.velocity.y += moveY * avoidMouseFactor;
}

// https://github.com/beneater/boids