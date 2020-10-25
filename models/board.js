module.exports = class Board {
   tiles = [];

   constructor(rowCount, colCount) {
      this.rowCount = rowCount;
      this.colCount = colCount;
      this.generateTiles();
   }

   generateTiles() {
      for (let row = 0; row < this.rowCount; row++) {
         for (let col = 0; col < this.colCount; col++) {
            if (row % 2 > 0 && col === this.colCount - 1) continue;
            this.tiles.push({ type: 'grassland1', row, col });
         }
      }
   }
}
