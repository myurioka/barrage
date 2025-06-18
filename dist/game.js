const CANVAS_WIDTH = 800; // CANVAS WIDTH
const CANVAS_HEIGHT = 1000; // CNAVAS HEIGHT
const BOSS_WIDTH = 225; // ENEMY BOSS WIDTH for hit judgement
const BOSS_HEIGHT = 225; // ENEMY BOSS HEIGHT for hit judgement
const BOSS_MAX_HP = 999; // ENEMY BOSS MAX Helath Point
const MAX_BULLET_NUMBER = 500; // Number of BULLETS:w
const MAX_SHOT_NUMBER = 100;
const BULLET_WIDTH = 28;
const BULLET_HEIGHT = 28;
const BULLET_STRENGTH = 2;
const SHIP_WIDTH = 44;
const SHIP_HEIGHT = 50;
const SHIP_STEP = 1;
const SHOT_WIDTH = 5;
const SHOT_HEIGHT = 5;
const SHOT_SPEED = 10;
const SUPER_SHOT_WIDTH = 100;
const SUPER_SHOT_HEIGHT = 40;
const SUPER_WAIT_TIME = 100; // enery chage time
const SUPER_TIME = 200; // super mode time
const LIMIT_TIME = 59; // second time
const DEFAULT_COLOR = 'rgba(0,128, 0, 1.0)';
const LIGHT_GREEN_COLOR = 'rgba(226,238,197,1.0)';
const GREEN_DARK_LIGHT = 'rgba(17,31,17,1.0)';
const LIGHT_YELLOR_GREEN = 'rgba(168,230,207,1.0)';
var Stage;
(function (Stage) {
    Stage[Stage["openning"] = 0] = "openning";
    Stage[Stage["playing"] = 1] = "playing";
    Stage[Stage["gameover"] = 2] = "gameover";
    Stage[Stage["gameclear"] = 3] = "gameclear";
})(Stage || (Stage = {}));
function overap(t, s) {
    if (Math.max(t.x, s.x) < Math.min(t.x + t.w, s.x + s.w) &&
        Math.max(t.y, s.y) < Math.min(t.y + t.h, s.y + s.h)) {
        return true;
    }
    else {
        return false;
    }
}
export class Shot {
    x;
    y;
    dx;
    dy;
    w;
    h;
    hp;
    constructor(x, y, dx, dy, w, h, hp) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.w = w;
        this.h = h;
        this.hp = hp;
    }
    update() {
        this.y -= this.dy;
    }
    exit() {
        if (this.y < 0) {
            return true;
        }
        return false;
    }
    hit(obj) {
        if (overap(this, obj)) {
            return true;
        }
        return false;
    }
    draw(ctx) {
        let _x = this.x - SHOT_WIDTH / 2;
        let _y = this.y;
        {
            ctx.beginPath();
            ctx.fillStyle = DEFAULT_COLOR;
            ctx.moveTo(_x, _y - SHOT_HEIGHT);
            ctx.lineTo(_x + SHOT_WIDTH, _y - SHOT_HEIGHT);
            ctx.lineTo(_x + SHOT_WIDTH, _y);
            ctx.lineTo(_x, _y);
            ctx.closePath();
            ctx.fill();
        }
    }
}
class ShotArray extends Array {
    concat(that) {
        return super.concat.bind(this)(that);
    }
}
// SuperShot
export class SuperShot extends Shot {
    constructor(x, y, dx, dy, w, h, hp) {
        super(x, y, dx, dy, w, h, hp);
    }
    draw(ctx) {
        let _x = this.x - SUPER_SHOT_WIDTH / 2;
        let _y = this.y;
        {
            ctx.beginPath();
            ctx.fillStyle = DEFAULT_COLOR;
            ctx.moveTo(_x, _y - SUPER_SHOT_HEIGHT);
            ctx.lineTo(_x + SUPER_SHOT_WIDTH, _y - SUPER_SHOT_HEIGHT);
            ctx.lineTo(_x + SUPER_SHOT_WIDTH, _y);
            ctx.lineTo(_x, _y);
            ctx.closePath();
            ctx.fill();
        }
    }
}
// Star Ship
class Ship {
    x;
    y;
    dx;
    dy;
    w;
    h;
    hp;
    mouse_x;
    constructor(x, y, dx, dy, w, h, hp, mouse_x) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.w = w;
        this.h = h;
        this.hp = hp;
        this.mouse_x = mouse_x;
    }
    move(offset_x) {
        this.mouse_x = offset_x;
    }
    exit() {
        return false;
    }
    hit(obj) {
        if (overap(this, obj)) {
            return true;
        }
        return false;
    }
    update() {
        if (this.mouse_x < this.x) {
            this.x -= this.dx;
        }
        else if (this.mouse_x > this.x + SHIP_WIDTH) {
            this.x += this.dx;
        }
    }
    // draw ship
    draw(ctx) {
        draw_ship(this.x, this.y, ctx);
    }
}
class SuperShip extends Ship {
    constructor(x, y, dx, dy, w, h, hp, mx) {
        super(x, y, dx, dy, w, h, hp, mx);
    }
    draw(ctx) {
        let _x = this.x;
        let _y = this.y;
        {
            ctx.beginPath();
            ctx.fillStyle = LIGHT_YELLOR_GREEN;
            ctx.moveTo(17.0 + _x, 0.0 + _y);
            ctx.lineTo(25.0 + _x, 0.0 + _y);
            ctx.lineTo(25.0 + _x, 17.0 + _y);
            ctx.lineTo(30.0 + _x, 17.0 + _y);
            ctx.lineTo(30.0 + _x, 26.0 + _y);
            ctx.lineTo(42.0 + _x, 47.0 + _y);
            ctx.lineTo(0.0 + _x, 47.0 + _y);
            ctx.lineTo(12.0 + _x, 26.0 + _y);
            ctx.lineTo(12.0 + _x, 17.0 + _y);
            ctx.lineTo(17.0 + _x, 17.0 + _y);
            ctx.closePath();
            ctx.fill();
        }
        {
            ctx.beginPath();
            ctx.fillStyle = DEFAULT_COLOR;
            ctx.moveTo(17.0 + _x, 27.0 + _y);
            ctx.lineTo(24.0 + _x, 27.0 + _y);
            ctx.lineTo(24.0 + _x, 45.0 + _y);
            ctx.lineTo(17.0 + _x, 45.0 + _y);
            ctx.closePath();
            ctx.fill();
        }
        {
            ctx.beginPath();
            ctx.fillStyle = LIGHT_GREEN_COLOR;
            ctx.moveTo(11.0 + _x, 47.0 + _y);
            ctx.lineTo(17.0 + _x, 47.0 + _y);
            ctx.lineTo(14.0 + _x, 56.0 + _y);
            ctx.closePath();
            ctx.fill();
        }
        {
            ctx.beginPath();
            ctx.fillStyle = LIGHT_GREEN_COLOR;
            ctx.moveTo(26.0 + _x, 47.0 + _y);
            ctx.lineTo(32.0 + _x, 47.0 + _y);
            ctx.lineTo(29.0 + _x, 56.0 + _y);
            ctx.closePath();
            ctx.fill();
        }
    }
}
// Bullet
class Bullet {
    x;
    y;
    dx;
    dy;
    w;
    h;
    hp;
    constructor(x, y, dx, dy, w, h, hp) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.w = w;
        this.h = h;
        this.hp = hp;
    }
    hit(obj) {
        if (overap(this, obj)) {
            this.hp -= 1;
            return true;
        }
        return false;
    }
    exit() {
        if (this.x + BULLET_WIDTH > CANVAS_WIDTH) {
            return true;
        }
        if (this.x < 0) {
            return true;
        }
        if (this.y > CANVAS_HEIGHT) {
            return true;
        }
        if (this.y < 0) {
            return true;
        }
        return false;
    }
    update() {
        this.x += this.dx;
        this.y += this.dy;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = DEFAULT_COLOR;
        ctx.beginPath();
        ctx.arc(this.x + BULLET_WIDTH / 2, this.y + BULLET_WIDTH / 2, BULLET_WIDTH / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = LIGHT_GREEN_COLOR;
        ctx.arc(this.x + BULLET_WIDTH / 2, this.y + BULLET_WIDTH / 2, BULLET_WIDTH / 4, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}
class BulletArray extends Array {
    concat(that) {
        return super.concat.bind(this)(that);
    }
}
// Boss
class Boss {
    x;
    y;
    dx;
    dy;
    w;
    h;
    hp;
    d; // 0: left, 1:right
    constructor(x, y, dx, dy, w, h, hp) {
        this.x = x;
        this.y = y;
        (this.dx = dx), (this.dy = dy), (this.w = w), (this.h = h), (this.hp = hp), (this.d = 1);
    }
    update() {
        // direction
        if (this.x < 0.0 && this.d === -1) {
            this.d = 1;
        }
        if (this.x > CANVAS_WIDTH - BOSS_WIDTH && this.d === 1) {
            this.d = -1;
        }
        this.x += this.d * this.dx;
    }
    hit(obj) {
        if (overap(this, obj)) {
            return true;
        }
        return false;
    }
    draw(ctx) {
        // display: boss hp
        {
            let _txt = `${this.hp} / ${BOSS_MAX_HP}`;
            ctx.font = '12px myfont';
            ctx.fillStyle = LIGHT_GREEN_COLOR;
            ctx.fillText(_txt, this.x + 70.0, this.y - 10.0);
        }
        draw_boss(this.x, this.y, ctx);
    }
}
class BossArray extends Array {
    concat(that) {
        return super.concat.bind(this)(that);
    }
}
export class Game {
    stage;
    shooting; // true: shut false: unshot
    wait_time;
    super_time;
    ship;
    bosses;
    bullets;
    shots;
    startsecondtime;
    startminisecondtime;
    passedsecondtime;
    passedminisecondtime;
    constructor() {
        this.stage = Stage.openning;
        this.shooting = false;
        this.wait_time = 0;
        this.super_time = 0;
        this.ship = new Ship(CANVAS_WIDTH / 2 - SHIP_WIDTH / 2, CANVAS_HEIGHT - SHIP_HEIGHT - 10.0, SHIP_STEP, 0, SHIP_WIDTH, SHIP_HEIGHT, 1, CANVAS_WIDTH / 2 - SHIP_WIDTH / 2);
        this.bosses = new BossArray();
        this.bullets = new BulletArray();
        this.shots = new ShotArray();
        this.startsecondtime = Date.now() / 1000;
        this.startminisecondtime = Date.now();
        this.passedsecondtime = this.startminisecondtime;
        this.passedminisecondtime = this.startminisecondtime;
    }
    reset() {
        this.stage = Stage.openning;
        this.shooting = false;
        this.ship = new Ship(CANVAS_WIDTH / 2 - SHIP_WIDTH / 2, CANVAS_HEIGHT - SHIP_HEIGHT - 10.0, SHIP_STEP, 0, SHIP_WIDTH, SHIP_HEIGHT, 1, CANVAS_WIDTH / 2 - SHIP_WIDTH / 2);
        this.bosses = new Array();
        let _boss = new Boss(180, 60, 1, 0, BOSS_WIDTH, BOSS_HEIGHT, BOSS_MAX_HP);
        this.bosses.push(_boss);
        this.shooting = false;
        this.wait_time = 0;
        this.super_time = 0;
        this.bullets = new BulletArray();
        this.shots = new ShotArray();
        this.startsecondtime = Date.now() / 1000;
        this.startminisecondtime = Date.now();
        this.passedsecondtime = this.startminisecondtime;
        this.passedminisecondtime = this.startminisecondtime;
    }
    update() {
        switch (this.stage) {
            case Stage.openning:
            case Stage.gameover:
            case Stage.gameclear:
                break;
            case Stage.playing:
                // passed time
                this.passedsecondtime = Date.now() / 1000 - this.startsecondtime;
                this.passedminisecondtime = Date.now() - this.startminisecondtime;
                // Game Over
                if (this.passedsecondtime >= LIMIT_TIME) {
                    this.stage = Stage.gameover;
                    break;
                }
                // bullet create
                if (this.bullets.length < MAX_BULLET_NUMBER) {
                    const _x = this.bosses[0].x + BOSS_WIDTH / 2 - BULLET_WIDTH / 2;
                    const _y = this.bosses[0].y + BOSS_WIDTH / 2 - BULLET_WIDTH / 2;
                    let dx = (Math.random() - 0.5) * 4;
                    let dy = (Math.random() - 0.5) * 4;
                    let _bullet = new Bullet(_x, _y, dx, dy, BULLET_WIDTH, BULLET_HEIGHT, BULLET_STRENGTH);
                    this.bullets.push(_bullet);
                }
                // bullet update
                for (let i = 0; i < this.bullets.length; i++) {
                    this.bullets[i].update();
                    if (this.bullets[i].exit() || this.bullets[i].hp <= 0) {
                        this.bullets.splice(i, 1);
                    }
                }
                // shot create
                if (this.shooting == true) {
                    const _x = this.ship.x + SHIP_WIDTH / 2;
                    const _y = this.ship.y;
                    let _shot = new Shot(_x, _y, 0, SHOT_SPEED, SHOT_WIDTH, SHOT_HEIGHT, 1);
                    if (this.super_time > 0) {
                        _shot = new SuperShot(_x, _y, 0, SHOT_SPEED, SUPER_SHOT_WIDTH, SUPER_SHOT_HEIGHT, 3);
                        this.super_time -= 1;
                    }
                    this.shots.push(_shot);
                }
                // shots update
                for (let i = 0; i < this.shots.length; i++) {
                    this.shots[i].update();
                    if (this.shots[i].exit() || this.shots[i].hp <= 0) {
                        this.shots.splice(i, 1);
                    }
                }
                // hit judgement bullets x ship
                for (let i = 0; i < this.bullets.length; i++) {
                    if (this.bullets[i].hit(this.ship)) {
                        this.stage = Stage.gameover;
                    }
                }
                // hit judgement shots x bullets
                for (let i = 0; i < this.bullets.length; i++) {
                    for (let j = 0; j < this.shots.length; j++) {
                        if (this.bullets[i].hit(this.shots[j])) {
                            this.shots[j].hp -= 1;
                            this.bullets[i].hp -= 1;
                        }
                    }
                }
                // hit judgement shots x boss
                for (let i = 0; i < this.bosses.length; i++) {
                    for (let j = 0; j < this.shots.length; j++) {
                        if (this.bosses[i].hit(this.shots[j])) {
                            this.shots[j].hp -= 1;
                            this.bosses[i].hp -= 1;
                        }
                    }
                }
                // ship update
                this.ship.update();
                // boss update
                this.bosses[0].update();
                if (this.bosses[0].hp <= 0) {
                    this.bosses.splice(0, 1);
                    // Game Clear
                    if (this.bosses.length == 0) {
                        this.stage = Stage.gameclear;
                    }
                }
                // not shooting
                if (this.shooting == false && this.super_time == 0) {
                    this.wait_time += 1;
                }
                if (this.wait_time > SUPER_WAIT_TIME) {
                    this.super_time = SUPER_TIME;
                    if (!(this.ship instanceof SuperShip)) {
                        this.ship = new SuperShip(this.ship.x, this.ship.y, this.ship.dx, this.ship.dy, this.ship.w, this.ship.h, this.ship.hp, this.ship.mouse_x);
                    }
                }
                if (this.super_time == 1) {
                    this.ship = new Ship(this.ship.x, this.ship.y, this.ship.dx, this.ship.dy, this.ship.w, this.ship.h, this.ship.hp, this.ship.mouse_x);
                }
                if (this.shooting == true) {
                    this.wait_time = 0;
                }
                break;
        }
    }
    draw(canvas) {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        switch (this.stage) {
            case Stage.openning:
                // Draw Title
                draw_boss(130, 20, ctx);
                ctx.font = '60px myfont';
                ctx.fillText('BARRAGE', 220, 360);
                ctx.fillStyle = DEFAULT_COLOR;
                ctx.font = '28px myfont';
                ctx.fillText('Click Start', 300, 420);
                draw_ship(CANVAS_WIDTH / 2 - SHIP_WIDTH / 2, CANVAS_HEIGHT - SHIP_HEIGHT - 10.0, ctx);
                break;
            case Stage.gameover:
                // Draw Title
                ctx.font = '60px myfont';
                ctx.fillText('GAME OVER', 180, 360);
                ctx.font = '28px myfont';
                ctx.fillStyle = DEFAULT_COLOR;
                ctx.fillText('Click ReStart', 300, 420);
                break;
            case Stage.gameclear:
                // Draw Title
                ctx.font = '60px myfont';
                ctx.fillText('GAME CLEAR', 180, 360);
                ctx.fillStyle = DEFAULT_COLOR;
                ctx.font = '28px myfont';
                ctx.fillText('Congratuations!', 300, 420);
                const _sec_str = Math.trunc(this.passedsecondtime).toString();
                ctx.fillText(Math.trunc(this.passedsecondtime).toString() + ' sec.', 200, 480);
                break;
            case Stage.playing:
                // Draw boss
                this.bosses[0].draw(ctx);
                // Draw bullets
                for (let i = 0; i < this.bullets.length; i++) {
                    this.bullets[i].draw(ctx);
                }
                // Draw shot
                for (let i = 0; i < this.shots.length; i++) {
                    this.shots[i].draw(ctx);
                }
                // Draw ship
                this.ship.draw(ctx);
                // Draw Time
                ctx.font = '28px myfont';
                ctx.fillStyle = LIGHT_GREEN_COLOR;
                let _str = this.getpassedtime();
                ctx.fillText(_str, 30, 50);
                // Draw Number of Bullets
                ctx.font = '18px myfont';
                ctx.fillStyle = DEFAULT_COLOR;
                ctx.fillStyle = LIGHT_GREEN_COLOR;
                let _bullet_number = this.bullets.length.toString();
                ctx.fillText('Bullets: ' + _bullet_number, 30, 90);
        }
    }
    // time
    getpassedtime() {
        const _sec_str = Math.trunc(this.passedsecondtime).toString();
        const _minisec = this.passedminisecondtime.toString();
        const _minisec_str = ('00' + _minisec).slice(-2);
        return _sec_str + '.' + _minisec_str;
    }
    // click
    shot() {
        switch (this.stage) {
            case Stage.gameclear:
                this.stage = Stage.playing;
                this.reset();
                break;
            case Stage.gameover:
                this.reset();
                break;
            case Stage.openning:
                // create boss
                if (this.bosses.length === 0) {
                    let _boss = new Boss(180, 60, 1, 0, BOSS_WIDTH, BOSS_HEIGHT, BOSS_MAX_HP);
                    this.bosses.push(_boss);
                }
                this.stage = Stage.playing;
                break;
            case Stage.playing:
                this.wait_time = 0;
                this.shooting = this.shooting ? false : true;
                break;
            default:
                break;
        }
    }
}
/*
 * called for each animation frame.
 */
function draw_boss(x, y, ctx) {
    {
        ctx.beginPath();
        ctx.fillStyle = GREEN_DARK_LIGHT;
        ctx.moveTo(55.0 + x, 0.0 + y);
        ctx.lineTo(165.0 + x, 0.0 + y);
        ctx.lineTo(225.0 + x, 60.0 + y);
        ctx.lineTo(225.0 + x, 160.0 + y);
        ctx.lineTo(160.0 + x, 225.0 + y);
        ctx.lineTo(55.0 + x, 225.0 + y);
        ctx.lineTo(0.0 + x, 160.0 + y);
        ctx.lineTo(0.0 + x, 60.0 + y);
        ctx.closePath();
        ctx.fill();
    }
    {
        ctx.beginPath();
        ctx.fillStyle = GREEN_DARK_LIGHT;
        ctx.moveTo(55.0 + x, 30.0 + y);
        ctx.lineTo(165.0 + x, 30.0 + y);
        ctx.lineTo(195.0 + x, 60.0 + y);
        ctx.lineTo(195.0 + x, 160.0 + y);
        ctx.lineTo(160.0 + x, 195.0 + y);
        ctx.lineTo(55.0 + x, 195.0 + y);
        ctx.lineTo(26.0 + x, 160.0 + y);
        ctx.lineTo(26.0 + x, 60.0 + y);
        ctx.closePath();
        ctx.stroke();
    }
    {
        ctx.beginPath();
        ctx.strokeStyle = DEFAULT_COLOR;
        ctx.lineWidth = 2.0;
        ctx.moveTo(85.0 + x, 85.0 + y);
        ctx.lineTo(140.0 + x, 85.0 + y);
        ctx.lineTo(140.0 + x, 140.0 + y);
        ctx.lineTo(85.0 + x, 140.0 + y);
        ctx.closePath();
        ctx.stroke();
    }
    {
        ctx.beginPath();
        ctx.fillStyle = DEFAULT_COLOR;
        ctx.arc(112.0 + x, 112.0 + y, 25.0, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }
    {
        ctx.beginPath();
        ctx.fillStyle = LIGHT_GREEN_COLOR;
        ctx.arc(112.0 + x, 112.0 + y, 20.0, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }
    {
        ctx.beginPath();
        ctx.fillStyle = DEFAULT_COLOR;
        ctx.lineWidth = 2.0;
        ctx.moveTo(72.0 + x, 40.0 + y);
        ctx.lineTo(152.0 + x, 40.0 + y);
        ctx.lineTo(140.0 + x, 80.0 + y);
        ctx.lineTo(84.0 + x, 80.0 + y);
        ctx.closePath();
        ctx.fill();
    }
    {
        ctx.beginPath();
        ctx.fillStyle = DEFAULT_COLOR;
        ctx.lineWidth = 2.0;
        ctx.moveTo(84.0 + x, 145.0 + y);
        ctx.lineTo(140.0 + x, 145.0 + y);
        ctx.lineTo(152.0 + x, 180.0 + y);
        ctx.lineTo(72.0 + x, 180.0 + y);
        ctx.closePath();
        ctx.fill();
    }
    {
        ctx.beginPath();
        ctx.fillStyle = DEFAULT_COLOR;
        ctx.lineWidth = 2.0;
        ctx.moveTo(147.0 + x, 85.0 + y);
        ctx.lineTo(183.0 + x, 70.0 + y);
        ctx.lineTo(183.0 + x, 155.0 + y);
        ctx.lineTo(147.0 + x, 140.0 + y);
        ctx.closePath();
        ctx.fill();
    }
    {
        ctx.beginPath();
        ctx.fillStyle = DEFAULT_COLOR;
        ctx.lineWidth = 2.0;
        ctx.moveTo(80.0 + x, 85.0 + y);
        ctx.lineTo(80.0 + x, 140.0 + y);
        ctx.lineTo(40.0 + x, 155.0 + y);
        ctx.lineTo(40.0 + x, 70.0 + y);
        ctx.closePath();
        ctx.fill();
    }
}
function draw_ship(x, y, ctx) {
    ctx.beginPath();
    ctx.fillStyle = DEFAULT_COLOR;
    ctx.moveTo(17.0 + x, 0.0 + y);
    ctx.lineTo(25.0 + x, 0.0 + y);
    ctx.lineTo(25.0 + x, 17.0 + y);
    ctx.lineTo(30.0 + x, 17.0 + y);
    ctx.lineTo(30.0 + x, 26.0 + y);
    ctx.lineTo(42.0 + x, 47.0 + y);
    ctx.lineTo(0.0 + x, 47.0 + y);
    ctx.lineTo(12.0 + x, 26.0 + y);
    ctx.lineTo(12.0 + x, 17.0 + y);
    ctx.lineTo(17.0 + x, 17.0 + y);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = LIGHT_YELLOR_GREEN;
    ctx.moveTo(17.0 + x, 27.0 + y);
    ctx.lineTo(24.0 + x, 27.0 + y);
    ctx.lineTo(24.0 + x, 45.0 + y);
    ctx.lineTo(17.0 + x, 45.0 + y);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = LIGHT_GREEN_COLOR;
    ctx.moveTo(11.0 + x, 47.0 + y);
    ctx.lineTo(17.0 + x, 47.0 + y);
    ctx.lineTo(14.0 + x, 56.0 + y);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = LIGHT_GREEN_COLOR;
    ctx.moveTo(26.0 + x, 47.0 + y);
    ctx.lineTo(32.0 + x, 47.0 + y);
    ctx.lineTo(29.0 + x, 56.0 + y);
    ctx.closePath();
    ctx.fill();
}
//# sourceMappingURL=game.js.map