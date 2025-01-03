class MovementService {
    #grid;

    constructor(grid) {
        this.#grid = grid;
    }

    moveEntity(entity, direction) {
        if (!direction) {
            return;
        }

        let newX = entity.getX().Add(direction.dx);
        let newY = entity.getY().Add(direction.dy);

        entity.setX(newX);
        entity.setY(newY);
    }
}

export default MovementService;
