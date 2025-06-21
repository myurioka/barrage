import { Game } from './game.js';
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const fps = 60;
    let now = 0;
    let last_frame = Date.now();
    let frame = 0;
    let done = false;
    const game = new Game();
    canvas.addEventListener('touchmove', (event) => {
        const allTouches = event.touches;
        if (allTouches.length > 0) {
            const firstTouch = allTouches[0];
            const mouse_x = firstTouch.clientX;
            game.ship.move(mouse_x);
        }
    });
    canvas.addEventListener('mousedown', (event) => {
        game.shot();
    });
    canvas.addEventListener('mousemove', (event) => {
        const mouse_x = event.offsetX;
        game.ship.move(mouse_x);
    });
    function step() {
        let timestamp = new Date().getTime();
        let delta = Math.floor(timestamp - last_frame);
        while (delta >= 0) {
            game.update();
            delta -= 1000.0 / fps;
        }
        game.draw(canvas);
        last_frame = timestamp;
        frame += 1;
        if (!done) {
            window.requestAnimationFrame(step);
        }
    }
    window.requestAnimationFrame(step);
});
//# sourceMappingURL=index.js.map