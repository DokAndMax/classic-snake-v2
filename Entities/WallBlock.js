import Entity from './Entity.js';

class WallBlock extends Entity {
    constructor(x, y) {
        super(x, y);
    }

    getType() {
        return 'WallBlock';
    }

    getSkin() {
        return super.getSkin() || 'wall';
    }
}

export default WallBlock;
