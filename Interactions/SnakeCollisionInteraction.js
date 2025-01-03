class SnakeCollisionInteraction {
    execute(snakePart, neighborType, interactionsInfo, eventManager) {
        if (neighborType === 'Apple') {
            this.#interactWithApple(snakePart, interactionsInfo, eventManager);
        } else if (neighborType === 'WallBlock') {
            this.#interactWithWallBlock(snakePart, interactionsInfo, eventManager);
        } else if (neighborType === 'Bug') {
            this.#interactWithBug(snakePart, interactionsInfo, eventManager);
        } else if (neighborType === 'SnakePart') {
            this.#interactWithSnakePart(snakePart, interactionsInfo, eventManager);
        }
    }

    #interactWithApple(snakePart, interactionsInfo, eventManager) {
        //eventManager.emit('scoreUpdate', { points: 10 });
    }

    #interactWithWallBlock(snakePart, interactionsInfo, eventManager) {
        if (interactionsInfo?.find(({ distance }) => distance === 0)) {
            eventManager.emit('gameOver', { reason: 'SelfCollision' });
        }
    }

    #interactWithBug(snakePart, interactionsInfo, eventManager) {

    }

    #interactWithSnakePart(snakePart, interactionsInfo, eventManager) {
        if (interactionsInfo?.find(({ isSameCell }) => isSameCell)) {
            eventManager.emit('gameOver', { reason: 'SelfCollision' });
            return;
        }

        const neighbors = this.#analyzeNeighbors(interactionsInfo);

        if (neighbors.backward && !neighbors.forward) {
            snakePart.setSkin('mouth');
        } else if (!neighbors.backward && neighbors.forward) {
            snakePart.setSkin('tail');
        } else if (neighbors.forward && neighbors.backward) {
            if (neighbors.isCorner) {
                snakePart.setSkin('cornerBody');
            } else {
                snakePart.setSkin('body');
            }
        }
    }

    #analyzeNeighbors(interactionsInfo) {
        const neighbors = { forward: null, backward: null, isCorner: false };

        interactionsInfo.forEach(info => {
            if (info.distance === 1) {
                if (info.relativePosition.dx === 1 && info.relativePosition.dy === 1 ||
                    info.relativePosition.dx === -1 && info.relativePosition.dy === -1) {
                    return;
                }

                if (info.relativePosition.dx === 1 || info.relativePosition.dy === 1) {
                    neighbors.forward = info;
                } else if (info.relativePosition.dx === -1 || info.relativePosition.dy === -1) {
                    neighbors.backward = info;
                }
            }
        });

        neighbors.isCorner = neighbors.forward && neighbors.backward &&
            (neighbors.forward.relativePosition.dx !== neighbors.backward.relativePosition.dx &&
                neighbors.forward.relativePosition.dy !== neighbors.backward.relativePosition.dy);

        return neighbors;
    }
}

export default SnakeCollisionInteraction;
