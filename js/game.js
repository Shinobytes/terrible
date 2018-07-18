import GameClient from "./network/gameclient.js";
import Sprite from "./core/gfx/sprite.js";

export default class Game {
    constructor() {
        this.client = new GameClient();
        this.terrains = {
            grass: Sprite.fromUrl('/assets/sprites/tiles/grass.png')
        }
    }

    drawTerrain(gfx) {
        const grass = this.terrains.grass
        if (grass.ready) return gfx.drawSprite(grass, 0, 0)
    }

    async draw(gfx, elapsed) {
        await this.drawTerrain(gfx)
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