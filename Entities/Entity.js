class Entity {
    #x;
    #y;
    #direction;
    #skin;
    #rotation;

    constructor({ x, y }, direction = null) {
        this.#x = x;
        this.#y = y;
        this.#direction = direction;
    }

    getX() { return this.#x; }
    getY() { return this.#y; }
    getDirection() { return this.#direction; }

    setX(x) { this.#x = x; }
    setY(y) { this.#y = y; }
    setDirection(direction) { this.#direction = direction }

    getType() {
        throw new Error("getType() має бути реалізований в підкласі");
    }

    getSkin() {
        return this.#skin;
    }

    setSkin(skin) {
        this.#skin = skin;
    }

}

export default Entity;
