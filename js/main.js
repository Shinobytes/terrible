import Graphics from "./core/graphics.js";
import Engine from "./core/engine.js";
import Game from "./game.js";

const canvas   = document.querySelector("#game");
const graphics = new Graphics(canvas);
const engine   = new Engine(graphics);
const game     = new Game();

engine.run(game);