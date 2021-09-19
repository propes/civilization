module.exports = class Board {
   constructor(state, events) {
      this.state = state;
      this.events = events;
   }

   getTiles = () => this.state.tiles;

   getUnits = () => this.state.units;

   getSelectedUnit = () => {
      if (!this.state.selectedUnitId) {
         return null;
      }
      return this.state.units[this.state.selectedUnitId];
   }

   clearSelectedUnit = () => this.state.selectedUnitId = null;

   moveSelectedUnitUp()  {
      const unit = this.getSelectedUnit();
      if (unit && unit.row > 1 && unit.canMove) {
         unit.moveUp();
         this.publishUnitMovedEvent(unit);
      }
   }

   moveSelectedUnitDown() {
      const unit = this.getSelectedUnit();
      if (unit && unit.row < this.state.rowCount - 2 && unit.canMove) {
         unit.moveDown();
         this.publishUnitMovedEvent(unit);
      }
   }

   moveSelectedUnitLeft() {
      const unit = this.getSelectedUnit();
      if (unit && unit.col > 1 && unit.canMove) {
         unit.moveLeft();
         this.publishUnitMovedEvent(unit);
      }
   }

   moveSelectedUnitRight() {
      const unit = this.getSelectedUnit();
      if (unit && unit.col < this.state.colCount - 2 && unit.canMove) {
         unit.moveRight();
         this.publishUnitMovedEvent(unit);
      }
   }

   moveSelectedUnitUpAndLeft() {
      const unit = this.getSelectedUnit();
      if (unit && unit.row > 0 && unit.col > 0 && unit.canMove) {
         unit.moveUpAndLeft();
         this.publishUnitMovedEvent(unit);
      }
   }

   moveSelectedUnitUpAndRight() {
      const unit = this.getSelectedUnit();
      if (unit && unit.row > 0 && unit.col < this.state.colCount - 1 && unit.canMove) {
         unit.moveUpAndRight();
         this.publishUnitMovedEvent(unit);
      }
   }

   moveSelectedUnitDownAndLeft() {
      const unit = this.getSelectedUnit();
      if (unit && unit.row < this.state.rowCount - 1 && unit.col > 0 && unit.canMove) {
         unit.moveDownAndLeft();
         this.publishUnitMovedEvent(unit);
      }
   }

   moveSelectedUnitDownAndRight() {
      const unit = this.getSelectedUnit();
      if (unit && unit.row < this.state.rowCount - 1 && unit.col < this.state.colCount - 1 && unit.canMove) {
         unit.moveDownAndRight();
         this.publishUnitMovedEvent(unit);
      }
   }

   requestBuildCity() {
      const unit = this.getSelectedUnit();
      if (!unit || unit.type !== "settler") return;

      this.events.publish({
         name: 'buildCityRequested'
      });
   }

   buildCity(cityName) {
      const unit = this.getSelectedUnit();
      if (!unit || unit.type !== "settler") return;

      const city = {
         id: `fr-city-${cityName.toLowerCase()}`,
         name: cityName,
         civ: unit.civ,
         pop: 3,
         row: unit.row,
         col: unit.col
      };
      this.state.cities[city.id] = city;
      unit.hasBuiltCity = true;

      this.publishUnitKilledEvent(unit);
      this.clearSelectedUnit();
      this.publishCityBuiltEvent(city);
   }

   publishCityBuiltEvent(city) {
      this.events.publish({
         name: 'cityBuilt',
         city
      });
   }

   publishUnitMovedEvent(unit) {
      this.events.publish({
         name: 'unitMoved',
         data: {
            id: unit.id,
            newLocation: { row: unit.row, col: unit.col }
         }
      });
   }

   publishUnitKilledEvent(unit) {
      this.events.publish({
         name: 'unitKilled',
         unitId: unit.id
      });
   }
}
