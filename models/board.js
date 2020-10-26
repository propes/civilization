const events = require('../events/eventBus');

module.exports = class Board {
   tiles = [];
   units = {
      ['fr-settler-1']: {
         id: 'fr-settler-1',
         player: 'french',
         civ: 'french',
         type: 'settler',
         row: 2,
         col: 2
      }
   };
   selectedUnitId = 'fr-settler-1';

   constructor(rowCount, colCount, events) {
      this.rowCount = rowCount;
      this.colCount = colCount;

      this.generateTiles();
   }

   get selectedUnit() {
      return this.units[this.selectedUnitId];
   }

   generateTiles() {
      for (let row = 0; row < this.rowCount; row++) {
         for (let col = 0; col < this.colCount; col++) {
            if (row % 2 > 0 && col === this.colCount - 1) continue;
            this.tiles.push({ type: 'grassland1', row, col });
         }
      }
   }

   moveSelectedUnitDown() {
      var unit = this.selectedUnit;
      unit.row += 2;
      events.publish({
         name: 'unitMoved',
         data: {
            id: this.selectedUnitId,
            newLocation: { row: unit.row, col: unit.col }
         }
      });
   }
}
