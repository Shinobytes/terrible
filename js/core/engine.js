export default class Engine {
    constructor(graphics) {
        this.graphics = graphics;        
        this.game     = null;
    }
    run(game) {
        this.game = game;
        this.graphics.setSize(window.innerWidth, window.innerHeight);
        window.addEventListener("resize", () => {
            this.graphics.setSize(window.innerWidth, window.innerHeight);
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
}