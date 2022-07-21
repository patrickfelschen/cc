class Face {
    constructor(
        x = random(0, windowWidth - 200),
        y = random(0, windowHeight - 200),
        velX = random(-1, 1) * 5,
        velY = random(-1, 1) * 5,
        scale = 1.0,
        LR = random(-7, 7),
        OU = random(-7, 7),
        r = random(0, 255),
        g = random(0, 255),
        b = random(0, 255),
        nase = random(-20, 20),
        hut = random(-20, 35),
        mund = random(-100, 50),
        z1 = random(0, 1),
        z2 = random(0, 1),
        z3 = random(0, 1),
        z4 = random(0, 1),
        haare = random(0, 1),
        blinzeln = random(0, 1)
    ) {
        this._LR = LR;
        this._OU = OU;
        this._r = r;
        this._g = g;
        this._b = b;
        this._nase = nase;
        this._hut = hut;
        this._mund = mund;
        this._z1 = z1;
        this._z2 = z2;
        this._z3 = z3;
        this._z4 = z4;
        this._haare = haare;
        this._blinzeln = blinzeln;
        this._x = x;
        this._y = y;
        this._velX = velX;
        this._velY = velY;
        this._scale = scale;
    }

    get scale() {
        return this._scale;
    }

    set scale(value) {
        this._scale = value;
    }

    get velX() {
        return this._velX;
    }

    set velX(value) {
        this._velX = value;
    }

    get velY() {
        return this._velY;
    }

    set velY(value) {
        this._velY = value;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get LR() {
        return this._LR;
    }

    set LR(value) {
        this._LR = value;
    }

    get OU() {
        return this._OU;
    }

    set OU(value) {
        this._OU = value;
    }

    get r() {
        return this._r;
    }

    set r(value) {
        this._r = value;
    }

    get g() {
        return this._g;
    }

    set g(value) {
        this._g = value;
    }

    get b() {
        return this._b;
    }

    set b(value) {
        this._b = value;
    }

    get nase() {
        return this._nase;
    }

    set nase(value) {
        this._nase = value;
    }

    get hut() {
        return this._hut;
    }

    set hut(value) {
        this._hut = value;
    }

    get mund() {
        return this._mund;
    }

    set mund(value) {
        this._mund = value;
    }

    get z1() {
        return this._z1;
    }

    set z1(value) {
        this._z1 = value;
    }

    get z2() {
        return this._z2;
    }

    set z2(value) {
        this._z2 = value;
    }

    get z3() {
        return this._z3;
    }

    set z3(value) {
        this._z3 = value;
    }

    get z4() {
        return this._z4;
    }

    set z4(value) {
        this._z4 = value;
    }

    get haare() {
        return this._haare;
    }

    set haare(value) {
        this._haare = value;
    }

    get blinzeln() {
        return this._blinzeln;
    }

    set blinzeln(value) {
        this._blinzeln = value;
    }

    render() {
        push();

        translate(this.x, this.y);
        scale(this.scale);

        const hautfarbe = color('#FFCC99');
        const hautfarbe2 = color('#FEB186');
        const augenfarbe = color('green');
        const mundfarbe = color('darkred');

        // Random Farbe
        const hutfarbe = color(this._r, this._g, this._b);

        noStroke();
        // Ohren
        fill(hautfarbe2);
        ellipse(-10, 100, 30, 100);
        ellipse(210, 100, 30, 100);
        // Hals
        fill(hautfarbe);
        rect(50, 200, 100, 60);
        // Gesicht
        fill(hautfarbe);
        ellipse(100, 100, 220, 280);
        if (this._blinzeln > 0.9) {
            stroke(0);
            // Auge links geschlossen
            fill(255);
            ellipse(50, 50, 40, 0);
            // Auge rechts geschlossen
            fill(255);
            ellipse(150, 50, 40, 0);
            noStroke();
        } else {
            // Auge links geoeffnet
            fill(255);
            ellipse(50, 50, 40);
            fill(augenfarbe);
            ellipse(50 + this._LR, 50 + this._OU, 20);
            fill(0);
            ellipse(50 + this._LR, 50 + this._OU, 10);
            // Auge rechts geoeffnet
            fill(255);
            ellipse(150, 50, 40);
            fill(augenfarbe);
            ellipse(150 + this._LR, 50 + this._OU, 20);
            fill(0);
            ellipse(150 + this._LR, 50 + this._OU, 10);
        }
        // Nase
        fill(hautfarbe2);
        triangle(100, 75 + this._nase, 75, 110 + this._nase, 125, 110 + this._nase);
        // Mund
        fill(mundfarbe);
        arc(100, 150, 120, this._mund, 0, PI, CHORD);
        // Zaehne
        fill(255);
        if (this._z1 > 0.5) rect(55, 150, 20, 10);
        if (this._z2 > 0.5) rect(80, 150, 20, 10);
        if (this._z3 > 0.5) rect(105, 150, 20, 10);
        if (this._z4 > 0.5) rect(130, 150, 20, 10);
        // Hut
        if (this._haare > 0.1) {
            fill(hutfarbe);
            rect(0, -30 + this._hut, 200, 40, 20);
            rect(25, -100 + this._hut, 150, 80, 10);
        } else {
            strokeWeight(2);
            stroke(0);
            line(110, -20, 105, -50);
            line(100, -20, 105, -50);
        }

        pop();
    }

}