import SpatialHash from './SpatialHash.js';
import EventManager from './EventManager.js';
import Grid from './Grid.js';
import CollisionService from '../Services/CollisionService.js';
import MovementService from '../Services/MovementService.js';
import RenderingService from '../Services/RenderingService.js';
import GameDimensions from '../Utils/GameDimensions.js';
import SnakeController from '../Services/SnakeController.js';

class GameEngine {
    #context;
    #grid;
    #spatialHash;
    #eventManager;
    #collisionService;
    #movementService;
    #renderingService;
    #snakeController;
    #entities = [];
    #tickRate;
    #map;
    #isPaused = false;
    #gameLoop = null;

    static MIN_GAME_WIDTH_CELLS = 11;
    static MIN_GAME_HEIGHT_CELLS = 5;
    static CELL_SIZE_DIVISOR = 28;

    constructor(context, map, tickRate) {
        const { width, height, cellSize } = this.#initializeGameDimensions(context);

        this.#context = context;
        this.#map = map;
        this.#grid = new Grid(width, height);
        this.#spatialHash = new SpatialHash(this.#grid.getWidth(), this.#grid.getHeight());
        this.#eventManager = new EventManager();
        this.#collisionService = new CollisionService(this.#eventManager);
        this.#movementService = new MovementService(this.#grid);
        this.#renderingService = new RenderingService(this.#context, cellSize);
        this.#tickRate = tickRate;

        this.#initializeEventListeners();
    }

    #initializeGameDimensions(context) {
        return GameDimensions.initializeGameDimensions(
            context,
            GameEngine.MIN_GAME_WIDTH_CELLS,
            GameEngine.MIN_GAME_HEIGHT_CELLS,
            GameEngine.CELL_SIZE_DIVISOR
        );
    }

    #initializeEventListeners() {
        this.#eventManager.on('scoreUpdate', this.updateScore.bind(this));
        this.#eventManager.on('gameOver', this.endGame.bind(this));
        this.#eventManager.on('togglePause', this.togglePause.bind(this));
    }

    initialize() {
        this.#entities = this.#loadEntitiesFromMap();
        this.#entities.forEach(entity => this.#spatialHash.addEntity(entity));
        this.#snakeController = new SnakeController(this.#eventManager, this.#entities[0]);
        this.#renderingService.initialize();
    }

    #loadEntitiesFromMap() {
        return this.#map.generate(this.#grid);
    }

    #resetGameState() {
        const { width, height } = this.#initializeGameDimensions(this.#context);

        this.#grid = new Grid(width, height);
        this.#spatialHash = new SpatialHash(this.#grid.getWidth(), this.#grid.getHeight());
        this.#entities = [];
    }

    start() {
        this.stop();
        this.#resetGameState();
        this.initialize();
        this.#gameLoop = setInterval(() => this.tick(), this.#tickRate);
    }

    stop() {
        if (this.#gameLoop) {
            clearInterval(this.#gameLoop);
            this.#gameLoop = null;
        }
    }

    pause() {
        this.#isPaused = true;
    }

    resume() {
        this.#isPaused = false;
    }

    togglePause() {
        this.#isPaused = !this.#isPaused;
    }

    tick() {
        if (this.#isPaused) return;

        this.#snakeController.updateDirection();
        this.#moveEntities();
        this.#handleCollisions();
        this.#render();
    }

    #moveEntities() {
        this.#entities.forEach(entity => {
            const direction = entity.getDirection();
            this.#movementService.moveEntity(entity, direction);
        });
    }

    #handleCollisions() {
        this.#spatialHash.clearBuckets();
        this.#entities.forEach(entity => this.#spatialHash.addEntity(entity));

        this.#entities.forEach(entity => {
            const neighbors = this.#spatialHash.getEntitiesInRadius(entity.getX(), entity.getY(), 1);
            if (neighbors.length > 0) {
                this.#collisionService.handleCollision(entity, neighbors);
            }
        });
    }

    #render() {
        this.#renderingService.render(this.#entities);
    }

    updateScore(data) {

    }

    endGame() {
        //this.stop();
    }

    getEventManager() {
        return this.#eventManager;
    }
}

export default GameEngine;
