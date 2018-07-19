import Camera from "../core/camera.js";
import CharacterSprite from "../core/gfx/CharacterSprite.js";

export default class Player {
    constructor(playerInfo) {
        this.info = playerInfo;
        this.character = new CharacterSprite(playerInfo.appearance);
        this.isMe = false;
    }

    update(elapsed) {
        // do magic stuff here, like ensure we play our animations or whatever.        
        this.character.x = this.info.x;
        this.character.y = this.info.y;
        this.character.update(elapsed);
    }

    draw(gfx) {
        const text = this.isMe ? "[Me] " + this.info.username : this.info.username;
        const pos = this.getScreenPosition(gfx);
        const metric = gfx.measureString(text, 14, "Arial");
        const renderX = pos.x;
        const renderY = pos.y;

        // work in progress for rendering characters with multiple layers
        gfx.drawSprite(this.character, pos.x, pos.y);

        gfx.drawString(text, pos.x - (metric.width / 2), renderY - 5, "white", 14, "Arial");

        // draw bounding box, this displays how much space the player is actually taking. good for debugging visuals
        // gfx.drawRect(renderX, renderY, this.sprite.width, this.sprite.height, "red");
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