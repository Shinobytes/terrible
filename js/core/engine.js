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