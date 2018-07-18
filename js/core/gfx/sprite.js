export default class Sprite {
    constructor(image) {
        this.image = image;
        this.x = 0;
        this.y = 0;
        this.visible  = true;
        this.opacity  = 1.0;
        this.rotation = 0;
        this.scale    = 1.0;
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

        const scaledWidth  = this.width  * this.scale;
        const scaledHeight = this.height * this.scale;

        ctx.save();
        ctx.globalAlpha = this.opacity;

        if (this.rotation !== 0) {
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180.0);
            ctx.drawImage(this.image, 0, 0, this.width, this.height, 0, 0, scaledWidth, scaledHeight);
        } else {
            ctx.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, scaledWidth, scaledHeight);
        }

        ctx.restore();
    }
}