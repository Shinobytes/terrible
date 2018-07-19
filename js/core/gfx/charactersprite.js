import SpriteSheet from "./spritesheet.js";
import Camera from "../camera.js";

export default class CharacterSprite {
    constructor(appearance) {
        this.appearance = appearance;

        this.headSpriteSheet = SpriteSheet.fromUrl(`/assets/sprites/characters/heads_${this.appearance.gender}_0.png`);
        this.bodySpriteSheet = SpriteSheet.fromUrl(`/assets/sprites/characters/body_${this.appearance.gender}_${this.appearance.body}.png`);;

        this.x = 0;
        this.y = 0;

        this.bodySpriteSheet.spriteWidth = 56;
        this.bodySpriteSheet.spriteHeight = 96;
        this.bodySpriteSheet.spriteX = 0;
        this.bodySpriteSheet.spriteY = 0;
        
        this.headSpriteSheet.spriteWidth = this.appearance.gender == 0 ? 40 : 42;
        this.headSpriteSheet.spriteHeight = this.appearance.gender == 0 ? 34 : 54;  
        this.headSpriteSheet.spriteX = 0;
        this.headSpriteSheet.spriteY = this.headSpriteSheet.spriteWidth * this.appearance.head;
    }

    update(elapsed) {
        this.headSpriteSheet.x = Camera.main.viewport.x + this.x - this.headSpriteSheet.spriteWidth / 2;
        this.headSpriteSheet.y = Camera.main.viewport.y + this.y;

        this.bodySpriteSheet.x = Camera.main.viewport.x + this.x - this.bodySpriteSheet.spriteWidth / 2 + 3;
        this.bodySpriteSheet.y = Camera.main.viewport.y + this.y + this.headSpriteSheet.spriteHeight / 2;
    }

    draw(gfx) {
        this.bodySpriteSheet.draw(gfx);
        this.headSpriteSheet.draw(gfx);        
    }
}