class InputHandler {
    #eventManager;

    constructor(eventManager) {
        this.#eventManager = eventManager;

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);

        this.touchStartX = null;
        this.touchStartY = null;

        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('keydown', this.handleKeyDown);

        document.addEventListener('touchstart', this.handleTouchStart);
        document.addEventListener('touchmove', this.handleTouchMove);
        document.addEventListener('touchend', this.handleTouchEnd);
    }

    removeEventListeners() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('touchstart', this.handleTouchStart);
        document.removeEventListener('touchmove', this.handleTouchMove);
        document.removeEventListener('touchend', this.handleTouchEnd);
    }

    handleKeyDown(event) {
        let direction = null;
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
                direction = { dx: 0 , dy: -1 };
                break;
            case 'ArrowDown':
            case 's':
                direction = { dx: 0 , dy: 1 };
                break;
            case 'ArrowLeft':
            case 'a':
                direction = { dx: -1 , dy: 0 };
                break;
            case 'ArrowRight':
            case 'd':
                direction = { dx: 1 , dy: 0 };
                break;
        }

        if (direction) {
            event.preventDefault();
            this.#eventManager.emit('snakeMove', direction);
        }
    }

    handleTouchStart(event) {
        this.touchStartX = event.touches[0].clientX;
        this.touchStartY = event.touches[0].clientY;
    }

    handleTouchMove(event) {
        if (!this.touchStartX || !this.touchStartY) return;

        event.preventDefault();

        const touchEndX = event.touches[0].clientX;
        const touchEndY = event.touches[0].clientY;

        const deltaX = touchEndX - this.touchStartX;
        const deltaY = touchEndY - this.touchStartY;

        const swipeThreshold = 50;

        if (Math.abs(deltaX) > swipeThreshold || Math.abs(deltaY) > swipeThreshold) {
            let direction;
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                direction = deltaX > 0 ? { dx: 1 , dy: 0 } : { dx: -1 , dy: 0 };
            } else {
                direction = deltaY > 0 ? { dx: 0 , dy: 1 } : { dx: 0 , dy: -1 };
            }
            this.#eventManager.emit('snakeMove', direction);

            this.touchStartX = null;
            this.touchStartY = null;
        }
    }

    handleTouchEnd(event) {
        this.touchStartX = null;
        this.touchStartY = null;
    }
}

export default InputHandler;