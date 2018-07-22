import Graphics from "./core/graphics.js";
import Engine from "./core/engine.js";
import Game from "./game.js";

const settings = { username: "user" + parseInt(Math.floor((Math.random() * 1000000))), password: null };
const canvas   = document.querySelector("#game");
const graphics = new Graphics(canvas);
const engine   = new Engine(graphics);
const game     = new Game(engine, settings);

engine.run(game);