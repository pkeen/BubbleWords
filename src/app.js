import Game from "./modules/game.js";

import { sfx } from "../assets/audio.js"; 

const appElement = document.getElementById('app');

const game = new Game(appElement);

game.init();

sfx.welcome.play();

