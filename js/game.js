import Sprite from "./core/gfx/sprite.js";
import GameClient from "./network/gameclient.js";
import TiledSprite from './core/gfx/tiledsprite.js'

export default class Game {
    constructor() {
        this.client = new GameClient();
        this.terrain = {
            grass: TiledSprite.fromUrl('/assets/sprites/tiles/grass.png')
        }
    }

    drawTerrain(gfx) {
        const grass = this.terrain.grass

        grass.x = 0
        grass.y = 0
        grass.rows = 30
        grass.columns = 30

        if (grass.ready) return gfx.drawSprite(grass)
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