import SnakeCollisionInteraction from '../Interactions/SnakeCollisionInteraction.js';
import AppleCollisionInteraction from '../Interactions/AppleCollisionInteraction.js';
import BugCollisionInteraction from '../Interactions/BugCollisionInteraction.js';

class CollisionService {
    #eventManager;
    #interactions;

    constructor(eventManager) {
        this.#eventManager = eventManager;
        this.#interactions = {};

        this.registerInteractions();
    }

    registerInteractions() {
        this.addInteraction('SnakePart', 'SnakePart', new SnakeCollisionInteraction());
        this.addInteraction('SnakePart', 'Apple', new SnakeCollisionInteraction());
        this.addInteraction('SnakePart', 'WallBlock', new SnakeCollisionInteraction());
        this.addInteraction('SnakePart', 'Bug', new SnakeCollisionInteraction());
    }

    addInteraction(entityType, neighborType, interaction) {
        const key1 = `${entityType}:${neighborType}`;
        this.#interactions[key1] = interaction;
    }

    calculateMetadata(entity, neighbor) {
        const dx = neighbor.getX().VectorSubtract(entity.getX()).valueOf();
        const dy = neighbor.getY().VectorSubtract(entity.getY()).valueOf();
        const neighborType = neighbor.getType();

        return {
            neighborType: neighborType,
            direction: neighbor.getDirection(),
            relativePosition: { dx, dy },
            distance: Math.sqrt(dx * dx + dy * dy),
            isSameCell: dx === 0 && dy === 0,
        };
    }


    handleCollision(entity, neighbors) {
        const entityType = entity.getType();

        const groupedNeighbors = Object.groupBy(neighbors, (neighbor) => neighbor.getType())

        Object.keys(groupedNeighbors).forEach((neighborType) => {
            const hashKey = `${entityType}:${neighborType}`;
            const interaction = this.#interactions[hashKey];
            if (interaction) {
                const result = groupedNeighbors[neighborType].filter(neighbor => entity !== neighbor).map((neighbor) => {
                    return this.calculateMetadata(entity, neighbor);
                });

                interaction.execute(entity, neighborType, result, this.#eventManager);
            } else {
                //console.warn(`No interaction registered for collision between ${entityType} and ${neighborType}`);
            }
        });

    }
}

export default CollisionService;