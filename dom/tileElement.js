const TILE_WIDTH = 64;
const TILE_HEIGHT = 32;

module.exports = class TileElement {
   constructor(tile) {
      this.terrainType = tile.type;
      this.row = tile.row;
      this.col = tile.col;
      this.createElement();
   }

   createElement() {
      this.elem = document.createElement('img');
      this.elem.src = `./images/terrain/${this.terrainType}.gif`;
      this.elem.style = `position: absolute; top: ${this.top}px; left: ${this.left}px`;
   }

   get top() {
      return this.row * TILE_HEIGHT / 2;
   }

   get left() {
      if (this.row % 2 === 0) {
         return this.col * TILE_WIDTH / 2;
      }

      return this.col * TILE_WIDTH / 2;
   }
}
