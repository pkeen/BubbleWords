import Game from "./modules/game.js";

const appElement = document.getElementById('app');

const game = new Game(appElement);

game.init();