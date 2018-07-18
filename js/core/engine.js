import Camera from "./camera.js";

export default class Engine {
    constructor(graphics) {
        this.graphics = graphics;        
        this.game     = null;
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
        this.tick(0);
    }
    tick(elapsed) {
        if (this.game.update) {
            this.game.update(elapsed);
        }
        if (this.game.draw(this.graphics, elapsed)) {
            this.game.draw(this.graphics, elapsed);
        }
        requestAnimationFrame(x => this.tick(x));        
    }

    resize() {
        this.graphics.setSize(window.innerWidth, window.innerHeight);        
        Camera.main.viewport.w = window.innerWidth;
        Camera.main.viewport.h = window.innerHeight;
    }
}