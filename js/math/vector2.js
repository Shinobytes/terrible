const epsilon = 0.00001;

export default class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    subtract(other) {
        if (other instanceof Vector2) {
            return new Vector2(this.x - other.x, this.y - other.y);
        }
        return new Vector2(this.x - other, this.y - other);
    }

    add(other) {
        if (other instanceof Vector2) {
            return new Vector2(this.x + other.x, this.y + other.y);
        }
        return new Vector2(this.x + other, this.y + other);
    }

    divide(other) {
        if (other instanceof Vector2) {
            return new Vector2(this.x / other.x, this.y / other.y);
        }
        return new Vector2(this.x / other, this.y / other);
    }
    
    normalize() {
        const mag = this.magnitude;
        if (mag > epsilon) {
            return this.divide(mag);
        } return new Vector2(0, 0);
    }

    static direction(current, target) {
        const heading = target.subtract(current);
        return heading.normalize();
    }

    static moveTowards(current, target, maxDistanceDelta) {
        const toVector = target.subtract(current);
        const dist = toVector.magnitude;
        if (dist <= maxDistanceDelta || dist < 5) {
            return target;
        }
        return current.add(toVector.divide(dist * maxDistanceDelta));
    }
}