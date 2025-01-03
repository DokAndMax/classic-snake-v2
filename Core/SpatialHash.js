import GridCoordinate from "./GridCoordinate.js";

class SpatialHash {
    #width;
    #height;
    #cellSize;
    #buckets;

    constructor(width, height, cellSize = 5) {
        this.#width = Math.ceil(width / cellSize);
        this.#height = Math.ceil(height / cellSize);
        this.#cellSize = cellSize;
        this.#buckets = new Map();
    }

    clearBuckets() {
        this.#buckets.clear();
    }

    #hash(x, y) {
        return `${Math.floor(x / this.#cellSize)},${Math.floor(y / this.#cellSize)}`;
    }

    addEntity(entity) {
        const hash = this.#hash(entity.getX(), entity.getY());
        if (!this.#buckets.has(hash)) this.#buckets.set(hash, []);
        this.#buckets.get(hash).push(entity);
    }

    getEntitiesAt(x, y) {
        return this.#buckets.get(this.#hash(x, y)) || [];
    }

    getEntitiesInRadius(x, y, radius) {
        const neighbors = [];
        const cellX = new GridCoordinate(Math.floor(x / this.#cellSize), this.#width);
        const cellY = new GridCoordinate(Math.floor(y / this.#cellSize), this.#height);
        const cellRadius = Math.ceil(radius / this.#cellSize);

        for (let dx = -cellRadius; dx <= cellRadius; dx++) {
            for (let dy = -cellRadius; dy <= cellRadius; dy++) {
                const hash = `${cellX.Add(dx)},${cellY.Add(dy)}`;

                if (this.#buckets.has(hash)) {
                    for (const entity of this.#buckets.get(hash)) {
                        const distance =
                            Math.sqrt(
                                (entity.getX().VectorSubtract(x)) ** 2 + (entity.getY().VectorSubtract(y)) ** 2
                            );
                        if (distance <= radius) {
                            neighbors.push(entity);
                        }
                    }
                }
            }
        }

        return neighbors;
    }
}

export default SpatialHash;