const events = require('../events/eventBus');

function Board(rowCount, colCount) {
   const _rowCount = rowCount;
   const _colCount = colCount;
   const _tiles = [];
   const _units = {
      ['fr-settler-1']: {
         id: 'fr-settler-1',
         player: 'french',
         civ: 'french',
         type: 'settler',
         row: 2,
         col: 2
      }
   };
   const _selectedUnitId = 'fr-settler-1';

   generateTiles();

   this.getTiles = () => _tiles;

   this.getUnits = () => _units;

   this.getSelectedUnit = () => _units[_selectedUnitId];

   function generateTiles() {
      for (let row = 0; row < _rowCount; row++) {
         for (let col = 0; col < _colCount; col++) {
            if (row % 2 > 0 && col === _colCount - 1) continue;
            _tiles.push({ type: 'grassland1', row, col });
         }
      }
   }

   this.moveSelectedUnitUp = function() {
      const unit = this.getSelectedUnit();
      unit.row -= 2;
      this.publishUnitMovedEvent(unit);
   };

   this.moveSelectedUnitDown = function() {
      const unit = this.getSelectedUnit();
      unit.row += 2;
      this.publishUnitMovedEvent(unit);
   };

   this.moveSelectedUnitLeft = function() {
      const unit = this.getSelectedUnit();
      unit.col--;
      this.publishUnitMovedEvent(unit);
   };

   this.moveSelectedUnitRight = function() {
      const unit = this.getSelectedUnit();
      unit.col++;
      this.publishUnitMovedEvent(unit);
   };

   this.publishUnitMovedEvent = function(unit) {
      events.publish({
         name: 'unitMoved',
         data: {
            id: unit.id,
            newLocation: { row: unit.row, col: unit.col }
         }
      });
   };
}

module.exports = Board;
