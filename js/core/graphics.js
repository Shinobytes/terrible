export default class Graphics {
    constructor(canvas) {
        this.canvas  = canvas;
        this.context = canvas.getContext("2d");
    }

    get width() {
        return this.canvas.width;
    }

    get height() {
        return this.canvas.height;
    }

    setSize(width, height) {
        this.canvas.width  = width;
        this.canvas.height = height;
    }

    clear(color) {
        const width  = this.width;
        const height = this.height;
        this.context.fillStyle = color || "blue";
        this.context.fillRect(0, 0, width, height);
    }

    drawString(text, x, y, color, size = 32, fontFamily = 'Chela One, Arial, sans-serif') {        
        this.context.font = `${size}px ${fontFamily}`;
        this.context.fontFamily = fontFamily
        this.context.fillStyle = color || "black";
        this.context.fillText(text, x, y);
    }

    drawSprite(sprite, x, y) {
        sprite.x = x || sprite.x || 0;
        sprite.y = y || sprite.y || 0;
        sprite.draw(this.context);
    }

    drawRect(x, y, w, h, color) {
        this.context.strokeStyle = color;
        this.context.rect(x, y, w, h);
        this.context.stroke();
    }

    measureString(text, size = 32, fontFamily = 'Chela One, Arial, sans-serif') {        
        this.context.font = `${size}px ${fontFamily}`;
        this.context.fontFamily = fontFamily
        return this.context.measureText(text);
    }
}