import WallBlock from "../Entities/WallBlock.js";
import SnakePart from "../Entities/SnakePart.js";

class DefaultMap {
    generate(grid) {
        const entities = [];

        for (let i = 0; i < grid.getWidth(); i++) {

            entities.push(new WallBlock(grid.GetCoordinate(i, 0)));
            entities.push(new WallBlock(grid.GetCoordinate(i, grid.getHeight() - 1)));
        }

        for (let i = 0; i < grid.getHeight(); i++) {
            entities.push(new WallBlock(grid.GetCoordinate(0, i)));
            entities.push(new WallBlock(grid.GetCoordinate(grid.getWidth() - 1, i)));
        }

        const snakeStartX = Math.floor(grid.getWidth() / 2);
        const snakeStartY = Math.floor(grid.getHeight() / 2);

        for (let i = 1; i <= 6; i++) {
            const snakePart = new SnakePart(grid.GetCoordinate(snakeStartX - i, snakeStartY));
            snakePart.setDirection({ dx: 1, dy: 0 })
            entities.unshift(snakePart);
        }

        return entities;
    }
}

export default DefaultMap;