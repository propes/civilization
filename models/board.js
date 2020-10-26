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

   moveSelectedUnitUp() {
      this.selectedUnit.row -= 2;
      this.publishUnitMovedEvent(this.selectedUnit);
   }

   moveSelectedUnitDown() {
      this.selectedUnit.row += 2;
      this.publishUnitMovedEvent(this.selectedUnit);
   }

   moveSelectedUnitLeft() {
      this.selectedUnit.col--;
      this.publishUnitMovedEvent(this.selectedUnit);
   }

   moveSelectedUnitRight() {
      this.selectedUnit.col++;
      this.publishUnitMovedEvent(this.selectedUnit);
   }

   publishUnitMovedEvent(unit) {
      events.publish({
         name: 'unitMoved',
         data: {
            id: unit.id,
            newLocation: { row: unit.row, col: unit.col }
         }
      });
   }
}
