// Generiert zufällige Farbe
function randomColor() {
    return 'rgba('
        + Math.floor(random(0, 255)) + ', '
        + Math.floor(random(0, 255)) + ', '
        + Math.floor(random(0, 255))
        + ', 0.40)';
}

class Boid {
    constructor(
        x = random(0, windowWidth),
        y = random(0, windowHeight),
        dx = random(-5, 5),
        dy = random(-5, 5),
        color = randomColor()) {
        this.color = color;
        this.pos = createVector(x, y);
        this.velocity = createVector(dx, dy);
        this.size = 20;
        this.tail = [];
        this.tailLength = random(-10, -20);
    }

    // Berechnet neue Position aus der Geschwindigkeit.
    update() {
        this.tail.push(createVector(this.pos.x, this.pos.y));
        this.tail = this.tail.slice(this.tailLength);
        this.pos = this.pos.add(this.velocity);
    }

    // Zeichnet Boid inkl. Tail.
    render() {
        // Tail
        noStroke();
        fill(this.color);
        this.tail.forEach(tailPos => {
            ellipse(tailPos.x, tailPos.y, this.size, this.size);
        });
        // Ausrichgung des Kopfes je nach Bewegungsrichtung.
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.velocity.heading());
        translate(-this.pos.x, -this.pos.y);
        // Kopf
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
        // Augen
        fill(0);
        ellipse(this.pos.x + 3, this.pos.y + 3, this.size / 5, this.size / 5);
        ellipse(this.pos.x + 3, this.pos.y - 3, this.size / 5, this.size / 5);
        pop();
    }
}

// https://github.com/beneater/boids