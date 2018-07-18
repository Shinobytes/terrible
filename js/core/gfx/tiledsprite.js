export default class TiledSprite {
    constructor(image) {
        this.image = image;
        this.x = 0;
        this.y = 0;
        this.visible = true;
        this.opacity = 1.0;
        this.columns = 1;
        this.rows = 1;
    }

    static fromUrl(src) {
        const img = new Image();
        img.src = src;
        return new Sprite(img);
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
        if (!this.ready || !this.visible) {
            return;
        }

        ctx.save();
        ctx.globalAlpha = this.opacity;

        for (let y = 0; y < this.rows; ++y) {
            for (let x = 0; x < this.columns; ++x) {
                ctx.drawImage(this.image, 0, 0, this.width, this.height, this.x + (x * this.width), this.y + (y * this.height), this.width, this.height);
            }
        }
        
        ctx.restore();
    }
}