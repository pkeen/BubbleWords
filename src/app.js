import Game from "./modules/game.js";

import { sfx } from "./modules/audio.js"; // just test

const appElement = document.getElementById('app');

const game = new Game(appElement);

game.init();

sfx.welcome.play();
/// sound test 
// const audioCtx = new AudioContext();

// sfx.tick.play();

