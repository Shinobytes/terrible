export default class Player {
    constructor(playerInfo) {
        this.info   = playerInfo;
        this.sprite = null;
    }

    update(elapsed) {
        // do magic stuff here, like ensure we play our animations or whatever.
    }

    draw(gfx, elapsed) {
        if (this.sprite.ready) {
            gfx.drawSprite(this.sprite, this.info.x, this.info.y);
        }
    }

    moveTo(x, y) {
        this.info.x = x;
        this.info.y = y;
    }
}