module.exports = class TileElement {
   TILE_WIDTH = 64;
   TILE_HEIGHT = 32;

   constructor(terrainType, row, col) {
      this.terrainType = terrainType;
      this.row = row;
      this.col = col;
   }

   create(document) {
      const tileElem = document.createElement('img');
      tileElem.src = `./images/terrain/${this.terrainType}.gif`;
      tileElem.style = `position: absolute; top: ${this.top}px; left: ${this.left}px`;
      return tileElem;
   }

   get top() {
      return this.row * this.TILE_HEIGHT / 2;
   }

   get left() {
      if (this.row % 2 === 0) {
         return this.col * this.TILE_WIDTH;
      }

      return this.col * this.TILE_WIDTH + this.TILE_WIDTH / 2;
   }
}
