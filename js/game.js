import GameClient from "./network/gameclient.js";
import TerrainsCollection from './core/gfx/collections/terrains.js'
import CharactersCollection from './core/gfx/collections/characters.js'

import Player from "./models/player.js";
import PlayerHandler from "./handlers/playerhandler.js";
import Camera from "./core/camera.js";

export default class Game {
    constructor(engine, settings) {
        this.settings = settings;
        this.engine = engine;
        this.client = new GameClient(this);
        this.terrains = new TerrainsCollection()
        this.heroes = new CharactersCollection().heroes

        this.players = new PlayerHandler();
        this.player = null;
    }

    drawTerrain(gfx) {
        const grass = this.terrains.grass

        if (this.client.authenticated) {
            grass.rows = 45; // window.innerWidth / 10
            grass.columns = 45; // window.innerHeight / 10
            grass.x = Camera.main.viewport.x - ((grass.columns / 2) * grass.width)
            grass.y = Camera.main.viewport.y - ((grass.rows / 2) * grass.height)
        } else {
            grass.rows = window.innerWidth / 10
            grass.columns = window.innerHeight / 10
            grass.x = 0
            grass.y = 0
        }        
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

        // const Hiro = this.heroes.Hiro        
        // if (Hiro.ready) { gfx.drawSprite(Hiro) }

        // draw us
        // if (this.player) {
        //     this.player.draw(gfx);
        // }

        // draw other players
        this.players.draw(gfx);
    }

    draw(gfx, elapsed) {
        this.drawTerrain(gfx)
        if (!this.client.authenticated) return this.drawStartingMessage(gfx)

        this.drawCharacters(gfx)
    }

    update(elapsed) {
        // update others
        this.players.update(elapsed);

        if (this.player) {
            Camera.main.viewport.x = -this.player.x + (Camera.main.viewport.w / 2);
            Camera.main.viewport.y = -this.player.y + (Camera.main.viewport.h / 2);
            // this.player.update(elapsed);
        }
    }

    mousedown(evt) {
        if (this.client.authenticated) {

            const screen = this.player.getScreenPosition();
            const xOffset = screen.x - this.engine.mouse.x;
            const yOffset = screen.y - this.engine.mouse.y;
            
            const worldX = parseInt(this.player.x - xOffset);
            const worldY = parseInt(this.player.y - yOffset);
            console.log("moveto (world: " + worldX + ", " + worldY + ") (offset: " + xOffset + ", " + yOffset + ") (player: " + this.player.x + ", " + this.player.y + ")");

            this.player.moveTo(worldX, worldY);
            this.client.moveTo(worldX, worldY);
        }
    }

    mouseup(evt) {
        if (!this.client.authenticated) {
            this.client.loginAsync(this.settings.username, this.settings.password);
            return;
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
        console.log("we got our data!", playerInfo)

        this.player = this.players.me(playerInfo);
    }

    playerAdded(playerInfo) {
        // someone else was added
        console.log("someone just connected!")
        const player = this.players.add(playerInfo);
    }

    playerUpdated(playerInfo) {
        // someone else's position or info was updated
        console.log("someone changed their appearances or something", playerInfo)

        const updatedPlayer = this.players.get(playerInfo.username);
        // updatedPlayer.moveTo(playerInfo.x, playerInfo.y);
    }

    playerPositionUpdated(username, x, y) {
        console.log(`${username} moved to ${x},${y}`);
        const updatedPlayer = this.players.get(username);
        updatedPlayer.moveTo(x, y);
    }

    playerRemoved(username) {
        // someone else was removed
        console.log("someone just left!")
        this.players.remove(username);
    }
}