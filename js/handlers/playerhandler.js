import Player from "../models/player.js";

export default class PlayerHandler {
    constructor() {
        this.players = [];
    }

    update(elapsed) {
        this.players.forEach(x => x.update(elapsed));
    }

    draw(gfx) {
        this.players.forEach(x => x.draw(gfx));
    }

    get(username) {
        return this.players.find(x => x.info.username == username);
    }

    add(playerInfo) {
        const player = new Player(playerInfo);
        this.players.push(player);
        return player;
    }
    remove(username) {
        this.players = this.players.filter(x => x.info.username !== username);
    }
}