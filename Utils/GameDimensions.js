class GameDimensions {
    static initializeGameDimensions(context, minWidthCells, minHeightCells, cellSizeDivisor) {
        const canvas = context.canvas;

        const { clientWidth: width, clientHeight: height } = canvas;
        let cellSize = Math.max(width, height) / cellSizeDivisor;

        let gameWidthCells = Math.ceil(width / cellSize);
        let gameHeightCells = Math.ceil(height / cellSize);

        gameWidthCells = Math.max(gameWidthCells, minWidthCells);
        gameHeightCells = Math.max(gameHeightCells, minWidthCells);

        cellSize = Math.min(width / gameWidthCells, height / gameHeightCells);

        gameWidthCells = Math.ceil(width / cellSize);
        gameHeightCells = Math.ceil(height / cellSize);

        this.#setCanvasSize(context, gameWidthCells * cellSize, gameHeightCells * cellSize);

        return { width: gameWidthCells, height: gameHeightCells, cellSize };
    }

    static #setCanvasSize(context, width, height) {
        context.canvas.width = width;
        context.canvas.height = height;
    }
}

export default GameDimensions;
