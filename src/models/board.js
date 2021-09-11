module.exports = function Board(state, events) {
   this.getTiles = () => state.tiles;

   this.getUnits = () => state.units;

   this.getSelectedUnit = () => state.units[state.selectedUnitId];

   this.clearSelectedUnit = () => state.selectedUnitId = null;

   this.moveSelectedUnitUp = function() {
      const unit = this.getSelectedUnit();
      if (unit.row > 1)
         unit.row -= 2;
      this.publishUnitMovedEvent(unit);
   };

   this.moveSelectedUnitDown = function() {
      const unit = this.getSelectedUnit();
      if (unit.row < state.rowCount - 2)
         unit.row += 2;
      this.publishUnitMovedEvent(unit);
   };

   this.moveSelectedUnitLeft = function() {
      const unit = this.getSelectedUnit();
      if (unit.col > 1)
         unit.col -= 2;
      this.publishUnitMovedEvent(unit);
   };

   this.moveSelectedUnitRight = function() {
      const unit = this.getSelectedUnit();
      if (unit.col < state.colCount - 2)
         unit.col += 2;
      this.publishUnitMovedEvent(unit);
   };

   this.moveSelectedUnitUpAndLeft = function() {
      const unit = this.getSelectedUnit();
      if (unit.row > 0 && unit.col > 0) {
         unit.row--;
         unit.col--;
      }
      this.publishUnitMovedEvent(unit);
   }

   this.moveSelectedUnitUpAndRight = function() {
      const unit = this.getSelectedUnit();
      if (unit.row > 0 && unit.col < state.colCount - 1) {
         unit.row--;
         unit.col++;
      }
      this.publishUnitMovedEvent(unit);
   }

   this.moveSelectedUnitDownAndLeft = function() {
      const unit = this.getSelectedUnit();
      if (unit.row < state.rowCount - 1 && unit.col > 0) {
         unit.row++;
         unit.col--;
      }
      this.publishUnitMovedEvent(unit);
   }

   this.moveSelectedUnitDownAndRight = function() {
      const unit = this.getSelectedUnit();
      if (unit.row < state.rowCount - 1 && unit.col < state.colCount - 1) {
         unit.row++;
         unit.col++;
      }
      this.publishUnitMovedEvent(unit);
   }

   this.buildCity = function() {
      const unit = this.getSelectedUnit();
      if (!unit || unit.type !== "settler") return;

      const city = {
         id: 'fr-city-1',
         civ: unit.civ,
         pop: 3,
         row: unit.row,
         col: unit.col
      };
      state.cities[city.id] = city;
      unit.hasBuiltCity = true;

      this.publishUnitKilledEvent(unit);
      this.publishCityBuiltEvent(city);
      this.clearSelectedUnit();
   }

   this.publishCityBuiltEvent = function(city) {
      events.publish({
         name: 'cityBuilt',
         city
      });
   }

   this.publishUnitMovedEvent = function(unit) {
      events.publish({
         name: 'unitMoved',
         data: {
            id: unit.id,
            newLocation: { row: unit.row, col: unit.col }
         }
      });
   };

   this.publishUnitKilledEvent = function(unit) {
      events.publish({
         name: 'unitKilled',
         unitId: unit.id
      });
   };
}
