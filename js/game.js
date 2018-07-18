import GameClient from "./network/gameclient.js";
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

    drawStartingMessage(gfx) {
        const text = 'Tap anywhere to play!'
        const size = 32
        const metrics = gfx.measureString(text, size)

        gfx.drawString(
            text,
            (window.innerWidth / 2) - (metrics.width / 2),
            window.innerHeight / 2,
            '#ffffff',
            size
        )
    }

    draw(gfx, elapsed) {
        this.drawTerrain(gfx)
        this.drawStartingMessage(gfx)
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