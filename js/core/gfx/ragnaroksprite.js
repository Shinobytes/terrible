import Requests from "../../network/requests.js";
import SpriteSheet from "./spritesheet.js";
import Camera from "../camera.js";

export default class RagnarokSprite {
    constructor(appearance) {
        this.appearance = appearance;
        
        this.ready = false;
      
        this.x = 0;
        this.y = 0;

        this.loadSpriteSheets();
    }

    async loadSpriteSheets() {      
        await this.loadSpriteSheetDefinitionAsync(x => this.headSpriteSheet = x, `/assets/sprites/characters/heads_${this.appearance.gender}_0`);
        await this.loadSpriteSheetDefinitionAsync(x => this.bodySpriteSheet = x, `/assets/sprites/characters/body_${this.appearance.gender}_${this.appearance.body}`);
        
        this.headHeight = this.appearance.gender == 0 ? 20 : 24;

        const bodySprite = this.bodySpriteSheet.definition[0].Sprites[0];
        this.bodySpriteSheet.spriteWidth = bodySprite.Width;
        this.bodySpriteSheet.spriteHeight = bodySprite.Height;
        this.bodySpriteSheet.spriteX = bodySprite.X;
        this.bodySpriteSheet.spriteY = bodySprite.Y;
        

        console.log(this.appearance.head);
        const headSprite = this.headSpriteSheet.definition[this.appearance.head].Sprites[0];
        this.headSpriteSheet.spriteWidth = headSprite.Width;
        this.headSpriteSheet.spriteHeight = headSprite.Height;
        this.headSpriteSheet.spriteX = headSprite.X;
        this.headSpriteSheet.spriteY = headSprite.Y;
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

        this.headSpriteSheet.x = Camera.main.viewport.x + this.x - this.headSpriteSheet.spriteWidth / 2;
        this.headSpriteSheet.y = Camera.main.viewport.y + this.y;

        this.bodySpriteSheet.x = Camera.main.viewport.x + this.x - this.bodySpriteSheet.spriteWidth / 2;
        this.bodySpriteSheet.y = Camera.main.viewport.y + this.y + this.headHeight;
    }

    draw(gfx) {
        if (!this.ready) {
            return;
        }

        this.bodySpriteSheet.draw(gfx);
        this.headSpriteSheet.draw(gfx);        
    }
}