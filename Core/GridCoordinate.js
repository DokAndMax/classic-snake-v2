class GridCoordinate {
    #gridSize;
    #value;

    constructor(value, gridSize) {
        this.#value = value;
        this.#gridSize = gridSize;
    }

    #normalize(value) {
        let result = value % this.#gridSize;
        return result < 0 ? result + this.#gridSize : result;
    }

    Add(operand) {
        const newValue = this.#normalize(this.#value + operand);
        return new GridCoordinate(newValue, this.#gridSize);
    }

    Subtract(operand) {
        const newValue = this.#normalize(this.#value - operand);
        return new GridCoordinate(newValue, this.#gridSize);
    }

    AddRaw(operand) {
        const newValue = this.#value + operand;
        return new GridCoordinate(newValue, this.#gridSize);
    }

    SubtractRaw(operand) {
        const newValue = this.#value - operand;
        return new GridCoordinate(newValue, this.#gridSize);
    }

    Multiply(operand) {
        const newValue = this.#normalize(this.#value * operand);
        return new GridCoordinate(newValue, this.#gridSize);
    }

    Divide(operand) {
        if (operand === 0) {
            throw new Error("Division by zero is not allowed.");
        }
        const newValue = this.#normalize(Math.floor(this.#value / operand));
        return new GridCoordinate(newValue, this.#gridSize);
    }

    VectorSubtract(operand) {
        let result = this.#value - operand;
        if (result > this.#gridSize / 2) {
            result -= this.#gridSize;
        } else if (result < -this.#gridSize / 2) {
            result += this.#gridSize;
        }
        return new GridCoordinate(result, this.#gridSize);
    }

    VectorAdd(operand) {
        return this.VectorSubtract(-operand);
    }

    valueOf() {
        return this.#value;
    }

    toString() {
        return this.#value;
    }
}

export default GridCoordinate;
