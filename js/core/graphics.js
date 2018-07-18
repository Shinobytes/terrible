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
}