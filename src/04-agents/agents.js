class Agent {
    /**
     * Default constructor
     * @param {number} x
     * @param {number} y
     * @param {number} stepSize
     * @param {string} color
     */
    constructor(x = 0,
                y = 0,
                stepSize = 2,
                color = 'rgba(0, 0, 0, 0.25)'
    ) {
        this.position = {
            x: x,
            y: y,
        };
        this.size = 10;
        this.stepSize = stepSize;
        this.color = color;
    }

    /**
     * Updates the agent
     */
    update() {
        this.position.x += random(-this.stepSize, this.stepSize);
        this.position.y += random(-this.stepSize, this.stepSize);
        this.position.x = constrain(this.position.x, 0, width);
        this.position.y = constrain(this.position.y, 0, height);
    }

    /**
     * Renders the agent
     */
    render() {
        fill(this.color);
        noStroke();
        ellipse(this.position.x, this.position.y, this.size, this.size);
    }
}