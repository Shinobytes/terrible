import TiledSprite from '../tiledsprite.js'

export default class Terrain {
  constructor() {
    this.grass = TiledSprite.fromUrl('/assets/sprites/tiles/grass.png')
  }
}