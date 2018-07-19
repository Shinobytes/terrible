import Appearance from "./appearance.js";

export default class PlayerInfo {
    constructor(username, level, exp, x, y, appearance) {
        this.username = username;
        this.level = level;
        this.experience = exp;
        this.x = x;
        this.y = y;
        this.appearance = appearance;
    }
}