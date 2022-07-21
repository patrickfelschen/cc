class Face {
    constructor(LR = random(-7, 7),
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

    render(x = 0, y = 0, s = 1.0) {
        push();
        translate(x, y);
        scale(s);

        const hautfarbe = color('#FFCC99');
        const hautfarbe2 = color('#FEB186');
        const augenfarbe = color('green');
        const mundfarbe = color('darkred');

        // Random Farbe
        colorMode(RGB, 100);
        const hutfarbe = color(this._r, this._g, this._b);

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
            // Auge links geschlossen
            fill(255);
            ellipse(50, 50, 40, 0);
            // Auge rechts geschlossen
            fill(255);
            ellipse(150, 50, 40, 0);
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
        arc(100, 150, 120, 100 + this._mund, 0, PI, CHORD);
        // Zaehne
        fill(255);
        if (this._z1 > 0.5) rect(55, 150, 20, 10);
        if (this._z2 > 0.5) rect(80, 150, 20, 10);
        if (this._z3 > 0.5) rect(105, 150, 20, 10);
        if (this._z4 > 0.5) rect(130, 150, 20, 10);
        // Hut
        if (this._haare > 0.1) {
            strokeWeight(1);
            fill(hutfarbe);
            rect(0, -30 + this._hut, 200, 40, 20);
            rect(25, -100 + this._hut, 150, 80, 10);
        } else {
            strokeWeight(2);
            line(110, -20, 105, -50);
            line(100, -20, 105, -50);
        }

        pop();
    }

}