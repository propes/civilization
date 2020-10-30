const TILE_WIDTH = 64;
const TILE_HEIGHT = 32;

module.exports = class TileElement {
   constructor(tile) {
      this.terrainType = tile.type;
      this.row = tile.row;
      this.col = tile.col;
   }

   createElement() {
      const tileElem = document.createElement('img');
      tileElem.src = `./images/terrain/${this.terrainType}.gif`;
      tileElem.style = `position: absolute; top: ${this.top}px; left: ${this.left}px`;
      return tileElem;
   }

   get top() {
      return this.row * TILE_HEIGHT / 2;
   }

   get left() {
      if (this.row % 2 === 0) {
         return this.col * TILE_WIDTH;
      }

      return this.col * TILE_WIDTH + TILE_WIDTH / 2;
   }
}
