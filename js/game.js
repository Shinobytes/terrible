import GameClient from "./network/gameclient.js";
import TerrainsCollection from './core/gfx/collections/terrains.js'
import CharactersCollection from './core/gfx/collections/characters.js'

export default class Game {
    constructor(settings) {
        this.settings = settings;
        this.client = new GameClient(this);
        this.terrains = new TerrainsCollection()
        this.heroes = new CharactersCollection().heroes
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

    drawCharacters(gfx) {
        const Hiro = this.heroes.Hiro

        Hiro.x = 0
        Hiro.y = 0

        if (Hiro.ready) {
            gfx.drawSprite(Hiro)
        }
    }

    draw(gfx, elapsed) {
        this.drawTerrain(gfx)
        if (!this.client.authenticated) return this.drawStartingMessage(gfx)

        this.drawCharacters(gfx)
    }

    update(elapsed) {

    }

    mousedown(evt) {

    }

    mouseup(evt) {
        if (!this.client.authenticated) {
            this.client.loginAsync(this.settings.username, this.settings.password);
        }
    }

    keydown(evt) {
        // console.log("key down");
    }

    keyup(evt) {
        // console.log("key up");
    }

    playerDataReceived(playerInfo) {
        // our player data
        console.log("we got our data!")
    }

    playerAdded(playerInfo) {
        // someone else was added
        console.log("someone just connected!")
    }

    playerUpdated(playerInfo) {
        // someone else's position or info was updated
        console.log("someone just moved!")
    }

    playerRemoved(username) {
        // someone else was removed
        console.log("someone just left!")
    }
}