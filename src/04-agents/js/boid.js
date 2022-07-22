// Generiert zufällige Farbe
function randomColor(alpha = 0.40) {
    return 'rgba('
        + Math.floor(random(0, 255)) + ', '
        + Math.floor(random(0, 255)) + ', '
        + Math.floor(random(0, 255)) + ', '
        + alpha + ')';
}

class Boid {
    constructor(
        x = random(0, windowWidth),
        y = random(0, windowHeight),
        dx = random(-5, 5),
        dy = random(-5, 5),
        color = randomColor()) {
        this.color = color;
        this.pos = createVector(x, y); // Position
        this.velocity = createVector(dx, dy); // Geschwindigkeit
        this.size = 20; // Kreisgröße
        this.tail = []; // alte Positionen für den Schwanz
        this.tailLength = random(-10, -20); // random Schwanzlänge
    }

    // Berechnet neue Position aus der Geschwindigkeit
    update() {
        this.tail.push(createVector(this.pos.x, this.pos.y));
        this.tail = this.tail.slice(this.tailLength);
        this.pos = this.pos.add(this.velocity);
    }

    // Zeichnet Boid inkl. Tail
    render() {
        // Tail
        noStroke();
        fill(this.color);
        this.tail.forEach(tailPos => {
            ellipse(tailPos.x, tailPos.y, this.size, this.size);
        });
        // Ausrichtung des Kopfes je nach Bewegungsrichtung
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.velocity.heading());
        translate(-this.pos.x, -this.pos.y);
        // Kopf
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size);
        // Augen
        fill(0);
        ellipse(this.pos.x + 3, this.pos.y + 3, this.size / 5, this.size / 5);
        ellipse(this.pos.x + 3, this.pos.y - 3, this.size / 5, this.size / 5);
        pop();
    }
}

// https://github.com/beneater/boids