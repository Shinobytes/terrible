export default class SpriteSheet {
    constructor(image) {
        this.image = image;
        this.x = 0;
        this.y = 0;
        this.spriteX = 0;
        this.spriteY = 0;
        this.spriteWidth = 0;
        this.spriteHeight = 0;        
        this.flip = false;
    }

    static fromUrl(src) {
        const img = new Image();
        img.src = src;
        return new SpriteSheet(img);
    }

    get width() {
        return this.image && this.image.complete ? this.image.width : 0;
    }

    get height() {
        return this.image && this.image.complete ? this.image.height : 0;
    }

    get ready() {
        return this.image && this.image.complete;
    }

    draw(ctx) {
        if (!this.ready) {
            return;
        }

        ctx.save();
        ctx.globalAlpha = this.opacity;
        if (this.flip) {
            ctx.translate(this.x, 0);
            ctx.scale(-1, 1);
        }
        ctx.drawImage(this.image, this.spriteX, this.spriteY, 
            this.spriteWidth, 
            this.spriteHeight, 
            this.flip ? -(this.spriteWidth / 2) : this.x, 
            this.y, 
            this.spriteWidth, 
            this.spriteHeight);
        ctx.restore();
    }
}