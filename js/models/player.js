import Camera from "../core/camera.js";
import RagnarokSprite from "../core/gfx/ragnaroksprite.js";
import Vector2 from "../math/vector2.js";

const directionMap = [0, 0, 0, 0, 0, 0, 0, 0, 0];

export default class Player {
    constructor(playerInfo) {
        this.info = playerInfo;
        this.character = new RagnarokSprite(playerInfo.appearance);
        this.isMe = false;
        this.targetPosition = undefined;
        this.startPosition  = undefined;
        this.moveSpeed = 10;
    }

    getDirectionIndex(a, b) {
        const delt = a.subtract(b);
        const angl = Math.atan2(delt.y, -delt.x) + Math.PI / 2;
        let dir = -1;
        for(; dir < 8; ++dir) {
            if (angl < dir * Math.PI / 4 - Math.PI / 8) {
                break;
            }
        }
        return (17 - dir) % 8;
    }

    update(elapsed) {
        // do magic stuff here, like ensure we play our animations or whatever.

        if (this.targetPosition) {
            const step = this.moveSpeed * elapsed;
            const pos  = this.getWorldPosition();            
            const newpos  = Vector2.moveTowards(pos, this.targetPosition, step);
            this.info.x = newpos.x;
            this.info.y = newpos.y;
            
            this.character.direction = this.getDirectionIndex(this.startPosition, this.targetPosition);


            if (this.targetPosition.x == newpos.x && this.targetPosition.y == newpos.y) {
                this.targetPosition = null;
            }


            // const dx = this.targetPosition.x - this.x;
            // const dy = this.targetPosition.y - this.y;
            // const vx = dx * (elapsed * this.moveSpeed);
            // const vy = dy * (elapsed * this.moveSpeed);
            // this.info.x += vx;
            // this.info.y += vy;
            // if (Math.abs(this.targetPosition.x - this.info.x) < 0.5) {
            //     this.info.x = this.targetPosition.x;
            // }
            // if (Math.abs(this.targetPosition.y - this.info.y) < 0.5) {
            //     this.info.y = this.targetPosition.y;
            // }
            // if (this.info.x == this.targetPosition.x && this.info.y == this.targetPosition.y) {
            //     this.targetPosition = undefined;
            // }
            // console.log("pos: " + pos.x + ", " + pos.y);
        }

        this.character.x = this.info.x;
        this.character.y = this.info.y;
        this.character.update(elapsed);
    }

    draw(gfx) {
        const text = this.isMe ? "[Me] " + this.info.username : this.info.username;
        const pos = this.getScreenPosition();
        const metric = gfx.measureString(text, 14, "Arial");
        const renderX = this.isMe ? gfx.width / 2 - this.character.width / 2 : pos.x;
        const renderY = pos.y - this.character.height;

        // work in progress for rendering characters with multiple layers
        gfx.drawSprite(this.character, renderX, renderY);

        gfx.drawString(text, pos.x - (metric.width / 2), renderY - 5, "white", 14, "Arial");

        // draw bounding box, this displays how much space the player is actually taking. good for debugging visuals
        // gfx.drawRect(renderX, renderY, this.sprite.width, this.sprite.height, "red");
    }

    moveTo(x, y) {
        this.startPosition  = this.getWorldPosition();
        this.targetPosition = new Vector2(x, y);
    }

    getWorldPosition() {
        return new Vector2(this.info.x, this.info.y);
    }

    getScreenPosition() {
        return {
            x: Camera.main.viewport.x + this.info.x,
            y: Camera.main.viewport.y + this.info.y
        };
    }

    get y() {
        return this.info.y;
    }

    get x() {
        return this.info.x;
    }
}
