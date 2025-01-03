class SnakeController {
    #eventManager;
    #snakeHead;
    #currentDirection;
    #nextDirection;

    constructor(eventManager, snakeHead) {
        this.#eventManager = eventManager;
        this.#snakeHead = snakeHead;
        this.#currentDirection = snakeHead.getDirection();
        this.#nextDirection = this.#currentDirection;

        this.subscribeToEvents();
    }

    subscribeToEvents() {
        this.#eventManager.on('snakeMove', (direction) => this.handleDirectionChange(direction));
    }

    handleDirectionChange(newDirection) {
        if (
            this.#currentDirection &&
            this.#currentDirection.dx === -newDirection.dx &&
            this.#currentDirection.dy === -newDirection.dy
        ) {
            return;
        }
        this.#nextDirection = newDirection;
    }

    updateDirection() {
        this.#currentDirection = this.#nextDirection;
        this.#snakeHead.setDirection(this.#currentDirection);
    }

    getCurrentDirection() {
        return this.#currentDirection;
    }
}

export default SnakeController;