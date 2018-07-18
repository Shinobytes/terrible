import Sprite from "../sprite.js";

export default class Characters {
  constructor() {
    this.heroes = {
      Hiro: Sprite.fromUrl('/assets/sprites/characters/heroes/hiro.gif')
    }
  }
}