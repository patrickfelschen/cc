// https://github.com/beneater/boids

let boids;
const visualRange = 75;

class Flock {
    constructor() {
        boids = [];
    }

    // Generiert zufaellige Farbe
    randomColor() {
        return 'rgba('
            + Math.floor(random(0, 255)) + ', '
            + Math.floor(random(0, 255)) + ', '
            + Math.floor(random(0, 255))
            + ', 0.40)';
    }

    // Generiert zufaellige Boids
    createBoids(count) {
        for (let i = 0; i < count; i++) {
            let newBoid = new Boid(
                random() * windowWidth,
                random() * windowHeight,
                random() * 10,
                random() * 10,
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

// Gibt n Boids zurueck mit geringster Distanz
function nClosestBoids(boid, n) {
    const sorted = boids.slice();
    sorted.sort((a, b) => boid.pos.dist(a.pos) - boid.pos.dist(b.pos));
    return sorted.slice(1, n + 1);
}

function flyTowardsCenter(boid) {
    const centeringFactor = 0.0005; // adjust velocity by this %

    let centerX = 0;
    let centerY = 0;
    let numNeighbors = 0;

    nClosestBoids(boid,10).forEach(function(otherBoid){
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

function avoidOthers(boid) {
    const minDistance = 30; // The distance to stay away from other boids
    const avoidFactor = 0.025; // Adjust velocity by this %
    let moveX = 0;
    let moveY = 0;

    nClosestBoids(boid, 10).forEach(function (otherBoid){
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

function matchVelocity(boid) {
    const matchingFactor = 0.025; // Adjust by this % of average velocity

    let avgDX = 0;
    let avgDY = 0;
    let numNeighbors = 0;

    nClosestBoids(boid,10).forEach(function(otherBoid){
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

function limitSpeed(boid) {
    const speedLimit = 8;

    const speed = boid.velocity.mag();
    if (speed > speedLimit) {
        boid.velocity.x = (boid.velocity.x / speed) * speedLimit;
        boid.velocity.y = (boid.velocity.y / speed) * speedLimit;
    }
}

function avoidMouse(boid) {
    const minDistance = 30; // 30; // The distance to stay away from other boids
    const avoidFactor = 0.3; // Adjust velocity by this %
    let moveX = 0;
    let moveY = 0;
    let mouse = createVector(mouseX, mouseY);

    if (boid.pos.dist(mouse) < minDistance) {
        moveX += boid.pos.x - mouse.x;
        moveY += boid.pos.y - mouse.y;
    }

    boid.velocity.x += moveX * avoidFactor;
    boid.velocity.y += moveY * avoidFactor;
}