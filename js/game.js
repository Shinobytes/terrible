import GameClient from "./network/gameclient.js";

export default class Game {
    constructor() {    
        this.client = new GameClient();
    }

    draw(gfx, elapsed) {
        gfx.clear("#333");
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