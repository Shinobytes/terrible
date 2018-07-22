import Camera from "./camera.js";

export default class Engine {
    constructor(graphics) {
        this.graphics = graphics;
        this.game = null;
        this.mouse = new Mouse();
        this.lastTick = 0;
    }
    run(game) {
        this.game = game;
        this.resize();
        window.addEventListener("resize", () => {
            this.resize();
        });
        window.addEventListener("keydown", (evt) => {
            if (this.game.keydown) {
                this.game.keydown(evt);
            }
        });
        window.addEventListener("keyup", (evt) => {
            if (this.game.keyup) {
                this.game.keyup(evt);
            }
        });
        window.addEventListener("mouseup", (evt) => {
            if (this.game.mouseup) {
                this.game.mouseup(evt);
            }
        });
        window.addEventListener("mousedown", (evt) => {
            if (this.game.mousedown) {
                this.game.mousedown(evt);
            }
        });
        window.addEventListener("mousemove", (evt) => {
            const rect = this.graphics.canvas.getBoundingClientRect();
            this.mouse.x = evt.clientX - rect.left;
            this.mouse.y = evt.clientY - rect.top;
        });
        window.addEventListener("touchmove", (evt) => {
            const rect = this.graphics.canvas.getBoundingClientRect();
            this.mouse.x = evt.touches[0].clientX - rect.left;
            this.mouse.y = evt.touches[0].clientY - rect.top;
        });        
        this.tick(0);
    }
    tick(totalTimeElapsed) {
        this.totalTimeElapsed = totalTimeElapsed;
        const now     = new Date();
        const elapsed = (now - this.lastTick) / 1000;
        if (this.game.update) {
            this.game.update(elapsed);
        }
        if (this.game.draw(this.graphics, elapsed)) {
            this.game.draw(this.graphics, elapsed);
        }
        this.lastTick = now;
        requestAnimationFrame(x => this.tick(x));
    }

    resize() {
        this.graphics.setSize(window.innerWidth, window.innerHeight);
        Camera.main.viewport.w = window.innerWidth;
        Camera.main.viewport.h = window.innerHeight;
    }
}

class Mouse {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}