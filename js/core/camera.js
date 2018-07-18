export default class Camera {
    constructor() {        
        this.viewport = {
            x: 0,
            y: 0,
            w: window.innerWidth,
            h: window.innerHeight
        };
    }

    static get main() {
        if (!Camera.instance) {
            Camera.instance = new Camera();
        }
        return Camera.instance;
    }
}