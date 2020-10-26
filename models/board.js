module.exports = class Board {
   tiles = [];
   units = [
      {
         id: '43cc0b72-3339-43ba-bb27-ea08221db09c',
         player: 'c5ac5491-e6c9-4dee-bbcb-4bae2408ac8e',
         civ: 'French',
         type: 'settler',
         row: 2,
         col: 2
      }
   ];

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
