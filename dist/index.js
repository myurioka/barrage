import { Game } from './game.js';
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const SKIP_DRAW_FRAME = 16;
    let last_frame = Date.now();
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
        let delta = timestamp - last_frame;
        while (delta >= 0) {
            game.update();
            delta -= SKIP_DRAW_FRAME;
        }
        game.draw(canvas);
        last_frame = timestamp;
        if (!done) {
            window.requestAnimationFrame(step);
        }
    }
    window.requestAnimationFrame(step);
});
//# sourceMappingURL=index.js.map