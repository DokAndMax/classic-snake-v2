import GameEngine from '../Core/GameEngine.js';
import DefaultMap from "../Maps/DefaultMap.js";
import InputHandler from "../InputHandler.js";

let _loadMenu = null;
let _gameContext = null;

export function init({ loadMenu, gameContext, isPaused }) {
    _loadMenu = loadMenu;
    _gameContext = gameContext;

    const canvas = document.querySelector('.game-field');

    if(isPaused) {
        gameContext.gameEngine.resume();
        return;
    }

    const context = canvas.getContext('2d');

    gameContext.gameEngine = new GameEngine(context, new DefaultMap(), gameContext.tickRate);
    gameContext.inputHandler = new InputHandler(gameContext.gameEngine.getEventManager());

    gameContext.gameEngine.start();
}

const field = document.querySelector('.field');
field.addEventListener('click', event => {
    const canvas = document.querySelector('.game-field');
    if (!canvas.contains(event.target)) {
        _gameContext.isPaused = true;
        _gameContext.gameEngine.pause();
        _loadMenu('main-menu');
    }
});