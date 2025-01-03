import loadMenu from './menuLoader.js';

const gameContext = {
    gameEngine: null,
    inputHandler: null,
    tickRate: 150,
    isPaused: false,
};

export const loadMenuFunc = (menu, params) => loadMenu(menu, {
    loadMenu: loadMenuFunc,
    gameContext,
    ...params,
});

await loadMenuFunc('main-menu');