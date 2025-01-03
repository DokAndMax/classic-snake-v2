let _loadMenu = null;
let _gameContext = null;

export function init({ loadMenu, gameContext }) {
    _loadMenu = loadMenu;
    _gameContext = gameContext;
}

document.getElementById('back').addEventListener('click', () => {
    _loadMenu('main-menu');
});

const levelButtons = document.querySelectorAll('.level');
levelButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        _gameContext.tickRate = 200 - index * 20;
        _gameContext.isPaused = false;

        _loadMenu('main-menu');
    });
});
