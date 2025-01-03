import GridCoordinate from "./GridCoordinate.js";

class Grid {
    #width;
    #height;

    constructor(width, height) {
        this.#width = width;
        this.#height = height;
    }

    GetCoordinate(x, y) {
        return {
            x: new GridCoordinate(x, this.#width),
            y: new GridCoordinate(y, this.#height),
        }
    }

    isWithinBounds(x, y) {
        return x >= 0 && x < this.#width && y >= 0 && y < this.#height;
    }

    getWidth() {
        return this.#width;
    }

    getHeight() {
        return this.#height;
    }
}

export default Grid;
