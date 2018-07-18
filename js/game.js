import Sprite from "./core/gfx/sprite.js";
import GameClient from "./network/gameclient.js";
import TiledSprite from './core/gfx/tiledsprite.js'
import TerrainsCollection from './core/gfx/collections/terrains.js'

export default class Game {
    constructor() {
        this.client = new GameClient();
        this.terrains = new TerrainsCollection()
    }

    drawTerrain(gfx) {
        const grass = this.terrains.grass

        grass.x = 0
        grass.y = 0
        grass.rows = window.innerWidth / 10
        grass.columns = window.innerHeight / 10

        if (grass.ready) return gfx.drawSprite(grass)
    }

    draw(gfx, elapsed) {
        this.drawTerrain(gfx)
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