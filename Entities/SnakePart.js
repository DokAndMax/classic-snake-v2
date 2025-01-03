import Entity from './Entity.js';

class SnakePart extends Entity {
    constructor(x, y) {
        super(x, y);
    }

    getType() {
        return 'SnakePart';
    }

    getSkin(context) {
        return super.getSkin() || 'body';
    }
}

export default SnakePart;
