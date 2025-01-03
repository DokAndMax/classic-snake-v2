let _loadMenu = null;
let _gameContext = null;

export function init({ loadMenu, gameContext }) {
    _loadMenu = loadMenu;
    _gameContext = gameContext;
}

document.getElementById('start-game').addEventListener('click', () => {
    _loadMenu('start-game');
});

document.getElementById('levels-menu-button').addEventListener('click', () => {
    _loadMenu('levels-menu');
});

document.getElementById('continue-game').addEventListener('click', () => {
    if (_gameContext.isPaused) {
        _gameContext.isPaused = false;
        _loadMenu('start-game', { isPaused: true });
    }
});