module.exports = class Board {
   constructor(state, events) {
      this.state = state;
      this.events = events;
   }

   copy() {
      return new Board(this.state, this.events);
   }

   get tiles() {
      return this.state.tiles;
   }

   get units() {
      return this.state.units;
   }

   getSelectedUnit = () => {
      if (!this.state.selectedUnitId) {
         return null;
      }
      return this.state.units[this.state.selectedUnitId];
   }

   get haveAllUnitsMoved() {
      return !Object
         .keys(this.state.units)
         .map(key => this.state.units[key])
         .some(unit => unit.canMove);
   }

   clearSelectedUnit() {
      this.state.selectedUnitId = null;
   }

   resetUnitMoves() {
      for (var unitId in this.state.units) {
         this.state.units[unitId].resetMoves();
      }
   }

   moveSelectedUnitUp()  {
      const unit = this.getSelectedUnit();
      if (unit && unit.row > 1 && unit.canMove) {
         unit.moveUp();
         this.publishUnitMovedEvent(unit);
         this.checkTurnFinished();
      }
   }

   moveSelectedUnitDown() {
      const unit = this.getSelectedUnit();
      if (unit && unit.row < this.state.rowCount - 2 && unit.canMove) {
         unit.moveDown();
         this.publishUnitMovedEvent(unit);
         this.checkTurnFinished();
      }
   }

   moveSelectedUnitLeft() {
      const unit = this.getSelectedUnit();
      if (unit && unit.col > 1 && unit.canMove) {
         unit.moveLeft();
         this.publishUnitMovedEvent(unit);
         this.checkTurnFinished();
      }
   }

   moveSelectedUnitRight() {
      const unit = this.getSelectedUnit();
      if (unit && unit.col < this.state.colCount - 2 && unit.canMove) {
         unit.moveRight();
         this.publishUnitMovedEvent(unit);
         this.checkTurnFinished();
      }
   }

   moveSelectedUnitUpAndLeft() {
      const unit = this.getSelectedUnit();
      if (unit && unit.row > 0 && unit.col > 0 && unit.canMove) {
         unit.moveUpAndLeft();
         this.publishUnitMovedEvent(unit);
         this.checkTurnFinished();
      }
   }

   moveSelectedUnitUpAndRight() {
      const unit = this.getSelectedUnit();
      if (unit && unit.row > 0 && unit.col < this.state.colCount - 1 && unit.canMove) {
         unit.moveUpAndRight();
         this.publishUnitMovedEvent(unit);
         this.checkTurnFinished();
      }
   }

   moveSelectedUnitDownAndLeft() {
      const unit = this.getSelectedUnit();
      if (unit && unit.row < this.state.rowCount - 1 && unit.col > 0 && unit.canMove) {
         unit.moveDownAndLeft();
         this.publishUnitMovedEvent(unit);
         this.checkTurnFinished();
      }
   }

   moveSelectedUnitDownAndRight() {
      const unit = this.getSelectedUnit();
      if (unit && unit.row < this.state.rowCount - 1 && unit.col < this.state.colCount - 1 && unit.canMove) {
         unit.moveDownAndRight();
         this.publishUnitMovedEvent(unit);
         this.checkTurnFinished();
      }
   }

   requestBuildCity() {
      const unit = this.getSelectedUnit();
      if (unit && unit.type === "settler" && unit.canMove) {
         this.events.publish({
            name: 'buildCityRequested'
         });
      }
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
      unit.buildCity();

      this.clearSelectedUnit();
      this.publishUnitKilledEvent(unit);
      this.publishCityBuiltEvent(city);
      this.checkTurnFinished();
   }

   checkTurnFinished() {
      if (this.haveAllUnitsMoved) {
         this.events.publish({
            name: 'allUnitsMoved'
         });
      }
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
