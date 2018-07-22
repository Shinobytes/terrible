import Requests from "../../network/requests.js";
import SpriteSheet from "./spritesheet.js";
import Camera from "../camera.js";

export default class RagnarokSprite {
    constructor(appearance) {
        this.appearance = appearance;
        
        this.ready = false;
        
        this.x = 0;
        this.y = 0;
        this.direction = 0;
        this.animation = 0;

        this.loadSpriteSheets();
    }

    async loadSpriteSheets() {      
        // await this.loadSpriteSheetDefinitionAsync(x => this.headSpriteSheet = x, `/assets/sprites/characters/heads_${this.appearance.gender}_${this.appearance.hairColor}`);
        await this.loadSpriteSheetDefinitionAsync(x => this.headSpriteSheet = x, `/assets/sprites/characters/heads_${this.appearance.gender}_0`);
        await this.loadSpriteSheetDefinitionAsync(x => this.bodySpriteSheet = x, `/assets/sprites/characters/body_${this.appearance.gender}_${this.appearance.body}`);
        
        this.headHeight = this.appearance.gender == 0 ? 20 : 24;

        this.setBody(0, 0);
        this.setHead(0, 0);
        
        this.ready = true;
    }

    async loadSpriteSheetDefinitionAsync(assignSpriteSheet, file) {
        const spritesheet = SpriteSheet.fromUrl(file + ".png");        
        spritesheet.definition = JSON.parse(await Requests.getAsync(file + ".json"));        
        assignSpriteSheet(spritesheet);
    }

    update(elapsed) {
        if (!this.ready) {
            return;
        }

        this.setBody(this.animation, this.direction);
        this.setHead(this.animation, this.direction);

        this.headSpriteSheet.x = Camera.main.viewport.x + this.x - this.headSpriteSheet.spriteWidth / 2;
        this.headSpriteSheet.y = (Camera.main.viewport.y + this.y) - this.height;

        this.bodySpriteSheet.x = Camera.main.viewport.x + this.x - this.bodySpriteSheet.spriteWidth / 2;
        this.bodySpriteSheet.y = (Camera.main.viewport.y + this.y + this.headHeight) - this.height; 
    }

    setBody(animation, direction) {       
        let flip = false;
        if (direction >= 5) {
            direction = 8 - direction;
            flip = true;
        }         
        const bodySprite = this.bodySpriteSheet.definition[animation].Sprites[direction];
        if (!bodySprite) {
            console.error("Can't select body anim:  " + animation + ", dir: " + direction);
            return;
        }
        this.bodySpriteSheet.spriteWidth = bodySprite.Width;
        this.bodySpriteSheet.spriteHeight = bodySprite.Height;
        this.bodySpriteSheet.spriteX = bodySprite.X;
        this.bodySpriteSheet.spriteY = bodySprite.Y;
        this.bodySpriteSheet.flip = flip;
    }

    setHead(animation, direction) {
        let flip = false;
        if (direction >= 5) {
            direction = 8 - direction;
            flip = true;
        }
        const headSprite = this.headSpriteSheet.definition[this.appearance.head].Sprites[direction];
        if (!headSprite) {
            console.error("Can't select head anim:  " + animation + ", dir: " + direction);
            return;
        }
        this.headSpriteSheet.spriteWidth = headSprite.Width;
        this.headSpriteSheet.spriteHeight = headSprite.Height;
        this.headSpriteSheet.spriteX = headSprite.X;
        this.headSpriteSheet.spriteY = headSprite.Y;
        this.headSpriteSheet.flip = flip;
    }

    draw(gfx) {
        if (!this.ready) {
            return;
        }

        this.bodySpriteSheet.draw(gfx);
        this.headSpriteSheet.draw(gfx);        
    }

    get width() {
        if (!this.bodySpriteSheet) {
            return 0;
        }
        return this.bodySpriteSheet.spriteWidth;
    }

    get height() {
        if (!this.bodySpriteSheet) {
            return 0;
        }
        return this.bodySpriteSheet.spriteHeight + this.headHeight;
    }
}