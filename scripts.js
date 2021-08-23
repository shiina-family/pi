const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const R = CANVAS_HEIGHT / 2;

let ctx;
const FPS = 1000;
const TIME = 1;
let total = 0;
let circle = 0;
let In = 0;

function calcPi() {
    let canvasPi = document.getElementById("canvas-pi");

    if (canvasPi.getContext) {
        ctx = canvasPi.getContext("2d");
        canvasPi.width = CANVAS_WIDTH;
        canvasPi.height = CANVAS_HEIGHT;

        draw_init();
        setInterval(draw, TIME);

    }
}

class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    clone() {
        return new Vec2(this.x, this.y);
    }

    static add(v1, v2) {
        return v1.clone().add(v2);
    }
}

let origin = new Vec2(R, R);




function draw() {
    ctx.clearRect(0, 360, CANVAS_WIDTH, 400);

    const tempX = getRandom(200) - 100;
    const tempY = getRandom(200) - 100;

    ctx.fillStyle = "rgb(255,0,0)"
    if ((tempX ** 2) + (tempY ** 2) < 100 ** 2) {
        In++;
        ctx.fillStyle = "rgb(0,0,255)"
        circle++;
    }
    total++;

    const pi = 4 * In / total;

    let v1 = new Vec2(tempX, tempY);
    v1.y *= -1;
    let screen = Vec2.add(v1, origin);
    ctx.fillRect(screen.x, screen.y, 1, 1);

    piValue.innerHTML = pi;
    circleValue.innerHTML = circle;
    totalValue.innerHTML = total;
}

function draw_init() {
    //x軸
    ctx.beginPath();
    ctx.moveTo(0, R);
    ctx.lineTo(CANVAS_WIDTH, R);
    ctx.stroke();
    ctx.font = "20px serif";
    ctx.fillText("x", CANVAS_WIDTH - 20, R + 20);

    //y軸
    ctx.beginPath();
    ctx.moveTo(R, CANVAS_HEIGHT);
    ctx.lineTo(R, 0);
    ctx.stroke();
    ctx.fillText("y", R + 10, 15);

    //原点
    ctx.fillText("O", R - 20, R + 20);

    //四角形
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(100, 300);
    ctx.lineTo(300, 300);
    ctx.lineTo(300, 100);
    ctx.lineTo(100, 100);
    ctx.stroke();

    //円
    let t;
    for (t = 0; t <= 2 * Math.PI; t += 0.01) {
        let v2 = new Vec2(100, t);
        let v1 = new Vec2(v2.x * Math.cos(v2.y), v2.x * Math.sin(v2.y));
        v1.y *= -1;
        let screen = Vec2.add(v1, origin);
        ctx.fillRect(screen.x, screen.y, 1, 1);
    }
}

function getRandom(max) {
    return Math.random() * max;
}