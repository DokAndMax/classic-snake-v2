import loadSkins from '../Utils/SkinLoader.js';

class RenderingService {
    #context;
    #skins;
    #textures;
    #activeProfile;
    #cellSize;

    constructor(context, cellSize) {
        this.#context = context;
        this.#skins = null;
        this.#textures = {};
        this.#activeProfile = "Classic";
        this.#cellSize = cellSize;

    }

    async initialize(profile = "Classic") {
        this.#activeProfile = profile;
        this.#skins = await loadSkins('/Skins/skins.json', profile);
    }

    async changeSkinProfile(profile) {
        this.#activeProfile = profile;
        this.#skins = await loadSkins('/Skins/skins.json', profile);
    }

    render(entities) {
        this.clearCanvas();

        entities.forEach(async entity => {
            const x = entity.getX();
            const y = entity.getY();

            const skin = this.#skins[entity.getSkin()];

            if (skin) {
                await this.renderSkin(x, y, skin);
            } else {
                console.warn(`Skin not found for entity: ${entity.getSkin()}`);
            }
        });
    }

    clearCanvas() {
        this.#context.clearRect(0, 0, this.#context.canvas.width, this.#context.canvas.height);
    }

    async renderSkin(x, y, skinPath) {
        const image = await this.loadTexture(skinPath);

        this.#context.drawImage(
            image,
            x * this.#cellSize,
            y * this.#cellSize,
            this.#cellSize,
            this.#cellSize
        );
    }

    loadTexture(skinPath) {
        return new Promise((resolve, reject) => {
            if (this.#textures[skinPath] && this.#textures[skinPath].complete) {
                return resolve(this.#textures[skinPath]);
            }

            const image = new Image();
            image.src = `${skinPath}`;

            image.onload = () => {
                this.#textures[skinPath] = image;
                resolve(image);
            };

            image.onerror = () => {
                console.error(`Failed to load texture for "${skinPath}" at ${image.src}`);
                resolve(null);
            };
        });
    }
}

export default RenderingService;