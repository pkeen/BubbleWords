import Game from "./modules/game.js";
import Display from "./modules/display.js";

const appElement = document.getElementById('app');

// const display = new Display(appElement);

const game = new Game(appElement);


game.init();

