class AppleCollisionInteraction {
    execute(apple, neighborType, interactionsInfo, eventManager) {
        if (neighborType === 'Apple') {
            this.#interactWithSnakePart(apple, interactionsInfo, eventManager);
        }
    }

    #interactWithSnakePart() {

    }

}

export default AppleCollisionInteraction;
