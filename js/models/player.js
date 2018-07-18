import Camera from "../core/camera.js";

export default class Player {
    constructor(playerInfo) {
        this.info = playerInfo;
        this.sprite = null;
        this.isMe = false;
    }

    update(elapsed) {
        // do magic stuff here, like ensure we play our animations or whatever.
    }

    draw(gfx) {
        if (this.sprite.ready) {

            const {
                x,
                y
            } = this.getScreenPosition(gfx);

            gfx.drawSprite(this.sprite, x, y);

            const metric = gfx.measureString(this.info.username, 14, "Arial");
            gfx.drawString(this.info.username, x + (this.sprite.width / 2) - metric.width / 2, y - 5, "white", 14, "Arial");
        }
    }

    moveTo(x, y) {
        this.info.x = x;
        this.info.y = y;
    }

    getWorldPosition() {
        return {
            x: this.info.x,
            y: this.info.y
        };
    }

    getScreenPosition(gfx) {
        return {
            x: Camera.main.viewport.x + this.info.x,
            y: Camera.main.viewport.y + this.info.y
        };
    }
}