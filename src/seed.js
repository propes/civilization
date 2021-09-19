const Unit = require("./models/unit");

function createBoardState() {
   const rowCount = 15;
   const colCount = 15;
   const tiles = generateTiles(rowCount, colCount)
   return {
      rowCount: rowCount,
      colCount: colCount,
      tiles: tiles,
      cities: {},
      units: {
         ['fr-settler-1']: new Unit('fr-settler-1', 'settler', 'french', 4, 4)
      },
      selectedUnitId: 'fr-settler-1'
   };
}

function generateTiles(rowCount, colCount) {
   const tiles = [];
   for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < colCount; col++) {
         if (row % 2 === col % 2) {
            tiles.push({ type: 'grassland1', row, col });
         }
      }
   }
   return tiles;
}

module.exports.createBoardState = createBoardState;

