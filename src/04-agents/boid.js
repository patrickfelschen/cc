// https://github.com/beneater/boids

class Boid {
    constructor(x, y, dx, dy, color) {
        this.color = color;
        this.pos = createVector(x, y);
        this.velocity = createVector(dx, dy);
        this.size = 20;
        this.tail = [];
        this.tailLength = random(-10, -20);
    }

    update() {
        this.tail.push(createVector(this.pos.x, this.pos.y));
        this.tail = this.tail.slice(this.tailLength);
        this.pos = this.pos.add(this.velocity);
    }

    render() {
        noStroke();
        fill(this.color);
        this.tail.forEach(tailPos => {
            ellipse(tailPos.x, tailPos.y, this.size, this.size);
        });

        push();
        const angle = atan2(this.velocity.y, this.velocity.x);
        translate(this.pos.x, this.pos.y);
        rotate(angle);
        translate(-this.pos.x, -this.pos.y);

        fill(this.color);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
        fill(0);
        ellipse(this.pos.x + 3, this.pos.y + 3, this.size / 5, this.size / 5);
        ellipse(this.pos.x + 3, this.pos.y - 3, this.size / 5, this.size/ 5);
        pop();
    }

}