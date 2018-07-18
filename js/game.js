import GameClient from "./network/gameclient.js";
import Sprite from "./core/gfx/sprite.js";

export default class Game {
    constructor() {
        this.client = new GameClient();
        this.logo = Sprite.fromUrl("/img/logo.png");
    }

    draw(gfx, elapsed) {
        gfx.clear("#333");

        if (this.logo.ready) {
            this.logo.x = gfx.width / 2 - this.logo.width / 2;
            this.logo.y = 20;
            gfx.drawSprite(this.logo);
        } else {
            gfx.drawString("Loading logo...", gfx.width / 2, 20, "white");
        }
    }

    update(elapsed) {

    }

    keydown(evt) {
        // console.log("key down");
    }

    keyup(evt) {
        // console.log("key up");
    }
}